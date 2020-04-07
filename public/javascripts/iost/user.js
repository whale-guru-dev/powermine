window.onload = () => {
    getTokens()
    getRichList()
    updatePminePrice()
    hideAdminHeader()
}

function hideAdminHeader() {
    if(!window.IWalletJS) {
        $("#menu-item-139").hide();
    } else {
        window.IWalletJS.enable().then(function (val) {
            console.log(val)
            if(val !== 'powermine')
                $("#menu-item-139").hide();
        }).catch(error => {
            $("#menu-item-139").hide();
        });
    }
}

function getTokens () {
    const fetchToken = () => {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById('token-value').innerText = parseFloat(20000 - xhttp.responseText).toFixed(0)
                document.getElementById("token-msg").innerHTML = `
                Smart Contract holds a total of <b><span style="font-size: 18px">${parseFloat(xhttp.responseText).toFixed(4)}</span></b> pmine tokens out of <b>20,000</b>. 
                There are <b><span style="font-size: 18px">${parseFloat(20000 - xhttp.responseText).toFixed(4)}</span></b> pmine in circulation.`
            }
        };
        xhttp.open("GET", "/iost/circulation", true);
        xhttp.send();
    }

    fetchToken()
    setInterval(fetchToken, 10 * 60 * 1000)
}

function getRichList () {

    const fetchPmineRichlist = () => {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let richlist = JSON.parse(xhttp.responseText)
                let tablebody1 = ``, tablebody2 = ``

                for (let i in richlist) {
                    if (i <= 9) {
                        tablebody1 += `
                        <tr>
                            <td data-label="RANK">${richlist[i].rank}.</td>
                            <td data-label="ADDRESS">${richlist[i].account}</td>
                            <td data-label="AMOUNT">${richlist[i].balance}</td>
                            <td data-label="HOLDING">${richlist[i].percent} %</td>
                        </tr>
                        `
                    } else {
                        tablebody2 += `
                        <tr>
                            <td data-label="RANK">${richlist[i].rank}.</td>
                            <td data-label="ADDRESS">${richlist[i].account}</td>
                            <td data-label="AMOUNT">${richlist[i].balance}</td>
                            <td data-label="HOLDING">${richlist[i].percent} %</td>
                        </tr>
                        `
                    }
                }

                document.getElementById('pmine-table-body').innerHTML = tablebody1
                document.getElementById('pmine-table2-body').innerHTML = tablebody2
            }
        };
        xhttp.open("GET", "/iost/richlist", true);
        xhttp.send();
    }

    fetchPmineRichlist()
    setInterval(fetchPmineRichlist, 10 * 60 * 1000)
}

$('.dropdown').on('show.bs.dropdown', function (e) {
    $(this).find('.dropdown-menu').first().stop(true, true).slideDown(300);
});

$('.dropdown').on('hide.bs.dropdown', function (e) {
    $(this).find('.dropdown-menu').first().stop(true, true).slideUp(200);
});

$(".dropdown-menu-coin3 a").on('click', function () {
    $("#dropdowncoin3 .selected-coin3").text($(this).text());
});

$(".dropdown-menu-coin2 a").on('click', function () {
    $("#dropdowncoin2 .selected-coin2").text($(this).text());
});


$("#pmineAmtBuy").bind("paste keyup", function (event) {
    var _this = this;

    setTimeout(function () {
        var pmineAmount = $("#pmineAmtBuy").val();
        // $("#buyOrSellAmt").val((pmineAmount * 1).toFixed(8));

        $.ajax({
            url: '/iost/getPminePrice',
            type: 'GET',
            data: {},
            dataType: 'json',
            success: function(response) {
                var price = response.data;
                var iostAmount = (pmineAmount * price).toFixed(8);
                $("#iostAmtBuy").val(iostAmount);
            }
        })
    }, 100);
});

