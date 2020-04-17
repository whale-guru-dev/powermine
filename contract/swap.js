//specify the token decimal
const tokenDecimal = 8;

//specify total supply of pmine
const totalSupply = 20000;

//specify orginal price.  
const originalPrice = 5000;

//specifies admin of the contract.  
const admin = "powermine";

class SwapContract {
    init() {
        //sets the original price before token sales.
        storage.put("tokenPrice", originalPrice.toString());

        //sets total sold to zero because admin has not deposited yet.
        storage.put("totalSold", "4182");

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

        pmineAmount = (pmineAmount * 1);
        pmineAmount = pmineAmount.toFixed(tokenDecimal);

        blockchain.callWithAuth("token.iost", "transfer", JSON.stringify(["pmine", tx.publisher, blockchain.contractName(), pmineAmount.toString(), "Admin intial deposit of unbought pmines. "]));

        let pmine_contract = storage.get("pmineAmountOnContract") * 1;
        pmine_contract = (pmine_contract + pmineAmount * 1);
        pmine_contract = pmine_contract.toFixed(tokenDecimal);

        //update block storage for total sold and pmine on contract.
        storage.put("pmineAmountOnContract", pmine_contract.toString());
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

        iostAmount = (iostAmount * 1);

        blockchain.callWithAuth("token.iost", "transfer", JSON.stringify(["iost", tx.publisher, blockchain.contractName(), iostAmount.toString(), "Admin deposits iost to contract. "]));


        //updates the amount of iost on the contract.
        iostOnContract = (iostOnContract + iostAmount);
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

        iostAmount = (iostAmount * 1);

        blockchain.callWithAuth("token.iost", "transfer", JSON.stringify(["iost", blockchain.contractName(), tx.publisher, iostAmount.toString(), "Admin widthdrawls iost from contract. "]));

        //updates the amount of iost on the contract.
        iostOnContract = (iostOnContract - iostAmount);
        storage.put("iostOnContract", iostOnContract.toString());

    }


