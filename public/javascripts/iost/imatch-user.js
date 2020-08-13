window.onload = () => {
    getTokens()
    getRichList()
    updatePminePrice()
    hideAdminHeader()
    getTotalStaked()
    // getCMCPrices()
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

function getTokens () {
    const fetchToken = () => {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById('token-value').innerText = parseFloat(1000 - xhttp.responseText).toFixed(0);
            }
        };
        xhttp.open("GET", "/imatch/circulation", true);
        xhttp.send();
    }

    fetchToken()
    setInterval(fetchToken, 10 * 60 * 1000)
}

function getTotalStaked() {
    const fetchTokenStaked = () => {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {

                try {
                    window.IWalletJS.enable()
                        .then(account => {

                            if (!account) return;
                            getUserBalance(account);
                            document.getElementById("account-logged-in").innerHTML = `
                <b><span style="font-size: 14px">Logged In: </span></b> ${account}`

                        })
                        .catch(err => {
                            document.getElementById("account-logged-in").innerHTML = `
                <b><span style="font-size: 14px">Logged In: </span></b> n/a`
                            return;
                        });
                } catch (error) {
                    document.getElementById("account-logged-in").innerHTML = `
                <b><span style="font-size: 14px">Logged In: </span></b> n/a`
                    return;
                }

                document.getElementById("staked-msg").innerHTML = `
                <b><span style="font-size: 14px">Total Staked: </span></b> ${parseFloat(xhttp.responseText).toFixed(4)} iMatch`
            }
        };
        xhttp.open("GET", "/imatch/totalStaked", true);
        xhttp.send();
    }

    fetchTokenStaked()
    setInterval(fetchTokenStaked, 10 * 60 * 1000)
}

function getUserBalance(account){

    try {
        fetch('https://api.iost.io/getTokenBalance/' + account  + '/imatch/true').then(res => res.json()).then(json => {
            document.getElementById("user-iMatch-balance").innerHTML = `
                                <b><span style="font-size: 14px">Your Wallet: </span></b> ${(parseFloat(json.balance).toFixed(4))} iMatch`


        }).catch(err => {
            document.getElementById("user-iMatch-balance").innerHTML = `
                                <b><span style="font-size: 14px">Your Wallet: </span></b> ${((0).toFixed(4))} iMatch`

        })
        fetch('https://api.iost.io/getTokenBalance/' + account + '/iost/true').then(res => res.json()).then(json => {

            document.getElementById("exchange-logged-in").innerHTML = `
                <b><span style="font-size: 14px">Logged In: </span></b> ${account}`
        }).catch(err => {

            document.getElementById("exchange-logged-in").innerHTML = `
                <b><span style="font-size: 14px">Logged In: </span></b> ${'n/a'}`
        })
    } catch (e) {
        document.getElementById("user-pmine-balance").innerHTML = `
                                <b><span style="font-size: 14px">Your Wallet: </span></b> ${((0).toFixed(4))} iMatch`
        document.getElementById("exchange-logged-in").innerHTML = `
                <b><span style="font-size: 14px">Logged In: </span></b> ${'n/a'}`
        document.getElementById("exchange-pmine-balance").innerHTML = `
                                <b><span style="font-size: 14px">iMatch Balance: </span></b> ${((0).toFixed(4))} iMatch`
    }

}

