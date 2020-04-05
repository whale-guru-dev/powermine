//specify the token decimal
const tokenDecimal = 8;

//specify total supply of pmine
const totalSupply = 20000;

//specify orginal price.  
const originalPrice = 4700;

//specifies admin of the contract.  
const admin = "powermine";

class SwapContract {
    init() {
        //sets the original price before token sales.
        storage.put("tokenPrice", originalPrice.toString());

        //sets total sold to zero because admin has not deposited yet.
        storage.put("totalSold", "3740");

        //sets pmine on contract to zero because admin has not deposited yet.
        storage.put("pmineAmountOnContract", "0");

        //sets iost on contract to zero because admin has not deposited.
        storage.put("iostOnContract", "0");
    }

    //Only admin can use this function.  Admin must first deposit pmine to the contract from account powermine
    depositInitialPmine(pmineAmount) {
        this._assertAccountAuth(admin);

        if (pmineAmount * 0 !== 0 || pmineAmount * 1 <= 0) {
            throw "Not a valid number. "
        }

        pmineAmount = (pmineAmount * 1).toFixed(tokenDecimal);

        blockchain.callWithAuth("token.iost", "transfer", JSON.stringify(["pmine", tx.publisher, blockchain.contractName(), pmineAmount.toString(), "Admin intial deposit of unbought pmines. "]));

        //update block storage for total sold and pmine on contract.
        storage.put("pmineAmountOnContract", pmineAmount.toString());
        // storage.put("totalSold", total_sold.toString());

        //Updates the current price based on circulation.
        // storage.put("tokenPrice", newPrice.toString());

    }

    //Admin can deposit IOST to the contract.
    depositIOST(iostAmount) {
        //checks to make sure that powermine is the active account calling this function.
        this._assertAccountAuth(admin);

        //Checks to make sure pmineAmount is not a string but number.
        //Also checks to make sure it is not less than zero
        if (iostAmount * 0 !== 0 || iostAmount * 1 <= 0) {
            throw "Not a valid number. "
        }

        let iostOnContract = storage.get("iostOnContract") * 1;

        iostAmount = (iostAmount * 1).toFixed(tokenDecimal);

        blockchain.callWithAuth("token.iost", "transfer", JSON.stringify(["iost", tx.publisher, blockchain.contractName(), iostAmount.toString(), "Admin deposits iost to contract. "]));


        //updates the amount of iost on the contract.
        iostOnContract = (iostOnContract + iostAmount).toFixed(tokenDecimal);
        storage.put("iostOnContract", iostOnContract.toString());


    }

    //Admin can withdrawl IOST from the contract.
    withdrawlIost(iostAmount) {
        //checks to make sure that powermine is the active account calling this function.
        this._assertAccountAuth(admin);

        //Checks to make sure pmineAmount is not a string but number.
        //Also checks to make sure it is not less than zero
        if (iostAmount * 0 !== 0 || iostAmount * 1 <= 0) {
            throw "Not a valid number. "
        }

        let iostOnContract = storage.get("iostOnContract") * 1;

        iostAmount = (iostAmount * 1).toFixed(tokenDecimal);

        blockchain.callWithAuth("token.iost", "transfer", JSON.stringify(["iost", blockchain.contractName(), tx.publisher, iostAmount.toString(), "Admin widthdrawls iost from contract. "]));

        //updates the amount of iost on the contract.
        iostOnContract = (iostOnContract - iostAmount).toFixed(tokenDecimal);
        storage.put("iostOnContract", iostOnContract.toString());

    }


