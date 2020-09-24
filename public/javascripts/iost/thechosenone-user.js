window.onload = () => {
    showDisclaimerModal();
    getTotalStakedPmine();
    getBurntTokens();
}

function showDisclaimerModal() {
    $('#disclaimerModal').modal({show: true});
}

function getTotalStakedPmine () {
    const fetchToken = () => {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById('total_pmine').innerText = `${parseFloat(xhttp.responseText).toFixed(4)} PMINE`;
            }
        };
        xhttp.open("GET", "/iost/totalStaked", true);
        xhttp.send();
    }

    fetchToken()
    setInterval(fetchToken, 10 * 60 * 1000)
}

function getBurntTokens () {
    const fetchBurntToken = () => {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById('pmine_burnt').innerText = `${parseFloat(JSON.parse(xhttp.responseText).balance).toFixed(0)} PMINE`;
            }
        };
        xhttp.open("GET", "https://api.iost.io/getTokenBalance/pmine_admin/pmine/true", true);
        xhttp.send();
    };

    fetchBurntToken();
    setInterval(fetchBurntToken, 10 * 60 * 1000)
}