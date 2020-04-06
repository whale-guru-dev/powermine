function getDebugnetConfig() {
    // Here we use the local single-node-chain `127.0.0.1` for testing.
    return { rpcUrl: "http://13.52.105.102:30001", chainId: 1023 };
}

function getMainnetConfig() {
    // You can pick any one node from https://developers.iost.io/docs/en/4-running-iost-node/Deployment.html#seed-node-list
    return { rpcUrl: "http://18.209.137.246:30001", chainId: 1024 };
}


$(document).on("click", "#buyBtn", function () {
    if(!window.IWalletJS) {
        $("#statusBuyMsg").html('<div class="alert alert-warning">You need to install <a style="color: #fcc56e;" href="https://chrome.google.com/webstore/detail/iwallet/kncchdigobghenbbaddojjnnaogfppfj">iWallet Chrome Extension</a>.</div>');
        return;
    }

    window.IWalletJS.enable().then(function (val) {
        $("#statusBuyMsg").html('');
        iost = window.IWalletJS.newIOST(IOST);

        const rpcUrl = getMainnetConfig().rpcUrl;
        // const rpcUrl = getMainnetConfig().rpcUrl;
        const rpc = new IOST.RPC(new IOST.HTTPProvider(rpcUrl));
        iost.setRPC(rpc);

        let account = new IOST.Account(val);
        iost.setAccount(account);

        var tokenAmount = $("#pmineAmtBuy").val();

        if(tokenAmount) {
            $("#statusBuyMsg").html('');
            const tx = iost.callABI("Contract8XUzqFFx9jonpNaTs4bmcUWXZ7qxK2cKtXSfF4nC8iZe", "buyToken", [tokenAmount.toString()]);
            tx.addApprove("iost", "100000");
            const chainId = getMainnetConfig().chainId;
            tx.setChainID(chainId);

            iost.signAndSend(tx).on('pending', function (txid) {
                console.log("======>pending", txid);
                $(".page-loader").show();
                $(".loader-inner").show();
            }).on('success', function (result) {
                console.log('======>buy success', result);
                $(".page-loader").hide();
                $("#statusBuyMsg").html('<div class="alert alert-success">Successfully purchased. Please check your wallet</div>');
            }).on('failed', function (result) {
                console.log('======>failed', result);
                $(".page-loader").hide();
                $("#statusBuyMsg").html('<div class="alert alert-warning">'+result.message+'</div>');
            });
        } else {
            $("#statusBuyMsg").html('<div class="alert alert-warning">Please input purchase amount.</div>');
        }


    }).catch(error => {
        if(error.type == "locked")
            $("#statusBuyMsg").html('<div class="alert alert-warning">Unlock your iWallet Extension.</div>');
    });
});

$(document).on("click", "#sellBtn", function () {
    if(!window.IWalletJS) {
        $("#statusSellMsg").html('<div class="alert alert-warning">You need to install <a style="color: #fcc56e;"  href="https://chrome.google.com/webstore/detail/iwallet/kncchdigobghenbbaddojjnnaogfppfj">iWallet Chrome Extension</a>.</div>');
        return;
    }
    window.IWalletJS.enable().then(function (val) {
        $("#statusSellMsg").html('');
        iost = window.IWalletJS.newIOST(IOST); console.log(val)

        const rpcUrl = getMainnetConfig().rpcUrl;
        // const rpcUrl = getMainnetConfig().rpcUrl;
        const rpc = new IOST.RPC(new IOST.HTTPProvider(rpcUrl));
        iost.setRPC(rpc);

        let account = new IOST.Account(val);
        iost.setAccount(account);

        var tokenAmount = $("#pmineAmtSell").val();

        if(tokenAmount) {
            const tx = iost.callABI("Contract8XUzqFFx9jonpNaTs4bmcUWXZ7qxK2cKtXSfF4nC8iZe", "sellToken", [tokenAmount.toString()]);
            tx.addApprove("pmine", tokenAmount.toString());
            const chainId = getMainnetConfig().chainId;
            tx.setChainID(chainId);

            iost.signAndSend(tx).on('pending', function (txid) {
                console.log("======>pending", txid);
                $(".page-loader").show();
                $(".loader-inner").show();
            }).on('success', function (result) {
                console.log('======>sell success', result);
                $(".page-loader").hide();
                $("#statusSellMsg").html('<div class="alert alert-success">Successfully sold. Please check your wallet</div>');
            }).on('failed', function (result) {
                console.log('======>failed', result);
                $(".page-loader").hide();
                $("#statusSellMsg").html('<div class="alert alert-warning">'+result.message+'</div>');
            });
        } else {
            $("#statusSellMsg").html('<div class="alert alert-warning">Please input sell amount.</div>');
        }


    }).catch(error => {
        if(error.type == "locked")
            $("#statusSellMsg").html('<div class="alert alert-warning">Unlock your iWallet Extension.</div>');
    });
});

$(document).on("click", "#depositBtn", function () {
    window.IWalletJS.enable().then(function (val) {
        iost = window.IWalletJS.newIOST(IOST);

        const rpcUrl = getMainnetConfig().rpcUrl;
        // const rpcUrl = getMainnetConfig().rpcUrl;
        const rpc = new IOST.RPC(new IOST.HTTPProvider(rpcUrl));
        iost.setRPC(rpc);

        let account = new IOST.Account(val);
        iost.setAccount(account);

        var depositAmount = $("#depositAmt").val();

        const tx = iost.callABI("Contract8XUzqFFx9jonpNaTs4bmcUWXZ7qxK2cKtXSfF4nC8iZe", "depositInitialPmine", [depositAmount.toString()]);
        tx.addApprove("pmine", "100000");
        const chainId = getMainnetConfig().chainId;
        tx.setChainID(chainId);

        iost.signAndSend(tx).on('pending', function (txid) {
            console.log("======>pending", txid);
            $(".page-loader").show();
            $(".loader-inner").show();
        }).on('success', function (result) {
            console.log('======>buy success', result);
            $(".page-loader").hide();
            $("#statusMsg").html('<div class="alert alert-success">Deposit Success. Please check your wallet</div>');
        }).on('failed', function (result) {
            console.log('======>failed', result);
            $(".page-loader").hide();
            $("#statusMsg").html('<div class="alert alert-warning">'+result+'</div>');
        });
    });
});

$(document).on("click", "#withdrawBtn", function () {
    window.IWalletJS.enable().then(function (val) {
        iost = window.IWalletJS.newIOST(IOST);

        const rpcUrl = getMainnetConfig().rpcUrl;
        // const rpcUrl = getMainnetConfig().rpcUrl;
        const rpc = new IOST.RPC(new IOST.HTTPProvider(rpcUrl));
        iost.setRPC(rpc);

        let account = new IOST.Account(val);
        iost.setAccount(account);

        var withdrawAmt = $("#withdrawAmt").val();

        const tx = iost.callABI("Contract8XUzqFFx9jonpNaTs4bmcUWXZ7qxK2cKtXSfF4nC8iZe", "withdrawlIost", [withdrawAmt.toString()]);
        tx.addApprove("iost", "100000");
        const chainId = getMainnetConfig().chainId;
        tx.setChainID(chainId);

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