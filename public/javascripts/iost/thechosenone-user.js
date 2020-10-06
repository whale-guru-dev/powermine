window.onload = () => {
    showDisclaimerModal();
    getTotalStakedPmine();
    getBurntTokens();
    getAccountDetail();
    getPreviousPlayersList();
    getPreviousRoundList();
    getKingOfRenown();
    getKingOfWeek();
    getSittingKing();
    getUserStats();
    getRoundNumber();
}

function showDisclaimerModal() {
    $('#disclaimerModal').modal({show: true});
}

function getTotalStakedPmine() {
    const fetchToken = () => {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById('pmine_staked_contract').innerText = `${parseFloat(JSON.parse(xhttp.responseText).balance).toFixed(4)} PMINE`;
            }
        };
        xhttp.open("GET", "https://api.iost.io/getTokenBalance/ContractABxHhYQnWrjJjiRVH5gqwtsKuveGqQTAwp88DWd4hfca/pmine/true", true);
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
                document.getElementById('pmine_burnt_total').innerText = `${parseFloat(JSON.parse(xhttp.responseText).balance).toFixed(0)} PMINE`;
            }
        };
        xhttp.open("GET", "https://api.iost.io/getTokenBalance/pmine_admin/pmine/true", true);
        xhttp.send();
    };

    fetchBurntToken();
    setInterval(fetchBurntToken, 10 * 60 * 1000)
}

function getAccountDetail() {
    const fetchAccountDetail = () => {
        try {
            window.IWalletJS.enable()
                .then(account => {
                    if (!account) return;
                    getUserBalance(account);
                    document.getElementById("accountName").innerHTML = `${account}`
                })
                .catch(err => {
                    document.getElementById("accountName").innerHTML = `n/a`
                    return;
                });
        } catch (error) {
            document.getElementById("accountName").innerHTML = `n/a`
            return;
        }
    }

    fetchAccountDetail()
    setInterval(fetchAccountDetail, 10 * 60 * 1000)
}

function getUserBalance(account){

    try {
        fetch('https://api.iost.io/getTokenBalance/' + account  + '/iost/true').then(res => res.json()).then(json => {
            document.getElementById("accountIostBalance").innerHTML = `${(parseFloat(json.balance).toFixed(4))} iost`;

        }).catch(err => {
            document.getElementById("accountIostBalance").innerHTML = `${((0).toFixed(4))} iost`;
        })

        // fetch('https://api.iost.io/getTokenBalance/' + account + '/pmine/true').then(res => res.json()).then(json => {
        //     document.getElementById("accountPmineBalance").innerHTML = `${(parseFloat(json.balance).toFixed(4))} pmine`;
        // }).catch(err => {
        //     document.getElementById("accountPmineBalance").innerHTML = `${((0).toFixed(4))} pmine`;
        // })
    } catch (e) {
        document.getElementById("accountIostBalance").innerHTML = `${(parseFloat(json.balance).toFixed(4))} iost`;
        // document.getElementById("accountPmineBalance").innerHTML = `${((0).toFixed(4))} pmine`;
    }

}


function getPreviousPlayersList () {
    const fetchPreviousPlayersList = () => {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(xhttp.responseText);
                var list = JSON.parse(xhttp.responseText);
                if(list.length > 0) {
                    $("#kingVal").html(list[0]);
                    $("#knightVal1").html(list[1]);
                    $("#knightVal2").html(list[2]);
                    $("#knightVal3").html(list[3]);
                    $("#knightVal4").html(list[4]);
                }
            }
        };
        xhttp.open("GET", "/thechosenone/previous_players_list", true);
        xhttp.send();
    }

    fetchPreviousPlayersList()
    setInterval(fetchPreviousPlayersList, 10 * 60 * 1000)
}