    //User trigger this function to buy Pmine.
    buyToken(pmineAmount) {

        //Checks to make sure pmineAmount is not a string but number.
        //Also checks to make sure it is not less than zero
        if (pmineAmount * 0 !== 0 || pmineAmount * 1 <= 0) {
            throw "Not a valid number. "
        }

        pmineAmount = (pmineAmount * 1).toFixed(tokenDecimal);

        //Define relevant variables.
        let token_price = storage.get("tokenPrice") * 1;
        let total_sold = storage.get("totalSold") * 1;
        let pmine_contract = storage.get("pmineAmountOnContract") * 1;

        //Specifies the amount of iost that is required for this transaction. Also fixed the decimal on iost.  Then send it to blockchain.
        let total_iost = (pmineAmount * token_price).toFixed(tokenDecimal);
        blockchain.callWithAuth("token.iost", "transfer", JSON.stringify(["iost", tx.publisher, blockchain.contractName(), total_iost.toString(), "Sends iost to powermine contract for swap. "]));

        //send pmine from contract to user.
        blockchain.callWithAuth("token.iost", "transfer", JSON.stringify(["pmine", blockchain.contractName(), tx.publisher, pmineAmount.toString(), "Powermine contract sends pmines to user. "]));

        //update total pmine sold
        total_sold = (total_sold + pmineAmount * 1).toFixed(tokenDecimal);
        storage.put("totalSold", total_sold.toString());

        //update total pmine on contract.
        pmine_contract = (pmine_contract - pmineAmount * 1).toFixed(tokenDecimal);
        storage.put("pmineAmountOnContract", pmine_contract.toString());

        //update price based on circulation.
        let priceChange = (Math.floor(total_sold / 1000) - 3) * 10;
        let newPrice = (token_price + priceChange).toFixed(tokenDecimal);
        storage.put("tokenPrice", newPrice.toString());

        //generate tx receipt
        blockchain.receipt(JSON.stringify({
            "name": tx.publisher,
            "token": "pmine",
            "amount": pmineAmount,
            "action": "User bought pmine. "
        }));

        return true;

    }


    //Users can trigger this function to sell Pmine.
    sellToken(pmineAmount) {
        //Checks to make sure pmineAmount is not a string but number.
        //Also checks to make sure it is not less than zero
        if (pmineAmount * 0 !== 0 || pmineAmount * 1 <= 0) {
            throw "Not a valid number. "
        }

        pmineAmount = (pmineAmount * 1).toFixed(tokenDecimal);

        //Define relevant variables.
        let token_price = storage.get("tokenPrice") * 1;
        let total_sold = storage.get("totalSold") * 1;
        let pmine_contract = storage.get("pmineAmountOnContract") * 1;

        //Specifies the amount of iost that is required for this transaction. Also fixed the decimal on iost.  Then send it to blockchain.
        let total_iost = (pmineAmount * token_price * .6).toFixed(tokenDecimal);
        blockchain.callWithAuth("token.iost", "transfer", JSON.stringify(["iost", blockchain.contractName(), tx.publisher, total_iost.toString(), "Powermine contract sends iost to user. "]));

        //send pmine from user to contract.
        blockchain.callWithAuth("token.iost", "transfer", JSON.stringify(["pmine", tx.publisher, blockchain.contractName(), pmineAmount.toString(), "User sends pmine to Powermine contract. "]));

        //update total pmine sold
        total_sold = (total_sold - pmineAmount * 1).toFixed(tokenDecimal);
        storage.put("totalSold", total_sold.toString());

        //update total pmine on contract.
        pmine_contract = (pmine_contract + pmineAmount * 1).toFixed(tokenDecimal);
        storage.put("pmineAmountOnContract", pmine_contract.toString());

        //update price based on circulation.
        let priceChange = (Math.floor(total_sold / 1000) - 3) * 10;
        let newPrice = (token_price - priceChange).toFixed(tokenDecimal);
        storage.put("tokenPrice", newPrice.toString());

        //generate tx receipt
        blockchain.receipt(JSON.stringify({
            "name": tx.publisher,
            "token": "pmine",
            "amount": pmineAmount,
            "action": "User sold pmine. "
        }));

        return true;

    }


    //This makes it so that only the admin can make changes to the contract.
    can_update(data) {
        return blockchain.requireAuth(admin, "active");
    }

    //only admin can use this function.  Use this to update things.
    updateInit() {
        this._assertAccountAuth(admin);
    }

    //Check to make sure that the account is authorized to perform a function.
    _assertAccountAuth(account) {
        if (!blockchain.requireAuth(account, "active")) {
            throw "Authorization Failure";
        }
    }
}

module.exports = SwapContract;