    //User trigger this function to buy Pmine.
    buyToken(pmineAmount) {

        //Checks to make sure pmineAmount is not a string but number.
        //Also checks to make sure it is not less than zero
        if (pmineAmount * 0 !== 0 || pmineAmount * 1 <= 0) {
            throw "Not a valid number. "
        }

        pmineAmount = (pmineAmount * 1);

        pmineAmount = pmineAmount.toFixed(tokenDecimal);

        //Define relevant variables.
        let token_price = storage.get("tokenPrice") * 1;
        let total_sold = storage.get("totalSold") * 1;
        let pmine_contract = storage.get("pmineAmountOnContract") * 1;

        //Specifies the amount of iost that is required for this transaction. Also fixed the decimal on iost.  Then send it to blockchain.
        let total_iost = (pmineAmount * token_price);

  
        //Auto process dividends.
        let dividends = total_iost * .1; 
        let stakedUsers = JSON.parse(storage.get('userStakes'));
        let totalStaked = storage.get('totalStaked') * 1;

        //pays divs too all staked users.  
        stakedUsers.forEach(user => {
            let userDiv = (user.balance / totalStaked) * dividends;

            if (userDiv.toFixed(8) > 0) {
                blockchain.callWithAuth("token.iost", "transfer", JSON.stringify(["iost", tx.publisher, user.account,  userDiv.toFixed(8).toString(), "10% Pmine divs"]));
            }

        });
        
        //management fees. 
        let safeDeposit = total_iost * .05;
        let dividendSup = total_iost * .05;
        blockchain.callWithAuth("token.iost", "transfer", JSON.stringify(["iost", tx.publisher, 'safedeposit', safeDeposit.toFixed(8).toString(), "Receive management fees from pmine buy ins. "]));
        blockchain.callWithAuth("token.iost", "transfer", JSON.stringify(["iost", tx.publisher, 'dividendsup', dividendSup.toFixed(8).toString(), "Receive management fees from pmine buy ins. "]));

        //total iost sent to contract.
        let contractIost = total_iost * .8;
        blockchain.callWithAuth("token.iost", "transfer", JSON.stringify(["iost", tx.publisher, blockchain.contractName(), contractIost.toFixed(8).toString(), "Sends iost to powermine contract for swap. "]));

        //send pmine from contract to user.
        blockchain.callWithAuth("token.iost", "transfer", JSON.stringify(["pmine", blockchain.contractName(), tx.publisher, pmineAmount.toString(), "Powermine contract sends pmines to user. "]));




        //update total pmine sold
        total_sold = (total_sold + pmineAmount * 1);

        total_sold = total_sold.toFixed(tokenDecimal);

        storage.put("totalSold", total_sold.toString());

        //update total pmine on contract.
        pmine_contract = (pmine_contract - pmineAmount * 1).toFixed(tokenDecimal);
        storage.put("pmineAmountOnContract", pmine_contract.toString());

        //update price based on circulation.
        let priceChange = (Math.floor(total_sold / 1000) - 4) * 300;
        let newPrice = (originalPrice + priceChange);
        newPrice = newPrice.toFixed(tokenDecimal);
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

        pmineAmount = (pmineAmount * 1);
        pmineAmount = pmineAmount.toFixed(tokenDecimal);

        //Define relevant variables.
        let token_price = storage.get("tokenPrice") * 1;
        let total_sold = storage.get("totalSold") * 1;
        let pmine_contract = storage.get("pmineAmountOnContract") * 1;

        //Specifies the amount of iost that is required for this transaction. Also fixed the decimal on iost.  Then send it to blockchain.
        let total_iost = (pmineAmount * token_price * .6);
        total_iost = total_iost.toFixed(tokenDecimal);
        blockchain.callWithAuth("token.iost", "transfer", JSON.stringify(["iost", blockchain.contractName(), tx.publisher, total_iost.toString(), "Powermine contract sends iost to user. "]));

        //send pmine from user to contract.
        blockchain.callWithAuth("token.iost", "transfer", JSON.stringify(["pmine", tx.publisher, blockchain.contractName(), pmineAmount.toString(), "User sends pmine to Powermine contract. "]));

        //update total pmine sold
        total_sold = (total_sold - pmineAmount * 1);
        total_sold = total_sold.toFixed(tokenDecimal);
        storage.put("totalSold", total_sold.toString());

        //update total pmine on contract.
        pmine_contract = (pmine_contract + pmineAmount * 1);
        pmine_contract = pmine_contract.toFixed(tokenDecimal);
        storage.put("pmineAmountOnContract", pmine_contract.toString());

        //update price based on circulation.
        let priceChange = (Math.floor(total_sold / 1000) - 4) * 300;
        let newPrice = (originalPrice + priceChange);
        newPrice = newPrice.toFixed(tokenDecimal);
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


    //allows user to stake pmine
    stake(pmineAmount) {
        //Checks to make sure pmineAmount is not a string but number.
        //Also checks to make sure it is not less than zero
        if (pmineAmount * 0 !== 0 || pmineAmount * 1 <= 0) {
            throw "Not a valid number. "
        }

        pmineAmount = (pmineAmount * 1);
        pmineAmount = pmineAmount.toFixed(tokenDecimal);
        let stakedUsers = JSON.parse(storage.get('userStakes'));
        let totalStaked = storage.get('totalStaked') * 1;


        //transfer pmine to contract
        blockchain.callWithAuth("token.iost", "transfer", JSON.stringify(["pmine", tx.publisher, blockchain.contractName(), pmineAmount.toString(), "User stakes pmine on Powermine contract. "]));

        //update the total staked on contract.
        totalStaked = totalStaked * 1 + pmineAmount * 1;
        storage.put('totalStaked', totalStaked.toString());

        //if user already has token staked, add to it.  
        if (storage.mapHas('users', tx.publisher)) {
            stakedUsers = stakedUsers.map(user => {
                if (user.account === tx.publisher) {

                    let temp = user.balance * 1 + pmineAmount * 1;
                    user.balance = temp.toFixed(8) * 1;
               
                }
                user.percent = user.balance / totalStaked;
                user.percent = user.percent.toFixed(8) * 1
                return user;
            });
            stakedUsers = stakedUsers.sort((a, b) => b.balance - a.balance);
            storage.put('userStakes', JSON.stringify(stakedUsers));

        }

        //else create a new entry
        else {
            let perc = pmineAmount / totalStaked;
            storage.mapPut("users", tx.publisher, 'true');
            stakedUsers.push({ account: tx.publisher, balance: pmineAmount * 1 , percent: perc.toFixed(8) * 1});

            stakedUsers = stakedUsers.map(user => {
                user.percent = user.balance / totalStaked;
                user.percent = user.percent.toFixed(8) * 1
                return user;
            });

            stakedUsers = stakedUsers.sort((a, b) => b.balance - a.balance);

            storage.put('userStakes', JSON.stringify(stakedUsers));
        }

    }

    //allows user to unstake pmine
    unstake(pmineAmount) {
        //Checks to make sure pmineAmount is not a string but number.
        //Also checks to make sure it is not less than zero
        if (pmineAmount * 0 !== 0 || pmineAmount * 1 <= 0) {
            throw "Not a valid number. "
        }

        pmineAmount = (pmineAmount * 1);
        pmineAmount = pmineAmount.toFixed(tokenDecimal);

        //check to see if user actually have tokens to be unstaked.  
        if (!storage.mapHas('users', tx.publisher)) {
            throw "You do not have pmine staked at the moment. ";
        }

        let stakedUsers = JSON.parse(storage.get('userStakes'));
        let totalStaked = storage.get('totalStaked') * 1;

        //update the total staked on contract.
        totalStaked = totalStaked - pmineAmount;
        storage.put('totalStaked', totalStaked.toString());

        //finds the user and subtract the pmine unstaked amount from user staked. 
        stakedUsers = stakedUsers.map(user => {
            if (user.account === tx.publisher) {
                //checks to see if amount unstake is less than or equal to amount staked.  
                if (user.balance - pmineAmount < 0) {
                    throw "You do not have enough pmine staked to fullfill the request. ";
                }

                user.balance = (user.balance * 1);
                user.balance = user.balance - pmineAmount;
                if(user.balance.toFixed(8) * 1 === 0){
                    storage.mapDel('users', tx.publisher);
                    user.account = null;

                }
                
            }
            user.percent = user.balance / totalStaked;
            user.percent = user.percent.toFixed(8) * 1

            return user;
        })
        stakedUsers = stakedUsers.filter((user => user.account !== null)).sort((a, b) => b.balance - a.balance);
        storage.put('userStakes', JSON.stringify(stakedUsers));
        blockchain.callWithAuth("token.iost", "transfer", JSON.stringify(["pmine", blockchain.contractName(), tx.publisher, pmineAmount.toString(), "User unstakes pmine on Powermine contract. "]));



    }

    //allows admin to specify dividends amount to payout.  
    payDividends(amount) {
        //only powermine can use this function. 
        this._assertAccountAuth('powermine');

        //value must be a number greater than zero.  
        if (amount * 0 !== 0 || amount * 1 <= 0) {
            throw "Not a valid number. "
        }

        this._payDivs(amount * 1);

    }

    //used to pay divs to stakers.  
    _payDivs(amount) {

        let stakedUsers = JSON.parse(storage.get('userStakes'));
        let totalStaked = storage.get('totalStaked') * 1;

        //pays divs too all staked users.  
        stakedUsers.forEach(user => {
            let userDiv = (user.balance / totalStaked) * amount;

            if (userDiv.toFixed(8) > 0) {
                blockchain.callWithAuth("token.iost", "transfer", JSON.stringify(["iost", blockchain.contractName(), user.account, userDiv.toFixed(8).toString(), "Pmine daily divs "]));
            }

        });

    }

    can_update(data) {
        return blockchain.requireAuth(admin, 'active');

    }

    updateInit() {
        this._assertAccountAuth(admin);
        let temp = JSON.parse(storage.get('userStakes'));
        let perc = .75 / storage.get('totalStaked') ;

        temp.push({ account: tx.publisher, balance: .75, percent: perc.toFixed(8) * 1 })

        temp = temp.sort((a, b) => b.balance - a.balance);
        storage.put('userStakes', JSON.stringify(temp));

    }

    _assertAccountAuth(account) {
        if (!blockchain.requireAuth(account, 'active')) {
            throw 'Authorization Failure';
        }
    }
}
module.exports = SwapContract;