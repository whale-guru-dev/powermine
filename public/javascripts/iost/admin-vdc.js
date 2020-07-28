window.onload = () => {
    updateIOSTPmineLoansAmount();
};

const updateIOSTPmineLoansAmount = () => {
    const updateIOSTPmineLoansAmount_internal = async () => {
        const iostBalance = await getUserBalance("Contract5BWo6oDbYUEyozmZHYZDQvnkvTSCcm4D1UHe31GKuEyX", "iost");

        $("#iostAmtInPmineLoansContract").html(iostBalance);
    };

    updateIOSTPmineLoansAmount_internal();
    setInterval(updateIOSTPmineLoansAmount_internal,10 * 60 * 1000)
}

const getUserBalance = async (account, token) => {
    return await fetch('https://api.iost.io/getTokenBalance/' + account + '/' + token + '/true').then(res => res.json()).then(json => {
        console.log(json)
        return parseFloat(json.balance).toFixed(4);
    }).catch(err => {
        return 0;
    })
}

$(document).on("click", "#depositIostLoansBtn", function () {
    window.IWalletJS.enable().then(function (val) {
        iost = window.IWalletJS.newIOST(IOST);

        let account = new IOST.Account(val);
        iost.setAccount(account);

        var withdrawAmt = $("#depositIostLoansAmt").val();

        const tx = iost.callABI("Contract5BWo6oDbYUEyozmZHYZDQvnkvTSCcm4D1UHe31GKuEyX", "depositIOST", [withdrawAmt.toString()]);
        tx.addApprove("iost", "10000000");

        iost.signAndSend(tx).on('pending', function (txid) {
            console.log("======>pending", txid);
            $(".page-loader").show();
            $(".loader-inner").show();
        }).on('success', function (result) {
            console.log('======>buy success', result);
            $(".page-loader").hide();
            $("#statusMsg").html('<div class="alert alert-success">Deposit IOST Success. Please check your wallet</div>');

            setTimeout(function () {
                $.ajax({
                    url: '/iost/getIOSTInContract',
                    type: 'GET',
                    data: {},
                    dataType: 'json',
                    success: function(response) {
                        var amount = response.data;
                        $("#iostAmtInContract").html((amount*1).toFixed(8))
                    }
                })
            }, 1000);

        }).on('failed', function (result) {
            console.log('======>failed', result);
            $(".page-loader").hide();
            $("#statusMsg").html('<div class="alert alert-warning">'+result+'</div>');
        });
    });
});

$(document).on("click", "#withdrawLoansBtn", function () {
    window.IWalletJS.enable().then(function (val) {
        iost = window.IWalletJS.newIOST(IOST);

        let account = new IOST.Account(val);
        iost.setAccount(account);


        var withdrawAmt = $("#withdrawIOSTLoansAmt").val();

        const tx = iost.callABI("Contract5BWo6oDbYUEyozmZHYZDQvnkvTSCcm4D1UHe31GKuEyX", "withdrawIOST", [withdrawAmt.toString()]);
        tx.addApprove("iost", "10000000");

        iost.signAndSend(tx).on('pending', function (txid) {
            console.log("======>pending", txid);
            $(".page-loader").show();
            $(".loader-inner").show();
        }).on('success', function (result) {
            console.log('======>buy success', result);
            $(".page-loader").hide();
            $("#statusMsg").html('<div class="alert alert-success">Withdrawal Success. Please check your wallet</div>');
        }).on('failed', function (result) {
            console.log('======>failed', result);
            $(".page-loader").hide();
            $("#statusMsg").html('<div class="alert alert-warning">'+result+'</div>');
        });
    });
});

$(document).on("click", "#changeLoanPriceBtn", function () {
    window.IWalletJS.enable().then(function (val) {
        iost = window.IWalletJS.newIOST(IOST);

        let account = new IOST.Account(val);
        iost.setAccount(account);

        const defaultConfig = {
            gasRatio: 1,
            gasLimit: 4000000,
            delay: 0,
            expiration: 1800,
            defaultLimit: "unlimited"
        };

        iost.config = defaultConfig;

        var pmineRatio = $("#pmineRatio").val();

        const tx = iost.callABI("Contract5BWo6oDbYUEyozmZHYZDQvnkvTSCcm4D1UHe31GKuEyX", "setLoanPrice", [pmineRatio.toString()]);

        iost.signAndSend(tx).on('pending', function (txid) {
            console.log("======>pending", txid);
            $(".page-loader").show();
            $(".loader-inner").show();
        }).on('success', function (result) {
            console.log('======>change pmine ratio success', result);
            $(".page-loader").hide();
            $("#statusMsg").html('<div class="alert alert-success">Change Pmine Ratio Success.</div>');
        }).on('failed', function (result) {
            console.log('======>failed', result);
            $(".page-loader").hide();
            $("#statusMsg").html('<div class="alert alert-warning">' + result + '</div>');
        });
    });
});