window.onload = () => {
    hideAdminHeader()
    updateIOSTBalance()
    updateCollateral()
    updatePMINEBalance()
    updatAccount()
    updatVoteBonus()
    updateLoanEntries()
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
const penaltyFees = {
    "1 month": 0,
    "3 months": .03,
    "6 months": .10,
    "1 year": .25,
}

const timeKeys = {
    "1 month": "1M",
    "3 months": "3M",
    "6 months": "6M",
    "1 year": "1Y",
}

let loanAmount = 0;
let account = null;
let iostVoted = 0;
let iostOnContract = 0;
let iostRewards = 0;
let loanEntries = [];

const updateCollateral = () => {
    const updateCollateral_internal = async () => {
        let iostBalance = await getTokenBalance(contract, "iost"); iostOnContract = iostBalance;
        iostVoted = await getContractVotedIost();
        let circSupply = await getTokenSupply("pmine");
        let lobbySupply = await getTokenBalance("ContractKyprrbkxFd3nbheawCbazP9pTTB31TbnZ5pNQL6xHpF", "pmine");
        let dexSupply = await getTokenBalance("ContractGtK332EbByeomKLKKdMYAY5oqXE8or7spH8ffDdHgnLY", "pmine");
        let longtermAcc = await getTokenBalance("pmine_admin", "pmine");
        let loanContract = await getTokenBalance("ContractAqcgt14kaHJFwAbWiFrQUX3m4zcrbJb6dhc4BQgrZwhH", "pmine");

        let circExclude = circSupply - lobbySupply - dexSupply - longtermAcc - loanContract;

        if (iostBalance * 1 === 0) {
            return;
        }

        var loanAmount = $("#borrow-input").val();

        let collateral = loanAmount * circExclude / (iostBalance * 1 + iostVoted);
        $("#collateral-input".val(collateral.toFixed(8)))

        let ratio = circExclude / (iostBalance * 1 + iostVoted);

        $("#iost-pmine-ratio").html(1 / ratio);
    }

    updateCollateral_internal()
    setInterval(updateCollateral_internal, 10 * 60 * 1000)
}

const updatAccount = () => {
    const updateAccount_internal = () => {
        window.IWalletJS.enable()
            .then(accountRes => {
                account = accountRes;

                if(account === "pmine_admin") {
                    // $("#show_position_btn").show();
                }
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

const updatePenalty = (e) => {
    const penalty = penaltyFees[e.value];

    $("#interest-rate").html(penalty * 100);

    loanAmount = $("#borrow-input").val();

    var principal = ((penalty * 1 + 1) * loanAmount).toFixed(8);
    $("#principal").html(principal);
}

const updateIOSTLoan = (e) => {
    loanAmount = e.value;

    penalty = penaltyFees[$("#loan-time").val()];

    $("#interest-rate").html(penalty * 100);

    var principal = ((penalty * 1 + 1) * loanAmount).toFixed(8);
    $("#principal").html(principal);
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
    let loanPeriod = timeKeys[document.getElementById("loan-time").value];
    let args = [
        amount,
        loanPeriod
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

const updatVoteBonus = () => {
    const updatVoteBonus_internal = async () => {
        const bonus = await getVoteBonus();
        iostRewards = bonus;
        $("#iostRewards").html(iostRewards);
    }
    updatVoteBonus_internal()
    setInterval(updatVoteBonus_internal, 10 * 60 * 1000)
}

const getVoteBonus = async () => {

    return new Promise((resolve, reject) => {
        axios.get("https://api.iost.io/getVoterBonus/" + contract + "/1", { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', }, credentials: 'omit' }).then(res => {
            let voteInfo = res.data.bonus * 1;
            iostRewards = voteInfo.toFixed(8);

            resolve(voteInfo.toFixed(8));

        }).catch(err => {
            resolve(0);
            return
        })
    })

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

const getContractVotedIost = () => {
    let postData = {
        id: contract,
        key: "iostVoted",
        by_longest_chain: true
    }

    return new Promise((resolve, reject) => {
        axios.post(api + "getContractStorage", postData, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }, credentials: 'omit'
        }).then(res => {
            let votes = JSON.parse(res.data.data) * 1;

            iostVoted = votes;

            resolve(votes)
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

const getLoanEntries = async () => {
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

                tableHtml = tableHtml + "<tr> <th scope='row'>" + entry?entry.loanID:null + "</th>"
                                                + "<td>" + entry?entry.loanAmount:null + "</td>"
                                                + "<td>" + entry?entry.loanDebt:null +"</td>"
                                                + "<td>" + entry?timeConverter(entry.endDate):null + "</td>"
                                                + "<td>"
                                                +    entry ? "<button id=`${entry.loanID}` class='btn btn-sm btn-warning' onclick='payLoan(this)'>PAY</button>" : null
                                                + "</td>"
                                            + "</tr>";
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
        month + "/" + day + "/" + year + " " + hour + ":" + min;
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

const updateLoanEntries = () => {
    const updateLoanEntries_internal = async () => {
        await getLoanEntries();
    }

    updateLoanEntries_internal();
    setInterval(updateLoanEntries_internal, 10 * 60 * 1000);
}