function getPreviousRoundList () {
    const fetchPreviousRoundList = () => {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(xhttp.responseText);
                var list = JSON.parse(xhttp.responseText);
                if(list.length > 0) {
                    $("#kingVal1").html(list[0]);
                    $("#knightVal11").html(list[1]);
                    $("#knightVal21").html(list[2]);
                    $("#knightVal31").html(list[3]);
                    $("#knightVal41").html(list[4]);
                }
            }
        };
        xhttp.open("GET", "/thechosenone/previous_round_list", true);
        xhttp.send();
    }

    fetchPreviousRoundList()
    setInterval(fetchPreviousRoundList, 10 * 60 * 1000)
}

function getKingOfRenown () {
    const fetchKingOfRenown = () => {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                $("#king_known").html(JSON.parse(xhttp.responseText).king);
            }
        };
        xhttp.open("GET", "/thechosenone/king_of_renown", true);
        xhttp.send();
    }

    fetchKingOfRenown()
    setInterval(fetchKingOfRenown, 10 * 60 * 1000)
}

function getKingOfWeek () {
    const fetchKingOfWeek = () => {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                $("#king_week").html(JSON.parse(xhttp.responseText).king);
            }
        };
        xhttp.open("GET", "/thechosenone/king_of_week", true);
        xhttp.send();
    }

    fetchKingOfWeek()
    setInterval(fetchKingOfWeek, 10 * 60 * 1000)
}

function getSittingKing () {
    const fetchSittingKing = () => {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var kingText = JSON.parse(xhttp.responseText).king?JSON.parse(xhttp.responseText).king:xhttp.responseText;
                $("#sitting_king").html(kingText);
            }
        };
        xhttp.open("GET", "/thechosenone/sitting_king", true);
        xhttp.send();
    }

    fetchSittingKing()
    setInterval(fetchSittingKing, 10 * 60 * 1000)
}

function getRoundNumber () {
    const fetchRoundNumber = () => {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                $("#roundNumber").html(xhttp.responseText);
            }
        };
        xhttp.open("GET", "/thechosenone/get_round_number", true);
        xhttp.send();
    }

    fetchRoundNumber()
    setInterval(fetchRoundNumber, 10 * 60 * 1000)
}

function getUserStats () {
    const fetchUserStats = () => {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var userStats = JSON.parse(xhttp.responseText);
                userStats.sort(function (a, b) {
                    return b.wins - a.wins;
                });
                var userStatsTableHtml = "";
                var countKingTableHtml = "";
                var countWinTableHtml = "";
                userStats.forEach((each, index) => {
                    userStatsTableHtml += '<tr>\n' +
                        '<td>'+each.user+'</td>\n' +
                        '<td>'+each.wins+'</td>\n' +
                        '<td>'+each.loss+'</td>\n' +
                        '</tr>'

                    countKingTableHtml += '<tr>\n' +
                        '<td>'+each.user+'</td>\n' +
                        '<td>'+each.kings+'</td>\n' +
                        '</tr>';

                    countWinTableHtml += '<tr>\n' +
                        '<td>#'+(index+1)+'</td>\n' +
                        '<td>'+each.user+'</td>\n' +
                        '</tr>';
                });


                $("#userStatsTable").html(userStatsTableHtml);
                $("#countKingTable").html(countKingTableHtml);
                $("#countWinTable").html(countWinTableHtml);
            }
        };
        xhttp.open("GET", "/thechosenone/get_user_stats", true);
        xhttp.send();
    }

    fetchUserStats()
    setInterval(fetchUserStats, 10 * 60 * 1000)
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

            getAccountDetail();
            getPreviousPlayersList();
            getPreviousRoundList();
            getKingOfRenown();
            getKingOfWeek();
            getSittingKing();
            getUserStats();
            getRoundNumber();
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
            $("#statusBuyMsg").html('<div class="alert alert-success">Successfully dethroned the king</div>');
        }).on('failed', function (result) {
            console.log('======>failed', result);
            $(".page-loader").hide();
            $("#statusBuyMsg").html('<div class="alert alert-warning">Failed To Dethrone the King</div>');
        });

    }).catch(error => {
        if (error.type == "locked")
            $("#statusBuyMsg").html('<div class="alert alert-warning">Unlock your iWallet Extension.</div>');
    });

});