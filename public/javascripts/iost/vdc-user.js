window.onload = () => {
    hideAdminHeader()
    updateVDC1TotalPmine()
    updateVDC2TotalPmine()
    updateVDC1UserData()
    updateVDC2UserData()
}

function hideAdminHeader() {
    if (!window.IWalletJS) {
        $("#menu-item-139").hide();
        $("#menu-item-1399").hide();
    } else {
        window.IWalletJS.enable().then(function (val) {
            console.log(val)
            if (val !== 'powermine' && val !== 'pmine_admin') {
                $("#menu-item-139").hide();
                $("#menu-item-1399").hide();
            } else if (val === 'powermine' || val === 'pmine_admin') {
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
const getUserBalance = async (account, token) => {
    return await fetch('https://api.iost.io/getTokenBalance/' + account + '/' + token + '/true').then(res => res.json()).then(json => {
        console.log(json)
        return parseFloat(json.balance).toFixed(4);
    }).catch(err => {
        return 0;
    })
}


const updateAccountBalance = () => {
    updateAccountBalance_interanl = async () => {
        // const  = getUserBalance("Contract9vnm1fv8TZ99Jxpw2hUPkekmdbQTUVRLTxiv6d8jPWdi", "pmine")
    }
}

//Returns a float that represents the total staked PMINE on VDC1
const get_vdc1_total_pmine = async () => {
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
        $("#totalPmineVDC1").html(data.data)
        return JSON.parse(data.data)
    }).catch(err => 0);
}

const updateVDC1TotalPmine = () => {
    updateVDC1TotalPmine_internal = async () => {
        await get_vdc1_total_pmine();
    }

    updateVDC1TotalPmine_internal()
    setInterval(updateVDC1TotalPmine_internal, 10 * 60 * 1000)
}

//Returns a JSON object that represents the user's data on VDC1
//Example:  {balance: 234, iostUnclaimed: 40, pmineUnclaimed: 50, perUnclaimed: 23}
//The balance represents the amount that the user has deposited on vdc. 
const get_vdc1_user_data = async (account) => {
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
    }).catch(err => {
        return {balance: 0, pmineUnclaimed: 0, iostUnclaimed: 0, perUnclaimed: 0}
    });
}

const updateVDC1UserData = () => {
    updateVDC1UserData_internal = async () => {
        await get_vdc1_user_data();
    }

    updateVDC1UserData_internal();
    setInterval(updateVDC1UserData_internal, 10 * 60 * 1000);
}

//Returns a float that represents the total staked PMINE on VDC2
const get_vdc2_total_pmine = async () => {
    let postData = {
        id: "Contract7FkjXHJ6574QecAxz1wvZmvASxaiWxqohkR6jnJRBjwn",
        key: "totalPmine",
        by_longest_chain: true
    };


    return await fetch('https://api.iost.io/getContractStorage', {
        method: 'POST',
        body: JSON.stringify(postData)
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        $("#totalPmineVDC2").html(data.data)
        return JSON.parse(data.data)
    }).catch(err => 0);
}

const updateVDC2TotalPmine = () => {
    updateVDC2TotalPmine_internal = async () => {
        await get_vdc2_total_pmine();
    }

    updateVDC2TotalPmine_internal()
    setInterval(updateVDC2TotalPmine_internal, 10 * 60 * 1000)
}

//Returns a JSON object that represents the user's data on VDC1
//Example:  {balance: 234, pmineUnclaimed: 50}
//The balance represents the amount that the user has deposited on vdc. 
const get_vdc2_user_data = async (account) => {
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
    }).catch(err => {
        return {balance: 0, pmineUnclaimed: 0}
    });
}

const updateVDC2UserData = () => {
    updateVDC2UserData_internal = async () => {
        await get_vdc2_user_data();
    }

    updateVDC2UserData_internal();
    setInterval(updateVDC2UserData_internal, 10 * 60 * 1000);
}

