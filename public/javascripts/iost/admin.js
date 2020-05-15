function getDebugnetConfig() {
    // Here we use the local single-node-chain `127.0.0.1` for testing.
    return { rpcUrl: "http://13.52.105.102:30001", chainId: 1023 };
}

function getMainnetConfig() {
    // You can pick any one node from https://developers.iost.io/docs/en/4-running-iost-node/Deployment.html#seed-node-list
    return { rpcUrl: "http://18.209.137.246:30001", chainId: 1024 };
}

window.onload = () => {
    updateIOSTAmount();
    updateIOSTiMatchAmount();
};

function updateIOSTAmount () {
    const updateIOSTAmount_internal = () => {
        $.ajax({
            url: '/iost/getIOSTInContract',
            type: 'GET',
            data: {},
            dataType: 'json',
            success: function(response) {
                var amount = response;
                $("#iostAmtInContract").html((amount*1).toFixed(8))
            }
        })
    };

    updateIOSTAmount_internal();
    setInterval(updateIOSTAmount_internal,10 * 60 * 1000)
}

function updateIOSTiMatchAmount () {
    const updateIOSTiMatchAmount_internal = () => {
        $.ajax({
            url: '/imatch/getIOSTInContract',
            type: 'GET',
            data: {},
            dataType: 'json',
            success: function(response) {
                var amount = response;
                $("#iostAmtIniMatchContract").html((amount*1).toFixed(8))
            }
        })
    };

    updateIOSTiMatchAmount_internal();
    setInterval(updateIOSTiMatchAmount_internal,10 * 60 * 1000)
}


