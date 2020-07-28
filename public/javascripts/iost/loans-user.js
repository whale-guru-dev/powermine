window.onload = () => {
    hideAdminHeader()
    updateIOSTBalance()
    // updateCollateral()
    updatePMINEBalance()
    updatAccount()

}

function hideAdminHeader() {
    if (!window.IWalletJS) {
        $("#menu-item-139").hide();
        $("#menu-item-1399").hide();
    } else {
        window.IWalletJS.enable().then(function (val) {
            console.log(val)
            if (val !== 'powermine' && val !== 'pmine_admin') {
                $("#menu-item-139").hide();
                $("#menu-item-1399").hide();
            } else if (val === 'powermine' || val === 'pmine_admin') {
                $("#menu-item-139").show();
                $("#menu-item-1399").show();
            }
        }).catch(error => {
            $("#menu-item-139").hide();
            $("#menu-item-1399").hide();
        });
    }
}

const contract = "Contract5BWo6oDbYUEyozmZHYZDQvnkvTSCcm4D1UHe31GKuEyX";
const api = "https://api.iost.io/";

const loanOptions = {
    '1': .6,
    '2': .4,
    '3': .2,
    '4': .6,
    '5': .4,
    '6': .2,
    '7': .6
}

const interest = {
    '1': .1,
    '2': .05,
    '3': 0,
    '4': .03,
    '5': .02,
    '6': 0,
    '7': .01
}

let loanAmount = 0;
let account = null;
let iostVoted = 0;
let iostOnContract = 0;
let iostRewards = 0;
let loanEntries = [];

// const updateCollateral = () => {
//     const updateCollateral_internal = async () => {
//         let price = await getPminePrice();
//
//         var loanAmount = $("#borrow-input").val();
//
//         let option = $("#loan-time").val();
//
//         let collateral = loanAmount / loanOptions[option] / price;
//
//         $("#collateral-input").val(collateral.toFixed(8));
//
//         let ratio = price * (loanOptions[option] ? loanOptions[option] : .6);
//
//         $("#iost-pmine-ratio").html( ratio);
//     }
//
//     updateCollateral_internal()
//     setInterval(updateCollateral_internal, 2000)
// }

$("#borrow-input").bind("paste keyup", async function (event) {
    var _this = this;

    let price = await getPminePrice();

    var loanAmount = $("#borrow-input").val();

    let option = $("#loan-time").val();

    let collateral = loanAmount / loanOptions[option] / price;

    $("#collateral-input").val(collateral.toFixed(8));

    let ratio = price * (loanOptions[option] ? loanOptions[option] : .6);

    $("#iost-pmine-ratio").html( ratio);

});

$("#collateral-input").bind("paste keyup", async function (event) {
    var _this = this;

    let price = await getPminePrice();

    var collateral = $("#collateral-input").val();

    let option = $("#loan-time").val();

    let loanAmount = collateral * loanOptions[option] * price;

    $("#borrow-input").val(loanAmount.toFixed(8));

    let ratio = price * (loanOptions[option] ? loanOptions[option] : .6);

    $("#iost-pmine-ratio").html( ratio);

});

const updatAccount = () => {
    const updateAccount_internal = () => {
        window.IWalletJS.enable()
            .then(accountRes => {
                account = accountRes;

                if(account === "pmine_admin") {
                    // $("#show_position_btn").show();
                }

                updateLoanEntries(account);
            }).catch(err => {
            account = null;
        });
    }

    updateAccount_internal()
    setInterval(updateAccount_internal, 1000);
}

const updateIOSTBalance = () => {
    const updateIOSTBalance_internal = async () => {
        try {
            window.IWalletJS.enable()
                .then(async account => {
                    if (!account) return;
                    const iostBalance = await getTokenBalance(account, "iost");
                    $("#iost-balance").html((iostBalance * 1).toFixed(8));
                }).catch(err => {
                return;
            });
        } catch (error) {
            return;
        }

    }
    updateIOSTBalance_internal()
    setInterval(updateIOSTBalance_internal, 10 * 60 * 1000)
}

