

window.onload = () => {
    hideAdminHeader()
}

function hideAdminHeader() {
    if(!window.IWalletJS) {
        $("#menu-item-139").hide();
        $("#menu-item-1399").hide();
    } else {
        window.IWalletJS.enable().then(function (val) {
            console.log(val)
            if(val !== 'powermine' && val !== 'pmine_admin') {
                $("#menu-item-139").hide();
                $("#menu-item-1399").hide();
            }
            else if(val === 'powermine' || val === 'pmine_admin') {
                $("#menu-item-139").show();
                $("#menu-item-1399").show();
            }
        }).catch(error => {
            $("#menu-item-139").hide();
            $("#menu-item-1399").hide();
        });
    }
}


//Take in two args account and token. 
//Returns a float that represents the user's balance
getUserBalance = async (account, token) => {
        return await fetch('https://api.iost.io/getTokenBalance/' + account + '/' + token +'/true').then(res => res.json()).then(json => {
            console.log(json)
            return parseFloat(json.balance).toFixed(4);
        }).catch(err => {
            return 0;
        })
}

//Returns a float that represents the total staked PMINE on VDC1
get_vdc1_total_pmine = async () => {
    let postData = {
        id: "Contract9vnm1fv8TZ99Jxpw2hUPkekmdbQTUVRLTxiv6d8jPWdi",
        key: "totalPmine",
        by_longest_chain: true
    };


    return await fetch('https://api.iost.io/getContractStorage', {
        method: 'POST', 
        body: JSON.stringify(postData) 
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        return JSON.parse(data.data)
    }).catch(err => 0);
}

//Returns a JSON object that represents the user's data on VDC1
//Example:  {balance: 234, iostUnclaimed: 40, pmineUnclaimed: 50, perUnclaimed: 23}
//The balance represents the amount that the user has deposited on vdc. 
get_vdc1_user_data = async (account) => {
    let postData = {
        id: "Contract9vnm1fv8TZ99Jxpw2hUPkekmdbQTUVRLTxiv6d8jPWdi",
        key: "users",
        field: account,
        by_longest_chain: true
    };


    return await fetch('https://api.iost.io/getContractStorage', {
        method: 'POST', 
        body: JSON.stringify(postData) 
    }).then(function (response) {
        return response.json();
        }).then(function (data) {

        return JSON.parse(data.data)
        }).catch(err => { return { balance: 0, pmineUnclaimed: 0, iostUnclaimed: 0, perUnclaimed: 0} });
}



//Returns a float that represents the total staked PMINE on VDC2
get_vdc1_total_pmine = async () => {
    let postData = {
        id: "Contract9vnm1fv8TZ99Jxpw2hUPkekmdbQTUVRLTxiv6d8jPWdi",
        key: "totalPmine",
        by_longest_chain: true
    };


    return await fetch('https://api.iost.io/getContractStorage', {
        method: 'POST',
        body: JSON.stringify(postData)
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        return JSON.parse(data.data)
    }).catch(err => 0);
}

//Returns a JSON object that represents the user's data on VDC1
//Example:  {balance: 234, pmineUnclaimed: 50}
//The balance represents the amount that the user has deposited on vdc. 
get_vdc2_user_data = async (account) => {
    let postData = {
        id: "Contract7FkjXHJ6574QecAxz1wvZmvASxaiWxqohkR6jnJRBjwn",
        key: "users",
        field: account,
        by_longest_chain: true
    };


    return await fetch('https://api.iost.io/getContractStorage', {
        method: 'POST', 
        body: JSON.stringify(postData) 
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        return JSON.parse(data.data)
        }).catch(err => { return { balance: 0, pmineUnclaimed: 0 } });
}


