//specify the token decimal
const tokenDecimal = 8;

//specify total supply of igoose
const totalSupply = 1000;

//specify orginal price.  
const originalPrice = 42600;

//specifies admin of the contract.  
const admin = "pmine_admin";

class IGooseContract {
    init() {
        storage.put("tokenPrice", originalPrice.toString());
        storage.put("totalSold", "0");
        storage.put("igooseAmountOnContract", "0");
        storage.put("iostOnContract", "0");
        storage.put("userStakes", JSON.stringify([]));
        storage.put("totalStaked", "0");
    }

    //Only admin can use this function.  Admin must first deposit igoose to the contract from account admin
    depositInitialIGoose(igooseAmount) {
        this._assertAccountAuth("pmine_admin");

        if (igooseAmount * 0 !== 0 || igooseAmount * 1 <= 0) {
            throw "Not a valid number. "
        }
        if (storage.get("totalSold") > 0){
            throw "Admin has already deposited initial igoose tokens. "
        }

        igooseAmount = (igooseAmount * 1);
        igooseAmount = igooseAmount.toFixed(tokenDecimal);

        blockchain.callWithAuth("token.iost", "transfer", JSON.stringify(["igoose", tx.publisher, blockchain.contractName(), igooseAmount.toString(), "Admin intial deposit of unbought igooses. "]));

        let igoose_contract = storage.get("igooseAmountOnContract") * 1;
        igoose_contract = (igoose_contract + igooseAmount * 1);
        igoose_contract = igoose_contract.toFixed(tokenDecimal);

        //update block storage for total sold and igoose on contract.
        storage.put("igooseAmountOnContract", igoose_contract.toString());

        //updates total sold.    
        let total_sold = totalSupply - igooseAmount * 1
        storage.put("totalSold", total_sold.toString());

        //Updates the current price based on circulation.
        let newPrice = Math.floor(total_sold / 100) * 200 + originalPrice * 1
        storage.put("tokenPrice", newPrice.toString());


    }