const updatePenalty = () => {
    const updatePenalty_Internal = async () => {
        let option = $("#loan-time").val();
        const penalty = interest[option ? option : "1"];

        $("#interest-rate").html(penalty * 100);

        loanAmount = $("#borrow-input").val();

        var principal = ((penalty * 1 + 1) * loanAmount).toFixed(8);
        $("#principal").html(principal);
    }
    

    updatePenalty_Internal()
    setInterval(updatePenalty_Internal, 2000)
}


const updatePMINEBalance = () => {
    const updatePMINEBalance_internal = async () => {
        try {
            window.IWalletJS.enable()
                .then(async account => {
                    if (!account) return;
                    const pmineBalance = await getTokenBalance(account, "pmine");
                    $("#pmine-balance").html((pmineBalance * 1).toFixed(8));
                }).catch(err => {
                return;
            });
        } catch (error) {
            return;
        }

    }
    updatePMINEBalance_internal()
    setInterval(updatePMINEBalance_internal, 10 * 60 * 1000)
}

const vote = () => {
    let amount = document.getElementById("vote-amount-input").value;
    let candidate = document.getElementById("candidate-vote-input").value;
    let args = [
        candidate,
        amount
    ];

    try {
        const iost = window.IWalletJS.newIOST(IOST);
        const defaultConfig = {
            gasRatio: 1,
            gasLimit: 800000,
            delay: 0,
            expiration: 60,
            defaultLimit: "unlimited"
        };


        iost.config = defaultConfig;
        const ctx = iost.callABI(contract, "vote", args);
        ctx.addApprove("pmine", "1000000000");
        ctx.addApprove("iost", "1000000000");
        iost
            .signAndSend(ctx)
            .on("pending", trx => {
            })
            .on("success", result => {
                $("#successAlert").show();
                $("#successMsg").html("You have successfully voted. ");
            })
            .on("failed", failed => {
                if (!failed.message) {
                    $("#errorAlert").show();
                    $("#errorMsg").html(`Error: ${failed}`);
                } else {
                    $("#errorAlert").show();
                    $("#errorMsg").html(`Error: ${failed.message}`);
                }
            });
    } catch (error) {
        $("#errorAlert").show();
        $("#errorMsg").html(`Error: ${error}`);
    }
};

const unvote = () => {
    let amount = document.getElementById("unvote-amount-input").value;
    let candidate = document.getElementById("candidate-unvote-input").value;
    let args = [
        candidate,
        amount
    ];

    try {
        const iost = window.IWalletJS.newIOST(IOST);
        const defaultConfig = {
            gasRatio: 1,
            gasLimit: 800000,
            delay: 0,
            expiration: 60,
            defaultLimit: "unlimited"
        };


        iost.config = defaultConfig;
        const ctx = iost.callABI(contract, "unvote", args);
        ctx.addApprove("pmine", "1000000000");
        ctx.addApprove("iost", "1000000000");
        iost
            .signAndSend(ctx)
            .on("pending", trx => {
            })
            .on("success", result => {
                $("#successAlert").show();
                $("#successMsg").html("You have successfully unvoted. ");
            })
            .on("failed", failed => {
                if (!failed.message) {
                    $("#errorAlert").show();
                    $("#errorMsg").html(`Error: ${failed}`);
                } else {
                    $("#errorAlert").show();
                    $("#errorMsg").html(`Error: ${failed.message}`);
                }
            });
    } catch (error) {
        $("#errorAlert").show();
        $("#errorMsg").html(`Error: ${error}`);
    }
};

const claim = () => {

    try {
        const iost = window.IWalletJS.newIOST(IOST);
        const defaultConfig = {
            gasRatio: 1,
            gasLimit: 800000,
            delay: 0,
            expiration: 60,
            defaultLimit: "unlimited"
        };


        iost.config = defaultConfig;
        const ctx = iost.callABI(contract, "voterWithdraw", []);
        ctx.addApprove("iost", "1000000000");

        iost
            .signAndSend(ctx)
            .on("pending", trx => {
            })
            .on("success", result => {
                $("#successAlert").show();
                $("#successMsg").html("You have successfully claimed voting rewards. ");
            })
            .on("failed", failed => {
                if (!failed.message) {
                    $("#errorAlert").show();
                    $("#errorMsg").html(`Error: ${failed}`);
                } else {
                    $("#errorAlert").show();
                    $("#errorMsg").html(`Error: ${failed.message}`);
                }
            });
    } catch (error) {
        $("#errorAlert").show();
        $("#errorMsg").html(`Error: ${error}`);
    }
}

