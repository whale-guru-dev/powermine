window.onload = () => {
    updateIOSTAmount();
    updateIOSTiMatchAmount();
    updateIOSTiGooseAmount();
    updateIOSTiChipAmount();
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

function updateIOSTiGooseAmount () {
    const updateIOSTiGooseAmount_internal = () => {
        $.ajax({
            url: '/igoose/getIOSTInContract',
            type: 'GET',
            data: {},
            dataType: 'json',
            success: function(response) {
                var amount = response;
                $("#iostAmtIniGooseContract").html((amount*1).toFixed(8))
            }
        })
    };

    updateIOSTiGooseAmount_internal();
    setInterval(updateIOSTiGooseAmount_internal,10 * 60 * 1000)
}

function updateIOSTiChipAmount () {
    const updateIOSTiChipAmount_internal = () => {
        $.ajax({
            url: '/iChip/getIOSTInContract',
            type: 'GET',
            data: {},
            dataType: 'json',
            success: function(response) {
                var amount = response;
                $("#iostAmtIniChipContract").html((amount*1).toFixed(8))
            }
        })
    };

    updateIOSTiChipAmount_internal();
    setInterval(updateIOSTiChipAmount_internal,10 * 60 * 1000)
}

//airdrop iwallet integration
$(document).on("click", "#airdropBtn", function () {
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

        var airdropAmt = $("#airdropAmt").val();

        const tx = iost.callABI("ContractC3DW2h2qVyuFdzo3aKhN8Lhc8Jcp8wetYNvayKyhCjQq", "airDropPer", [airdropAmt.toString()]);
        tx.addApprove("per", "10000000");

        iost.signAndSend(tx).on('pending', function (txid) {
            console.log("======>pending", txid);
            $(".page-loader").show();
            $(".loader-inner").show();
        }).on('success', function (result) {
            console.log('======>airdrop success', result);
            $(".page-loader").hide();
            $("#statusMsg").html('<div class="alert alert-success">Airdrop Success. Please check your wallet</div>');
        }).on('failed', function (result) {
            console.log('======>failed', result);
            $(".page-loader").hide();
            $("#statusMsg").html('<div class="alert alert-warning">' + result + '</div>');
        });
    });
});

