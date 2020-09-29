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