    //Admin can deposit IOST to the contract.
    depositIOST(iostAmount) {
        //checks to make sure that admin is the active account calling this function.
        this._assertAccountAuth("powermine");

        //Checks to make sure igooseAmount is not a string but number.
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
        //checks to make sure that admin is the active account calling this function.
        this._assertAccountAuth("powermine");

        //Checks to make sure igooseAmount is not a string but number.
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


    //User trigger this function to buy igoose.
    buyToken(igooseAmount) {

        //Checks to make sure igooseAmount is not a string but number.
        //Also checks to make sure it is not less than zero
        if (igooseAmount * 0 !== 0 || igooseAmount * 1 <= 0) {
            throw "Not a valid number. "
        }

        igooseAmount = (igooseAmount * 1);

        igooseAmount = igooseAmount.toFixed(tokenDecimal);

        //Define relevant variables.
        let token_price = storage.get("tokenPrice") * 1;
        let total_sold = storage.get("totalSold") * 1;
        let igoose_contract = storage.get("igooseAmountOnContract") * 1;

        //Specifies the amount of iost that is required for this transaction. Also fixed the decimal on iost.  Then send it to blockchain.
        let total_iost = (igooseAmount * token_price);

  
        //Auto process dividends.
        let dividends = total_iost * .07; 
        let stakedUsers = JSON.parse(storage.get('userStakes'));
        let totalStaked = storage.get('totalStaked') * 1;

        //pays divs too all staked users.  
        stakedUsers.forEach(user => {
            let userDiv = (user.balance / totalStaked) * dividends;

            if (userDiv.toFixed(8) > 0) {
                blockchain.callWithAuth("token.iost", "transfer", JSON.stringify(["iost", tx.publisher, user.account,  userDiv.toFixed(8).toString(), "7% igoose divs"]));
            }

        });
        
        //management fees. 
        let safeDeposit = total_iost * .07 / 3;
        let dividendSup = total_iost * .07 / 3;
        let miktrone1 = total_iost * .07 / 3;
        let pmineHolders = total_iost * .07;
        blockchain.callWithAuth("token.iost", "transfer", JSON.stringify(["iost", tx.publisher, 'safedeposit', safeDeposit.toFixed(8).toString(), "Receive management fees from igoose buy ins. "]));
        blockchain.callWithAuth("token.iost", "transfer", JSON.stringify(["iost", tx.publisher, 'dividendsup', dividendSup.toFixed(8).toString(), "Receive management fees from igoose buy ins. "]));
        blockchain.callWithAuth("token.iost", "transfer", JSON.stringify(["iost", tx.publisher, 'miktrone1', miktrone1.toFixed(8).toString(), "Receive management fees from igoose buy ins. "]));
        blockchain.callWithAuth("token.iost", "transfer", JSON.stringify(["iost", tx.publisher, 'powermine', pmineHolders.toFixed(8).toString(), "Sends 7% divs for PMINE holders to Powermine acc. "]));
       
        //total iost sent to contract.
        let contractIost = total_iost * .79;
        blockchain.callWithAuth("token.iost", "transfer", JSON.stringify(["iost", tx.publisher, blockchain.contractName(), contractIost.toFixed(8).toString(), "Sends iost to igoose contract for swap. "]));

        //send igoose from contract to user.
        blockchain.callWithAuth("token.iost", "transfer", JSON.stringify(["igoose", blockchain.contractName(), tx.publisher, igooseAmount.toString(), "igoose contract sends igooses to user. "]));

        //update total igoose sold
        total_sold = (total_sold + igooseAmount * 1);
        total_sold = total_sold.toFixed(tokenDecimal);
        storage.put("totalSold", total_sold.toString());

        //update total igoose on contract.
        igoose_contract = (igoose_contract - igooseAmount * 1).toFixed(tokenDecimal);
        storage.put("igooseAmountOnContract", igoose_contract.toString());

        //update price based on circulation.
        let newPrice = Math.floor(total_sold / 100) * 200 + originalPrice * 1;
        storage.put("tokenPrice", newPrice.toString());

        //generate tx receipt
        blockchain.receipt(JSON.stringify({
            "name": tx.publisher,
            "token": "igoose",
            "amount": igooseAmount,
            "action": "User bought igoose. "
        }));

        return true;

    }



    //allows user to stake igoose
    stake(igooseAmount) {
        //Checks to make sure igooseAmount is not a string but number.
        //Also checks to make sure it is not less than zero
        if (igooseAmount * 0 !== 0 || igooseAmount * 1 <= 0) {
            throw "Not a valid number. "
        }

        igooseAmount = (igooseAmount * 1);
        igooseAmount = igooseAmount.toFixed(tokenDecimal) * 1;
        let stakedUsers = JSON.parse(storage.get('userStakes'));
        let totalStaked = storage.get('totalStaked') * 1;


        //transfer igoose to contract
        blockchain.callWithAuth("token.iost", "transfer", JSON.stringify(["igoose", tx.publisher, blockchain.contractName(), igooseAmount.toString(), "User stakes igoose on igoose contract. "]));

        //update the total staked on contract.
        totalStaked = totalStaked * 1 + igooseAmount * 1;
        storage.put('totalStaked', totalStaked.toString());

        //if user already has token staked, add to it.  
        if (storage.mapHas('users', tx.publisher)) {
            stakedUsers = stakedUsers.map(user => {
                if (user.account === tx.publisher) {

                    let temp = user.balance * 1 + igooseAmount * 1;
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
            let perc = igooseAmount / totalStaked;
            storage.mapPut("users", tx.publisher, 'true');
            stakedUsers.push({ account: tx.publisher, balance: igooseAmount * 1 , percent: perc.toFixed(8) * 1});

            stakedUsers = stakedUsers.map(user => {
                user.percent = user.balance / totalStaked;
                user.percent = user.percent.toFixed(8) * 1
                return user;
            });

            stakedUsers = stakedUsers.sort((a, b) => b.balance - a.balance);

            storage.put('userStakes', JSON.stringify(stakedUsers));
        }

    }

    //allows user to unstake igoose
    unstake(igooseAmount) {
        //Checks to make sure igooseAmount is not a string but number.
        //Also checks to make sure it is not less than zero
        if (igooseAmount * 0 !== 0 || igooseAmount * 1 <= 0) {
            throw "Not a valid number. "
        }

        igooseAmount = (igooseAmount * 1);
        igooseAmount = igooseAmount.toFixed(tokenDecimal);

        //check to see if user actually have tokens to be unstaked.  
        if (!storage.mapHas('users', tx.publisher)) {
            throw "You do not have igoose staked at the moment. ";
        }

        let stakedUsers = JSON.parse(storage.get('userStakes'));
        let totalStaked = storage.get('totalStaked') * 1;

        //update the total staked on contract.
        totalStaked = totalStaked - igooseAmount;
        storage.put('totalStaked', totalStaked.toString());

        //finds the user and subtract the igoose unstaked amount from user staked. 
        stakedUsers = stakedUsers.map(user => {
            if (user.account === tx.publisher) {
                //checks to see if amount unstake is less than or equal to amount staked.  
                if (user.balance * 1 - igooseAmount * 1 < 0) {
                    throw "You do not have enough igoose staked to fullfill the request. ";
                }

                user.balance = (user.balance * 1);
                user.balance = user.balance - igooseAmount;
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
        blockchain.callWithAuth("token.iost", "transfer", JSON.stringify(["igoose", blockchain.contractName(), tx.publisher, igooseAmount.toString(), "User unstakes igoose on igoose contract. "]));



    }

    //allows admin to specify dividends amount to payout.  
    payDividends(amount) {
        //only admin can use this function. 
        this._assertAccountAuth("powermine");

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
                blockchain.callWithAuth("token.iost", "transfer", JSON.stringify(["iost", blockchain.contractName(), user.account, userDiv.toFixed(8).toString(), "igoose daily divs "]));
            }

        });

    }

    can_update(data) {
        return blockchain.requireAuth('pmine_admin', 'active');

    }

    //write codes in this function if you want to update block storage. 
    updateInit() {
        this._assertAccountAuth('pmine_admin');
        

    }

    _assertAccountAuth(account) {
        if (!blockchain.requireAuth(account, 'active')) {
            throw 'Authorization Failure';
        }
    }
}
module.exports = IGooseContract;