//specifies admin of the contract.  
const admin = "pmine_admin";


class LoanContract {
    init() {

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
module.exports = LoanContract;