$("#iostAmtBuy").bind("paste keyup", function (event) {
    var _this = this;

    setTimeout(function () {
        var iostAmount = $("#iostAmtBuy").val();

        $.ajax({
            url: '/iost/getPminePrice',
            type: 'GET',
            data: {},
            dataType: 'json',
            success: function(response) {
                var price = response.data;
                var pmineAmount = (iostAmount / price).toFixed(8);
                $("#pmineAmtBuy").val(pmineAmount);
                // $("#buyOrSellAmt").val(pmineAmount);
            }
        })
    }, 100);
});

$("#pmineAmtSell").bind("paste keyup", function (event) {
    var _this = this;

    setTimeout(function () {
        var pmineAmount = $("#pmineAmtSell").val();
        // $("#buyOrSellAmt").val((pmineAmount * 1).toFixed(8));

        $.ajax({
            url: '/iost/getPminePrice',
            type: 'GET',
            data: {},
            dataType: 'json',
            success: function(response) {
                var price = response.data;
                var iostAmount = (pmineAmount * price * 0.6).toFixed(8);
                $("#iostAmtSell").val(iostAmount);
            }
        })
    }, 100);
});

$("#iostAmtSell").bind("paste keyup", function (event) {
    var _this = this;

    setTimeout(function () {
        var iostAmount = $("#iostAmtSell").val();

        $.ajax({
            url: '/iost/getPminePrice',
            type: 'GET',
            data: {},
            dataType: 'json',
            success: function(response) {
                var price = response.data;
                var pmineAmount = (iostAmount / (price*0.6)).toFixed(8);
                $("#pmineAmtSell").val(pmineAmount);
                // $("#buyOrSellAmt").val(pmineAmount);
            }
        })
    }, 100);
});

function updatePminePrice () {
    const getTokenPrice = () => {
        $.ajax({
            url: '/iost/getPminePrice',
            type: 'GET',
            data: {},
            dataType: 'json',
            success: function(response) {
                var price = response.data;
                $("#pminePrice").html((price*1).toFixed(2))
            }
        })
    }

    getTokenPrice();
    setInterval(getTokenPrice,10 * 60 * 1000)
}

$(document).on("click", "#buyBtn", function () {
    if(!window.IWalletJS) {
        $("#statusBuyMsg").html('<div class="alert alert-warning">You need to install <a style="color: #fcc56e;" href="https://chrome.google.com/webstore/detail/iwallet/kncchdigobghenbbaddojjnnaogfppfj">iWallet Chrome Extension</a>.</div>');
        return;
    }

    window.IWalletJS.enable().then(function (val) {
        $("#statusBuyMsg").html('');
        iost = window.IWalletJS.newIOST(IOST);

        // const rpcUrl = getMainnetConfig().rpcUrl;
        // const rpcUrl = getMainnetConfig().rpcUrl;
        // const rpc = new IOST.RPC(new IOST.HTTPProvider(rpcUrl));
        // iost.setRPC(rpc);

        let account = new IOST.Account(val);
        iost.setAccount(account);

        var tokenAmount = $("#pmineAmtBuy").val();

        if(tokenAmount) {
            $("#statusBuyMsg").html('');
            const tx = iost.callABI("ContractC3DW2h2qVyuFdzo3aKhN8Lhc8Jcp8wetYNvayKyhCjQq", "buyToken", [tokenAmount.toString()]);
            tx.addApprove("iost", "100000");
            // const chainId = getMainnetConfig().chainId;
            // tx.setChainID(chainId);

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
        iost = window.IWalletJS.newIOST(IOST);

        // const rpcUrl = getMainnetConfig().rpcUrl;
        // const rpcUrl = getMainnetConfig().rpcUrl;
        // const rpc = new IOST.RPC(new IOST.HTTPProvider(rpcUrl));
        // iost.setRPC(rpc);

        let account = new IOST.Account(val);
        iost.setAccount(account);

        var tokenAmount = $("#pmineAmtSell").val();

        if(tokenAmount) {
            const tx = iost.callABI("ContractC3DW2h2qVyuFdzo3aKhN8Lhc8Jcp8wetYNvayKyhCjQq", "sellToken", [tokenAmount.toString()]);
            tx.addApprove("pmine", tokenAmount.toString());
            // const chainId = getMainnetConfig().chainId;
            // tx.setChainID(chainId);

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