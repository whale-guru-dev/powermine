//airdrop iwallet integration
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