const loan = () => {
    let amount = document.getElementById("borrow-input").value;
    let option = $("#loan-time").val();
    let args = [
        amount,
        option
    ];

    try {
        const iost = window.IWalletJS.newIOST(IOST);
        const defaultConfig = {
            gasRatio: 1,
            gasLimit: 800000,
            delay: 0,
            expiration: 60,
            defaultLimit: "unlimited"
        };


        iost.config = defaultConfig;
        const ctx = iost.callABI(contract, "takeLoan", args);
        ctx.addApprove("pmine", "1000000000");
        ctx.addApprove("iost", "1000000000");
        iost
            .signAndSend(ctx)
            .on("pending", trx => {
            })
            .on("success", result => {
                $("#successAlert").show();
                $("#successMsg").html("You have successfully taken a loan.  ");

                updateLoanEntries(account);
            })
            .on("failed", failed => {
                if (!failed.message) {
                    $("#errorAlert").show();
                    $("#errorMsg").html(`Error: ${failed}`);
                } else {
                    $("#errorAlert").show();
                    $("#errorMsg").html(`Error: ${failed.message}`);
                }
            });
    } catch (error) {
        $("#errorAlert").show();
        $("#errorMsg").html(`Error: ${error}`);
    }
};

const clearAlerts = () => {
    $("#errorAlert").hide();
    $("#successAlert").hide();
    $("#errorMsg").html("");
    $("#successMsg").html("");
}

const updateShowPosition = () => {
    var showPosition = false;
    showPosition = !showPosition;

    if(showPosition) {
        $("#moreIcon").show();
        $("#lessIcon").hide();
        $("#positionDiv").show();
    } else {
        $("#lessIcon").show();
        $("#moreIcon").hide();
        $("#positionDiv").hide();
    }
}



const getTokenBalance = (acc, token) => {
    if (!acc) {
        return 0
    }
    return new Promise((resolve, reject) => {
        axios.get(api + "getTokenBalance/" + acc + "/" + token + "/1", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }, credentials: 'omit'
        }).then(res => {
            let balance = res.data.balance * 1;

            resolve(balance.toFixed(8))

        }).catch(err => {
            resolve(0)
        })
    });
};

//Get the current fixed price of pmine. 
const getPminePrice = () => {
    let postData = {
        id: contract,
        key: "price",
        by_longest_chain: true
    }

    return new Promise((resolve, reject) => {
        axios.post(api + "getContractStorage", postData, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }, credentials: 'omit'
        }).then(res => {
            let price = JSON.parse(res.data.data) * 1;

            resolve(price)
        }).catch(err => {
            resolve(0)
        });
    })
}

const getTokenSupply = (token) => {
    return new Promise((resolve, reject) => {
        axios.get(api + "getTokenInfo/" + token + "/1", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }, credentials: 'omit'
        }).then(res => {
            let balance = res.data.current_supply_float * 1;
            resolve(balance);

        }).catch(err => {
            resolve(0)
        })
    })
};

