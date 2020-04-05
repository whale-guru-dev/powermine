window.onload = () => {
    getTokens()
    getRichList()
    hideAdminHeader()
}

function hideAdminHeader() {
    window.IWalletJS.enable().then(function (val) {
        console.log(val)
        if(val !== 'powermine')
            $("#menu-item-139").hide();
    });
}

function getTokens () {
    const fetchToken = () => {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById('token-value').innerText = parseFloat(20000 - xhttp.responseText).toFixed(0)
                document.getElementById("token-msg").innerHTML = `
                PowerMine account holds a total of <b><span style="font-size: 18px">${parseFloat(xhttp.responseText).toFixed(4)}</span></b> pmine tokens out of <b>20,000</b>. 
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


$("#pmineAmt").bind("paste keyup", function (event) {
    var _this = this;

    setTimeout(function () {
        var pmineAmount = $("#pmineAmt").val();
        $("#buyOrSellAmt").val((pmineAmount * 1).toFixed(8));

        $.ajax({
            url: '/iost/getPminePrice',
            type: 'GET',
            data: {},
            dataType: 'json',
            success: function(response) {
                var price = response.data;
                var iostAmount = (pmineAmount * price).toFixed(8);
                $("#iostAmt").val(iostAmount);
            }
        })
    }, 100);
});

$("#iostAmt").bind("paste keyup", function (event) {
    var _this = this;

    setTimeout(function () {
        var iostAmount = $("#iostAmt").val();

        $.ajax({
            url: '/iost/getPminePrice',
            type: 'GET',
            data: {},
            dataType: 'json',
            success: function(response) {
                var price = response.data;
                var pmineAmount = (iostAmount / price).toFixed(8);
                $("#pmineAmt").val(pmineAmount);
                $("#buyOrSellAmt").val(pmineAmount);
            }
        })
    }, 100);
});