$(document).on("click", "#vdc1-deposit-btn", function () {
    if (!window.IWalletJS) {
        $("#statusVDC1Msg").html('<div class="alert alert-warning">You need to install <a style="color: #fcc56e;" href="https://chrome.google.com/webstore/detail/iwallet/kncchdigobghenbbaddojjnnaogfppfj">iWallet Chrome Extension</a>.</div>');
        return;
    }

    window.IWalletJS.enable().then(function (val) {
        $("#statusVDC1Msg").html('');
        iost = window.IWalletJS.newIOST(IOST);

        let account = new IOST.Account(val);
        iost.setAccount(account);
        const defaultConfig = {
            gasRatio: 1,
            gasLimit: 2000000,
            delay: 0,
            expiration: 60,
            defaultLimit: "unlimited"
        };

        iost.config = defaultConfig;

        var amount = $("#vdc1-deposit-amount").val();

        if (amount) {
            $("#statusVDC1Msg").html('');
            const tx = iost.callABI("Contract9vnm1fv8TZ99Jxpw2hUPkekmdbQTUVRLTxiv6d8jPWdi", "depositPmine", [amount.toString()]);
            tx.addApprove("pmine", "1000000");

            iost.signAndSend(tx).on('pending', function (txid) {
                console.log("======>pending", txid);
                $(".page-loader").show();
                $(".loader-inner").show();
            }).on('success', function (result) {
                console.log('======>buy success', result);
                $(".page-loader").hide();
                $("#statusVDC1Msg").html('<div class="alert alert-success">Successfully deposited. Please check your wallet</div>');
            }).on('failed', function (result) {
                console.log('======>failed', result);
                $(".page-loader").hide();
                $("#statusVDC1Msg").html('<div class="alert alert-warning">' + result.message + '</div>');
            });
        } else {
            $("#statusVDC1Msg").html('<div class="alert alert-warning">Please input deposit amount.</div>');
        }


    }).catch(error => {
        if (error.type == "locked")
            $("#statusVDC1Msg").html('<div class="alert alert-warning">Unlock your iWallet Extension.</div>');
    });

});

$(document).on("click", "#vdc2-deposit-btn", function () {
    if (!window.IWalletJS) {
        $("#statusVDC2Msg").html('<div class="alert alert-warning">You need to install <a style="color: #fcc56e;" href="https://chrome.google.com/webstore/detail/iwallet/kncchdigobghenbbaddojjnnaogfppfj">iWallet Chrome Extension</a>.</div>');
        return;
    }

    window.IWalletJS.enable().then(function (val) {
        $("#statusVDC2Msg").html('');
        iost = window.IWalletJS.newIOST(IOST);

        let account = new IOST.Account(val);
        iost.setAccount(account);
        const defaultConfig = {
            gasRatio: 1,
            gasLimit: 2000000,
            delay: 0,
            expiration: 60,
            defaultLimit: "unlimited"
        };

        iost.config = defaultConfig;

        var amount = $("#vdc2-deposit-amount").val();

        if (amount) {
            $("#statusVDC2Msg").html('');
            const tx = iost.callABI("Contract7FkjXHJ6574QecAxz1wvZmvASxaiWxqohkR6jnJRBjwn", "depositPmine", [amount.toString()]);
            tx.addApprove("pmine", "1000000");

            iost.signAndSend(tx).on('pending', function (txid) {
                console.log("======>pending", txid);
                $(".page-loader").show();
                $(".loader-inner").show();
            }).on('success', function (result) {
                console.log('======>buy success', result);
                $(".page-loader").hide();
                $("#statusVDC2Msg").html('<div class="alert alert-success">Successfully deposited. Please check your wallet</div>');
            }).on('failed', function (result) {
                console.log('======>failed', result);
                $(".page-loader").hide();
                $("#statusVDC2Msg").html('<div class="alert alert-warning">' + result.message + '</div>');
            });
        } else {
            $("#statusVDC2Msg").html('<div class="alert alert-warning">Please input deposit amount.</div>');
        }


    }).catch(error => {
        if (error.type == "locked")
            $("#statusVDC2Msg").html('<div class="alert alert-warning">Unlock your iWallet Extension.</div>');
    });

});