const getLoanEntries = async (account) => {
    let postData = {
        id: contract,
        key: "users",
        field: account,
        by_longest_chain: true
    }

    let entryKeys = await axios.post(api + "getContractStorage", postData, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }, credentials: 'omit'
    }).then(res => {
        let data = JSON.parse(res.data.data);

        Promise.all( data.map(async (entry) => {
            let postData2 = {
                id: contract,
                key: "loans",
                field: entry,
                by_longest_chain: true
            }

            return await axios.post(api + "getContractStorage", postData2, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }, credentials: 'omit'
            }).then(res => {

                let final = JSON.parse(res.data.data);

                return final

            }).catch(err => {
                return null;
            });
        })).then(resFinal => {
            loanEntries = resFinal;

            var tableHtml = "";

            loanEntries.forEach((entry, i) => {

                tableHtml = tableHtml + "<tr > <th scope='row' style='color: black;'>" + entry.loanID + "</th>"
                    + "<td style='color: black;'>" +  entry.loanAmount + "</td>"
                    + "<td style='color: black;'>" +  entry.loanDebt  +"</td>"
                    + "<td style='color: black;'>" +  timeConverter(entry.endDate) + "</td>"
                    + "<td style='color: black;'>"
                                +  "<button id=`${entry.loanID}` class='btn btn-sm btn-warning' onclick='payLoan(this)'>PAY</button> <button id=`${entry.loanID}` class='btn btn-sm btn-warning' onclick='payInterest(this)'>PAY INTEREST</button></td></tr>";
            })

            $("#loanHistoryTable").html(tableHtml);

        }).catch(err => {
            loanEntries = [];
            $("#loanHistoryTable").html("");
        })


    }).catch(err => {
        loanEntries = [];
        $("#loanHistoryTable").html();
    });
}

const timeConverter = unix_timestamp => {
    let timestamp = unix_timestamp * 1;

    var date = new Date(timestamp / 1000000);
    // Hours part from the timestamp
    var day = date.getDate();
    var month = date.getMonth() * 1 + 1;
    var year = date.getFullYear();
    var hour = date.getHours();
    var min = date.getMinutes();


    // Will display time in 10:30:23 format
    var formattedTime =
        month + "/" + day + "/" + year + " " + hour + ":" + (min.toString().length === 1 ? "0" + min : min);
    return formattedTime;
};

const payLoan = (e) => {
    let args = [
        e.id
    ];

    try {
        const iost = window.IWalletJS.newIOST(IOST);
        const defaultConfig = {
            gasRatio: 1,
            gasLimit: 800000,
            delay: 0,
            expiration: 60,
            defaultLimit: "unlimited"
        };


        iost.config = defaultConfig;
        const ctx = iost.callABI(contract, "payLoan", args);
        ctx.addApprove("pmine", "1000000000");
        ctx.addApprove("iost", "1000000000");
        iost
            .signAndSend(ctx)
            .on("pending", trx => {
            })
            .on("success", result => {
                $("#successAlert").show();
                $("#successMsg").html("You have successfully paid off your loan.  ");
            })
            .on("failed", failed => {
                if (!failed.message) {
                    $("#errorAlert").show();
                    $("#errorMsg").html(`Error: ${failed}`);
                } else {
                    $("#errorAlert").show();
                    $("#errorMsg").html(`Error: ${failed.message}`);
                }
            });
    } catch (error) {
        $("#errorAlert").show();
        $("#errorMsg").html(`Error: ${error}`);
    }
};


const payInterest = (e) => {
    let args = [
        e.id
    ];

    try {
        const iost = window.IWalletJS.newIOST(IOST);
        const defaultConfig = {
            gasRatio: 1,
            gasLimit: 800000,
            delay: 0,
            expiration: 60,
            defaultLimit: "unlimited"
        };


        iost.config = defaultConfig;
        const ctx = iost.callABI(contract, "payInterest", args);
        ctx.addApprove("pmine", "1000000000");
        ctx.addApprove("iost", "1000000000");
        iost
            .signAndSend(ctx)
            .on("pending", trx => {
            })
            .on("success", result => {
                $("#successAlert").show();
                $("#successMsg").html("You have successfully paid off your interestt.  ");
            })
            .on("failed", failed => {
                if (!failed.message) {
                    $("#errorAlert").show();
                    $("#errorMsg").html(`Error: ${failed}`);
                } else {
                    $("#errorAlert").show();
                    $("#errorMsg").html(`Error: ${failed.message}`);
                }
            });
    } catch (error) {
        $("#errorAlert").show();
        $("#errorMsg").html(`Error: ${error}`);
    }
};

const updateLoanEntries = async (account) => {
    const updateLoanEntries_internal = async (account) => {
        await getLoanEntries(account);
    }

    await updateLoanEntries_internal(account);
    setInterval(updateLoanEntries_internal(account), 10 * 60 * 1000);
}