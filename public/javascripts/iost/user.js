window.onload = () => {
    getTokens()
    getRichList()
    updatePminePrice()
    hideAdminHeader()
    getCMCPrices()
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
            }
        })
    }, 100);
});

$("#pmineAmtSell").bind("paste keyup", function (event) {
    var _this = this;

    setTimeout(function () {
        var pmineAmount = $("#pmineAmtSell").val();

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

        let account = new IOST.Account(val);
        iost.setAccount(account);

        var tokenAmount = $("#pmineAmtBuy").val();

        if(tokenAmount) {
            $("#statusBuyMsg").html('');
            const tx = iost.callABI("ContractC3DW2h2qVyuFdzo3aKhN8Lhc8Jcp8wetYNvayKyhCjQq", "buyToken", [tokenAmount.toString()]);
            tx.addApprove("iost", "100000");

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

        let account = new IOST.Account(val);
        iost.setAccount(account);

        var tokenAmount = $("#pmineAmtSell").val();

        if(tokenAmount) {
            const tx = iost.callABI("ContractC3DW2h2qVyuFdzo3aKhN8Lhc8Jcp8wetYNvayKyhCjQq", "sellToken", [tokenAmount.toString()]);
            tx.addApprove("pmine", tokenAmount.toString());

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

function getCMCPrices () {
    const _getCMCPrices = () => {
        $.ajax({
            url: '/iost/getCMCPrices',
            type: 'GET',
            data: {},
            dataType: 'json',
            success: function(response) {
                var prices = response;
                replaceCMCPrices(prices)
            }
        })
    }

    // _getCMCPrices()
    // setInterval(_getCMCPrices, 60 * 1000)
}

function replaceCMCPrices(data) {
    data.forEach((coin) => {
        if(coin.symbol === 'BTC') {
            $("#usd_btc_price").html('$' + coin.quote.USD.price.toFixed(2));
            $("#eur_btc_price").html('€' + coin.quote.EUR.price.toFixed(2));
            $("#gbp_btc_price").html('£' + coin.quote.GBP.price.toFixed(2));
            $("#cny_btc_price").html('¥' + coin.quote.CNY.price.toFixed(2));
            $("#usd_btc_price_change").html('(' + coin.quote.USD.percent_change_24h.toFixed(2) + '%)');
            $("#eur_btc_price_change").html('(' + coin.quote.EUR.percent_change_24h.toFixed(2) + '%)');
            $("#gbp_btc_price_change").html('(' + coin.quote.GBP.percent_change_24h.toFixed(2) + '%)');
            $("#cny_btc_price_change").html('(' + coin.quote.CNY.percent_change_24h.toFixed(2) + '%)');
            if(coin.quote.USD.percent_change_24h > 0) {
                $("#usd_btc_price_change").css('color', 'rgb(32, 133, 55)');
                $("#usd_btc_price").css('color', 'rgb(32, 133, 55)');
            } else {
                $("#usd_btc_price_change").css('color', 'rgb(176, 42, 55)');
                $("#usd_btc_price").css('color', 'rgb(176, 42, 55)');
            }

            if(coin.quote.EUR.percent_change_24h > 0) {
                $("#eur_btc_price_change").css('color', 'rgb(32, 133, 55)');
                $("#eur_btc_price").css('color', 'rgb(176, 42, 55)');
            } else {
                $("#eur_btc_price_change").css('color', 'rgb(176, 42, 55)');
                $("#eur_btc_price").css('color', 'rgb(176, 42, 55)');
            }

            if(coin.quote.GBP.percent_change_24h > 0) {
                $("#gbp_btc_price_change").css('color', 'rgb(32, 133, 55)');
                $("#gbp_btc_price").css('color', 'rgb(32, 133, 55)');
            } else {
                $("#gbp_btc_price_change").css('color', 'rgb(176, 42, 55)');
                $("#gbp_btc_price").css('color', 'rgb(176, 42, 55)');
            }

            if(coin.quote.CNY.percent_change_24h > 0) {
                $("#cny_btc_price_change").css('color', 'rgb(32, 133, 55)');
                $("#cny_btc_price").css('color', 'rgb(32, 133, 55)');
            } else {
                $("#cny_btc_price_change").css('color', 'rgb(176, 42, 55)');
                $("#cny_btc_price").css('color', 'rgb(176, 42, 55)');
            }
        } else if(coin.symbol === 'ETH') {
            $("#usd_eth_price").html('$' + coin.quote.USD.price.toFixed(2));
            $("#eur_eth_price").html('€' + coin.quote.EUR.price.toFixed(2));
            $("#gbp_eth_price").html('£' + coin.quote.GBP.price.toFixed(2));
            $("#cny_eth_price").html('¥' + coin.quote.CNY.price.toFixed(2));
            $("#usd_eth_price_change").html('(' + coin.quote.USD.percent_change_24h.toFixed(2) + '%)');
            $("#eur_eth_price_change").html('(' + coin.quote.EUR.percent_change_24h.toFixed(2) + '%)');
            $("#gbp_eth_price_change").html('(' + coin.quote.GBP.percent_change_24h.toFixed(2) + '%)');
            $("#cny_eth_price_change").html('(' + coin.quote.CNY.percent_change_24h.toFixed(2) + '%)');
            if(coin.quote.USD.percent_change_24h > 0) {
                $("#usd_eth_price_change").css('color', 'rgb(32, 133, 55)');
                $("#usd_eth_price").css('color', 'rgb(32, 133, 55)');
            } else {
                $("#usd_eth_price_change").css('color', 'rgb(176, 42, 55)');
                $("#usd_eth_price").css('color', 'rgb(176, 42, 55)');
            }

            if(coin.quote.EUR.percent_change_24h > 0) {
                $("#eur_eth_price_change").css('color', 'rgb(32, 133, 55)');
                $("#eur_eth_price").css('color', 'rgb(32, 133, 55)');
            } else {
                $("#eur_eth_price_change").css('color', 'rgb(176, 42, 55)');
                $("#eur_eth_price").css('color', 'rgb(176, 42, 55)');
            }

            if(coin.quote.GBP.percent_change_24h > 0) {
                $("#gbp_eth_price_change").css('color', 'rgb(32, 133, 55)');
                $("#gbp_eth_price").css('color', 'rgb(32, 133, 55)');
            } else {
                $("#gbp_eth_price_change").css('color', 'rgb(176, 42, 55)');
                $("#gbp_eth_price").css('color', 'rgb(176, 42, 55)');
            }

            if(coin.quote.CNY.percent_change_24h > 0) {
                $("#cny_eth_price_change").css('color', 'rgb(32, 133, 55)');
                $("#cny_eth_price").css('color', 'rgb(32, 133, 55)');
            } else {
                $("#cny_eth_price_change").css('color', 'rgb(176, 42, 55)');
                $("#cny_eth_price").css('color', 'rgb(176, 42, 55)');
            }
        } else if(coin.symbol === 'TRX') {
            $("#usd_trx_price").html('$' + coin.quote.USD.price.toFixed(5));
            $("#eur_trx_price").html('€' + coin.quote.EUR.price.toFixed(5));
            $("#gbp_trx_price").html('£' + coin.quote.GBP.price.toFixed(5));
            $("#cny_trx_price").html('¥' + coin.quote.CNY.price.toFixed(5));
            $("#usd_trx_price_change").html('(' + coin.quote.USD.percent_change_24h.toFixed(2) + '%)');
            $("#eur_trx_price_change").html('(' + coin.quote.EUR.percent_change_24h.toFixed(2) + '%)');
            $("#gbp_trx_price_change").html('(' + coin.quote.GBP.percent_change_24h.toFixed(2) + '%)');
            $("#cny_trx_price_change").html('(' + coin.quote.CNY.percent_change_24h.toFixed(2) + '%)');
            if(coin.quote.USD.percent_change_24h > 0) {
                $("#usd_trx_price_change").css('color', 'rgb(32, 133, 55)');
                $("#usd_trx_price").css('color', 'rgb(32, 133, 55)');
            } else {
                $("#usd_trx_price_change").css('color', 'rgb(176, 42, 55)');
                $("#usd_trx_price").css('color', 'rgb(176, 42, 55)');
            }

            if(coin.quote.EUR.percent_change_24h > 0) {
                $("#eur_trx_price_change").css('color', 'rgb(32, 133, 55)');
                $("#eur_trx_price").css('color', 'rgb(32, 133, 55)');
            } else {
                $("#eur_trx_price_change").css('color', 'rgb(176, 42, 55)');
                $("#eur_trx_price").css('color', 'rgb(176, 42, 55)');
            }

            if(coin.quote.GBP.percent_change_24h > 0) {
                $("#gbp_trx_price_change").css('color', 'rgb(32, 133, 55)');
                $("#gbp_trx_price").css('color', 'rgb(32, 133, 55)');
            } else {
                $("#gbp_trx_price_change").css('color', 'rgb(176, 42, 55)');
                $("#gbp_trx_price").css('color', 'rgb(176, 42, 55)');
            }

            if(coin.quote.CNY.percent_change_24h > 0) {
                $("#cny_trx_price_change").css('color', 'rgb(32, 133, 55)');
                $("#cny_trx_price").css('color', 'rgb(32, 133, 55)');
            } else {
                $("#cny_trx_price_change").css('color', 'rgb(176, 42, 55)');
                $("#cny_trx_price").css('color', 'rgb(176, 42, 55)');
            }
        } else if(coin.symbol === 'IOST') {
            $("#usd_iost_price").html('$' + coin.quote.USD.price.toFixed(6));
            $("#eur_iost_price").html('€' + coin.quote.EUR.price.toFixed(6));
            $("#gbp_iost_price").html('£' + coin.quote.GBP.price.toFixed(6));
            $("#cny_iost_price").html('¥' + coin.quote.CNY.price.toFixed(6));
            $("#usd_iost_price_change").html('(' + coin.quote.USD.percent_change_24h.toFixed(2) + '%)');
            $("#eur_iost_price_change").html('(' + coin.quote.EUR.percent_change_24h.toFixed(2) + '%)');
            $("#gbp_iost_price_change").html('(' + coin.quote.GBP.percent_change_24h.toFixed(2) + '%)');
            $("#cny_iost_price_change").html('(' + coin.quote.CNY.percent_change_24h.toFixed(2) + '%)');
            if(coin.quote.USD.percent_change_24h > 0) {
                $("#usd_iost_price_change").css('color', 'rgb(32, 133, 55)');
                $("#usd_iost_price").css('color', 'rgb(32, 133, 55)');
            } else {
                $("#usd_iost_price_change").css('color', 'rgb(176, 42, 55)');
                $("#usd_iost_price").css('color', 'rgb(176, 42, 55)');
            }

            if(coin.quote.EUR.percent_change_24h > 0) {
                $("#eur_iost_price_change").css('color', 'rgb(32, 133, 55)');
                $("#eur_iost_price").css('color', 'rgb(32, 133, 55)');
            } else {
                $("#eur_iost_price_change").css('color', 'rgb(176, 42, 55)');
                $("#eur_iost_price").css('color', 'rgb(176, 42, 55)');
            }

            if(coin.quote.GBP.percent_change_24h > 0) {
                $("#gbp_iost_price_change").css('color', 'rgb(32, 133, 55)');
                $("#gbp_iost_price").css('color', 'rgb(32, 133, 55)');
            } else {
                $("#gbp_iost_price_change").css('color', 'rgb(176, 42, 55)');
                $("#gbp_iost_price").css('color', 'rgb(176, 42, 55)');
            }

            if(coin.quote.CNY.percent_change_24h > 0) {
                $("#cny_iost_price_change").css('color', 'rgb(32, 133, 55)');
                $("#cny_iost_price").css('color', 'rgb(32, 133, 55)');
            } else {
                $("#cny_iost_price_change").css('color', 'rgb(176, 42, 55)');
                $("#cny_iost_price").css('color', 'rgb(176, 42, 55)');
            }
        }
    });
}

$(document).on("click", ".exchange-container-tab-header", function() {
    var coinType = $(this).data('tabId');
    if(coinType === 'USD') {
        $("#exchange-container-tab-USD").show();
        $("#exchange-container-tab-EUR").hide();
        $("#exchange-container-tab-GBP").hide();
        $("#exchange-container-tab-CNY").hide();
        $("#tab-usd").addClass('exchange-container-tab-header-select');
        $("#tab-eur").removeClass('exchange-container-tab-header-select');
        $("#tab-cny").removeClass('exchange-container-tab-header-select');
        $("#tab-gbp").removeClass('exchange-container-tab-header-select');
    } else if(coinType === 'EUR') {
        $("#exchange-container-tab-USD").hide();
        $("#exchange-container-tab-EUR").show();
        $("#exchange-container-tab-GBP").hide();
        $("#exchange-container-tab-CNY").hide();
        $("#tab-usd").removeClass('exchange-container-tab-header-select');
        $("#tab-eur").addClass('exchange-container-tab-header-select');
        $("#tab-cny").removeClass('exchange-container-tab-header-select');
        $("#tab-gbp").removeClass('exchange-container-tab-header-select');
    } else if(coinType === 'GBP') {
        $("#exchange-container-tab-USD").hide();
        $("#exchange-container-tab-EUR").hide();
        $("#exchange-container-tab-GBP").show();
        $("#exchange-container-tab-CNY").hide();
        $("#tab-usd").removeClass('exchange-container-tab-header-select');
        $("#tab-eur").removeClass('exchange-container-tab-header-select');
        $("#tab-cny").removeClass('exchange-container-tab-header-select');
        $("#tab-gbp").addClass('exchange-container-tab-header-select');
    } else if(coinType === 'CNY') {
        $("#exchange-container-tab-USD").hide();
        $("#exchange-container-tab-EUR").hide();
        $("#exchange-container-tab-GBP").hide();
        $("#exchange-container-tab-CNY").show();
        $("#tab-usd").removeClass('exchange-container-tab-header-select');
        $("#tab-eur").removeClass('exchange-container-tab-header-select');
        $("#tab-cny").addClass('exchange-container-tab-header-select');
        $("#tab-gbp").removeClass('exchange-container-tab-header-select');
    }

});