$(document).on("click", "#depositBtn", function () {
    window.IWalletJS.enable().then(function (val) {
        iost = window.IWalletJS.newIOST(IOST);

        let account = new IOST.Account(val);
        iost.setAccount(account);

        var depositAmount = $("#depositAmt").val();

        const tx = iost.callABI("ContractC3DW2h2qVyuFdzo3aKhN8Lhc8Jcp8wetYNvayKyhCjQq", "depositInitialPmine", [depositAmount.toString()]);
        tx.addApprove("pmine", "100000");

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

        let account = new IOST.Account(val);
        iost.setAccount(account);


        var withdrawAmt = $("#withdrawAmt").val();

        const tx = iost.callABI("ContractC3DW2h2qVyuFdzo3aKhN8Lhc8Jcp8wetYNvayKyhCjQq", "withdrawlIost", [withdrawAmt.toString()]);
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

$(document).on("click", "#depositIostBtn", function () {
    window.IWalletJS.enable().then(function (val) {
        iost = window.IWalletJS.newIOST(IOST);

        let account = new IOST.Account(val);
        iost.setAccount(account);

        var withdrawAmt = $("#depositIostAmt").val();

        const tx = iost.callABI("ContractC3DW2h2qVyuFdzo3aKhN8Lhc8Jcp8wetYNvayKyhCjQq", "depositIOST", [withdrawAmt.toString()]);
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

        let account = new IOST.Account(val);
        iost.setAccount(account);

        var depositAmount = $("#depositiMatchAmt").val();

        const tx = iost.callABI("Contract6EXwvev8u8gqiLPqkfr7XXCpiA6VhVxiAqTZcWjuEwV2", "depositInitialimatch", [depositAmount.toString()]);
        tx.addApprove("imatch", "100000");

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

        let account = new IOST.Account(val);
        iost.setAccount(account);

        var withdrawAmt = $("#withdrawiMatchAmt").val();

        const tx = iost.callABI("Contract6EXwvev8u8gqiLPqkfr7XXCpiA6VhVxiAqTZcWjuEwV2", "withdrawlIost", [withdrawAmt.toString()]);
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

$(document).on("click", "#depositIostiMatchBtn", function () {
    window.IWalletJS.enable().then(function (val) {
        iost = window.IWalletJS.newIOST(IOST);

        let account = new IOST.Account(val);
        iost.setAccount(account);

        var withdrawAmt = $("#depositIostiMatchAmt").val();

        const tx = iost.callABI("Contract6EXwvev8u8gqiLPqkfr7XXCpiA6VhVxiAqTZcWjuEwV2", "depositIOST", [withdrawAmt.toString()]);
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

// iGoose
$(document).on("click", "#depositiGooseBtn", function () {
    window.IWalletJS.enable().then(function (val) {
        iost = window.IWalletJS.newIOST(IOST);

        let account = new IOST.Account(val);
        iost.setAccount(account);

        var depositAmount = $("#depositiGooseAmt").val();

        const tx = iost.callABI("ContractBbjSHzs2CEwWECHcUwFJXiSJRr2jb8NhvANa1MJgWX97", "depositInitialIGoose", [depositAmount.toString()]);
        tx.addApprove("igoose", "100000");

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

$(document).on("click", "#withdrawiGooseBtn", function () {
    window.IWalletJS.enable().then(function (val) {
        iost = window.IWalletJS.newIOST(IOST);

        let account = new IOST.Account(val);
        iost.setAccount(account);

        var withdrawAmt = $("#withdrawiGooseAmt").val();

        const tx = iost.callABI("ContractBbjSHzs2CEwWECHcUwFJXiSJRr2jb8NhvANa1MJgWX97", "withdrawlIost", [withdrawAmt.toString()]);
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

$(document).on("click", "#depositIostiGooseBtn", function () {
    window.IWalletJS.enable().then(function (val) {
        iost = window.IWalletJS.newIOST(IOST);

        let account = new IOST.Account(val);
        iost.setAccount(account);

        var withdrawAmt = $("#depositIostiGooseAmt").val();

        const tx = iost.callABI("ContractBbjSHzs2CEwWECHcUwFJXiSJRr2jb8NhvANa1MJgWX97", "depositIOST", [withdrawAmt.toString()]);
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


$(document).on("click", "#paydividendsiGoose", function () {
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

        var divAmount = $("#divAmountiGoose").val();

        const tx = iost.callABI("ContractBbjSHzs2CEwWECHcUwFJXiSJRr2jb8NhvANa1MJgWX97", "payDividends", [divAmount.toString()]);
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


// Ichips
$(document).on("click", "#depositiChipBtn", function () {
    window.IWalletJS.enable().then(function (val) {
        iost = window.IWalletJS.newIOST(IOST);

        let account = new IOST.Account(val);
        iost.setAccount(account);

        var depositAmount = $("#depositiChipAmt").val();

        const tx = iost.callABI("ContractDYPoVRRYvRBbJGoBGfSY1TBmkT7AwDFAUWTbi3sFAa3E", "depositInitialiChip", [depositAmount.toString()]);
        tx.addApprove("ichips", "100000");

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

$(document).on("click", "#withdrawiChipBtn", function () {
    window.IWalletJS.enable().then(function (val) {
        iost = window.IWalletJS.newIOST(IOST);

        let account = new IOST.Account(val);
        iost.setAccount(account);

        var withdrawAmt = $("#withdrawiChipAmt").val();

        const tx = iost.callABI("ContractDYPoVRRYvRBbJGoBGfSY1TBmkT7AwDFAUWTbi3sFAa3E", "withdrawlIost", [withdrawAmt.toString()]);
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

$(document).on("click", "#depositIostiChipBtn", function () {
    window.IWalletJS.enable().then(function (val) {
        iost = window.IWalletJS.newIOST(IOST);


        let account = new IOST.Account(val);
        iost.setAccount(account);

        var withdrawAmt = $("#depositIostiChipAmt").val();

        const tx = iost.callABI("ContractDYPoVRRYvRBbJGoBGfSY1TBmkT7AwDFAUWTbi3sFAa3E", "depositIOST", [withdrawAmt.toString()]);
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


$(document).on("click", "#paydividendsiChip", function () {
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

        var divAmount = $("#divAmountiChip").val();

        const tx = iost.callABI("ContractDYPoVRRYvRBbJGoBGfSY1TBmkT7AwDFAUWTbi3sFAa3E", "payDividends", [divAmount.toString()]);
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