$(document).on("click", "#depositBtn", function () {
    window.IWalletJS.enable().then(function (val) {
        iost = window.IWalletJS.newIOST(IOST);

        // const rpcUrl = getMainnetConfig().rpcUrl;
        // const rpcUrl = getMainnetConfig().rpcUrl;
        // const rpc = new IOST.RPC(new IOST.HTTPProvider(rpcUrl));
        // iost.setRPC(rpc);

        let account = new IOST.Account(val);
        iost.setAccount(account);

        var depositAmount = $("#depositAmt").val();

        const tx = iost.callABI("ContractC3DW2h2qVyuFdzo3aKhN8Lhc8Jcp8wetYNvayKyhCjQq", "depositInitialPmine", [depositAmount.toString()]);
        tx.addApprove("pmine", "100000");
        // const chainId = getMainnetConfig().chainId;
        // tx.setChainID(chainId);

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

        // const rpcUrl = getMainnetConfig().rpcUrl;
        // const rpcUrl = getMainnetConfig().rpcUrl;
        // const rpc = new IOST.RPC(new IOST.HTTPProvider(rpcUrl));
        // iost.setRPC(rpc);

        let account = new IOST.Account(val);
        iost.setAccount(account);

        var withdrawAmt = $("#withdrawAmt").val();

        const tx = iost.callABI("ContractC3DW2h2qVyuFdzo3aKhN8Lhc8Jcp8wetYNvayKyhCjQq", "withdrawlIost", [withdrawAmt.toString()]);
        tx.addApprove("iost", "10000000");
        // const chainId = getMainnetConfig().chainId;
        // tx.setChainID(chainId);

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

$(document).on("click", "#depositIostBtn", function () {
    window.IWalletJS.enable().then(function (val) {
        iost = window.IWalletJS.newIOST(IOST);

        // const rpcUrl = getMainnetConfig().rpcUrl;
        // const rpcUrl = getMainnetConfig().rpcUrl;
        // const rpc = new IOST.RPC(new IOST.HTTPProvider(rpcUrl));
        // iost.setRPC(rpc);

        let account = new IOST.Account(val);
        iost.setAccount(account);

        var withdrawAmt = $("#depositIostAmt").val();

        const tx = iost.callABI("ContractC3DW2h2qVyuFdzo3aKhN8Lhc8Jcp8wetYNvayKyhCjQq", "depositIOST", [withdrawAmt.toString()]);
        tx.addApprove("iost", "10000000");
        // const chainId = getMainnetConfig().chainId;
        // tx.setChainID(chainId);

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


$(document).on("click", "#paydividends", function () {
    window.IWalletJS.enable().then(function (val) {
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

        var divAmount = $("#divAmount").val();

        const tx = iost.callABI("ContractC3DW2h2qVyuFdzo3aKhN8Lhc8Jcp8wetYNvayKyhCjQq", "payDividends", [divAmount.toString()]);
        tx.addApprove("iost", "10000000");
    

        iost.signAndSend(tx).on('pending', function (txid) {
            console.log("======>pending", txid);
            $(".page-loader").show();
            $(".loader-inner").show();
        }).on('success', function (result) {
            console.log('======>Dividends payout success', result);
            $(".page-loader").hide();
            $("#statusMsg").html('<div class="alert alert-success">Payment of Dividends Succeeded. </div>');
        }).on('failed', function (result) {
            console.log('======>failed', result);
            $(".page-loader").hide();
            $("#statusMsg").html('<div class="alert alert-warning">' + result + '</div>');
        });
    });
});


$(document).on("click", "#saveContentBtn", function () {
    var content = CKEDITOR.instances.editor1.getData();
    $("#statusMsg").html('');
    $.ajax({
       url:'/admin/content',
       type: 'POST',
       data: {
           name: 'bankRollAsset',
           content: content
       },
        dataType: 'json',
        success: function(response) {
            if(response.status === 'success') {
                $("#contentStatusMsg").html('<div class="alert alert-success">Content Save Success</div>');
            } else {
                $("#contentStatusMsg").html('<div class="alert alert-success">Content Save Error, Try again later</div>');
            }
        },
        error: function(error) {
            $("#contentStatusMsg").html('<div class="alert alert-success">Content Save Error, Try again later</div>');
        }
    });
});

$(document).on("click", "#depositiMatchBtn", function () {
    window.IWalletJS.enable().then(function (val) {
        iost = window.IWalletJS.newIOST(IOST);

        // const rpcUrl = getMainnetConfig().rpcUrl;
        // const rpcUrl = getMainnetConfig().rpcUrl;
        // const rpc = new IOST.RPC(new IOST.HTTPProvider(rpcUrl));
        // iost.setRPC(rpc);

        let account = new IOST.Account(val);
        iost.setAccount(account);

        var depositAmount = $("#depositiMatchAmt").val();

        const tx = iost.callABI("Contract6EXwvev8u8gqiLPqkfr7XXCpiA6VhVxiAqTZcWjuEwV2", "depositInitialimatch", [depositAmount.toString()]);
        tx.addApprove("imatch", "100000");
        // const chainId = getMainnetConfig().chainId;
        // tx.setChainID(chainId);

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

$(document).on("click", "#withdrawiMatchBtn", function () {
    window.IWalletJS.enable().then(function (val) {
        iost = window.IWalletJS.newIOST(IOST);

        // const rpcUrl = getMainnetConfig().rpcUrl;
        // const rpcUrl = getMainnetConfig().rpcUrl;
        // const rpc = new IOST.RPC(new IOST.HTTPProvider(rpcUrl));
        // iost.setRPC(rpc);

        let account = new IOST.Account(val);
        iost.setAccount(account);

        var withdrawAmt = $("#withdrawiMatchAmt").val();

        const tx = iost.callABI("Contract6EXwvev8u8gqiLPqkfr7XXCpiA6VhVxiAqTZcWjuEwV2", "withdrawlIost", [withdrawAmt.toString()]);
        tx.addApprove("iost", "10000000");
        // const chainId = getMainnetConfig().chainId;
        // tx.setChainID(chainId);

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

$(document).on("click", "#depositIostiMatchBtn", function () {
    window.IWalletJS.enable().then(function (val) {
        iost = window.IWalletJS.newIOST(IOST);

        // const rpcUrl = getMainnetConfig().rpcUrl;
        // const rpcUrl = getMainnetConfig().rpcUrl;
        // const rpc = new IOST.RPC(new IOST.HTTPProvider(rpcUrl));
        // iost.setRPC(rpc);

        let account = new IOST.Account(val);
        iost.setAccount(account);

        var withdrawAmt = $("#depositIostiMatchAmt").val();

        const tx = iost.callABI("Contract6EXwvev8u8gqiLPqkfr7XXCpiA6VhVxiAqTZcWjuEwV2", "depositIOST", [withdrawAmt.toString()]);
        tx.addApprove("iost", "10000000");
        // const chainId = getMainnetConfig().chainId;
        // tx.setChainID(chainId);

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


$(document).on("click", "#paydividendsiMatch", function () {
    window.IWalletJS.enable().then(function (val) {
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

        var divAmount = $("#divAmountiMatch").val();

        const tx = iost.callABI("Contract6EXwvev8u8gqiLPqkfr7XXCpiA6VhVxiAqTZcWjuEwV2", "payDividends", [divAmount.toString()]);
        tx.addApprove("iost", "10000000");


        iost.signAndSend(tx).on('pending', function (txid) {
            console.log("======>pending", txid);
            $(".page-loader").show();
            $(".loader-inner").show();
        }).on('success', function (result) {
            console.log('======>Dividends payout success', result);
            $(".page-loader").hide();
            $("#statusMsg").html('<div class="alert alert-success">Payment of Dividends Succeeded. </div>');
        }).on('failed', function (result) {
            console.log('======>failed', result);
            $(".page-loader").hide();
            $("#statusMsg").html('<div class="alert alert-warning">' + result + '</div>');
        });
    });
});