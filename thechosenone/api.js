exports.grab_previous_king_knights_list = () => {
    return new Promise((resolve, reject) => {
        require('request').post('http://api.iost.io/getContractStorage', {
            body: JSON.stringify({
                id: "ContractABxHhYQnWrjJjiRVH5gqwtsKuveGqQTAwp88DWd4hfca",
                key: "previousRound",
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

exports.grab_king_of_renown = () => {
    return new Promise((resolve, reject) => {
        require('request').post('http://api.iost.io/getContractStorage', {
            body: JSON.stringify({
                id: "ContractABxHhYQnWrjJjiRVH5gqwtsKuveGqQTAwp88DWd4hfca",
                key: "longestKing",
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

exports.grab_king_of_week = () => {
    return new Promise((resolve, reject) => {
        require('request').post('http://api.iost.io/getContractStorage', {
            body: JSON.stringify({
                id: "ContractABxHhYQnWrjJjiRVH5gqwtsKuveGqQTAwp88DWd4hfca",
                key: "kingOfWeek",
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

exports.grab_setting_king = () => {
    return new Promise((resolve, reject) => {
        require('request').post('http://api.iost.io/getContractStorage', {
            body: JSON.stringify({
                id: "ContractABxHhYQnWrjJjiRVH5gqwtsKuveGqQTAwp88DWd4hfca",
                key: "king",
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