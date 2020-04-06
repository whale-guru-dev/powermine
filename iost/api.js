exports.grab_pmine_balance = () => {
    return new Promise((resolve, reject) => {
        try {
            require('request').get('http://api.iost.io/getTokenBalance/powermine/pmine/true', function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    const objx = JSON.parse(body)
                    return resolve(parseFloat(objx.balance).toFixed(4))
                } else {
                    return reject(error)
                }
            })
        } catch (e) {
            return reject(e)
        }
    })
}


exports.grab_pmine_accounts = () => {
    return new Promise((resolve, reject) => {
        require('request').get('http://www.iostabc.com/api/token/pmine/holders?page=1&size=100', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                const objx = JSON.parse(body);
                var pmine_balance = 0;

                //check balance of powermine
                for (var check_pmine_acc = 0; check_pmine_acc < 15; check_pmine_acc++) {
                    if (objx.holders[check_pmine_acc].account == "powermine") {
                        pmine_balance = parseFloat(objx.holders[check_pmine_acc].balance).toFixed(3)
                    }
                }

                //end checking balance of powermine
                var result = []

                for (var j = 0; j < 21; j++) {
                    try {

                        if (objx.holders[j].account != "powermine") {
                            result.push({
                                rank: j,
                                account: strip_name(objx.holders[j].account),
                                balance: objx.holders[j].balance,
                                percent: parseFloat(parseFloat(parseFloat(objx.holders[j].balance) / (20000 - pmine_balance)) * 100).toFixed(2)
                            })
                        }

                    } catch (e) {
                        console.log(e);
                        return reject(e)
                    }
                }

                return resolve(result)
            } else {
                return reject('Failed')
            }
        })
    })
}

function strip_name(holder) {
    var name = "";
    name = holder;
    name = name.slice(0, 6) + "***";
    return name;
}

exports.getPminePrice = () => {
    return new Promise((resolve, reject) => {
        require('request').post('http://api.iost.io/getContractStorage',{body: JSON.stringify({id:"Contract8XUzqFFx9jonpNaTs4bmcUWXZ7qxK2cKtXSfF4nC8iZe",key:"tokenPrice",by_longest_chain:true})}, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                return resolve(body)
            } else {
                return reject('Failed')
            }
        })
    })
}
