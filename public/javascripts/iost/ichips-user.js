window.onload = () => {
    getTokens()
    getRichList()
    updateiChipPrice()
    hideAdminHeader()
    getTotalStaked()
}

function hideAdminHeader() {
    if(!window.IWalletJS) {
        $("#menu-item-139").hide();
    } else {
        window.IWalletJS.enable().then(function (val) {
            console.log(val)
            if(val !== 'powermine' && val !== 'pmine_admin')
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
                document.getElementById('token-value').innerText = parseFloat(1000 - xhttp.responseText).toFixed(0);
                document.getElementById("iChip-token-msg").innerHTML = `Smart Contract holds a total of <b><span style="font-size: 18px">${parseFloat(xhttp.responseText).toFixed(4)}</span></b> iChip tokens out of <b>1,000</b>. 
                There are <b><span style="font-size: 18px">${parseFloat(1000 - xhttp.responseText).toFixed(4)}</span></b> iChip in circulation.`;
            }
        };
        xhttp.open("GET", "/iChip/circulation", true);
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
                <b><span style="font-size: 14px">Total Staked: </span></b> ${parseFloat(xhttp.responseText).toFixed(4)} iChip`
            }
        };
        xhttp.open("GET", "/iChip/totalStaked", true);
        xhttp.send();
    }

    fetchTokenStaked()
    setInterval(fetchTokenStaked, 10 * 60 * 1000)
}

function getUserBalance(account){

    try {
        fetch('https://api.iost.io/getTokenBalance/' + account  + '/ichips/true').then(res => res.json()).then(json => {
            document.getElementById("user-iChip-balance").innerHTML = `
                                <b><span style="font-size: 14px">Your Wallet: </span></b> ${(parseFloat(json.balance).toFixed(4))} iChip`

            document.getElementById("exchange-iChip-balance").innerHTML = `
                                <b><span style="font-size: 14px">iChip Balance: </span></b> ${(parseFloat(json.balance).toFixed(4))} iChip`
        }).catch(err => {
            document.getElementById("user-iChip-balance").innerHTML = `
                                <b><span style="font-size: 14px">Your Wallet: </span></b> ${((0).toFixed(4))} iChip`
            document.getElementById("exchange-iChip-balance").innerHTML = `
                                <b><span style="font-size: 14px">iChip Balance: </span></b> ${((0).toFixed(4))} iChip`
        })
        fetch('https://api.iost.io/getTokenBalance/' + account + '/iost/true').then(res => res.json()).then(json => {
            document.getElementById("exchange-iost-balance").innerHTML = `
                                <b><span style="font-size: 14px">IOST Balance: </span></b> ${(parseFloat(json.balance).toFixed(4))} IOST`
            document.getElementById("exchange-logged-in").innerHTML = `
                <b><span style="font-size: 14px">Logged In: </span></b> ${account}`
        }).catch(err => {
            document.getElementById("exchange-iost-balance").innerHTML = `
                                <b><span style="font-size: 14px">IOST Balance: </span></b> ${((0).toFixed(4))} IOST`
            document.getElementById("exchange-logged-in").innerHTML = `
                <b><span style="font-size: 14px">Logged In: </span></b> ${'n/a'}`
        })
    } catch (e) {
        document.getElementById("user-iChip-balance").innerHTML = `
                                <b><span style="font-size: 14px">Your Wallet: </span></b> ${((0).toFixed(4))} iChip`
        document.getElementById("exchange-logged-in").innerHTML = `
                <b><span style="font-size: 14px">Logged In: </span></b> ${'n/a'}`
        document.getElementById("exchange-iChip-balance").innerHTML = `
                                <b><span style="font-size: 14px">iChip Balance: </span></b> ${((0).toFixed(4))} iChip`
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
                                <b><span style="font-size: 14px">You Staked: </span></b> ${parseFloat(user.balance).toFixed(4)} iChip`


                        })
                        .catch(err => {
                            document.getElementById("user-staked-balance").innerHTML = `
                                <b><span style="font-size: 14px">You Staked: </span></b> ${(0).toFixed(4)} iChip`
                            return;
                        });
                } catch (error) {
                    document.getElementById("user-staked-balance").innerHTML = `
                                <b><span style="font-size: 14px">You Staked: </span></b> ${(0).toFixed(4)} iChip`
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

                document.getElementById('iChip-table-body').innerHTML = tablebody1
                document.getElementById('iChip-table2-body').innerHTML = tablebody2
            }
        };
        xhttp.open("GET", "/iChip/richlist", true);
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
            url: '/iChip/getiChipPrice',
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
            url: '/iChip/getiChipPrice',
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
            url: '/iChip/getiChipPrice',
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
            url: '/iChip/getiChipPrice',
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

function updateiChipPrice () {
    const getTokenPrice = () => {
        $.ajax({
            url: '/iChip/getiChipPrice',
            type: 'GET',
            data: {},
            dataType: 'json',
            success: function(response) {
                var price = response.data;
                $("#iChipPrice").html((price*1).toFixed(2))
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

        var tokenAmount = $("#iChipAmtBuy").val();

        if(tokenAmount) {
            $("#statusBuyMsg").html('');
            const tx = iost.callABI("ContractDYPoVRRYvRBbJGoBGfSY1TBmkT7AwDFAUWTbi3sFAa3E", "buyToken", [tokenAmount.toString()]);
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
        var tokenAmount = $("#iChipAmtStake").val();

        if (tokenAmount) {
            const tx = iost.callABI("ContractDYPoVRRYvRBbJGoBGfSY1TBmkT7AwDFAUWTbi3sFAa3E", "stake", [tokenAmount.toString()]);
            tx.addApprove("ichips", tokenAmount.toString());

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

        var tokenAmount = $("#iChipAmtStake").val();

        if (tokenAmount) {
            const tx = iost.callABI("ContractDYPoVRRYvRBbJGoBGfSY1TBmkT7AwDFAUWTbi3sFAa3E", "unstake", [tokenAmount.toString()]);
            tx.addApprove("ichips", tokenAmount.toString());

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
