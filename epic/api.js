exports.grab_epic_balance = () => {
    return new Promise((resolve, reject) => {
        require('request').post('http://api.iost.io/getContractStorage', {
            body: JSON.stringify({
                id: "Contract5dq6CrmcrW1nrkdusxKC7JS6PUDAWsMGxJWayapriHa6",
                key: "epicAmountOnContract",
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
                id: "Contract5dq6CrmcrW1nrkdusxKC7JS6PUDAWsMGxJWayapriHa6",
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

exports.grab_epic_accounts = () => {
    return new Promise((resolve, reject) => {
        require('request').post('http://api.iost.io/getContractStorage', {
            body: JSON.stringify({
                id: "Contract5dq6CrmcrW1nrkdusxKC7JS6PUDAWsMGxJWayapriHa6",
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


function strip_name(holder) {
    var name = "";
    name = holder;
    name = name.slice(0, 6) + "***";
    return name;
}

exports.getepicPrice = () => {
    return new Promise((resolve, reject) => {
        require('request').post('http://api.iost.io/getContractStorage', {
            body: JSON.stringify({
                id: "Contract5dq6CrmcrW1nrkdusxKC7JS6PUDAWsMGxJWayapriHa6",
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
            require('request').get('http://api.iost.io/getTokenBalance/Contract5dq6CrmcrW1nrkdusxKC7JS6PUDAWsMGxJWayapriHa6/iost/true', function (error, response, body) {
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

