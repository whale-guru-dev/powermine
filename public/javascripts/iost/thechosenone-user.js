window.onload = () => {
    showDisclaimerModal();
    getTotalStakedPmine();
    getBurntTokens();
}

function showDisclaimerModal() {
    $('#disclaimerModal').modal({show: true});
}

function getTotalStakedPmine() {
    const fetchToken = () => {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById('total_pmine').innerText = `${parseFloat(xhttp.responseText).toFixed(4)} PMINE`;
            }
        };
        xhttp.open("GET", "/iost/totalStaked", true);
        xhttp.send();
    }

    fetchToken()
    setInterval(fetchToken, 10 * 60 * 1000)
}

function getBurntTokens() {
    const fetchBurntToken = () => {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById('pmine_burnt').innerText = `${parseFloat(JSON.parse(xhttp.responseText).balance).toFixed(0)} PMINE`;
            }
        };
        xhttp.open("GET", "https://api.iost.io/getTokenBalance/pmine_admin/pmine/true", true);
        xhttp.send();
    };

    fetchBurntToken();
    setInterval(fetchBurntToken, 10 * 60 * 1000)
}

$(document).on("click", "#joinRoundBtn", function () {

    if (!window.IWalletJS) {
        $("#statusBuyMsg").html('<div class="alert alert-warning">You need to install <a style="color: #fcc56e;" href="https://chrome.google.com/webstore/detail/iwallet/kncchdigobghenbbaddojjnnaogfppfj">iWallet Chrome Extension</a>.</div>');
        return;
    }

    window.IWalletJS.enable().then(function (val) {
        $("#statusBuyMsg").html('');
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

        $("#statusBuyMsg").html('');
        const tx = iost.callABI("ContractABxHhYQnWrjJjiRVH5gqwtsKuveGqQTAwp88DWd4hfca", "joinRound", []);
        tx.addApprove("iost", "3000");

        iost.signAndSend(tx).on('pending', function (txid) {
            console.log("======>pending", txid);
            $(".page-loader").show();
            $(".loader-inner").show();
        }).on('success', function (result) {
            console.log('======>buy success', result);
            $(".page-loader").hide();
            $("#statusBuyMsg").html('<div class="alert alert-success">Successfully Joined. Please check your wallet</div>');
        }).on('failed', function (result) {
            console.log('======>failed', result);
            $(".page-loader").hide();
            $("#statusBuyMsg").html('<div class="alert alert-warning">' + result.message + '</div>');
        });

    }).catch(error => {
        if (error.type == "locked")
            $("#statusBuyMsg").html('<div class="alert alert-warning">Unlock your iWallet Extension.</div>');
    });

});

$(document).on("click", "#dethroneKingBtn", function () {

    if (!window.IWalletJS) {
        $("#statusBuyMsg").html('<div class="alert alert-warning">You need to install <a style="color: #fcc56e;" href="https://chrome.google.com/webstore/detail/iwallet/kncchdigobghenbbaddojjnnaogfppfj">iWallet Chrome Extension</a>.</div>');
        return;
    }

    window.IWalletJS.enable().then(function (val) {
        $("#statusBuyMsg").html('');
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

        $("#statusBuyMsg").html('');
        const tx = iost.callABI("ContractABxHhYQnWrjJjiRVH5gqwtsKuveGqQTAwp88DWd4hfca", "dethroneKing", []);
        tx.addApprove("iost", "1000");

        iost.signAndSend(tx).on('pending', function (txid) {
            console.log("======>pending", txid);
            $(".page-loader").show();
            $(".loader-inner").show();
        }).on('success', function (result) {
            console.log('======>buy success', result);
            $(".page-loader").hide();
            $("#statusBuyMsg").html('<div class="alert alert-success">Successfully dethroned. Please check your wallet</div>');
        }).on('failed', function (result) {
            console.log('======>failed', result);
            $(".page-loader").hide();
            $("#statusBuyMsg").html('<div class="alert alert-warning">' + result.message + '</div>');
        });

    }).catch(error => {
        if (error.type == "locked")
            $("#statusBuyMsg").html('<div class="alert alert-warning">Unlock your iWallet Extension.</div>');
    });

});