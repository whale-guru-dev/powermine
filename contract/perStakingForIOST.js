//specifies admin of the contract.  
const admin = "pmine_admin";
const lobbyContract = "ContractKyprrbkxFd3nbheawCbazP9pTTB31TbnZ5pNQL6xHpF";
const perStakingContract = "Contract6HVXnk7oBMYHizdgYHjQZZu74mj2XEMbZzVQ6Eijiu5f";

const penaltyFees = {
    "1M": .1,
    "3M": .2,
    "6M": .3,
    "1Y": .4,
    "2Y": .5,
    "3Y": .6,
    "Indefinitely": .8
}

class PerStakingForIOST {
    init() {
        storage.put("totalShares", "0");
        storage.put("totalPer", "0");
        storage.put("stakeID", "0");
        storage.put("rewardsUnclaimed", "0");
        storage.put("usersKey", JSON.stringify([]));
    }

    //generates a stake entry id
    _getStakeID() {
        let id = storage.get("stakeID");
        storage.put("stakeID", (id * 1 + 1).toString());
        return id;
    }

    //allows user to stake per in the per staking pool
    stake(perAmount, lockTime) {
        //Checks to make sure per is not a string but number.
        //Also checks to make sure it is not less than zero
        if (perAmount * 0 !== 0 || perAmount * 1 <= 0) {
            throw "Not a valid number. "
        }

        let perAfterFee = perAmount * .98;

        let totalShares = storage.get("totalShares") * 1;
        let totalPer = storage.get("totalPer") * 1;
        let users = JSON.parse(storage.get("usersKey"));
        let multiplier;
        let time = block.time;
        let lockPeriod;
        let id = this._getStakeID();


        if (lockTime === "1M") {
            multiplier = 1;
            lockPeriod = time + 2629743000000000;
        }
        else if (lockTime === "3M") {
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
        else {
            throw "Not a valid lock period. "
        }

        let userShares = perAfterFee * multiplier;

        if (!users.includes(tx.publisher)) {
            users.push(tx.publisher);
            storage.mapPut("users", tx.publisher, JSON.stringify({ total: userShares.toFixed(8), stakings: [id] }))
            storage.put("usersKey", JSON.stringify(users));
        }
        else {
            let userData = JSON.parse(storage.mapGet("users", tx.publisher));
            userData.total = (userData.total * 1 + userShares).toFixed(8);
            userData.stakings.push(id);
            storage.mapPut("users", tx.publisher, JSON.stringify(userData));
        }

        storage.mapPut("stakings", id, JSON.stringify({ id: id, user: tx.publisher, per: perAfterFee.toFixed(8), shares: userShares.toFixed(8), stakedTime: time, lockPeriod: lockPeriod, lockTime: lockTime }))
        totalShares += userShares;
        totalPer += perAfterFee;

        //updates the total share of PER staked on the contract. 
        storage.put("totalShares", totalShares.toFixed(8));
        storage.put("totalPer", totalPer.toFixed(8));

        this._transfer("per", tx.publisher, blockchain.contractName(), (perAmount * 1).toFixed(8), "User stakes PER on contract. ");


    }

    //allows user to unstake per in the per staking pool
    unstake(id) {

        if (!storage.mapHas("users", tx.publisher)) {
            throw "User has no stake entries. "
        }

        if (!storage.mapHas("stakings", id)) {
            throw "This is staking entry does not exist. "
        }

        let userData = JSON.parse(storage.mapGet("users", tx.publisher));
        let usersKey = JSON.parse(storage.get("usersKey"));
        let entry = JSON.parse(storage.mapGet("stakings", id));

        if (entry.user !== tx.publisher) {
            throw "You are not authorized to unstake this entry. ";
        }

        let totalShares = storage.get("totalShares") * 1;
        let totalPer = storage.get("totalPer") * 1;

        //check if there is penalty
        //there is penalty
        if (block.time < entry.lockPeriod) {
            let unstakeAmt = entry["per"] * 1 - entry["per"] * penaltyFees[entry.lockTime];
            let lobbyPool = entry["per"] * penaltyFees[entry.lockTime] * .5;
            let perStakingPool = entry["per"] * penaltyFees[entry.lockTime] * .25;
            let burn = entry["per"] * penaltyFees[entry.lockTime] * .25;
            //sends to user
            this._transfer("per", blockchain.contractName(), tx.publisher, unstakeAmt.toFixed(8), "User unstakes from contract with penalty. ");
            //sends to lobby
            this._transfer("per", blockchain.contractName(), lobbyContract, lobbyPool.toFixed(8), "Penalty charge got sent to lobby pool");
            
            //sends to PER staking contract
            this._transfer("per", blockchain.contractName(), perStakingContract, perStakingPool.toFixed(8), "Penalty charge got sent to PER staking pool");

            //burns.  
            blockchain.callWithAuth("ContractH8iSeyTq9T8o1ukfxxwqvZYiTX4MTKjKoBecLYrp2FPU", "destroy", [
                'per',
                blockchain.contractName(),
                burn.toFixed(8)
            ]);
        }
        //there is no penalty
        else {
            let unstakeAmt = entry["per"] * 1;
            this._transfer("per", blockchain.contractName(), tx.publisher, unstakeAmt.toFixed(8), "User unstakes from contract with no penalty. ");
        }

        totalShares -= entry["shares"] * 1;
        totalPer -= entry["per"] * 1;

        //update total share
        storage.put("totalShares", totalShares.toFixed(8));
        storage.put("totalPer", totalPer.toFixed(8));

        //update user's staking entries
        userData.stakings = userData.stakings.filter(i => i !== id);
        userData.total = (userData.total * 1 - entry["shares"] * 1).toFixed(8);

        if (userData.total * 1 <= 0 || !userData.stakings.length) {
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


    //Payout rewards to users. 
    payOutIOST() {
        this._assertAccountAuth("powermine");

        let balance = blockchain.callWithAuth("token.iost", "balanceOf", [
            "iost",
            blockchain.contractName()
        ]) * 1;

        let rewardsUnclaimed = storage.get("rewardsUnclaimed") * 1;

        //The available payout pool is calculated by balance of per minus the rewards unclaimed. 
        let pool = balance - rewardsUnclaimed;

        // 5% of reward pool goes to payout.  
        let rewards = pool * .05;

        let users = JSON.parse(storage.get("usersKey"));
        let totalShares = storage.get("totalShares") * 1;

        //Pays out per to all staked users based on shares.  Users will have to claim rewards.  
        users.forEach(user => {
            let userData = JSON.parse(storage.mapPut("users", user));
            let shares = userData.total * 1;
            let userReward = rewards * shares / totalShares;

            if (!storage.mapHas("usersUnclaimed", user)) {
                storage.mapPut("usersUnclaimed", user, userReward.toFixed(8));
            }
            else {
                let usersUnclaimed = storage.mapGet("usersUnclaimed", user) * 1;
                usersUnclaimed += userReward;
                storage.mapPut("usersUnclaimed", user, usersUnclaimed.toFixed(8));
            }

        });

        rewardsUnclaimed += rewards;
        storage.put("rewardsUnclaimed", rewardsUnclaimed.toFixed(8));

    }


    //user claim rewards
    claimReward() {
        if (!storage.mapHas("usersUnclaimed", tx.publisher)) {
            throw "You don't have rewards for claim. "
        }

        let usersUnclaimed = storage.mapGet('usersUnclaimed', tx.publisher) * 1;

        if (usersUnclaimed === 0) {
            throw "You have zero rewards available for claim. "
        }

        this._transfer("iost", blockchain.contractName(), tx.publisher, usersUnclaimed.toFixed(8), "User claims IOST reward. ");
        let rewardsUnclaimed = storage.get('rewardsUnclaimed') * 1 - usersUnclaimed;

        storage.put('rewardsUnclaimed', rewardsUnclaimed.toFixed(8));
        storage.mapPut('usersUnclaimed', tx.publisher, "0");

    }



    can_update(data) {
        return blockchain.requireAuth('pmine_admin', 'active');

    }

    //write codes in this function if you want to update block storage. 
    updateInit() {
        this._assertAccountAuth('pmine_admin');


    }


    //customize the transfer protocol.  
    _transfer(token, from, to, amount, memo) {
        if (token === "per") {
            blockchain.callWithAuth("ContractH8iSeyTq9T8o1ukfxxwqvZYiTX4MTKjKoBecLYrp2FPU", "transfer", JSON.stringify([token, from, to, amount, memo]));

        }
        else {
            blockchain.callWithAuth("token.iost", "transfer", JSON.stringify([token, from, to, amount, memo]));
        }
    }

    _assertAccountAuth(account) {
        if (!blockchain.requireAuth(account, 'active')) {
            throw 'Authorization Failure';
        }
    }


}
module.exports = PerStakingForIOST;