$(document).on("click", "#vdc1-withdraw-btn", function () {
    if (!window.IWalletJS) {
        $("#statusVDC1Msg").html('<div class="alert alert-warning">You need to install <a style="color: #fcc56e;" href="https://chrome.google.com/webstore/detail/iwallet/kncchdigobghenbbaddojjnnaogfppfj">iWallet Chrome Extension</a>.</div>');
        return;
    }

    window.IWalletJS.enable().then(function (val) {
        $("#statusVDC1Msg").html('');
        iost = window.IWalletJS.newIOST(IOST);

        let account = new IOST.Account(val);
        iost.setAccount(account);
        const defaultConfig = {
            gasRatio: 1,
            gasLimit: 2000000,
            delay: 0,
            expiration: 60,
            defaultLimit: "unlimited"
        };

        iost.config = defaultConfig;

        var amount = $("#vdc1-withdraw-amount").val();

        if (amount) {
            $("#statusVDC1Msg").html('');
            const tx = iost.callABI("Contract9vnm1fv8TZ99Jxpw2hUPkekmdbQTUVRLTxiv6d8jPWdi", "withdrawPmine", [amount.toString()]);
            tx.addApprove("pmine", "1000000");

            iost.signAndSend(tx).on('pending', function (txid) {
                console.log("======>pending", txid);
                $(".page-loader").show();
                $(".loader-inner").show();
            }).on('success', function (result) {
                console.log('======>buy success', result);
                $(".page-loader").hide();
                $("#statusVDC1Msg").html('<div class="alert alert-success">Successfully withdrawn. Please check your wallet</div>');
            }).on('failed', function (result) {
                console.log('======>failed', result);
                $(".page-loader").hide();
                $("#statusVDC1Msg").html('<div class="alert alert-warning">' + result.message + '</div>');
            });
        } else {
            $("#statusVDC1Msg").html('<div class="alert alert-warning">Please input withdrawal amount.</div>');
        }


    }).catch(error => {
        if (error.type == "locked")
            $("#statusVDC1Msg").html('<div class="alert alert-warning">Unlock your iWallet Extension.</div>');
    });

});

$(document).on("click", "#vdc2-withdraw-btn", function () {
    if (!window.IWalletJS) {
        $("#statusVDC2Msg").html('<div class="alert alert-warning">You need to install <a style="color: #fcc56e;" href="https://chrome.google.com/webstore/detail/iwallet/kncchdigobghenbbaddojjnnaogfppfj">iWallet Chrome Extension</a>.</div>');
        return;
    }

    window.IWalletJS.enable().then(function (val) {
        $("#statusVDC2Msg").html('');
        iost = window.IWalletJS.newIOST(IOST);

        let account = new IOST.Account(val);
        iost.setAccount(account);
        const defaultConfig = {
            gasRatio: 1,
            gasLimit: 2000000,
            delay: 0,
            expiration: 60,
            defaultLimit: "unlimited"
        };

        iost.config = defaultConfig;

        var amount = $("#vdc2-withdraw-amount").val();

        if (amount) {
            $("#statusVDC2Msg").html('');
            const tx = iost.callABI("Contract7FkjXHJ6574QecAxz1wvZmvASxaiWxqohkR6jnJRBjwn", "withdrawPmine", [amount.toString()]);
            tx.addApprove("pmine", "1000000");

            iost.signAndSend(tx).on('pending', function (txid) {
                console.log("======>pending", txid);
                $(".page-loader").show();
                $(".loader-inner").show();
            }).on('success', function (result) {
                console.log('======>buy success', result);
                $(".page-loader").hide();
                $("#statusVDC2Msg").html('<div class="alert alert-success">Successfully withdrawn. Please check your wallet</div>');
            }).on('failed', function (result) {
                console.log('======>failed', result);
                $(".page-loader").hide();
                $("#statusVDC2Msg").html('<div class="alert alert-warning">' + result.message + '</div>');
            });
        } else {
            $("#statusVDC2Msg").html('<div class="alert alert-warning">Please input withdrawal amount.</div>');
        }


    }).catch(error => {
        if (error.type == "locked")
            $("#statusVDC2Msg").html('<div class="alert alert-warning">Unlock your iWallet Extension.</div>');
    });

});

