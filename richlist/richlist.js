var axios = require("axios");
var RichlistModel = require('../models/richlist');

const grab_per_iost_richlist = async () => {
    let PERrichlist = await getPERrichlist();
    let IOSTrichlist = await getIOSTrichlist();

    let perRichListins = await RichlistModel.findOneAndUpdate(
        {name: "per"},
        {name: "per", richList: JSON.stringify(PERrichlist)},
        {upsert: true, new: true, runValidators: true});

    console.log('perRichListins', perRichListins)

    let iostRichListins = await RichlistModel.findOneAndUpdate(
        {name: "iost"},
        {name: "iost", richList: JSON.stringify(IOSTrichlist)},
        {upsert: true, new: true, runValidators: true});

    console.log('iostRichListins', iostRichListins)
    return true;
}

const getPERrichlist = async () => {
    let PERrichlistUsers = await getPERrichlistUsers();
    PERrichlistUsers = JSON.parse(PERrichlistUsers);
    let totalShares = await getPERTotalShares();

    let richList = [];
    for (var i = 0; i < PERrichlistUsers.length; i++) {
        let userStaked = await getPERUserStaked(PERrichlistUsers[i]);
        richList.push({
            "account": PERrichlistUsers[i],
            "balance": (userStaked * 1).toFixed(8),
            "percent": ((userStaked * 100) / (totalShares * 1)).toFixed(2)
        })
    }

    richList.sort(function (a, b) {
        return b.balance - a.balance;
    });

    return richList.slice(0, 20);
};

const getPERrichlistUsers = () => {
    return new Promise((resolve, reject) => {
        let postData = {
            id: "Contract6HVXnk7oBMYHizdgYHjQZZu74mj2XEMbZzVQ6Eijiu5f",
            key: "usersKey",
            by_longest_chain: true
        }

        axios.post("https://api.iost.io/getContractStorage", postData, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }, credentials: 'omit'
        }).then(res => {
            let userStakes = res.data.data;

            resolve(userStakes);

        }).catch(err => {
            return;
        })

    })
}

const getPERUserStaked = (user) => {
    return new Promise((resolve, reject) => {
        let postData = {
            id: "Contract6HVXnk7oBMYHizdgYHjQZZu74mj2XEMbZzVQ6Eijiu5f",
            key: "users",
            field: user,
            by_longest_chain: true
        }

        axios.post("https://api.iost.io/getContractStorage", postData, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }, credentials: 'omit'
        }).then(res => {
            let userStaked = res.data.data;
            userStaked = JSON.parse(userStaked);
            resolve(userStaked.total);

        }).catch(err => {
            return;
        })

    })
}

const getIOSTrichlist = async () => {
    let IOSTrichlistUsers = await getIOSTrichlistUsers();
    IOSTrichlistUsers = JSON.parse(IOSTrichlistUsers);
    let totalShares = await getIOSTTotalShares();

    let richList = [];
    for (var i = 0; i < IOSTrichlistUsers.length; i++) {
        let userStaked = await getIOSTUserStaked(IOSTrichlistUsers[i]);
        richList.push({
            "account": IOSTrichlistUsers[i],
            "balance": (userStaked * 1).toFixed(8),
            "percent": ((userStaked * 100) / (totalShares * 1)).toFixed(2)
        })
    }

    richList.sort(function (a, b) {
        return b.balance - a.balance;
    });

    return richList.slice(0, 20);
};

const getIOSTrichlistUsers = () => {
    return new Promise((resolve, reject) => {
        let postData = {
            id: "Contract2vbvZ3mXscXUFrX1zcxGMYxyPEsknMUixzv5E1qte2hn",
            key: "usersKey",
            by_longest_chain: true
        }

        axios.post("https://api.iost.io/getContractStorage", postData, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }, credentials: 'omit'
        }).then(res => {
            let userStakes = res.data.data;

            resolve(userStakes);

        }).catch(err => {
            return;
        })

    })
}

const getIOSTUserStaked = (user) => {
    return new Promise((resolve, reject) => {
        let postData = {
            id: "Contract2vbvZ3mXscXUFrX1zcxGMYxyPEsknMUixzv5E1qte2hn",
            key: "users",
            field: user,
            by_longest_chain: true
        }

        axios.post("https://api.iost.io/getContractStorage", postData, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }, credentials: 'omit'
        }).then(res => {
            let userStaked = res.data.data;
            userStaked = JSON.parse(userStaked);
            resolve(userStaked.total);
        }).catch(err => {
            return;
        })

    })
}


const getPERTotalShares = () => {
    return new Promise((resolve, reject) => {
        let postData = {
            id: "Contract6HVXnk7oBMYHizdgYHjQZZu74mj2XEMbZzVQ6Eijiu5f",
            key: "totalShares",
            by_longest_chain: true
        }

        axios.post("https://api.iost.io/getContractStorage", postData, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }, credentials: 'omit'
        }).then(res => {
            let totalStaked = res.data.data;

            resolve(totalStaked)

        }).catch(err => {
            return;
        })
    })
}

const getIOSTTotalShares = () => {
    return new Promise((resolve, reject) => {
        let postData = {
            id: "Contract2vbvZ3mXscXUFrX1zcxGMYxyPEsknMUixzv5E1qte2hn",
            key: "totalShares",
            by_longest_chain: true
        }

        axios.post("https://api.iost.io/getContractStorage", postData, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }, credentials: 'omit'
        }).then(res => {
            let totalShares = res.data.data;

            resolve(totalShares);

        }).catch(err => {
            return;
        })
    })
}

function strip_name(holder) {
    var name = "";
    name = holder;
    name = name.slice(0, 6) + "***";
    return name;
}

exports.grab_per_iost_richlist = grab_per_iost_richlist;