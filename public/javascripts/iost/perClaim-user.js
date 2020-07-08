window.onload = () => {
    getTotalStaked();
    getRichList();
};

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
                <b><span style="font-size: 14px">Total Staked: </span></b> ${parseFloat(xhttp.responseText).toFixed(4)} PMINE`
            }
        };
        xhttp.open("GET", "/iost/totalStaked", true);
        xhttp.send();
    }

    fetchTokenStaked()
    setInterval(fetchTokenStaked, 10 * 60 * 1000)
}

async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
        credentials: 'omit',
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response; // parses JSON response into native JavaScript objects
}

function getUserBalance(account){

    try {
        fetch('https://api.iost.io/getTokenBalance/' + account  + '/pmine/true').then(res => res.json()).then(json => {
            document.getElementById("user-pmine-balance").innerHTML = `
                                <b><span style="font-size: 14px">Your Wallet: </span></b> ${(parseFloat(json.balance).toFixed(4))} PMINE`

            // document.getElementById("exchange-pmine-balance").innerHTML = `
            //                 <b><span style="font-size: 14px">PMINE Balance: </span></b> ${(parseFloat(json.balance).toFixed(4))} PMINE`
        }).catch(err => {
            document.getElementById("user-pmine-balance").innerHTML = `
                                <b><span style="font-size: 14px">Your Wallet: </span></b> ${((0).toFixed(4))} PMINE`
            document.getElementById("exchange-pmine-balance").innerHTML = `
                                <b><span style="font-size: 14px">PMINE Balance: </span></b> ${((0).toFixed(4))} PMINE`
        })
        fetch('https://api.iost.io/getTokenBalance/' + account + '/iost/true').then(res => res.json()).then(json => {
            document.getElementById("exchange-iost-balance").innerHTML = `
                                <b><span style="font-size: 14px">IOST Balance: </span></b> ${(parseFloat(json.balance).toFixed(4))} IOST`
            // document.getElementById("exchange-logged-in").innerHTML = `
            // <b><span style="font-size: 14px">Logged In: </span></b> ${account}`
        }).catch(err => {
            document.getElementById("exchange-iost-balance").innerHTML = `
                                <b><span style="font-size: 14px">IOST Balance: </span></b> ${((0).toFixed(4))} IOST`
            document.getElementById("exchange-logged-in").innerHTML = `
                <b><span style="font-size: 14px">Logged In: </span></b> ${'n/a'}`
        })

        fetch('https://api.iost.io/getContractStorage/', {
            method: 'post',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
            credentials: 'omit',
            body: JSON.stringify({
                id: "ContractC3DW2h2qVyuFdzo3aKhN8Lhc8Jcp8wetYNvayKyhCjQq", key: "userPerReward", field: account, by_longest_chain: true})
        }).then(res => res.json()).then(json => {
            document.getElementById("per-claim").innerHTML = `
                                <b><span style="font-size: 14px">PER unclaimed: </span></b> ${(parseFloat(json.data).toFixed(4))} PER`

        }).catch(err => {
            document.getElementById("per-claim").innerHTML = `
                                <b><span style="font-size: 14px">PER unclaimed: </span></b> ${((0).toFixed(4))} PER`

        })
    } catch (e) {
        document.getElementById("user-pmine-balance").innerHTML = `
                                <b><span style="font-size: 14px">Your Wallet: </span></b> ${((0).toFixed(4))} PMINE`
        document.getElementById("exchange-logged-in").innerHTML = `
                <b><span style="font-size: 14px">Logged In: </span></b> ${'n/a'}`
        document.getElementById("exchange-pmine-balance").innerHTML = `
                                <b><span style="font-size: 14px">PMINE Balance: </span></b> ${((0).toFixed(4))} PMINE`
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
                                <b><span style="font-size: 14px">You Staked: </span></b> ${parseFloat(user.balance).toFixed(4)} PMINE`


                        })
                        .catch(err => {
                            document.getElementById("user-staked-balance").innerHTML = `
                                <b><span style="font-size: 14px">You Staked: </span></b> ${(0).toFixed(4)} PMINE`
                            return;
                        });
                } catch (error) {
                    document.getElementById("user-staked-balance").innerHTML = `
                                <b><span style="font-size: 14px">You Staked: </span></b> ${(0).toFixed(4)} PMINE`
                    return;
                }

                while (richlist.length < 20) {
                    richlist.push({ account: 'N/A', balance: 'N/A', percent: 'N/A' });
                }

            }
        };
        xhttp.open("GET", "/iost/richlist", true);
        xhttp.send();
    }

    fetchPmineRichlist()
    setInterval(fetchPmineRichlist, 10 * 60 * 1000)
}

$(document).on("click", "#claimBtn", function () {
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


        const tx = iost.callABI("ContractC3DW2h2qVyuFdzo3aKhN8Lhc8Jcp8wetYNvayKyhCjQq", "claimPer", []);
        tx.addApprove("per", tokenAmount.toString());

        iost.signAndSend(tx).on('pending', function (txid) {
            console.log("======>pending", txid);
            $(".page-loader").show();
            $(".loader-inner").show();
        }).on('success', function (result) {
            console.log('======>unstake success', result);
            $(".page-loader").hide();
            $("#statusStakeMsg").html('<div class="alert alert-success">Successfully claimed per. Please check your wallet</div>');
            getRichList();
            getTotalStaked();
        }).on('failed', function (result) {
            console.log('======>failed', result);
            $(".page-loader").hide();
            $("#statusStakeMsg").html('<div class="alert alert-warning">' + result.message + '</div>');
        });


    }).catch(error => {
        if (error.type == "locked")
            $("#statusStakeMsg").html('<div class="alert alert-warning">Unlock your iWallet Extension.</div>');
    });
});

const items = document.querySelectorAll(".accordion button");

function toggleAccordion() {
    const itemToggle = this.getAttribute('aria-expanded');

    for (i = 0; i < items.length; i++) {
        items[i].setAttribute('aria-expanded', 'false');
    }

    if (itemToggle == 'false') {
        this.setAttribute('aria-expanded', 'true');
    }
}

items.forEach(item => item.addEventListener('click', toggleAccordion));