function getRichList () {

    const fetchPmineRichlist = () => {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let richlist = JSON.parse(xhttp.responseText);

                try {
                    window.IWalletJS.enable()
                        .then(account => {

                            if (!account) return;
                            var user = richlist.find(e => e.account === account);

                            document.getElementById("user-staked-balance").innerHTML = `
                                <b><span style="font-size: 14px">You Staked: </span></b> ${parseFloat(user.balance).toFixed(4)} iMatch`


                        })
                        .catch(err => {
                            document.getElementById("user-staked-balance").innerHTML = `
                                <b><span style="font-size: 14px">You Staked: </span></b> ${(0).toFixed(4)} iMatch`
                            return;
                        });
                } catch (error) {
                    document.getElementById("user-staked-balance").innerHTML = `
                                <b><span style="font-size: 14px">You Staked: </span></b> ${(0).toFixed(4)} iMatch`
                    return;
                }

                while (richlist.length < 20) {
                    richlist.push({ account: 'N/A', balance: 'N/A', percent: 'N/A' });
                }


                let tablebody1 = ``, tablebody2 = ``

                for (let i in richlist) {
                    if (i <= 9) {
                        tablebody1 += `
                        <tr>
                            <td data-label="RANK">${i * 1 +1}.</td>
                            <td data-label="ADDRESS"><b>${richlist[i].account}***</b></td>
                            <td data-label="AMOUNT">${(richlist[i].balance *1).toFixed(4)}</td>
                            <td data-label="HOLDING">${(richlist[i].percent * 100).toFixed(2)} %</td>
                        </tr>
                        `
                    } else if(i>9 && i<20) {
                        tablebody2 += `
                        <tr>
                            <td data-label="RANK">${i * 1 +1}.</td>
                            <td data-label="ADDRESS"><b>${richlist[i].account}***</b></td>
                            <td data-label="AMOUNT">${(richlist[i].balance*1).toFixed(4)}</td>
                            <td data-label="HOLDING">${(richlist[i].percent * 100).toFixed(2)} %</td>
                        </tr>
                        `
                    }
                }

                document.getElementById('iMatch-table-body').innerHTML = tablebody1
                document.getElementById('iMatch-table2-body').innerHTML = tablebody2
            }
        };
        xhttp.open("GET", "/imatch/richlist", true);
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
            url: '/imatch/getiMatchPrice',
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
            url: '/imatch/getiMatchPrice',
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
            url: '/imatch/getiMatchPrice',
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
            url: '/imatch/getiMatchPrice',
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
            url: '/imatch/getiMatchPrice',
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
        const defaultConfig = {
            gasRatio: 1,
            gasLimit: 2000000,
            delay: 0,
            expiration: 60,
            defaultLimit: "unlimited"
        };

        iost.config = defaultConfig;

        var tokenAmount = $("#pmineAmtBuy").val();

        if(tokenAmount) {
            $("#statusBuyMsg").html('');
            const tx = iost.callABI("Contract6EXwvev8u8gqiLPqkfr7XXCpiA6VhVxiAqTZcWjuEwV2", "buyToken", [tokenAmount.toString()]);
            tx.addApprove("iost", "1000000");

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


$(document).on("click", "#stakeBtn", function () {
    if (!window.IWalletJS) {
        $("#statusStakeMsg").html('<div class="alert alert-warning">You need to install <a style="color: #fcc56e;"  href="https://chrome.google.com/webstore/detail/iwallet/kncchdigobghenbbaddojjnnaogfppfj">iWallet Chrome Extension</a>.</div>');
        return;
    }
    window.IWalletJS.enable().then(function (val) {
        $("#statusStakeMsg").html('');
        iost = window.IWalletJS.newIOST(IOST);

        let account = new IOST.Account(val);
        iost.setAccount(account);
        const defaultConfig = {
            gasRatio: 1,
            gasLimit: 800000,
            delay: 0,
            expiration: 60,
            defaultLimit: "unlimited"
        };

        iost.config = defaultConfig;
        var tokenAmount = $("#iMatchAmtStake").val();

        if (tokenAmount) {
            const tx = iost.callABI("Contract6EXwvev8u8gqiLPqkfr7XXCpiA6VhVxiAqTZcWjuEwV2", "stake", [tokenAmount.toString()]);
            tx.addApprove("imatch", tokenAmount.toString());

            iost.signAndSend(tx).on('pending', function (txid) {
                console.log("======>pending", txid);
                $(".page-loader").show();
                $(".loader-inner").show();
            }).on('success', function (result) {
                console.log('======>sell success', result);
                $(".page-loader").hide();
                $("#statusStakeMsg").html('<div class="alert alert-success">Successfully staked. Please check your wallet</div>');
                getRichList();
                getTotalStaked();
            }).on('failed', function (result) {
                console.log('======>failed', result);
                $(".page-loader").hide();
                $("#statusStakeMsg").html('<div class="alert alert-warning">' + result.message + '</div>');

            });
        } else {
            $("#statusStakeMsg").html('<div class="alert alert-warning">Please input stake amount.</div>');
        }


    }).catch(error => {
        if (error.type == "locked")
            $("#statusSellMsg").html('<div class="alert alert-warning">Unlock your iWallet Extension.</div>');
    });
});

$(document).on("click", "#unstakeBtn", function () {
    if (!window.IWalletJS) {
        $("#statusStakeMsg").html('<div class="alert alert-warning">You need to install <a style="color: #fcc56e;"  href="https://chrome.google.com/webstore/detail/iwallet/kncchdigobghenbbaddojjnnaogfppfj">iWallet Chrome Extension</a>.</div>');
        return;
    }
    window.IWalletJS.enable().then(function (val) {
        $("#statusStakeMsg").html('');
        iost = window.IWalletJS.newIOST(IOST);

        let account = new IOST.Account(val);
        iost.setAccount(account);
        const defaultConfig = {
            gasRatio: 1,
            gasLimit: 800000,
            delay: 0,
            expiration: 60,
            defaultLimit: "unlimited"
        };

        iost.config = defaultConfig;

        var tokenAmount = $("#iMatchAmtStake").val();

        if (tokenAmount) {
            const tx = iost.callABI("Contract6EXwvev8u8gqiLPqkfr7XXCpiA6VhVxiAqTZcWjuEwV2", "unstake", [tokenAmount.toString()]);
            tx.addApprove("imatch", tokenAmount.toString());

            iost.signAndSend(tx).on('pending', function (txid) {
                console.log("======>pending", txid);
                $(".page-loader").show();
                $(".loader-inner").show();
            }).on('success', function (result) {
                console.log('======>unstake success', result);
                $(".page-loader").hide();
                $("#statusStakeMsg").html('<div class="alert alert-success">Successfully unstaked. Please check your wallet</div>');
                getRichList();
                getTotalStaked();
            }).on('failed', function (result) {
                console.log('======>failed', result);
                $(".page-loader").hide();
                $("#statusStakeMsg").html('<div class="alert alert-warning">' + result.message + '</div>');
            });
        } else {
            $("#statusStakeMsg").html('<div class="alert alert-warning">Please input unstake amount.</div>');
        }


    }).catch(error => {
        if (error.type == "locked")
            $("#statusSellMsg").html('<div class="alert alert-warning">Unlock your iWallet Extension.</div>');
    });
});

function getCMCPrices () {
    const _getCMCPrices = () => {
        $.ajax({
            url: '/imatch/getCMCPrices',
            type: 'GET',
            data: {},
            dataType: 'json',
            success: function(response) {
                var prices = response;
                replaceCMCPrices(prices)
            }
        })
    }

    _getCMCPrices()
    setInterval(_getCMCPrices, 60 * 1000)
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