//specifies admin of the contract.  
const admin = "pmine_admin";
const distribution = .005;
const loanContract = "ContractAqcgt14kaHJFwAbWiFrQUX3m4zcrbJb6dhc4BQgrZwhH";
const stakingContract = "Contract2vbvZ3mXscXUFrX1zcxGMYxyPEsknMUixzv5E1qte2hn";

class PerLobby {
    init() {
        storage.put("usersKey", JSON.stringify([]));
        storage.put("unclaimedPER", "0");
    }

    lobbyTransform(iostAmount){
        //check numerical value.  Must be greater than zero. 
        if (iostAmount * 0 !== 0 || iostAmount * 1 <= 0) {
            throw "Not a valid number. "
        }

        let users = JSON.parse(storage.get("usersKey"));
        this._transfer("iost", tx.publisher, blockchain.contractName(), (iostAmount * 1).toFixed(8), "User sends IOST to await the PER transformation. ")

        if(!users.includes(tx.publisher)){
            users.push(tx.publisher);
            storage.mapPut("users", tx.publisher, (iostAmount * 1).toFixed(8));
            storage.put("usersKey", JSON.stringify(users));
        }
        else {
            let userShare = storage.mapGet("users", tx.publisher) * 1; 
            userShare += iostAmount * 1; 
            storage.mapPut("users", tx.publisher, (userShare).toFixed(8));
        }


    }

    distribute(){
        this._assertAccountAuth("powermine");

        let iostBalance = blockchain.callWithAuth("token.iost", "balanceOf", [
            "iost",
            blockchain.contractName()
        ]) * 1;

        let perUnclaimed = storage.get("unclaimedPER") * 1;
        let perBalance = blockchain.callWithAuth("token.iost", "balanceOf", [
            "per",
            blockchain.contractName()
        ]) * 1 - perUnclaimed;

        let perDist = perBalance * distribution; 

        let users = JSON.parse(storage.get("usersKey"));

        users.forEach(user => {
            let userShare = perDist * storage.mapGet("users", user) / iostBalance;
            this._transfer("per", blockchain.contractName(), user, userShare.toFixed(8), "User receives PER from lobby. ");
            storage.mapDel("users", user);

            if (!storage.mapHas("usersUnclaimed", user)) {
                storage.mapPut("usersUnclaimed", user, userShare.toFixed(8));
            }
            else {
                let usersUnclaimed = storage.mapGet("usersUnclaimed", user) * 1;
                usersUnclaimed += userShare;
                storage.mapPut("usersUnclaimed", user, usersUnclaimed.toFixed(8));
            }
            
        });

        perUnclaimed += perDist; 
        storage.put("unclaimedPER", perUnclaimed.toFixed(8));

        storage.put("usersKey", JSON.stringify([]));

        //80% iost goes to loan contract
        this._transfer("iost", blockchain.contractName(), loanContract, (iostBalance * .8).toFixed(8), "80% IOST to liquidity contract");

        //10% iost goes to powermine account.  
        this._transfer("iost", blockchain.contractName(), "powermine", (iostBalance * .1).toFixed(8), "10% IOST to DEX liquidity");

        //10% goes to IOST staking pool. 
        this._transfer("iost", blockchain.contractName(), stakingContract, (iostBalance * .1).toFixed(8), "10% IOST to IOST staking contract");
    }

    claim(){
        if (!storage.mapHas("usersUnclaimed", tx.publisher)) {
            throw "You don't have PER for claim. "
        }

        let usersUnclaimed = storage.mapGet('usersUnclaimed', tx.publisher) * 1;

        if (usersUnclaimed === 0) {
            throw "You have zero PER available for claim. "
        }

        this._transfer("per", blockchain.contractName(), tx.publisher, usersUnclaimed.toFixed(8), "User claims PER reward. ");
        let rewardsUnclaimed = storage.get('unclaimedPER') * 1 - usersUnclaimed;

        storage.put('unclaimedPER', rewardsUnclaimed.toFixed(8));
        storage.mapPut('usersUnclaimed', tx.publisher, "0");
    }



    can_update(data) {
        return blockchain.requireAuth('pmine_admin', 'active');

    }

    //write codes in this function if you want to update block storage. 
    updateInit() {
        this._assertAccountAuth('pmine_admin');
        storage.put("unclaimedPER", "0");

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
module.exports = PerLobby;