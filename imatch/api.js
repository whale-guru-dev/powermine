/*
exports.grab_pmine_balance = () => {
    return new Promise((resolve, reject) => {
        try {
            require('request').get('http://api.iost.io/getTokenBalance/ContractC3DW2h2qVyuFdzo3aKhN8Lhc8Jcp8wetYNvayKyhCjQq/pmine/true', function (error, response, body) {
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
*/

exports.grab_iMatch_balance = () => {
    return new Promise((resolve, reject) => {
        require('request').post('http://api.iost.io/getContractStorage', {
            body: JSON.stringify({
                id: "Contract6EXwvev8u8gqiLPqkfr7XXCpiA6VhVxiAqTZcWjuEwV2",
                key: "imatchAmountOnContract",
                by_longest_chain: true
            })
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {

                return resolve(body)
            } else {
                return reject('Failed')
            }
        })
    })
}

exports.grab_total_staked = () => {
    return new Promise((resolve, reject) => {
        require('request').post('http://api.iost.io/getContractStorage', {
            body: JSON.stringify({
                id: "Contract6EXwvev8u8gqiLPqkfr7XXCpiA6VhVxiAqTZcWjuEwV2",
                key: "totalStaked",
                by_longest_chain: true
            })
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {

                return resolve(body)
            } else {
                return reject('Failed')
            }
        })
    })
}

exports.grab_iMatch_accounts = () => {
    return new Promise((resolve, reject) => {
        require('request').post('http://api.iost.io/getContractStorage', {
            body: JSON.stringify({
                id: "Contract6EXwvev8u8gqiLPqkfr7XXCpiA6VhVxiAqTZcWjuEwV2",
                key: "userStakes",
                by_longest_chain: true
            })
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {

                return resolve(body);
            } else {
                return reject('Failed')
            }
        })
    })
}

/*
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

                        if (objx.holders[j].account != "ContractC3DW2h2qVyuFdzo3aKhN8Lhc8Jcp8wetYNvayKyhCjQq") {
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
*/

function strip_name(holder) {
    var name = "";
    name = holder;
    name = name.slice(0, 6) + "***";
    return name;
}

exports.getiMatchPrice = () => {
    return new Promise((resolve, reject) => {
        require('request').post('http://api.iost.io/getContractStorage', {
            body: JSON.stringify({
                id: "Contract6EXwvev8u8gqiLPqkfr7XXCpiA6VhVxiAqTZcWjuEwV2",
                key: "tokenPrice",
                by_longest_chain: true
            })
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                return resolve(body)
            } else {
                return reject('Failed')
            }
        })
    })
}

exports.getIOSTInContract = () => {
    return new Promise((resolve, reject) => {
        try {
            require('request').get('http://api.iost.io/getTokenBalance/Contract6EXwvev8u8gqiLPqkfr7XXCpiA6VhVxiAqTZcWjuEwV2/iost/true', function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    const objx = JSON.parse(body)
                    return resolve(parseFloat(objx.balance).toFixed(8))
                } else {
                    return reject(error)
                }
            })
        } catch (e) {
            return reject(e)
        }
    })
}

exports.getCMCPrices = () => {
    return new Promise((resolve, reject) => {
        try {
            require('request').get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=100&convert=USD,EUR,CNY,GBP', {headers: {'X-CMC_PRO_API_KEY': '4c5ba714-ac80-4654-80f1-2b10eaacf6b0'}}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    const objx = JSON.parse(body).data
                    const coin_pair = ['BTC', "ETH", "TRX", "IOST"];
                    let responseData = [];
                    objx.forEach(coin => {
                        if (coin_pair.includes(coin.symbol)) {
                            responseData.push(coin);
                        }
                    });
                    return resolve(responseData)
                } else {
                    return reject(error)
                }
            })
        } catch (e) {
            return reject(e)
        }
    })
}
