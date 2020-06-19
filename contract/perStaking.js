//specifies admin of the contract.  
const admin = "pmine_admin";

const penaltyFees = {
    "1M": .1,
    "3M": .2,
    "6M": .3,
    "1Y": .4,
    "2Y": .5,
    "3Y": .6,
    "Indefinitely": .8
}

class PerStaking {
    init() {
        storage.put("totalShares", "0");
        storage.put("stakeID", "0");
        storage.put("usersKey", JSON.stringify([]));
    }

    //generates a stake entry id
    _getStakeID(){
        let id = storage.get("stakeID");
        storage.put("stakeID", (id * 1 + 1).toString());
        return id; 
    }

    //allows user to stake per in the per staking pool
    stakeForPer(perAmount, lockTime) {
        //Checks to make sure per is not a string but number.
        //Also checks to make sure it is not less than zero
        if (perAmount * 0 !== 0 || perAmount * 1 <= 0) {
            throw "Not a valid number. "
        }

        let perAfterFee = perAmount * .98;

        let totalShares = storage.get("totalShares") * 1; 
        let users = JSON.parse(storage.get("usersKey"));
        let multiplier; 
        let time = block.time; 
        let lockPeriod; 
        let id = this._getStakeID(); 
          

        if(lockTime === "1M"){
            multiplier = 1;
            lockPeriod = time + 2629743000000000;
        }
        else if(lockTime === "3M"){
            multiplier = 1.25;
            lockPeriod = time + 2629743000000000 * 3;
        }
        else if (lockTime === "6M") {
            multiplier = 1.5;
            lockPeriod = time + 2629743000000000 * 6;
        }
        else if (lockTime === "1Y") {
            multiplier = 2;
            lockPeriod = time + 31556926000000000;
        }
        else if (lockTime === "2Y") {
            multiplier = 2.5;
            lockPeriod = time + 31556926000000000 * 2;
        }
        else if (lockTime === "3Y") {
            multiplier = 3;
            lockPeriod = time + 31556926000000000 * 3;
        }
        else if (lockTime === "Indefinitely") {
            multiplier = 5;
            lockPeriod = time + 31556926000000000 * 100;
        }
        else{
            throw "Not a valid lock period. "
        }

        let userShares = perAfterFee * multiplier;

        if(!users.includes(tx.publisher)){
            users.push(tx.publisher);
            storage.mapPut("users", tx.publisher, JSON.stringify({ total: userShares.toFixed(8), stakings: [id]}))
            storage.put("usersKey", JSON.stringify(users));
        }
        else {
            let userData = JSON.parse(storage.mapGet("users", tx.publisher));
            userData.total = (userData.total * 1 + userShares).toFixed(8);
            userData.stakings.push(id);
            storage.mapPut("users", tx.publisher, JSON.stringify(userData));
        }

        storage.mapPut("stakings", id, JSON.stringify({id: id, user: tx.publisher, per: perAfterFee.toFixed(8), shares: userShares.toFixed(8), stakedTime: time, lockPeriod: lockPeriod, lockTime: lockTime }))
        totalShares += userShares; 

        //updates the total share of PER staked on the contract. 
        storage.put("totalShares", totalShares.toFixed(8));
        
        this._transfer("per", tx.publisher, blockchain.contractName(), (perAmount * 1).toFixed(8), "User stakes PER on contract. ");

    
    }

    //allows user to unstake per in the per staking pool
    unstakeForPer(id) {

        if (!storage.mapHas("users", tx.publisher)){
            throw "User has no stake entries. "
        }

        if(!storage.mapHas("stakings", id)){
            throw "This is staking entry does not exist. "
        }

        let userData = JSON.parse(storage.mapGet("users", tx.publisher));
        let usersKey = JSON.parse(storage.get("usersKey"));
        let entry = JSON.parse(storage.mapGet("stakings", id));

        if(entry.user !== tx.publisher){
            throw "You are not authorized to unstake this entry. "
        }

        let totalShares = storage.get("totalShares") * 1;

        //check if there is penalty
        //there is penalty
        if(block.time < entry.lockPeriod){
            let unstakeAmt = entry["per"] * 1 - entry["per"] * penaltyFees[entry.lockTime]; 
            this._transfer("per", blockchain.contractName(), tx.publisher, unstakeAmt.toFixed(8), "User unstakes from contract with penalty. ");
        }
        //there is no penalty
        else {
            let unstakeAmt = entry["per"] * 1;
            this._transfer("per", blockchain.contractName(), tx.publisher, unstakeAmt.toFixed(8), "User unstakes from contract with no penalty. ");
        }

        totalShares -= entry[shares] * 1; 
        
        //update total share
        storage.put("totalShares", totalShares.toFixed(8));

        //update user's staking entries
        userData.stakings = userData.stakings.filter(i => i !== id);
        userData.total = (userData.total * 1 - entry["shares"] * 1).toFixed(8);

        if(userData.total * 1 <= 0 || !userData.stakings.length){
            storage.mapDel("users", tx.publisher);
            usersKey = usersKey.filter(u => u !== tx.publisher); 
            storage.put("usersKey", JSON.stringify(usersKey)); 
        }
        else {
            storage.mapPut("users", tx.publisher, JSON.stringify(userData));
        }
        

        //delete staking entry.  
        storage.mapDel("stakings", id);
        

    }

   

    getStakedUsersForPer() {

    }

    getStakedUsersForIost() {

    }


    can_update(data) {
        return blockchain.requireAuth('pmine_admin', 'active');

    }

    //write codes in this function if you want to update block storage. 
    updateInit() {
        this._assertAccountAuth('pmine_admin');


    }


    //customize the transfer protocol.  
    _transfer(token, from, to, amount, memo){
        if(token === "per"){
            blockchain.callWithAuth("ContractH8iSeyTq9T8o1ukfxxwqvZYiTX4MTKjKoBecLYrp2FPU", "transfer", JSON.stringify([token, from, to, amount, memo]));

        }
        else{
            blockchain.callWithAuth("token.iost", "transfer", JSON.stringify([token, from, to, amount, memo]));
        }
    }

    _assertAccountAuth(account) {
        if (!blockchain.requireAuth(account, 'active')) {
            throw 'Authorization Failure';
        }
    }


}
module.exports = PerStaking;