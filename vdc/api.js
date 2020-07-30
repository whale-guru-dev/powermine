var RichlistModel = require('../models/richlist');

const grab_users_compound = () => {
    return new Promise((resolve, reject) => {
        require('request').post('http://api.iost.io/getContractStorage',{body: JSON.stringify({id:"Contract9vnm1fv8TZ99Jxpw2hUPkekmdbQTUVRLTxiv6d8jPWdi",key:"usersKey",by_longest_chain:true})}, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                return resolve(JSON.parse(response.body).data)
            } else {
                return reject('Failed')
            }
        })
    })
}

const grab_users_volatile = () => {
    return new Promise((resolve, reject) => {
        require('request').post('http://api.iost.io/getContractStorage',{body: JSON.stringify({id:"Contract7FkjXHJ6574QecAxz1wvZmvASxaiWxqohkR6jnJRBjwn",key:"usersKey",by_longest_chain:true})}, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                return resolve(JSON.parse(response.body).data)
            } else {
                return reject('Failed')
            }
        })
    })
}

const get_user_deposit_data = async (contract, account) => {
    let postData = {
        id: contract,
        key: "users",
        field: account,
        by_longest_chain: true
    };

    return new Promise((resolve, reject) => {
        require('request').post('http://api.iost.io/getContractStorage',{body: JSON.stringify(postData)}, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                return resolve(JSON.parse(response.body).data)
            } else {
                return reject({balance: 0, pmineUnclaimed: 0, iostUnclaimed: 0, perUnclaimed: 0})
            }
        })
    })
}

const get_total_pmine = async (contract) => {
    return new Promise((resolve, reject) => {
        require('request').post('http://api.iost.io/getContractStorage',{body: JSON.stringify({id:contract,key:"totalPmine",by_longest_chain:true})}, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                return resolve(JSON.parse(response.body).data * 1.0)
            } else {
                return reject(0)
            }
        })
    })
}

const getCompoundRichlist = async () => {
    let richlistUsers = await grab_users_compound();
    richlistUsers = JSON.parse(richlistUsers);
    let totalPmine = await get_total_pmine("Contract9vnm1fv8TZ99Jxpw2hUPkekmdbQTUVRLTxiv6d8jPWdi");

    let richList = [];
    for (var i = 0; i < richlistUsers.length; i++) {
        let userBalance = await get_user_deposit_data("Contract9vnm1fv8TZ99Jxpw2hUPkekmdbQTUVRLTxiv6d8jPWdi",richlistUsers[i]);
        richList.push({
            "account": richlistUsers[i],
            "balance": (JSON.parse(userBalance).balance * 1).toFixed(8),
            "percent": ((JSON.parse(userBalance).balance * 100) / (totalPmine * 1)).toFixed(2)
        })
    }

    richList.sort(function (a, b) {
        return b.balance - a.balance;
    });

    return richList.slice(0, 10);
};

const getVolatileRichlist = async () => {
    let richlistUsers = await grab_users_volatile();
    richlistUsers = JSON.parse(richlistUsers);
    let totalPmine = await get_total_pmine("Contract7FkjXHJ6574QecAxz1wvZmvASxaiWxqohkR6jnJRBjwn");

    let richList = [];
    for (var i = 0; i < richlistUsers.length; i++) {
        let userBalance = await get_user_deposit_data("Contract7FkjXHJ6574QecAxz1wvZmvASxaiWxqohkR6jnJRBjwn",richlistUsers[i]);
        richList.push({
            "account": richlistUsers[i],
            "balance": (JSON.parse(userBalance).balance * 1).toFixed(8),
            "percent": ((JSON.parse(userBalance).balance * 100) / (totalPmine * 1)).toFixed(2)
        })
    }

    richList.sort(function (a, b) {
        return b.balance - a.balance;
    });

    return richList.slice(0, 10);
};

exports.grab_vdc_richlist = async () => {
    let compound_richlist = await getCompoundRichlist();
    let volatile_richlist = await getVolatileRichlist();

    let compoundRichListins = await RichlistModel.findOneAndUpdate(
        {name: "compound"},
        {name: "compound", richList: JSON.stringify(compound_richlist)},
        {upsert: true, new: true, runValidators: true});


    let volatileRichListins = await RichlistModel.findOneAndUpdate(
        {name: "volatile"},
        {name: "volatile", richList: JSON.stringify(volatile_richlist)},
        {upsert: true, new: true, runValidators: true});

    return true;
}

function strip_name(holder) {
    var name = "";
    name = holder;
    name = name.slice(0, 6) + "***";
    return name;
}