$(document).on("click", "#vdc1-claim-btn", function () {
    if (!window.IWalletJS) {
        $("#statusVDC1Msg").html('<div class="alert alert-warning">You need to install <a style="color: #fcc56e;" href="https://chrome.google.com/webstore/detail/iwallet/kncchdigobghenbbaddojjnnaogfppfj">iWallet Chrome Extension</a>.</div>');
        return;
    }

    window.IWalletJS.enable().then(function (val) {
        $("#statusVDC1Msg").html('');
        iost = window.IWalletJS.newIOST(IOST);

        let account = new IOST.Account(val);
        iost.setAccount(account);
        const defaultConfig = {
            gasRatio: 1,
            gasLimit: 2000000,
            delay: 0,
            expiration: 60,
            defaultLimit: "unlimited"
        };

        iost.config = defaultConfig;

        $("#statusVDC1Msg").html('');
        const tx = iost.callABI("Contract9vnm1fv8TZ99Jxpw2hUPkekmdbQTUVRLTxiv6d8jPWdi", "claim", [""]);
        tx.addApprove("pmine", "1000000");
        tx.addApprove("iost", "1000000");
        tx.addApprove("per", "1000000");

        iost.signAndSend(tx).on('pending', function (txid) {
            console.log("======>pending", txid);
            $(".page-loader").show();
            $(".loader-inner").show();
        }).on('success', function (result) {
            console.log('======>buy success', result);
            $(".page-loader").hide();
            $("#statusVDC1Msg").html('<div class="alert alert-success">Successfully claimed. Please check your wallet</div>');
        }).on('failed', function (result) {
            console.log('======>failed', result);
            $(".page-loader").hide();
            $("#statusVDC1Msg").html('<div class="alert alert-warning">' + result + '</div>');
        });

    }).catch(error => {
        if (error.type == "locked")
            $("#statusVDC1Msg").html('<div class="alert alert-warning">Unlock your iWallet Extension.</div>');
    });

});

$(document).on("click", "#vdc2-claim-btn", function () {
    if (!window.IWalletJS) {
        $("#statusVDC2Msg").html('<div class="alert alert-warning">You need to install <a style="color: #fcc56e;" href="https://chrome.google.com/webstore/detail/iwallet/kncchdigobghenbbaddojjnnaogfppfj">iWallet Chrome Extension</a>.</div>');
        return;
    }

    window.IWalletJS.enable().then(function (val) {
        $("#statusVDC2Msg").html('');
        iost = window.IWalletJS.newIOST(IOST);

        let account = new IOST.Account(val);
        iost.setAccount(account);
        const defaultConfig = {
            gasRatio: 1,
            gasLimit: 2000000,
            delay: 0,
            expiration: 60,
            defaultLimit: "unlimited"
        };

        iost.config = defaultConfig;

        $("#statusVDC2Msg").html('');
        const tx = iost.callABI("Contract7FkjXHJ6574QecAxz1wvZmvASxaiWxqohkR6jnJRBjwn", "claim", [""]);
        tx.addApprove("pmine", "1000000");
        tx.addApprove("iost", "1000000");
        tx.addApprove("per", "1000000");

        iost.signAndSend(tx).on('pending', function (txid) {
            console.log("======>pending", txid);
            $(".page-loader").show();
            $(".loader-inner").show();
        }).on('success', function (result) {
            console.log('======>buy success', result);
            $(".page-loader").hide();
            $("#statusVDC2Msg").html('<div class="alert alert-success">Successfully claimed. Please check your wallet</div>');
        }).on('failed', function (result) {
            console.log('======>failed', result);
            $(".page-loader").hide();
            $("#statusVDC2Msg").html('<div class="alert alert-warning">' + result + '</div>');
        });

    }).catch(error => {
        if (error.type == "locked")
            $("#statusVDC2Msg").html('<div class="alert alert-warning">Unlock your iWallet Extension.</div>');
    });

});