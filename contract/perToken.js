const name = 'per';
const fullName = 'per'; //It is recommended that the wallet and browser display the name of the currency as "fullName(name)", for example: YTK(your_token)
const decimal = 8;
const totalSupply = 100000000;
const admin = 'pmine_admin';

class PerToken {
    init() {
        let arg = [
            name,
            blockchain.contractName(),
            totalSupply,
            {
                fullName,
                decimal,
                canTransfer: true,
                onlyIssuerCanTransfer: true
            }
        ];
        blockchain.callWithAuth('token.iost', 'create', JSON.stringify(arg));
    }

    can_update(data) {
        return blockchain.requireAuth(blockchain.contractOwner(), 'active');
    }

    updateInit() {
        this._assertAccountAuth(admin);
    }

    _amount(amount) {
        return new BigNumber(new BigNumber(amount).toFixed(decimal));
    }

    _checkToken(token_name) {
        if (token_name !== name) {
            throw 'token not exist';
        }
    }

    issue(token_name, to, amount) {
        if (!blockchain.requireAuth(admin, 'active')) {
            throw 'permission denied';
        }
        this._checkToken(token_name);
        amount = this._amount(amount);
        blockchain.callWithAuth('token.iost', 'issue', [token_name, to, amount]);
    }

    transfer(token_name, from, to, amount, memo) {
        this._checkToken(token_name);
        amount = this._amount(amount);
        blockchain.callWithAuth('token.iost', 'transfer', [
            token_name,
            from,
            to,
            amount,
            memo
        ]);
    }

    transferFreeze(token_name, from, to, amount, timestamp, memo) {
        this._checkToken(token_name);
        amount = this._amount(amount);
        blockchain.callWithAuth('token.iost', 'transferFreeze', [
            token_name,
            from,
            to,
            amount,
            timestamp,
            memo
        ]);
    }

    destroy(token_name, from, amount) {
        this._checkToken(token_name);
        amount = this._amount(amount);
        blockchain.callWithAuth('token.iost', 'destroy', [
            token_name,
            from,
            amount
        ]);
    }


    //Check to make sure that the account is authorized to perform a function.
    _assertAccountAuth(account) {
        if (!blockchain.requireAuth(account, "active")) {
            throw "Authorization Failure";
        }
    }

    // call abi and parse result as JSON string
    _call(contract, api, args) {
        const ret = blockchain.callWithAuth(contract, api, args);
        if (ret && Array.isArray(ret) && ret.length >= 1) {
            return ret[0];
        }
        return null;
    }

    balanceOf(token_name, owner) {
        this._checkToken(token_name);
        return this._call('token.iost', 'balanceOf', [token_name, owner]);
    }

    supply(token_name) {
        this._checkToken(token_name);
        return this._call('token.iost', 'supply', [token_name]);
    }

    totalSupply(token_name) {
        this._checkToken(token_name);
        return this._call('token.iost', 'totalSupply', [token_name]);
    }


}

module.exports = PerToken;
