var whatselect = 'win';
//console.log = function() {}

let config = {
    gasRatio:1,
    gasLimit:4000000,
    expiration: 90,
    delay:0,
    defaultLimit:"unlimited"
}
console.log('wtf')
//console.log = function() {}
var save_loans = [];
function c0nvert2(d) {
    d /= 2
    d = Number(d);
    var h = parseFloat(d / (3600 * 24)).toFixed(6);
//    var m = Math.floor(d % 3600 / 60);
    //  var s = Math.floor(d % 3600 % 60);

//    var hDisplay = h > 0 ? h + (h == 1 ? " day" : " days") : "";

    return h;
}
function c0nvert(d) {
    d /= 2
    d = Number(d);
    var h = parseFloat(d / (3600 * 24)).toFixed(6);
//    var m = Math.floor(d % 3600 / 60);
    //  var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " day" : " days") : "";

    return hDisplay;
}
function pauseBrowser(millis) {
    var date = Date.now();
    var curDate = null;
    do {
        curDate = Date.now();
    } while (curDate-date < millis);
}
var has_seen=[];
console.logz = function() {}
var release_arr=[];
var userList2 = [];
function addcomma(x) {
    let answer =  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return answer;
    let seen_comma = 0;
    let retstring = '';
    console.log('testin')
    for(var y=0;y<answer.length;y++) {
        console.log(answer[y])
        if(seen_comma == 1 && answer[y] === ',') {
            continue;
        }
        if (y===',') {
            seen_comma = 1
        }
        retstring += answer[y];
    }
    return retstring
}
var iplayBalance = 0;
var final_prod2=0;
var div_power = 0;
let dofunct = function() {
    axios.post('https://api.iost.io/getContractStorage', {
        id: 'ContractgLEoAwoDscY4EToBCEbH1JCEJy1vPAq6xaAP4jnzceP',
        key: userMsg._id+"_divpower",
        // field: hyAccount,
//          field: 'ContractCAcLL12M2BoU1xEstVM4guLg4DCruxVALm9qCCqTyyZe',
        by_longest_chain: true
    }).then(function(itsme) {
//console.log('itsme',itsme.data)
        if (itsme.data.data != 'null') {
            div_power = parseFloat(itsme.data.data)
//console.log(div_power)
        }
    });
}
var totes_magotes = 0;
var seen_cooldowns = [];
var seen_release = [];
if(window.localStorage.getItem("lang_type") != 'en') {

    window.localStorage.setItem("lang_type", 'en');
    history.go(0);
}
//window.location.reload(false)
//        history.go(0);
let langMsg = chooseLang();
window.scrollTo(0, 0);
setTimeout(() => {
    window.scrollTo(0, 0);
}, 500);
let baseUrl = 'https://api.iost.io/';
// let ourAccount = 'rioteam1a'
// let ourAccount = 'rioteam1b'
//获取列表定时器
let getListTimer = null;
let now = null;
let reg = /(\d)(?=(\d{3})+(\.\d+)$)/g;
//用户信息
let userMsg = null;
//合约资金
let poolMoney = 'ROUND 1 IS SOLD OUT, CLICK FOR ROUND 2 PRESALE (TRX)!';
//邀请总奖金
let inviteMoney = '*******';
//钱包余额
let walletBalance = 0;
//累计存入
let saveTotal = 0;
//累计提现
let alltx = 0;
//累计邀请奖励
let inviteTotal = 0;
//可提现收益
let sellCan = 0;
let sellCanaction = 0;
//开关状态
let hySwitch = null;
//投资列表
let userList = [];
//循环获取
let flag = 0;
let iost = null;
//合约账户名
// let hyAccount = 'ContractHtL5Nnu9w8awsfRZN8MGiyV1TuGu271qYGSeMBysEyc6'
// let hyAccount = 'Contract5mALmo8AYDi5nDo7gsMGjZigCaVsQsuHDqSvfXLP6Gn9'
//测试合约
// let hyAccount = 'Contract4xTLJ9cea87kNJ2a3YRbExN3VcBEycFu7zcHjy8NGLG3';

//正式合约
//let hyAccount = 'Contract3KpbD8WjFD2WkQfWKNpFtCpioUDr2o95qPJ7HM5iQf9u'
let hyAccount = 'ContractgLEoAwoDscY4EToBCEbH1JCEJy1vPAq6xaAP4jnzceP'
//开始时间
let beginTime = 0;
let overtime = '00:00:00';
//阻止冒泡
let stopImmediate = function (e) {
    e = e.target;
    e = e || window.event;
    e.stopPropagation();
};
//语言选择
let chooseLangClick = function () {
    $(document).on("click", function (e) {
        $('.lang_choose').hide();
        // return false;
    });
    $(".lang_show").click(function (e) {
        $('.lang_choose').show();
        return false;
    });
    $(".chinese").click(function (e) {
        window.localStorage.setItem("lang_type", 'en');
        history.go(0);
        // $('.lang_choose').hide();
        return false;
    });
    $(".english").click(function (e) {
        window.localStorage.setItem("lang_type", 'en');
        history.go(0);
        // $('.lang_choose').hide();
        return false;
    });
    $(".k").click(function (e) {
        window.localStorage.setItem("lang_type", 'en');
        history.go(0);
        // $('.lang_choose').hide();
        return false;
    });
};
chooseLangClick();


//插入文本
let appendText = function () {
    if (lang === 'en') {
        $('.lang_show').append('English');
    } else if (lang === 'k') {
        $('.lang_show').append('English');
    } else {
        //  $('.lang_show').append('简体中文');
        $('.lang_show').append('English');

    };

    //公告
    $(".gg_t").html(langMsg.gg_til);
    $(".pmd_e").html(` <p>${langMsg.gg_tz}</p>`);
    $(".pmd_et").html(`<a href="http://iostbank.club/" target='_blank' >${langMsg.tobank} </a>`);
    $(".list").append(` <p>${langMsg.gg_tz}</p>`);
    $(".list").append(` <p>${langMsg.t2}</p>`);
    $(".list").append(` <p>${langMsg.t3}</p>`);
    $(".list").append(` <p>${langMsg.t4}</p>`);
    $(".list").append(` <p>${langMsg.p1}</p>`);
    $(".list").append(` <p>${langMsg.p2}</p>`);
    $(".list").append(` <p>${langMsg.p3}</p>`);
    $(".list").append(` <p>${langMsg.p4}</p>`);
    $(".list").append(` <p>${langMsg.p5}</p>`);
    $(".list").append(` <p>${langMsg.p6}</p>`);
    $(".list").append(` <p>${langMsg.p7}</p>`);
    $(".list").append(` <p>${langMsg.p8}</p>`);
    $(".list").append(` <p>${langMsg.p9}</p>`);
    $(".list").append(` <p>${langMsg.p10}</p>`);
    $(".list").append(` <p>${langMsg.b1}</p>`);
    $(".list").append(` <p>${langMsg.b2}</p>`);
    $(".list").append(` <p>${langMsg.b3}</p>`);
    $('.nullz').html('No upcoming proposals.');

    $(".createid").append(langMsg.create);
    $(".log_click").append(langMsg.login);
    $('.every').append(langMsg.every);
    $('.all_money').html(`<div style="zoom:75%;">${langMsg.heyue}${poolMoney}</div>`);
    $('.invite_money').html(`<div>${langMsg.invite}${inviteMoney} IOST ${langMsg.out}</div> `);

    $('.game_over').html(langMsg.gameover);
    $('.will').append(langMsg.will);
    $('.invite').append(langMsg.jl);
    $('.game').append(langMsg.back);
    $('.yz').append(langMsg.yz);
    $('.yzhy').eq(0).append(langMsg.yzhy);
    $('.yzhy').eq(1).append(langMsg.ym);

    $('.save_title').append(langMsg.save);
    $('.wallet_balance').append(`${walletBalance} <span>IOST</span>`);
//    $('.wallet_balance').append(`${walletBalance} <span>iPLAY</span>`);
    $('.wallet_balance_text').append(langMsg.balance);
    $('.min_save').append(langMsg.min);
    $('.save_btn').append(langMsg.save);
    $('.save_btn_load').append(langMsg.action);
    $('.save_btn_ing').append(langMsg.save);
    $('.save_btn_tip').append(langMsg.write);

    $('.sell_title').append(langMsg.load);
    $('.sell_total_num').append(`${saveTotal} <span>IOST</span>`);
    $('.sell_total_text').append(langMsg.total);
    $('.sell_invite_num').append(`${inviteTotal} <span>IOST</span>`);
    $('.sell_invite_text').append(langMsg.ljtx);
    $('.sell_can_all').append(`${sellCan} <span> IDT :: </span>`);
    $('.sell_can_text').append(langMsg.can);
    $('.sell_btn').append(langMsg.to_wallet);
    $('.sell_btn_load').append(langMsg.action);
    $('.sell_btn_no').append(langMsg.to_wallet);
    $('.sell_btn_tip').append(langMsg.write);

    $('.invite_title').append(langMsg.invite_url);
    $('.invite_tip').append(langMsg.tip);
    $('.login_btn').append(langMsg.login);

    $('.details').append(langMsg.details);
    $('.detailz').append("Generate");

    $('.invite_tip_money').append("You have no active loans");
    //   $('.invite_tip_money_num').append(`${langMsg.t_invite} : <span>0 IOST</span>`);
    // $('.input_invite_url').val('https://guppys.io?user=');
    // $('.copy_btn').append(langMsg.copy);

    $('.footer_about').append(langMsg.about);
    $('.footer_ex p')[0].append(langMsg.ex);
    $('.footer_ex p')[1].append("")
    $('.footer_ex p')[2].append(langMsg.ex1);

    $('.null').append(langMsg.null);

};
appendText();

//公告滚动
let runnotice = function () {
    let mySwiper = new Swiper ('.swiper-container', {
        direction: 'vertical', // 垂直切换选项
        loop: true, // 循环模式选项
        autoplay: true,
    })
};
// runnotice();

// 登录
let login = function () {
    // document.addEventListener("DOMContentLoaded", function (event) {
    if (!window.IWalletJS) {
        //没安装钱包
        $('.login_err_text').html(langMsg.err5);
        $('.login_err').css('display', 'flex');
        setTimeout(() => {
            $('.login_err').css('display', 'none');
        }, 3000);
    } else {
        window.IWalletJS.enable().then(function (val) {
            // account里面是账户信息
            console.logz(val);
            $('.log_msg').html(val);
            $('.log_click').hide();
            $('.createid').hide();
            $('.log_msg').show();
//            $('.input_invite_url').val('https://guppys.io?user=' + val);
            if (!val) {
                console.logz('err');
            };
            $('.invite_logout').hide();
            $('.invite_login').show();
            // IWalletJS生成IOST对象
            iost = window.IWalletJS.newIOST(IOST);
            let rpc = iost.currentRPC;
            let account = new IOST.Account(val);
            iost.setAccount(account);
            userMsg = account;
//whatselect=(document.getElementById('wdasset').value);

            dofunct()
            dofunct2();
            //判断签到时间
            //签到
            let log = function () {

                const tx = iost.callABI(hyAccount, "sign", []);
                iost.signAndSend(tx).on('pending', function (txid) {
                    console.logz("=====>签到中", txid);

                }).on('success', function (result) {
                    console.logz('======>签到成功', result);

                    // getMsg()
                }).on('failed', function (result) {
                    console.logz('======>签到失败', result);

                });
            };
            // getLogList(val, log);


            //获取账户余额
            /*            rpc.blockchain.getBalance(val, 'iplay',true).then(
                    function(val1) {
                        rpc.blockchain.getBalance(val, 'iost',true).then(
                            function (val) {
                                // console.logz(val);
                                iplayBalance = (Math.floor(val1.balance * 10000) / 10000);

                                walletBalance = (Math.floor(val.balance * 10000) / 10000);
                                $('.wallet_balance').html(`${(Math.floor(val.balance*10000)/10000).toString().replace(reg, "$1,")} <span>IOST </span>${(Math.floor(val1.balance*10000)/10000).toString().replace(reg, "$1,")} <span>iPLAY</span>`);
                            }
                        );
            });*/
            let usern4me = val;
            rpc.blockchain.getBalance('Contract7UbMH4owAnbXWpAz5hbxupfpDWoDdvZTDciY8FSoSjDH', 'ifry',true).then(
                function(answ3r) {
                    console.log('answer is',answ3r)
//document.getElementById("currsupply").innerHTML = parseFloat(10000-parseFloat(answ3r.balance)).toFixed(4).toString();

                })
            axios.post('https://api.iost.io/getContractStorage', {
                id: 'ContractgLEoAwoDscY4EToBCEbH1JCEJy1vPAq6xaAP4jnzceP',
                key: 'ifrystaked',
//          field: 'ContractCAcLL12M2BoU1xEstVM4guLg4DCruxVALm9qCCqTyyZe',
                by_longest_chain: true
            })
                .then(function (redd2) {
                    axios.post('https://api.trongrid.io/wallet/triggersmartcontract', {
                        //           id: 'ContractgLEoAwoDscY4EToBCEbH1JCEJy1vPAq6xaAP4jnzceP',
                        //          key: 'ifrystaked',
//          field: 'ContractCAcLL12M2BoU1xEstVM4guLg4DCruxVALm9qCCqTyyZe',
                        //        by_longest_chain: true
                        "contract_address":"4191f58396e0854a228ace2b12c9ccb367fc59cfa2",
                        "owner_address":"412ffa5fd4a89778ef71c4919e983cbbc7ba0cbbe8",
                        "function_selector":"gettotalstaked()",
                        "parameter":"",
                        "call_value":0,
                        "fee_limit":1000000000
                    })
                        .then(function (redd55) {
//redd2 = (JSON.parse(redd55.data.data))
                            redd55 = redd55.data.constant_result;
//console.log('redd55 is',redd55)
                            redd55 = parseInt(redd55,16);
                            redd55 = redd55/10**6

                            redd2 = parseFloat(JSON.parse(redd2.data.data))+redd55;
                            redd99 = redd2 - redd55;
//redd2 = (JSON.parse(redd99.data.data))
                            document.getElementById("totalstaked").innerHTML = addcomma(parseFloat(redd99).toFixed(4).toString().split('.')[0])+'.'+parseFloat(redd99).toFixed(4).toString().split('.')[1];
                        });


                    axios.post('https://api.iost.io/getContractStorage', {
                        id: 'ContractgLEoAwoDscY4EToBCEbH1JCEJy1vPAq6xaAP4jnzceP',
                        key: val+'_frypower',
//          field: 'ContractCAcLL12M2BoU1xEstVM4guLg4DCruxVALm9qCCqTyyZe',
                        by_longest_chain: true
                    })
                        .then(function (redd) {
                            redd = (JSON.parse(redd.data.data))
                            let g1 = redd;
                            console.log(g1)
                            document.getElementById("amt0wedd").innerHTML = g1;
                            document.getElementById("pctshr").innerHTML = parseFloat(parseFloat(g1)/parseFloat(redd2) *100).toFixed(4).toString();


//start inj

//            setInterval(() => {


                            axios.post('https://api.iost.io/getContractStorage', {
                                id: 'ContractCAcLL12M2BoU1xEstVM4guLg4DCruxVALm9qCCqTyyZe',
                                key: 'pledge',
                                field: hyAccount,
//          field: 'ContractCAcLL12M2BoU1xEstVM4guLg4DCruxVALm9qCCqTyyZe',
                                by_longest_chain: true
                            })
                                .then(function (zredd) {
                                    zredd = (JSON.parse(zredd.data.data))
                                    let zg1 = zredd;
                                    console.log('zg1',zg1)

                                    rpc.blockchain.getBalance('Contract8skTRjuYDa8UfPFTfJQRwkBi7WanQZzeTLvGj2JyL6qy', 'iost',true).then(
                                        function(zval1) {

                                            zval1.balance=0;
                                            axios.post('https://api.iost.io/getContractStorage', {
                                                id: 'ContractCAcLL12M2BoU1xEstVM4guLg4DCruxVALm9qCCqTyyZe',
                                                key: 'totalPledged',
                                                by_longest_chain: true
                                            }).then(function (ztotalz) {
                                                ztotalz = JSON.parse(ztotalz.data.data);
//console.log('duh')
//$('.all_money').html(`ksjdfkajsfk`)
//console.log('duh')
//$('.all_money').html(`ksjdfkajsfk`)

//if (zg1 != null){
                                                let pool_div = parseFloat(zval1.balance) * (parseFloat(zg1.amount) / parseFloat(ztotalz)) *1
//}
                                                console.log('pool_div',pool_div)
                                                //setInterval(() => {

                                                rpc.blockchain.getBalance('Contract8skTRjuYDa8UfPFTfJQRwkBi7WanQZzeTLvGj2JyL6qy', 'iost',true).then(
                                                    function(meep) {

                                                        meep.balance=0;
                                                        /*axios.post('https://api.iost.io/getContractStorage', {
                                                                id: 'Contract9WR9cR9JdBnppdomQzPLGcLrTMtpNNBXaFJ3Y5Wyxz7U',
                                                                key: 'info',
                                                                field: 'xsjado',
                                                                by_longest_chain: true
                                                            })
                                                                    .then(function (zredd2) {
                                                        zredd2 = (JSON.parse(zredd2.data.data))
                                                        let zg2 = zredd2;
                                                        console.log('zg2 is',zg2)
                                                        let firstpart = zg2.iostbalance;
                                                        axios.post('https://cors-anywhere.herokuapp.com/https://api.iostwin.io/api/getBalance', {
                                                        //        id: 'Contract9WR9cR9JdBnppdomQzPLGcLrTMtpNNBXaFJ3Y5Wyxz7U',
                                                                accountname: 'xsjado',
                                                                lockamount: zg2.staked_amount,
                                                                updatetime: zg2.updateTime,
                                                                symbol: 'win'
                                                            })
                                                                    .then(function (zredd3) {
                                                        console.log('zredd3',zredd3.data.data.payout)
                                                        //console.log('firstpart is',firstpart)
                                                        axios.post('https://api.iost.io/getContractStorage', {
                                                                id: 'Contract9WR9cR9JdBnppdomQzPLGcLrTMtpNNBXaFJ3Y5Wyxz7U',
                                                                key: 'info:idt',
                                                                field: 'xsjado',
                                                                by_longest_chain: true
                                                            })
                                                                    .then(function (zredd4) {
                                                        zredd4 = (JSON.parse(zredd4.data.data))
                                                        let zg4 = zredd4;
                                                        //console.log('zg2 is',zg2)
                                                        let firstpart2 = zg4.iostbalance;
                                                        axios.post('https://cors-anywhere.herokuapp.com/https://api.iostwin.io/api/getBalance', {
                                                        //        id: 'Contract9WR9cR9JdBnppdomQzPLGcLrTMtpNNBXaFJ3Y5Wyxz7U',
                                                                accountname: 'xsjado',
                                                                lockamount: zg4.staked_amount,
                                                                updatetime: zg4.updateTime,
                                                                symbol: 'idt'
                                                            })
                                                                    .then(function (zredd5) {
                                                        console.log('zredd5',zredd5.data.data.payout)
                                                        */

                                                        var summy = 0;
                                                        var hyAccount = 'ContractgLEoAwoDscY4EToBCEbH1JCEJy1vPAq6xaAP4jnzceP';
                                                        axios.post('https://api.iost.io/getContractStorage', {
                                                            id: 'ContractyDSu66Ehsfh5HRadovwWG2n7J3HhkbPMjz81s4gr2cB',
//            key: 'pledge',
                                                            key: hyAccount+'_claimed',
//          field: 'ContractCAcLL12M2BoU1xEstVM4guLg4DCruxVALm9qCCqTyyZe',
                                                            by_longest_chain: true
                                                        })
                                                            .then(function (claimed) {
                                                                axios.post('https://api.iost.io/getContractStorage', {
                                                                    id: 'ContractyDSu66Ehsfh5HRadovwWG2n7J3HhkbPMjz81s4gr2cB',
//            key: 'pledge',
                                                                    key: hyAccount+'_bootypower',
//          field: 'ContractCAcLL12M2BoU1xEstVM4guLg4DCruxVALm9qCCqTyyZe',
                                                                    by_longest_chain: true
                                                                })
                                                                    .then(function (bootypower) {
                                                                        bootypower = (bootypower.data.data)
                                                                        let gee1 = bootypower;




                                                                        axios.post('https://api.iost.io/getContractStorage', {
                                                                            id: 'ContractyDSu66Ehsfh5HRadovwWG2n7J3HhkbPMjz81s4gr2cB',
//            key: 'pledge',
                                                                            key: 'profitPerShare',
//          field: 'ContractCAcLL12M2BoU1xEstVM4guLg4DCruxVALm9qCCqTyyZe',
                                                                            by_longest_chain: true
                                                                        })
                                                                            .then(function (bootypower2) {
                                                                                bootypower2 = (bootypower2.data.data)
                                                                                summy  += Number(bootypower2)*parseFloat(gee1) - Number(claimed.data.data);

                                                                                var hec = 'ifryholders';
                                                                                axios.post('https://api.iost.io/getContractStorage', {
                                                                                    id: 'ContractEX9bNiLCtNqGPBH5VKU6xbcANNJZqMo618fXwXNFnUvj',
//            key: 'pledge',
                                                                                    key: hec+'_claimed',
//          field: 'ContractCAcLL12M2BoU1xEstVM4guLg4DCruxVALm9qCCqTyyZe',
                                                                                    by_longest_chain: true
                                                                                }).then(function(claimedloot){

                                                                                    axios.post('https://api.iost.io/getContractStorage', {
                                                                                        id: 'ContractEX9bNiLCtNqGPBH5VKU6xbcANNJZqMo618fXwXNFnUvj',
//            key: 'pledge',
                                                                                        key: hec+'_lootpower',
//          field: 'ContractCAcLL12M2BoU1xEstVM4guLg4DCruxVALm9qCCqTyyZe',
                                                                                        by_longest_chain: true
                                                                                    }).then(function(lootpower){

                                                                                        lootpower = lootpower.data.data
                                                                                        axios.post('https://api.iost.io/getContractStorage', {
                                                                                            id: 'ContractEX9bNiLCtNqGPBH5VKU6xbcANNJZqMo618fXwXNFnUvj',
//            key: 'pledge',
                                                                                            key: 'profitPerShare',
                                                                                            by_longest_chain: true
                                                                                        })
                                                                                            .then(function (bootypower4) {
                                                                                                bootypower4 = (bootypower4.data.data)

                                                                                                summy  += Number(bootypower4)*parseFloat(lootpower) - Number(claimedloot.data.data);
                                                                                                axios.get('/iostwin.txt')
                                                                                                    .then(function (response) {

                                                                                                        document.getElementById("numiost").innerHTML = parseFloat(parseFloat(document.getElementById("pctshr").innerHTML) * (parseFloat(pool_div)+parseInt(response.data) + parseFloat(summy) )/100).toFixed(4).toString();
                                                                                                        console.log('pctshr',parseFloat(document.getElementById("pctshr").innerHTML),meep.balance)
//ipirates
                                                                                                    });
                                                                                            });
                                                                                    });
                                                                                });
                                                                            })
                                                                    })
//end ipirates
                                                            });
//});
//});
//});
                                                    });
                                                setInterval(function() {
                                                    rpc.blockchain.getBalance(userMsg._id, 'win',true).then(
                                                        function(poop33) {
                                                            document.getElementById("mywin").innerHTML = addcomma(Math.floor(poop33.balance).toString());
                                                        });

                                                    rpc.blockchain.getBalance(userMsg._id, 'iwin',true).then(
                                                        function(poop44) {
                                                            document.getElementById("myiwin").innerHTML = addcomma(Math.floor(poop44.balance).toString());

                                                        });
                                                    rpc.blockchain.getBalance(userMsg._id, 'idt',true).then(
                                                        function(poop55) {

                                                            document.getElementById("myidt").innerHTML = addcomma(Math.floor(poop55.balance).toString());

                                                        });
                                                    rpc.blockchain.getBalance(userMsg._id, 'iidt',true).then(
                                                        function(poop66) {

                                                            document.getElementById("myiidt").innerHTML = addcomma(Math.floor(poop66.balance).toString());

                                                        });
                                                },1000);
                                                rpc.blockchain.getBalance('Contract8skTRjuYDa8UfPFTfJQRwkBi7WanQZzeTLvGj2JyL6qy', 'vost',true).then(
                                                    function(meep2) {

                                                        meep2.balance=0;
                                                        let vost_div =parseFloat(meep2.balance) * (parseFloat(zg1.amount) / parseFloat(ztotalz)) *1
                                                        document.getElementById("numvost").innerHTML = parseFloat(parseFloat(document.getElementById("pctshr").innerHTML) * parseFloat(vost_div)/100).toFixed(4).toString();
                                                    });
                                                let fullNode = 'https://api.trongrid.io/'
                                                let solidityNode = 'https://api.trongrid.io/'
                                                const tronWeb = new TronWeb(fullNode, solidityNode);
                                                tronWeb.trx.getBalance('TRxKFVpGgmPhDvLHdBZ9Q6yvcoyXpik9SD').then(userBalance => {
//    console.log(`User's balance is: ${ userBalance }`);

//    let trxbal = parseInt(response.data.data[0].balance)/Math.pow(10,6);
                                                    let mytrxbal = parseInt(userBalance)/Math.pow(10,6);
                                                    rpc.blockchain.getBalance('Contract8skTRjuYDa8UfPFTfJQRwkBi7WanQZzeTLvGj2JyL6qy', 'itrx',true).then(
                                                        function(meep3) {

                                                            meep3.balance=0;
                                                            let itrx_div =parseFloat(meep3.balance) * (parseFloat(zg1.amount) / parseFloat(ztotalz)) *1
                                                            itrx_div +=mytrxbal
                                                            document.getElementById("numitrx").innerHTML = parseFloat(parseFloat(document.getElementById("pctshr").innerHTML) * parseFloat(itrx_div)/100).toFixed(4).toString();
                                                        });
                                                });
                                            });
                                        });
//            }, 2000);
//3 extra close
                                });
                        });
                });
//            }, 5000);

            rpc.blockchain.getBalance(val, 'iplay',true).then(
                function(val1) {
                    rpc.blockchain.getBalance(val, 'iost',true).then(
                        function (val) {
                            // console.logz(val);
                            iplayBalance = (Math.floor(val1.balance * 10000) / 10000);

                            walletBalance = (Math.floor(val.balance * 10000) / 10000);
                            rpc.blockchain.getBalance(usern4me, 'ifry',true).then(
                                function(val2) {
                                    rpc.blockchain.getBalance(usern4me, 'vost',true).then(
                                        function(val3) {
                                            rpc.blockchain.getBalance(usern4me, 'itrx',true).then(
                                                function(val4) {
                                                    rpc.blockchain.getBalance(usern4me, 'win',true).then(
                                                        function(val5) {

                                                            vostbalance = (Math.floor(val3.balance * 10000) / 10000);
                                                            itrxbalance = (Math.floor(val4.balance * 10000) / 10000);
                                                            ifryBalance = (Math.floor(val2.balance * 10000) / 10000);
                                                            document.getElementById('numavi').innerText = ifryBalance
//            rpc.blockchain.getBalance(val, 'ifry',true).then(
                                                            //              function(val2) {
                                                            val5.balance = parseInt(val5.balance)

                                                            val1.balance = parseInt(val1.balance)
                                                            val.balance = parseInt(val.balance)
                                                            val3.balance = parseInt(val3.balance)
                                                            val4.balance = parseInt(val4.balance)
                                                            $('.wallet_balance').html(`<span style=\"zoom:115%;\"><span style=\"color:gold;font-family:monospace;\">${(Math.floor(val2.balance*10000)/10000).toString().replace(reg, "$1,")} iFRY </br></span></span><span style=\"zoom:60%;\"><span style=\"color:gold;\">||</span> ${(Math.floor(val.balance*10000)/10000).toString().replace(reg, "$1,")} <span>IOST <span style=\"color:gold;\">||</span> </span>${(Math.floor(val3.balance*10000)/10000).toString().replace(reg, "$1,")} <span>VOST <span style=\"color:gold;\">||</span> </span>${(Math.floor(val4.balance*10000)/10000).toString().replace(reg, "$1,")} <span>iTRX <span style=\"color:gold;\">||</span> </span>${(Math.floor(val1.balance*10000)/10000).toString().replace(reg, "$1,")} <span>iPLAY <span style=\"color:gold;\">||</span> </span>${(Math.floor(val5.balance*10000)/10000).toString().replace(reg, "$1,")} <span>WIN <span style=\"color:gold;\">||</span></span></span>`);
                                                        });});});});

                        }
                    );
                });

            setInterval(() => {
                /*
                            rpc.blockchain.getBalance(val, 'iplay',true).then(
                                function(val1) {

                                rpc.blockchain.getBalance(val, 'iost',true).then(
                                    function (val) {
                                        // console.logz('====>', val);
                            iplayBalance = (Math.floor(val1.balance * 10000) / 10000);
                                        walletBalance = (Math.floor(val.balance * 10000) / 10000);
                                        $('.wallet_balance').html(`${(Math.floor(val.balance*10000)/10000).toString().replace(reg, "$1,")} <span>IOST</span>      ${(Math.floor(val1.balance*10000)/10000).toString().replace(reg, "$1,")} <span>iPLAY</span>`);
                                    }
                                );
                });*/
                let usern4me = val;
                axios.post('https://api.iost.io/getContractStorage', {
                    id: 'ContractgLEoAwoDscY4EToBCEbH1JCEJy1vPAq6xaAP4jnzceP',
                    key: 'ifrystaked',
//          field: 'ContractCAcLL12M2BoU1xEstVM4guLg4DCruxVALm9qCCqTyyZe',
                    by_longest_chain: true
                })
                    .then(function (redd2) {
                        axios.post('https://api.trongrid.io/wallet/triggersmartcontract', {
                            //           id: 'ContractgLEoAwoDscY4EToBCEbH1JCEJy1vPAq6xaAP4jnzceP',
                            //          key: 'ifrystaked',
//          field: 'ContractCAcLL12M2BoU1xEstVM4guLg4DCruxVALm9qCCqTyyZe',
                            //        by_longest_chain: true
                            "contract_address":"4191f58396e0854a228ace2b12c9ccb367fc59cfa2",
                            "owner_address":"412ffa5fd4a89778ef71c4919e983cbbc7ba0cbbe8",
                            "function_selector":"gettotalstaked()",
                            "parameter":"",
                            "call_value":0,
                            "fee_limit":1000000000
                        })
                            .then(function (redd55) {
//redd2 = (JSON.parse(redd55.data.data))
                                redd55 = redd55.data.constant_result;
//console.log('redd55 is',redd55)
                                redd55 = parseInt(redd55,16);
                                redd55 = redd55/10**6

                                redd2 = parseFloat(JSON.parse(redd2.data.data))+redd55;
//redd2 = (JSON.parse(redd2.data.data))
                                redd99=redd2-redd55;
                                document.getElementById("totalstaked").innerHTML =addcomma(parseFloat(redd99).toFixed(4).toString().toLocaleString().split('.')[0]) +'.'+ parseFloat(redd99).toFixed(4).toString().split('.')[1];
                            });


                        axios.post('https://api.iost.io/getContractStorage', {
                            id: 'ContractgLEoAwoDscY4EToBCEbH1JCEJy1vPAq6xaAP4jnzceP',
                            key: val+'_frypower',
//          field: 'ContractCAcLL12M2BoU1xEstVM4guLg4DCruxVALm9qCCqTyyZe',
                            by_longest_chain: true
                        })
                            .then(function (redd) {
                                redd = (JSON.parse(redd.data.data))
                                let g1 = redd;
                                console.log(g1)
                                document.getElementById("amt0wedd").innerHTML = g1;
                                document.getElementById("pctshr").innerHTML = parseFloat(parseFloat(g1)/parseFloat(redd2) * 100).toFixed(4).toString();

                            });
                    });

                rpc.blockchain.getBalance(val, 'iplay',true).then(
                    function(val1) {
                        rpc.blockchain.getBalance(val, 'iost',true).then(
                            function (val) {
                                // console.logz(val);
                                iplayBalance = (Math.floor(val1.balance * 10000) / 10000);

                                walletBalance = (Math.floor(val.balance * 10000) / 10000);
                                rpc.blockchain.getBalance(usern4me, 'ifry',true).then(
                                    function(val2) {
                                        rpc.blockchain.getBalance(usern4me, 'vost',true).then(
                                            function(val3) {
                                                rpc.blockchain.getBalance(usern4me, 'itrx',true).then(
                                                    function(val4) {
                                                        rpc.blockchain.getBalance(usern4me, 'win',true).then(
                                                            function(val5) {

                                                                vostbalance = (Math.floor(val3.balance * 10000) / 10000);
                                                                itrxbalance = (Math.floor(val4.balance * 10000) / 10000);
                                                                ifryBalance = (Math.floor(val2.balance * 10000) / 10000);
//            rpc.blockchain.getBalance(val, 'ifry',true).then(
                                                                //              function(val2) {
                                                                val5.balance = parseInt(val5.balance)

                                                                val1.balance = parseInt(val1.balance)
                                                                val.balance = parseInt(val.balance)
                                                                val3.balance = parseInt(val3.balance)
                                                                val4.balance = parseInt(val4.balance)
                                                                $('.wallet_balance').html(`<span style=\"zoom:115%;\"><span style=\"color:gold;font-family:monospace;\">${(Math.floor(val2.balance*10000)/10000).toString().replace(reg, "$1,")} iFRY </br></span></span> <span style=\"zoom:60%;\"><span style=\"color:gold;\">||</span> ${(Math.floor(val.balance*10000)/10000).toString().replace(reg, "$1,")} <span>IOST <span style=\"color:gold;\">||</span> </span>${(Math.floor(val3.balance*10000)/10000).toString().replace(reg, "$1,")} <span>VOST <span style=\"color:gold;\">||</span> </span>${(Math.floor(val4.balance*10000)/10000).toString().replace(reg, "$1,")} <span>iTRX <span style=\"color:gold;\">||</span> </span>${(Math.floor(val1.balance*10000)/10000).toString().replace(reg, "$1,")} <span>iPLAY <span style=\"color:gold;\">||</span> </span>${(Math.floor(val5.balance*10000)/10000).toString().replace(reg, "$1,")} <span>WIN <span style=\"color:gold;\">||</span></span></span>`);
                                                            });});});});

                            }
                        );
                    });

            }, 6000);

            getLoanNum(val);
            getAccountNum(val);
            getinviteList(val);
            getListTimer = setInterval(() => {
                getLoanNum(val);
                getAccountNum(val);
                getinviteList(val);
            }, 2000);

            // getMsg()
            // setInterval(() => {
            //     getMsg()
            // }, 60000)
            // 获取合约资金
            // rpc.blockchain.getBalance(hyAccount, 'iost').then(
            //     function (val) {
            //         console.logz('合约余额=====>', val);
            //         if (val.balance != 0) {
            //             $('.all_money').html(`${langMsg.heyue}${(Math.floor(val.balance*10000)/10000).toString().replace(reg, "$1,")} <span>IOST</span>`)
            //         }

            //     }
            // );
            // setInterval(() => {
            //     rpc.blockchain.getBalance(hyAccount, 'iost').then(
            //         function (val) {
            //             if (val.balance != 0) {
            //                 $('.all_money').html(`${langMsg.heyue}${(Math.floor(val.balance*10000)/10000).toString().replace(reg, "$1,")} <span>IOST</span>`)
            //             }
            //         }
            //     );
            // }, 10000)
//            axios.get(`https://api.iost.io/getContractStorage/${hyAccount}/iplay/true`)
//console.log('duh')
//$('.all_money').html(`ksjdfkajsfk`)
            axios.post('https://api.iost.io/getContractStorage', {
                id: 'ContractCAcLL12M2BoU1xEstVM4guLg4DCruxVALm9qCCqTyyZe',
                key: 'pledge',
                field: hyAccount,
//	    field: 'ContractCAcLL12M2BoU1xEstVM4guLg4DCruxVALm9qCCqTyyZe',
                by_longest_chain: true
            })
                .then(function (redd) {
                    redd = (JSON.parse(redd.data.data))
                    let g1 = redd;
                    axios.get(`https://api.iost.io/getTokenBalance/${hyAccount}/iost/true`)
                        .then(function (response) {
                            let val = response.data.balance;
                            if (val.balance != 0) {
                                rpc.blockchain.getBalance('Contract8skTRjuYDa8UfPFTfJQRwkBi7WanQZzeTLvGj2JyL6qy', 'iost',true).then(
                                    function(val1) {

                                        val1.balance=0;
                                        axios.post('https://api.iost.io/getContractStorage', {
                                            id: 'ContractCAcLL12M2BoU1xEstVM4guLg4DCruxVALm9qCCqTyyZe',
                                            key: 'totalPledged',
                                            by_longest_chain: true
                                        }).then(function (totalz) {
                                            totalz = JSON.parse(totalz.data.data);
//console.log('duh')
//$('.all_money').html(`ksjdfkajsfk`)
//console.log('duh')
//$('.all_money').html(`ksjdfkajsfk`)

                                            if (g1 != null){
                                                let pool_div = parseFloat(val1.balance) * (parseFloat(g1.amount) / parseFloat(totalz)) * 1
//console.log('duh')
//$('.all_money').html(`ksjdfkajsfk`)
                                                axios.post('https://api.iost.io/getContractStorage', {
                                                    id: hyAccount,
                                                    key: 'IOSTlent',
                                                    by_longest_chain: true
                                                }).then(function(poopsie) {
//console.log(poopsie.data.data)
//                        $('.logo_text').html(`<span>${langMsg.heyue}${(Math.floor(val*10000)/10000).toString().replace(reg, "$1,")} IOST</span> Collateral: ${(Math.floor(redd.amount*10000)/10000).toString().replace(reg, "$1,")} <span>iPLAY</span></br>Pool's Estimated Divs: ${(Math.floor(pool_div*10000)/10000).toString().replace(reg, "$1,")} <span>IOST</span></br>Staked (Lent): ${(Math.floor(poopsie.data.data*10000)/10000).toString().replace(reg, "$1,")}<span> IOST</span></br> iPLAY Valuation: 0.02 <span> IOST</span></br>Loan-to-Value ratio: 80%</br>Price of iPLAY on loan default: 0.016 <span> IOST</span>`);
//console.log('duh')
//$('.all_money').html(`ksjdfkajsfk`)
                                                    axios.post('https://api.iost.io/getContractStorage', {
                                                        id: hyAccount,
                                                        key: 'users',
                                                        by_longest_chain: true
                                                    }).then(function(poopsie33) {
//console.log('duh')
//$('.all_money').html(`ksjdfkajsfk`)
                                                        console.log(poopsie33.data.data)
//                        $('.logo_text').html(`Collateral: ${(Math.floor(redd.amount*10000)/10000).toString().replace(reg, "$1,")} <span>iPLAY</span><span style=\"color:transparent;\">____</span>     Lent: ${(Math.floor(poopsie.data.data*10000)/10000).toString().replace(reg, "$1,")}<span> IOST</span> <span style=\"color:transparent;\">____</span>    ${langMsg.heyue}<strong>${(Math.floor(val*10000)/10000).toString().replace(reg, "$1,")} <span>IOST</span></strong> <span style=\"color:transparent;\">____</span> Users: <strong>${(Math.floor(JSON.parse(poopsie33.data.data).length*10000)/10000).toString().replace(reg, "$1,")}</strong>`);

                                                        axios.post('https://api.iost.io/getContractStorage', {
                                                            id: 'Contract9WR9cR9JdBnppdomQzPLGcLrTMtpNNBXaFJ3Y5Wyxz7U',
                                                            key: 'info',
                                                            field: 'xsjado',
                                                            by_longest_chain: true
                                                        })
                                                            .then(function (zredd33) {
                                                                zredd33 = (JSON.parse(zredd33.data.data))
                                                                let zg55 = zredd33;

                                                                axios.post('https://api.iost.io/getContractStorage', {
                                                                    id: 'Contract9WR9cR9JdBnppdomQzPLGcLrTMtpNNBXaFJ3Y5Wyxz7U',
                                                                    key: 'info:idt',
                                                                    field: 'xsjado',
                                                                    by_longest_chain: true
                                                                })
                                                                    .then(function (zredd44) {
                                                                        zredd44 = (JSON.parse(zredd44.data.data))
                                                                        let zg66 = zredd44;
                                                                        $('.logo_text').html(`<span style="zoom:75%;">${(Math.floor(redd.amount*10)/10).toString().replace(reg, "$1,")} <span>iPLAY</span><span style=\"color:transparent;\">_</span>   ${(Math.floor((zg55.staked_amount)*10000)/10000).toString().replace(reg, "$1,")}<span> WIN</span> <span style=\"color:transparent;\">_</span>1,370,000 WINk<span style=\"color:transparent;\">_</span>    ${langMsg.heyue} ${(Math.floor(969*10000)/10000).toString().replace(reg, "$1,")} <span>888Tron</span> <span style=\"color:transparent;\">_</span>${(Math.floor(1094.138*10000)/10000).toString().replace(reg, "$1,")} <span>TOPIA</span><span style=\"color:transparent;\">_</span>${(Math.floor((zg66.staked_amount)*10000)/10000).toString().replace(reg, "$1,")} <span>IDT</span><span style=\"color:transparent;\">_</span>100,261,593 <span>ROCKET</span> <span style=\"color:transparent;\">_</span> Users: <strong>${(Math.floor(JSON.parse(poopsie33.data.data).length*10000)/10000).toString().replace(reg, "$1,")}</strong><span style=\"color:transparent;\">__</span><a style=\"position:relative;top:8px;color:#2a96d1;\" href=\"../\"><img src=\"../iost.svg\" height=\"32px\"></a>  <a style=\"position:relative;top:8px;color:#817cf5;\" href=\"vost.html\"><img src=\"../vost.svg\" height=\"32px\"></a>  <span style=\"position:relative;top:8px;color:#ec0929;\"><img src=\"../itrx.svg\" height=\"32px\"></span></span>`);
                                                                    });
                                                            });
                                                    });

//var xhttp = new XMLHttpRequest();
                                                    let zzz = function() {
                                                        if (1==1) {
//let response_arr = JSON.parse(xhttp.responseText)
//var apr = 0;
                                                            let response_arr = ['1']
                                                            var avg = [];
                                                            response_arr.forEach(function (imem,zz) {
                                                                let entry = parseFloat(imem) * (parseFloat(g1.amount) / parseFloat(totalz))
                                                                entry *=1.25 //average divs using my API is the 85% percentile of divs, sampled at the halfway point.
                                                                avg.push(entry)
                                                            });
                                                            let average = (array) => array.reduce((a, b) => a + b) / array.length;
                                                            let real_apr = average(avg);
//console.log('real_apr',real_apr)
//let apr = parseFloat(real_apr) / (parseFloat(poopsie.data.data) + parseFloat(val)) 
//console.log('apr is',apr)
//apr *= 365;
//apr *= 100;
//console.log(apr)
                                                            rpc.blockchain.getBalance('Contract8skTRjuYDa8UfPFTfJQRwkBi7WanQZzeTLvGj2JyL6qy', 'iost',true).then(
                                                                function(val5) {

                                                                    val5.balance=0;
                                                                    let apr = (parseFloat(real_apr)+(parseFloat(val5.balance) * (parseFloat(g1.amount) / parseFloat(totalz)))) / (parseFloat(poopsie.data.data) + parseFloat(val))
//console.log('apr is',apr)
                                                                    apr *= 365;
                                                                    apr *= 100;

                                                                    rpc.blockchain.getBalance('Contract8skTRjuYDa8UfPFTfJQRwkBi7WanQZzeTLvGj2JyL6qy', 'itrx',true).then(
                                                                        function(val6) {

                                                                            val6.balance=0;
                                                                            rpc.blockchain.getBalance('Contract7UbMH4owAnbXWpAz5hbxupfpDWoDdvZTDciY8FSoSjDH', 'ifry',true).then(
                                                                                function(val77) {
                                                                                    rpc.blockchain.getBalance('Contract8skTRjuYDa8UfPFTfJQRwkBi7WanQZzeTLvGj2JyL6qy', 'vost',true).then(
                                                                                        function(val88) {

                                                                                            val88.balance=0;

                                                                                            /*
                                                                                                axios.post('https://api.iost.io/getContractStorage', {
                                                                                                        id: 'Contract9WR9cR9JdBnppdomQzPLGcLrTMtpNNBXaFJ3Y5Wyxz7U',
                                                                                                        key: 'info',
                                                                                            //          field: 'ContractCAcLL12M2BoU1xEstVM4guLg4DCruxVALm9qCCqTyyZe',
                                                                                                    field: 'xsjado',
                                                                                                        by_longest_chain: true
                                                                                                    })
                                                                                                            .then(function (m3owh) {
                                                                                            console.log('mydata:',JSON.parse(m3owh.data.data).iostbalance)
                                                                                            let windivz = JSON.parse(m3owh.data.data).iostbalance;*/
                                                                                            /*axios.post('https://api.iost.io/getContractStorage', {
                                                                                                    id: 'Contract9WR9cR9JdBnppdomQzPLGcLrTMtpNNBXaFJ3Y5Wyxz7U',
                                                                                                    key: 'info',
                                                                                                    field: 'xsjado',
                                                                                                    by_longest_chain: true
                                                                                                })
                                                                                                        .then(function (zredd2) {
                                                                                            zredd2 = (JSON.parse(zredd2.data.data))
                                                                                            let zg2 = zredd2;
                                                                                            console.log('zg2 is',zg2)
                                                                                            let firstpart = zg2.iostbalance;
                                                                                            axios.post('https://cors-anywhere.herokuapp.com/https://api.iostwin.io/api/getBalance', {
                                                                                            //        id: 'Contract9WR9cR9JdBnppdomQzPLGcLrTMtpNNBXaFJ3Y5Wyxz7U',
                                                                                                    accountname: 'xsjado',
                                                                                                    lockamount: zg2.staked_amount,
                                                                                                    updatetime: zg2.updateTime,
                                                                                                    symbol: 'win'
                                                                                                })
                                                                                                        .then(function (zredd3) {
                                                                                            console.log('zredd3',zredd3.data.data.payout)
                                                                                            //console.log('firstpart is',firstpart)
                                                                                            axios.post('https://api.iost.io/getContractStorage', {
                                                                                                    id: 'Contract9WR9cR9JdBnppdomQzPLGcLrTMtpNNBXaFJ3Y5Wyxz7U',
                                                                                                    key: 'info:idt',
                                                                                                    field: 'xsjado',
                                                                                                    by_longest_chain: true
                                                                                                })
                                                                                                        .then(function (zredd4) {
                                                                                            zredd4 = (JSON.parse(zredd4.data.data))
                                                                                            let zg4 = zredd4;
                                                                                            //console.log('zg2 is',zg2)
                                                                                            let firstpart2 = zg4.iostbalance;
                                                                                            axios.post('https://cors-anywhere.herokuapp.com/https://api.iostwin.io/api/getBalance', {
                                                                                            //        id: 'Contract9WR9cR9JdBnppdomQzPLGcLrTMtpNNBXaFJ3Y5Wyxz7U',
                                                                                                    accountname: 'xsjado',
                                                                                                    lockamount: zg4.staked_amount,
                                                                                                    updatetime: zg4.updateTime,
                                                                                                    symbol: 'idt'
                                                                                                })
                                                                                                        .then(function (zredd5) {
                                                                                            console.log('zredd5',zredd5.data.data.payout)
                                                                                            */
//var axios = require('axios');
//axios.get('https://api.trongrid.io/v1/accounts/TRxKFVpGgmPhDvLHdBZ9Q6yvcoyXpik9SD')
                                                                                            // .then(function (response) {
//const tronWeb = new TronWeb({
                                                                                            // fullHost: 'https://api.trongrid.io',
//    privateKey: 'your private key'

//})
                                                                                            let fullNode = 'https://api.trongrid.io/'
                                                                                            let solidityNode = 'https://api.trongrid.io/'
                                                                                            const tronWeb = new TronWeb(fullNode, solidityNode);
                                                                                            tronWeb.trx.getBalance('TRxKFVpGgmPhDvLHdBZ9Q6yvcoyXpik9SD').then(userBalance => {
//    console.log(`User's balance is: ${ userBalance }`);

//    let trxbal = parseInt(response.data.data[0].balance)/Math.pow(10,6);
                                                                                                let mytrxbal = parseInt(userBalance)/Math.pow(10,6);
                                                                                                // handle success
                                                                                                //  let mytrxbal = parseInt(response.data.data[0].balance)/Math.pow(10,6);
//let totaltrx = parseFloat(g1.amount) + parseFloat(trxbal)
                                                                                                axios.get('/iostwin.txt')
                                                                                                    .then(function (curry) {
                                                                                                        var summy = 0;
                                                                                                        var hyAccount = 'ContractgLEoAwoDscY4EToBCEbH1JCEJy1vPAq6xaAP4jnzceP';
                                                                                                        axios.post('https://api.iost.io/getContractStorage', {
                                                                                                            id: 'ContractyDSu66Ehsfh5HRadovwWG2n7J3HhkbPMjz81s4gr2cB',
//            key: 'pledge',
                                                                                                            key: hyAccount+'_claimed',
//          field: 'ContractCAcLL12M2BoU1xEstVM4guLg4DCruxVALm9qCCqTyyZe',
                                                                                                            by_longest_chain: true
                                                                                                        })
                                                                                                            .then(function (claimed) {
                                                                                                                axios.post('https://api.iost.io/getContractStorage', {
                                                                                                                    id: 'ContractyDSu66Ehsfh5HRadovwWG2n7J3HhkbPMjz81s4gr2cB',
//            key: 'pledge',
                                                                                                                    key: hyAccount+'_bootypower',
//          field: 'ContractCAcLL12M2BoU1xEstVM4guLg4DCruxVALm9qCCqTyyZe',
                                                                                                                    by_longest_chain: true
                                                                                                                })
                                                                                                                    .then(function (bootypower) {
                                                                                                                        bootypower = (bootypower.data.data)
                                                                                                                        let gee1 = bootypower;




                                                                                                                        axios.post('https://api.iost.io/getContractStorage', {
                                                                                                                            id: 'ContractyDSu66Ehsfh5HRadovwWG2n7J3HhkbPMjz81s4gr2cB',
//            key: 'pledge',
                                                                                                                            key: 'profitPerShare',
//          field: 'ContractCAcLL12M2BoU1xEstVM4guLg4DCruxVALm9qCCqTyyZe',
                                                                                                                            by_longest_chain: true
                                                                                                                        })
                                                                                                                            .then(function (bootypower2) {
                                                                                                                                bootypower2 = (bootypower2.data.data)
                                                                                                                                summy  += Number(bootypower2)*parseFloat(gee1) - Number(claimed.data.data);

                                                                                                                                var hec = 'ifryholders';
                                                                                                                                axios.post('https://api.iost.io/getContractStorage', {
                                                                                                                                    id: 'ContractEX9bNiLCtNqGPBH5VKU6xbcANNJZqMo618fXwXNFnUvj',
//            key: 'pledge',
                                                                                                                                    key: hec+'_claimed',
//          field: 'ContractCAcLL12M2BoU1xEstVM4guLg4DCruxVALm9qCCqTyyZe',
                                                                                                                                    by_longest_chain: true
                                                                                                                                }).then(function(claimedloot){

                                                                                                                                    axios.post('https://api.iost.io/getContractStorage', {
                                                                                                                                        id: 'ContractEX9bNiLCtNqGPBH5VKU6xbcANNJZqMo618fXwXNFnUvj',
//            key: 'pledge',
                                                                                                                                        key: hec+'_lootpower',
//          field: 'ContractCAcLL12M2BoU1xEstVM4guLg4DCruxVALm9qCCqTyyZe',
                                                                                                                                        by_longest_chain: true
                                                                                                                                    }).then(function(lootpower){

                                                                                                                                        lootpower = lootpower.data.data
                                                                                                                                        axios.post('https://api.iost.io/getContractStorage', {
                                                                                                                                            id: 'ContractEX9bNiLCtNqGPBH5VKU6xbcANNJZqMo618fXwXNFnUvj',
//            key: 'pledge',
                                                                                                                                            key: 'profitPerShare',
                                                                                                                                            by_longest_chain: true
                                                                                                                                        })
                                                                                                                                            .then(function (bootypower4) {
                                                                                                                                                bootypower4 = (bootypower4.data.data)

                                                                                                                                                summy  += Number(bootypower4)*parseFloat(lootpower) - Number(claimedloot.data.data);

                                                                                                                                                $('.all_money').html(`iFRY Remaining: </br><span style=\"color:#4dfb82;font-size:15px;\">ROUND 1 IS SOLD OUT, CLICK FOR ROUND 2 PRESALE (TRX)!</span> </br>Today's Dividends:</br> <span style=\"color:#4dfb82;font-size:26px;\">${(Math.floor((parseFloat(pool_div) + parseFloat(summy) + parseFloat(curry.data))*10000)/10000).toString().replace(reg, "$1,")} IOST</span></br> <span style=\"color:#4dfb82;font-size:26px;\">${(Math.floor(val88.balance*(parseFloat(g1.amount) / parseFloat(totalz))*10000*1)/10000).toString().replace(reg, "$1,")} VOST</span> </br> <span style=\"color:#4dfb82;font-size:26px;\">${(Math.floor((val6.balance*(parseFloat(g1.amount) / parseFloat(totalz))+Math.floor(mytrxbal)) * 10000*1)/10000).toString().replace(reg, "$1,")} iTRX</span>`)
                                                                                                                                            });
                                                                                                                                    });
                                                                                                                                });
                                                                                                                            });
                                                                                                                    })
                                                                                                            })//end newstuff
                                                                                                    });
                                                                                            });
//});
//});
//});//axios post
                                                                                        });
                                                                                });
                                                                        });//rpc call 1
                                                                });//rpc call 2
                                                        }
                                                    };
//xhttp.open("GET", "https://iostplay.tk:3001/events/chart", false);
//xhttp.open("GET", "tester.html", true);

//xhttp.send();
                                                    zzz();

                                                });
                                            }
                                        });//storage
                                    });//rpc
//zzz();
                            };
                        })
                        .catch(function (error) {
                            console.logz(error);
                        });
                });
            setInterval(() => {

//            axios.get(`https://api.iost.io/getTokenBalance/${hyAccount}/iplay/true`)
                axios.post('https://api.iost.io/getContractStorage', {
                    id: hyAccount,
                    key: 'pledge',
                    field: 'ContractgLEoAwoDscY4EToBCEbH1JCEJy1vPAq6xaAP4jnzceP',
                    by_longest_chain: true
                })

                    .then(function (redd) {
                        redd = (JSON.parse(redd.data.data))
                        let g2 = redd;
                        axios.get(`https://api.iost.io/getTokenBalance/${hyAccount}/iost/true`)
                            .then(function (response) {
                                let val = response.data.balance;
                                if (val.balance != 0) {
                                    rpc.blockchain.getBalance('Contract8skTRjuYDa8UfPFTfJQRwkBi7WanQZzeTLvGj2JyL6qy', 'iost',true).then(
                                        function(val1) {

                                            val1.balance=0;
                                            axios.post('https://api.iost.io/getContractStorage', {
                                                id: 'ContractCAcLL12M2BoU1xEstVM4guLg4DCruxVALm9qCCqTyyZe',
                                                key: 'totalPledged',
                                                by_longest_chain: true
                                            }).then(function (totalz) {
                                                totalz = JSON.parse(totalz.data.data);
                                                if (g2 != null){

                                                    let pool_div = parseFloat(val1.balance) * (parseFloat(g2.amount) / parseFloat(totalz))

//                            $('.all_money').html(`${langMsg.heyue}${(Math.floor(val*10000)/10000).toString().replace(reg, "$1,")} <span>IOST</span>`);
                                                    $('.all_money').html(`<span>${langMsg.heyue}${(Math.floor(val*10000)/10000).toString().replace(reg, "$1,")} IOST</span></br> Bankroll: ${(Math.floor(redd.amount*10000)/10000).toString().replace(reg, "$1,")} <span>iPLAY</span></br>Pool's Estimated Divs: ${(Math.floor(pool_div*10000)/10000).toString().replace(reg, "$1,")} <span>IOST</span>`);
                                                }});//storage
                                        });//rpc
                                }
                            })
                            .catch(function (error) {
                                console.logz(error);
                            });
                    });
//whatselect=(document.getElementById('wdasset').value);

                dofunct2();
            }, 5000);


        }).catch((err) => {
            console.logz(err);

            if (err.type === 'locked') {
                //锁定
                $('.login_err_text').html(langMsg.err6);
                $('.login_err').css('display', 'flex');
                setTimeout(() => {
                    $('.login_err').css('display', 'none');
                }, 3000);
            };
        });
    };
    // })
};

setTimeout(() => {
    login();
}, 300);
//事件
//点击登录
$(".login_btn").click(function () {
    history.go(0);
});
$(".log_click").click(function () {
    history.go(0);
});

$(".login_err").click(function () {
    // $('.login_err').css('display', 'none')
});
//打开公告
$(".pmd_e").click(function () {
    $('.gonggao').css('display', 'flex');
});
//关闭公告
$('.close_gg').click(function () {
    $('.gonggao').hide();
});

//复制
$(".copy_btn").click(function () {
    $('.input_invite_url').select();
    document.execCommand("Copy");
});


let displayLoan = function (ary,currentblock) {
//    $('.nullz').html('');
    let check_null = ($('.nullz').prop('outerHTML'))
    if (check_null.includes('No loans')){
        $('.nullz').empty()
    }


//console.logz('displayloan: ',ary)
    ary.forEach((item, index) => {
//release_arr.push(item.time_release);
        console.log("displayloan: ",item)
        if(release_arr.indexOf(item.time_release) === -1){
            let diff = parseInt(currentblock) - parseInt(item.time_release);
            diff *= -1
            diff = '<span id=\"loan'+item.time_release+'\">'+c0nvert(diff)+'</span>';
            let calcd = (parseFloat(item.iost_lent) - parseFloat(item.iostpaidback));
//console.log("calcd is",calcd)
            let xxx = (calcd > 0.000000000000) ?"<a href=\"#open-modal\" style=\"color:#20C99F;\">REPAY?</a>" : '<font color=\"red\">FINISHED</font>'
            if (calcd > 0.000000000000 && document.getElementById('changeme').innerHTML.length < 30) {
//document.getElementById('changeme').innerHTML='<select id=\"loan_select\">'

                save_loans.forEach(function (when, moon) {
//console.log('bam')
//if(when.split(':')[1] === item.time_release) {
//console.log('boom')
                    document.getElementById('changeme').innerHTML += '<option value=\"l0an'+when.split(':')[1]+'\">'+when.split(':')[0]+'</option>'
//}
//document.getElementById('changeme').innerHTML='<select id=\"loan_select\"></select>'
//if (moon === save_loans.length - 1 ) {
//document.getElementById('changeme').innerHTML+='</select>'
//}
                });
//document.getElementById('changeme').innerHTML+='</select>'


            }
            $('.nullz').append(' <li> <div> <h6>Loan defaults in</h6> <p>'+diff+' </p> </div> <div> <h6>'+item.iost_lent+' IOST</h6> <p>Amount Lent</p> </div> <div> <h6>'+item.iplay_deposited+' iPLAY</h6> <p>Collateral Held</p> </div> <div> <h6>'+(parseFloat(item.iost_lent) - parseFloat(item.iostpaidback))+' IOST</h6> <p>Amount Owed</p> </div> <div>'+xxx+' </div> </li> ');
            release_arr.push(item.time_release);
        } else {
            let diff = parseInt(currentblock) - parseInt(item.time_release);
            diff *= -1
//diff = '<span id=\"loan'+currentblock+'\">'+addcomma(diff)+'</span>';
            document.getElementById('loan'+item.time_release).innerHTML = c0nvert(diff);
        }



        /*<!-- <li>
                                <div>
                                    <h6>5.00%日收益率</h6>
                                    <p>2019.02.12</p>
                                </div>
                                <div>
                                    <h6>23123.2332 IOST</h6>
                                    <p>投资金额</p>
                                </div>
                                <div>
                                    <h6>423.32 IOST</h6>
                                    <p>已提现</p>
                                </div>
                                <div>
                                    <h6>423.32 IOST</h6>
        */
    });


}

//计算
let add = function (ary,currentblock) {
//    saveTotal = 0;
//console.log(hash)
//if (has_seen.indexOf(hash) !== -1) {
//
//}
    //inviteMoney = 0;
    //  alltx = 0;
//    inviteTotal = ary.refAmount;
    let pew = [];
    pew.push(ary);
    ary = pew;
    ary.forEach((item, index) => {
        console.logz("item is",item)
//document.getElementById('.null').innerHTML = "<p>testing testing</p>"
        let check_null = ($('.null').prop('outerHTML'))
        if (check_null.includes('No investment')){
            $('.null').empty()

        } else {
            if (seen_release.indexOf(parseInt(item.release_block)) !== -1) {
                console.logz("I SEEN RELEASE")
                let diffie = parseInt(currentblock) - parseInt(item.release_block);
                diffie *= -1
                if (diffie <= 0) {
                    diffie = "WITHDRAW ENABLED"
                }
                let final_prod2 = "<span id=\"editme"+item.release_block+"\">"+c0nvert(diffie)+"</span>"

                document.getElementById('editme'+item.release_block).innerHTML = final_prod2
            }

//console.logz('cooldown is',item.cooldown);
            if (seen_cooldowns.indexOf(parseInt(item.cooldown)) !== -1) {
                let diff = parseInt(currentblock) - parseInt(item.cooldown);
                diff *= -1
                if (diff <= 0) {
//diff = "<button onclick=cooldivs("+JSON.stringify(hash)+")>Hacktivate</button>"
                }else {
                    let final_prod = "<span id=\"editme"+item.cooldown+"\">"+addcomma(diff)+"</span>"

                    document.getElementById('editme'+item.cooldown).innerHTML = final_prod

                }}
            if (seen_cooldowns.indexOf(parseInt(item.cooldown)) === -1) {
                seen_cooldowns.push(parseInt(item.cooldown))
                totes_magotes += parseFloat(item.amount);
//let div_power = 0;
                if (parseInt(item.cooldown) < parseInt(currentblock)) {
//div_power += parseFloat(item.amount)
//console.log(userMsg._id+"_divpower")
                    /*   axios.post('https://api.iost.io/getContractStorage', {
                                id: 'ContractgLEoAwoDscY4EToBCEbH1JCEJy1vPAq6xaAP4jnzceP',
                                key: userMsg._id+"_divpower",
                               // field: hyAccount,
                    //          field: 'ContractCAcLL12M2BoU1xEstVM4guLg4DCruxVALm9qCCqTyyZe',
                                by_longest_chain: true
                            }).then(function(itsme) {
                    console.log('itsme',itsme.data)
                    div_power = parseFloat(itsme.data.data)
                    console.log(div_power)
                    });*/

                }
                let diff = parseInt(currentblock) - parseInt(item.cooldown);
                diff *= -1
//if (diff <= 0) {
//diff = "0"
//console.log('hash iz',item.h4sh)
                var meow;
                has_seen.forEach(function(aaa,bbb) {
                    if(aaa.split(':')[0] === item.release_block) {
//console.log('it matches...')
                        meow = aaa.split(':')[1];
                        meow = meow.slice(0,5);
                        meow += "...";
                        meow += aaa.split(':')[1].slice(-5);
                        if (diff <=0 ) {
//diff = "<button onclick=cooldivs("+JSON.stringify(aaa.split(':')[1])+")>Activate</button>"
                            diff = "ACTIVE"
                        }
                    }
                });
//diff = "99999"
//}




                let diffie = parseInt(currentblock) - parseInt(item.release_block);
                seen_release.push(parseInt(item.release_block))
                console.logz(diffie);
                diffie *= -1
                if (diffie <= 0) {
                    diffie = "WITHDRAW ENABLED"
                }



                let final_prod = "<span id=\"editme"+item.cooldown+"\">"+addcomma(diff)+"</span>"
                final_prod2 = "<span id=\"editme"+item.release_block+"\">"+c0nvert(diffie)+"</span>"
                let htmlstring = " <li> <div><h6>"+ meow +"</font></br>Earn Divs in "+final_prod+" blocks</h6> <p>Withdraw in "+final_prod2+"</p> </div> <div> <h6>"+item.amount
                    +" IOST</h6> <p>Deposited</p> </div> <div> "
                    +"<h6>"+totes_magotes+" IOST</h6> <p>Total Deposited</p> </div> <div> <h6>"+div_power+" IOST</h6> <p>Total IOST Earnings Divs</p> </div> <div>ACTIVE</div></li> "
                $('.null').append(htmlstring);
            }
        }
        //   saveTotal += parseFloat(item.amount);
        alltx += Number(item.amount);
    });
//    saveTotal = saveTotal.toFixed(4);


    //计算全部利息
    checkInterest(now, ary);
};

//存入判断
$(".save_btn").click(function () {
    let val = $('.save_input').val();
    let num = walletBalance;
    let ibal = iplayBalance;
    console.logz(num);

    let reg = /^\d+(\.\d+)?$/;
    if (val) {
        if (reg.test(val)) {
            if (Math.floor(val * 10000) / 10000 > num && document.getElementById("whichcoin").value == "IOST") {
                $('.save_input').val('');
                //钱包月不足
                $('.save_input').attr("placeholder", langMsg.bz);
            } else if (Math.floor(val * 10000) / 10000 > ibal && document.getElementById("whichcoin").value == "iplay") {
                $('.save_input').val('');
                //钱包月不足
                $('.save_input').attr("placeholder", langMsg.bz);
            } else if (Math.floor(val * 10000) / 10000 <1) {
                //输入错误
                $('.save_input').val('');
                $('.save_input').attr("placeholder", langMsg.keytrue);
//	    } else if (
            } else {
//if (document.getElementById("whichcoin").value == "iost"){

                saveIost((Math.floor(val * 10000) / 10000).toString(), document.getElementById("whichcoin").value)
//}
            };
        } else {
            //输入错误
            $('.save_input').val('');
            $('.save_input').attr("placeholder", langMsg.keytrue);
        }
    } else {
        $('.save_input').val('');
        $('.save_input').attr("placeholder", langMsg.keytrue);
        //输入错误
    };
});
//start submitproposal
let submitproposal = function () {
    /*var val;
    if(isMax) {
    val=document.getElementById("amt0wed").innerHTML;
    } else {
    val = document.getElementById('repayb0x').value;
    }
    var is_txID = document.getElementById("changeme").value.slice(4);
    var txID = '';
    save_loans.forEach(function(qq,ww) {
    if (document.getElementById("changeme").value.slice(4) === qq.split(':')[1]){
    txID = qq.split(':')[0];
    }
    });*/
    var tx;
    let question = document.getElementById('proptitle').value;
    let a = document.getElementById('oppa').value;
    let b = document.getElementById('oppb').value;
    let c = document.getElementById('oppc').value;
    let d = document.getElementById('oppd').value;

    tx = iost.callABI('ContractEFgc2UTTp7BNBL6wECaWhLmLSGcoXWMtyfHzF2bm6Cik', "addproposal", [userMsg._id,question,a,b,c,d]);
    iost.signAndSend(tx).on('pending', function (txid) {
        $('.save_btn').hide();
        $('.save_btn_load').html(langMsg.action);
        $('.save_btn_load').show();
        $('.save_btn_tip').show();

    }).on('success', function (result) {
//aa1122
        $('.login_err').css('display', 'flex');
        $('.login_err_text').html(langMsg.err8);
        setTimeout(() => {
            $('.login_err').css('display', 'none');
        }, 3000);
        $('.save_btn').show();
        $('.save_btn_load').hide();
        $('.save_btn_tip').hide();

    }).on('failed', function (result) {
        $('.save_btn').show();
        $('.save_btn_load').hide();
        $('.save_btn_tip').hide();
        $('.login_err_text').html(langMsg.err10);
        $('.login_err').css('display', 'flex');
        setTimeout(() => {
            $('.login_err').css('display', 'none');
        }, 3000);


    });
};
//存入
let process = function (isMax) {
    var val;
    if(isMax) {
        val=document.getElementById("amt0wed").innerHTML;
    } else {
        val = document.getElementById('repayb0x').value;
    }
    var is_txID = document.getElementById("changeme").value.slice(4);
    var txID = '';
    save_loans.forEach(function(qq,ww) {
        if (document.getElementById("changeme").value.slice(4) === qq.split(':')[1]){
            txID = qq.split(':')[0];
        }
    });
    var tx;
    tx = iost.callABI(hyAccount, "paybackLoan", [userMsg._id, val, txID]);
    iost.signAndSend(tx).on('pending', function (txid) {
        $('.save_btn').hide();
        $('.save_btn_load').html(langMsg.action);
        $('.save_btn_load').show();
        $('.save_btn_tip').show();

    }).on('success', function (result) {
//aa1122
        $('.login_err').css('display', 'flex');
        $('.login_err_text').html(langMsg.err8);
        setTimeout(() => {
            $('.login_err').css('display', 'none');
        }, 3000);
        $('.save_btn').show();
        $('.save_btn_load').hide();
        $('.save_btn_tip').hide();

    }).on('failed', function (result) {
        $('.save_btn').show();
        $('.save_btn_load').hide();
        $('.save_btn_tip').hide();
        $('.login_err_text').html(langMsg.err10);
        $('.login_err').css('display', 'flex');
        setTimeout(() => {
            $('.login_err').css('display', 'none');
        }, 3000);


    });
};
///divider



let stake = function () {
    var val;
    val = document.getElementById('repayb0xx').value;
    /*(var is_txID = document.getElementById("changeme").value.slice(4);
    var txID = '';
    save_loans.forEach(function(qq,ww) {
    if (document.getElementById("changeme").value.slice(4) === qq.split(':')[1]){
    txID = qq.split(':')[0];
    }
    });*/
    var tx;
//    tx = iost.callABI(hyAccount, "stakeiFRY", [userMsg._id, val]);
    function makeTX(contract, abi, args, currency='iplay', amount='0', approve=true){
        const t = new IOST.Tx(config.gasRatio, config.gasLimit);
        t.addAction(contract, abi, JSON.stringify(args));
        t.setTime(config.expiration, config.delay,iost.serverTimeDiff);
        if(approve){
            if(amount=="0"){
                t.addApprove(currency, config.defaultLimit);
            } else {
                t.addApprove(currency, amount);
            }
        }
        return t;
    }
//var proposalname = document.getElementById('curprop').innerText;
    tx = makeTX(hyAccount, 'stakeiFRY', [userMsg._id,val], 'ifry', '5000000',true);

    iost.signAndSend(tx).on('pending', function (txid) {
        $('.save_btn').hide();
        $('.save_btn_load').html(langMsg.action);
        $('.save_btn_load').show();
        $('.save_btn_tip').show();

    }).on('success', function (result) {
//aa1122
        $('.login_err').css('display', 'flex');
        $('.login_err_text').html(langMsg.err8);
        setTimeout(() => {
            $('.login_err').css('display', 'none');
        }, 3000);
        $('.save_btn').show();
        $('.save_btn_load').hide();
        $('.save_btn_tip').hide();

    }).on('failed', function (result) {
        $('.save_btn').show();
        $('.save_btn_load').hide();
        $('.save_btn_tip').hide();
        $('.login_err_text').html(langMsg.err10);
        $('.login_err').css('display', 'flex');
        setTimeout(() => {
            $('.login_err').css('display', 'none');
        }, 3000);


    });
};


//divider 2

let voteproposal = function () {
    var radioselect;
    document.getElementsByName('gender').forEach(function(item,i){ if(item.checked){radioselect=(item.value)}
    });
    var val;
    valuez = document.getElementById('repayb0x').value;
    var tx;
//    tx = iost.callABI(hyAccount, "exchangeifry", [val,userMsg._id]);
    function makeTX(contract, abi, args, currency='iplay', amount='0', approve=true){
        const t = new IOST.Tx(config.gasRatio, config.gasLimit);
        t.addAction(contract, abi, JSON.stringify(args));
        t.setTime(config.expiration, config.delay,iost.serverTimeDiff);
        if(approve){
            if(amount=="0"){
                t.addApprove(currency, config.defaultLimit);
            } else {
                t.addApprove(currency, amount);
            }
        }
        return t;
    }
    var proposalname = document.getElementById('curprop').innerText;
    tx = makeTX('ContractEFgc2UTTp7BNBL6wECaWhLmLSGcoXWMtyfHzF2bm6Cik', 'voteproposal', [userMsg._id,valuez,proposalname,radioselect], 'ifry', valuez,true);

    iost.signAndSend(tx).on('pending', function (txid) {
        $('.save_btn').hide();
        $('.save_btn_load').html(langMsg.action);
        $('.save_btn_load').show();
        $('.save_btn_tip').show();

    }).on('success', function (result) {
//aa1122
        $('.login_err').css('display', 'flex');
        $('.login_err_text').html(langMsg.err8);
        setTimeout(() => {
            $('.login_err').css('display', 'none');
        }, 3000);
        $('.save_btn').show();
        $('.save_btn_load').hide();
        $('.save_btn_tip').hide();

    }).on('failed', function (result) {
        $('.save_btn').show();
        $('.save_btn_load').hide();
        $('.save_btn_tip').hide();
        $('.login_err_text').html(langMsg.err10);
        $('.login_err').css('display', 'flex');
        setTimeout(() => {
            $('.login_err').css('display', 'none');
        }, 3000);


    });
};
//end voteproposal
let swap = function (dacoin) {
    var val;
    val = document.getElementById('repayb0xxx').value;
    /*(var is_txID = document.getElementById("changeme").value.slice(4);
    var txID = '';
    save_loans.forEach(function(qq,ww) {
    if (document.getElementById("changeme").value.slice(4) === qq.split(':')[1]){
    txID = qq.split(':')[0];
    }
    });*/
    var tx;
//    tx = iost.callABI(hyAccount, "exchangeifry", [val,userMsg._id]);
    function makeTX(contract, abi, args, currency='iplay', amount='0', approve=true){
        const t = new IOST.Tx(config.gasRatio, config.gasLimit);
        t.addAction(contract, abi, JSON.stringify(args));
        t.setTime(config.expiration, config.delay,iost.serverTimeDiff);
        if(approve){
            if(amount=="0"){
                t.addApprove(currency, config.defaultLimit);
            } else {
                t.addApprove(currency, amount);
            }
        }
        return t;
    }
    if(dacoin === "win"){
        tx = makeTX('ContractGmS2fu3p6RimmMPfsBSNio7grtvom3yxg8ta132SE9f8', 'wrapWIN', [userMsg._id,val], 'win', val,true);
    } else if (dacoin === "iwin") {
        tx = makeTX('ContractGmS2fu3p6RimmMPfsBSNio7grtvom3yxg8ta132SE9f8', 'unwrapWIN', [userMsg._id,val], 'iwin', val,true);


    } else if (dacoin ==="idt") {

        tx = makeTX('Contract7XjHf6KwmpXejex5ssC7oWLYtpHghJYApzGej98wDLTj', 'wrapIDT', [userMsg._id,val], 'idt', val,true);


    } else if (dacoin ==="iidt") {

        tx = makeTX('Contract7XjHf6KwmpXejex5ssC7oWLYtpHghJYApzGej98wDLTj', 'unwrapIDT', [userMsg._id,val], 'iidt', val,true);

    }
    iost.signAndSend(tx).on('pending', function (txid) {
        $('.save_btn').hide();
        $('.save_btn_load').html(langMsg.action);
        $('.save_btn_load').show();
        $('.save_btn_tip').show();

    }).on('success', function (result) {
//aa1122
        $('.login_err').css('display', 'flex');
        $('.login_err_text').html(langMsg.err8);
        setTimeout(() => {
            $('.login_err').css('display', 'none');
        }, 3000);
        $('.save_btn').show();
        $('.save_btn_load').hide();
        $('.save_btn_tip').hide();

    }).on('failed', function (result) {
        $('.save_btn').show();
        $('.save_btn_load').hide();
        $('.save_btn_tip').hide();
        $('.login_err_text').html(langMsg.err10);
        $('.login_err').css('display', 'flex');
        setTimeout(() => {
            $('.login_err').css('display', 'none');
        }, 3000);


    });
};
///divider again
let unstake = function () {
    var val;
    val = document.getElementById('repayb0xx').value;
    /*(var is_txID = document.getElementById("changeme").value.slice(4);
    var txID = '';
    save_loans.forEach(function(qq,ww) {
    if (document.getElementById("changeme").value.slice(4) === qq.split(':')[1]){
    txID = qq.split(':')[0];
    }
    });*/
    var tx;
    tx = iost.callABI(hyAccount, "unstakeiFRY", [userMsg._id, val]);
    iost.signAndSend(tx).on('pending', function (txid) {
        $('.save_btn').hide();
        $('.save_btn_load').html(langMsg.action);
        $('.save_btn_load').show();
        $('.save_btn_tip').show();

    }).on('success', function (result) {
//aa1122
        $('.login_err').css('display', 'flex');
        $('.login_err_text').html(langMsg.err8);
        setTimeout(() => {
            $('.login_err').css('display', 'none');
        }, 3000);
        $('.save_btn').show();
        $('.save_btn_load').hide();
        $('.save_btn_tip').hide();

    }).on('failed', function (result) {
        $('.save_btn').show();
        $('.save_btn_load').hide();
        $('.save_btn_tip').hide();
        $('.login_err_text').html(langMsg.err10);
        $('.login_err').css('display', 'flex');
        setTimeout(() => {
            $('.login_err').css('display', 'none');
        }, 3000);


    });
};

let saveIost = function (val,coin) {
    let invitePlay = GetRequest();
    let inviteName = '';
    if (invitePlay.user) {
        inviteName = invitePlay.user;
    } else {
        inviteName = '';
    };
    var tx;
    let newcontract = 'Contract7UbMH4owAnbXWpAz5hbxupfpDWoDdvZTDciY8FSoSjDH'
    if (coin == "iost") {
        tx = iost.callABI(newcontract, "IOSTtoFRY", [userMsg._id, val]);
    } else if (coin == 'vost'){
        tx = iost.callABI(newcontract, "VOSTtoFRY", [userMsg._id, val]);
    } else if (coin == 'itrx'){
        tx = iost.callABI(newcontract, "iTRXtoFRY", [userMsg._id, val]);
    } else if (coin == 'win'){
        tx = iost.callABI(newcontract, "WINtoFRY", [userMsg._id, val]);
    } else if (coin == 'iplay'){
        tx = iost.callABI(newcontract, "iPLAYtoFRY", [userMsg._id, val]);
    } else if (coin == 'frziplay'){
//    tx = iost.callABI(hyAccount, "FRZIPLAYtoIFRY", [userMsg._id, val]);
        function makeTX(contract, abi, args, currency='iplay', amount='0', approve=true){
            const t = new IOST.Tx(config.gasRatio, config.gasLimit);
            t.addAction(contract, abi, JSON.stringify(args));
            t.setTime(config.expiration, config.delay,iost.serverTimeDiff);
            if(approve){
                if(amount=="0"){
                    t.addApprove(currency, config.defaultLimit);
                } else {
                    t.addApprove(currency, amount);
                }
            }
            return t;
        }
        tx = makeTX(hyAccount, 'FRZIPLAYtoIFRY', [userMsg._id, val], 'iplay', val);
        /*
        if (coin == "IOST") {
            tx = iost.callABI(hyAccount, "depositIOST", [userMsg._id, val]);
        } else if(coin=='iplay') {
            tx = iost.callABI(hyAccount, "getLoan", [userMsg._id, val]);
        */
    } else {

        function makeTX(contract, abi, args, currency='iplay', amount='0', approve=true){
            const t = new IOST.Tx(config.gasRatio, config.gasLimit);
            t.addAction(contract, abi, JSON.stringify(args));
            t.setTime(config.expiration, config.delay,iost.serverTimeDiff);
            if(approve){
                if(amount=="0"){
                    t.addApprove(currency, config.defaultLimit);
                } else {
                    t.addApprove(currency, amount);
                }
            }
            return t;
        }
        tx = makeTX(hyAccount, 'getSplashed', [userMsg._id, val], 'iplay', val);
    }
    iost.signAndSend(tx).on('pending', function (txid) {
        console.logz("=====>存入中", txid);
        $('.save_btn').hide();
        $('.save_btn_load').html(langMsg.action);
        $('.save_btn_load').show();
        $('.save_btn_tip').show();
//aaccbb
    }).on('success', function (result) {
        console.logz('======>存入成功', result);
        $('.login_err').css('display', 'flex');
        $('.login_err_text').html(langMsg.err8);
        setTimeout(() => {
            $('.login_err').css('display', 'none');
        }, 3000);
        $('.save_btn').show();
        $('.save_btn_load').hide();
        $('.save_btn_tip').hide();
    }).on('failed', function (result) {
        console.logz('======>存入失败', result);
        $('.save_btn').show();
        $('.save_btn_load').hide();
        $('.save_btn_tip').hide();
        $('.login_err_text').html(langMsg.err10);
        $('.login_err').css('display', 'flex');
        setTimeout(() => {
            $('.login_err').css('display', 'none');
        }, 3000);
    });
};

//提取
$(".sell_btn").click(function () {
    var tx = '';
    if($("#wdasset").val() === "idt") {
        tx = iost.callABI('Contract7XjHf6KwmpXejex5ssC7oWLYtpHghJYApzGej98wDLTj', "withdrawIDT", [userMsg._id]);
    } else if (document.getElementById('wdasset').value === "win") {
        tx = iost.callABI('ContractGmS2fu3p6RimmMPfsBSNio7grtvom3yxg8ta132SE9f8', "withdrawWIN", [userMsg._id]);



    } else if (document.getElementById('wdasset').value === "ifry") {
        tx = iost.callABI('ContractEFgc2UTTp7BNBL6wECaWhLmLSGcoXWMtyfHzF2bm6Cik', "withdrawiFRY", [userMsg._id]);
        console.log('ifry selected')

    }
    /*function makeTX(contract, abi, args, currency='iplay', amount='0', approve=false){
        const t = new IOST.Tx(config.gasRatio, config.gasLimit);
        t.addAction(contract, abi, JSON.stringify(args));
        t.setTime(config.expiration, config.delay,iost.serverTimeDiff);
        if(approve){
          if(amount=="0"){
            t.addApprove(currency, config.defaultLimit);
          } else {
            t.addApprove(currency, amount);
          }
        }
        return t;
      }*/
//var tx = makeTX(hyAccount, 'withdrawIPLAY', [userMsg._id]);
    iost.signAndSend(tx).on('pending', function (txid) {
        console.logz("======>提取中", txid);
        $('.sell_btn').hide();
        $('.sell_btn_load').show();
        $('.sell_btn_tip').show();
    }).on('success', function (result) {
        console.logz('======>提取成功', result);
        $('.login_err').css('display', 'flex');
        setTimeout(() => {
            $('.login_err').css('display', 'none');
        }, 3000);
        $('.login_err_text').html(langMsg.err9);
        $('.sell_btn').show();
        $('.sell_btn_load').hide();
        $('.sell_btn_tip').hide();
    }).on('failed', function (result) {
        console.logz('======>提取失败', result);
        $('.sell_btn').show();
        $('.sell_btn_load').hide();
        $('.sell_btn_tip').hide();
        $('.login_err_text').html(langMsg.err11);
        $('.login_err').css('display', 'flex');
        setTimeout(() => {
            $('.login_err').css('display', 'none');
        }, 3000);
    });
});


let cooldivs = function (txid) {
    const tx = iost.callABI(hyAccount, "cooledIOST", [userMsg._id,  txid]);
    iost.signAndSend(tx).on('pending', function (txid) {
        console.logz("======>提取中", txid);
        $('.sell_btn').hide();
        $('.sell_btn_load').show();
        $('.sell_btn_tip').show();
    }).on('success', function (result) {
        console.logz('======>提取成功', result);
        $('.login_err').css('display', 'flex');
        setTimeout(() => {
            $('.login_err').css('display', 'none');
        }, 3000);
        $('.login_err_text').html(langMsg.err9);
        $('.sell_btn').show();
        $('.sell_btn_load').hide();
        $('.sell_btn_tip').hide();
    }).on('failed', function (result) {
        console.logz('======>提取失败', result);
        $('.sell_btn').show();
        $('.sell_btn_load').hide();
        $('.sell_btn_tip').hide();
        $('.login_err_text').html(langMsg.err11);
        $('.login_err').css('display', 'flex');
        setTimeout(() => {
            $('.login_err').css('display', 'none');
        }, 3000);
    });
};

let checkInterest = function (now, ary) {
    const MINUTE_PER_DAY = 24 * 60;
    const NS_PER_MINUTE = 60 * 1000000000;
    const maxCheckDur = MINUTE_PER_DAY * 28; // 28天

    const interestRate = 0.05;
    let totalInterest = 0;
    ary.forEach((item, index) => {
        let obj = item
        let deposit = obj.deposit;

        let endPoint = obj.depositTime + maxCheckDur * MINUTE_PER_DAY * NS_PER_MINUTE;
        // debugger
        if (endPoint <= now) {
            bRemove4Db = true;
        } else {
            endPoint = now;
        };

        let durMin = Math.floor((endPoint - obj.interestTime) / NS_PER_MINUTE);


        let durDay = Math.floor(durMin / MINUTE_PER_DAY);
        let durMinRemain = durMin - durDay * MINUTE_PER_DAY;

        let interest = 0;
        if (durDay > 0)
            interest += Number((deposit * interestRate * durDay).toFixed(4));
        interest += Number((deposit * interestRate * (durMinRemain / MINUTE_PER_DAY)).toFixed(4));


        totalInterest += interest;
    });

    sellCan = totalInterest;
    sellCanaction = totalInterest;
};

//渲染投资列表
let writeList = function (now, ary) {
    const MINUTE_PER_DAY = 24 * 60; // 第天分钟数
    const maxCheckDur = MINUTE_PER_DAY * 28 * 1000000000 * 60; // 28天
    ary.forEach((item, index) => {
        item.time = item.depositTime;
        item.can = everyday(now, item);
        if (item.depositTime + maxCheckDur - now < 0) {
            item.type = 'over';
        } else {
            item.type = 'ing';
        };
    });
    ary.forEach((item, index) => {
        item.depositTime = formatDateTime(item.depositTime / 1000000);
        item.balance = item.balance.toFixed(4);
    });
    let str = '';
    ary.sort(function (a, b) {
        if (a.time < b.time) {
            return -1;
        };
        if (a.time > b.time) {
            return 1;
        };
        return 0;
    });
    gameOver(ary);
    ary.reverse();
    ary.forEach((item, index) => {
        str += ` <li>
    <div>
        <h6>5.00%${langMsg.day}</h6>
        <p>${item.depositTime}</p>
    </div>
    <div>
        <h6>${item.deposit} IOST</h6>
        <p>${langMsg.tz}</p>
    </div>
    <div>
        <h6>${item.balance} IOST</h6>
        <p>${langMsg.tx}</p>
    </div>
    <div>
    <h6>${Math.floor(item.can*10000)/10000} IOST</h6>
        <p>${langMsg.cantx}</p>
    </div>
    <div style=${item.type!=='ing'?'color:#FF3535':null}>${langMsg[item.type]}</div>
</li>`;
        var a = $(str);
        $(".details_box").empty();
        a.appendTo($(".details_box"));
    });
};

//计算每次利息
let everyday = function (now, item) {
    const MINUTE_PER_DAY = 24 * 60; // 第天分钟数
    const NS_PER_MINUTE = 60 * 1000000000; // 每分钟纳秒数
    const maxCheckDur = MINUTE_PER_DAY * 28; // 28天
    const minutesPerDay = 24 * 60; //一天多少分钟
    const interestRate = 0.05;
    let totalInterest = 0;

    let obj = item
    let deposit = obj.deposit;
    // let deposit = 12;
    let endPoint = obj.depositTime + maxCheckDur * MINUTE_PER_DAY * NS_PER_MINUTE;
    if (endPoint <= now) {
        bRemove4Db = true;
    } else {
        endPoint = now;
    }
    let durMin = Math.floor((endPoint - obj.interestTime) / NS_PER_MINUTE);

    let durDay = Math.floor(durMin / minutesPerDay);
    let durMinRemain = durMin - durDay * minutesPerDay;

    let interest = 0;
    if (durDay > 0)
        interest += Number((deposit * interestRate * durDay).toFixed(4));
    interest += Number((deposit * interestRate * (durMinRemain / MINUTE_PER_DAY)).toFixed(4));

    totalInterest = interest;
    return totalInterest;
};




//日期处理
let transDay = function (sec) {
    let data = new Date(sec / 1000000).toLocaleString().replace(/:\d{1,2}$/, ' ');
    data = data.substr(0, 8).replace(/\//g, '.');
    return data;
};


//获取url后边的参数
function GetRequest() {
    var url = window.location.search;
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
};


let getLoanNum = function (name) {
    let httpEndpoint = baseUrl + 'getContractStorageFields';
    userList2 = [];
    // sellcan = 0;
    let poop = name;
    axios.post(httpEndpoint, {
        id: hyAccount,
        key: poop,
        by_longest_chain: true
    })
        .then(function (reggie) {
            let ary = reggie.data.fields;
            ary.forEach((item, index) => {
//console.logz("loannum",item)
                getLoanList(name, item, ary.length)
            });
        });
};

let getLoanList = function (name, item, length) {
    let httpEndpoint = baseUrl + 'getContractStorage';
    let poop2 = name;
    axios.post(httpEndpoint, {
        id: hyAccount,
        key: poop2,
        field: item,
        by_longest_chain: true
    })
        .then(function (response) {
            let everyList = JSON.parse(response.data.data);
            //flag++;
//c0m back
            let ow3d = parseFloat(everyList.iost_lent) - parseFloat(everyList.iostpaidback);
            let candidate = item+':'+everyList.time_release+':'+JSON.stringify(ow3d)
            if(save_loans.indexOf(candidate) === -1) {
//save_loans.forEach(function(itt, btt) {
//save_loans.push(item+':'+everyList.time_release)
                save_loans.push(candidate)
//});
            }
//console.log(save_loans)
            userList2.push(everyList);
            axios.get(baseUrl + 'getChainInfo')
                .then(function(rez) {
                    console.logz('rez is',rez.data.head_block);

                    //displayLoan(userList2,rez.data.head_block);
//}
                });
        });
}
//获取用户投资列表
let getAccountNum =  function (name) {
    let httpEndpoint = baseUrl + 'getContractStorageFields';
    userList = [];
    sellcan = 0;
    let poop = name + "_deposit"
    /*   axios.post(httpEndpoint, {
               id: hyAccount,
               key: name,
               by_longest_chain: true
           })
           .then(function (reggie) {
               let ary = reggie.data.fields;
               ary.forEach((item, index) => {
                   getAccountList(name, item, ary.length, true)
               });
   })*/
    axios.post(httpEndpoint, {
        id: hyAccount,
        key: poop,
        by_longest_chain: true
    })
        .then(async function (response) {
            let ary = response.data.fields;
            flag = 0;
            console.logz(ary);
            ary.forEach(async (item, index) => {
//function timer(ms) {
// return new Promise(res => setTimeout(res, ms));
//}
                getAccountList(name, item, ary.length);
//pauseBrowser(5000);
//await timer(10000);
            });
//for (let i=0; i<ary.length; i++) {
//console.log('wtff')
//setTimeout(() => { getAccountList(name, ary[i], ary.length)},3000);


//}

        })
        .catch(function (error) {
            console.logz(error);
        });

};



let getAccountList = function (name, item, length) {
    let httpEndpoint = baseUrl + 'getContractStorage';
    let poop2 = name +"_deposit"
    axios.post(httpEndpoint, {
        id: hyAccount,
        key: poop2,
        field: item,
        by_longest_chain: true
    })
        .then(function (response) {
            var everyList = JSON.parse(response.data.data);
            //flag++;
            //userList.push(everyList);
//userList.forEach(function (izem, e) {
//izem.h4sh = item;
//rebuild.push(izem);
//let entry = izem.cooldown+":"+item;
//if (has_seen.indexOf(entry) === -1) {
//has_seen.push(entry);
//}
//var wtf = [];
//has_seen.forEach(function(inn,mew) {
            if (has_seen.indexOf(everyList.release_block+":"+item) === -1) {
                has_seen.push(everyList.release_block+":"+item);
            }
//});
//console.log(has_seen)
            axios.get(baseUrl + 'getChainInfo')
                .then(function(rez) {
//////////add(everyList,rez.data.head_block)
//console.log('rez is',item);
//console.log('runnin add')
//if (has_seen.indexOf(item) === -1 ) {
//console.log('runnin add on', item)
//let rebuild = [];
//userList.forEach(function (izem, e) {
//izem.h4sh = item;
//rebuild.push(izem);
//let entry = izem.cooldown+":"+item;
//if (has_seen.indexOf(entry) === -1) {
//has_seen.push(entry);
//}
//add(izem,rez.data.head_block);
                    //add(u,rez.data.head_block);
                });
//console.log(has_seen)
//add(userList,rez.data.head_block);
//has_seen.push(item);
//}
//}
//});
            // if (flag === length) {
            //   writeList(now, userList);
            //   $('.sell_total_num').html(`${Math.floor(saveTotal*10000)/10000} <span>IOST</span>`);
            //  $('.sell_invite_num').html(`${Math.floor(alltx*10000)/10000} <span>IOST</span>`);
            //  $('.sell_can_all').html(`${Math.floor(sellCan*10000)/10000}  <span>IOST</span>`);
            //  gameOver();
            //};

        })
        .catch(function (error) {
            console.logz(error);
        });
};
//获取当前时间
let timer = null;
let getTime = function () {
    let httpEndpoint = baseUrl + 'getNodeInfo';
    axios.get(httpEndpoint)
        .then(function (response) {
            now = response.data.server_time;

            timer = setInterval(() => {
                now = Number(now) + 1000000000;

            }, 1000);
        })
        .catch(function (error) {
            console.logz(error);
            getTime();
        });
};
getTime();
setInterval(() => {
    clearInterval(timer);
    getTime();
}, 10000);
//获取邀请奖励
let getinviteList = function (name, item) {
    let httpEndpoint = baseUrl + 'getContractStorage';
    axios.post(httpEndpoint, {
        id: hyAccount,
        key: 'refAmount:' + name,
        by_longest_chain: true
    })
        .then(function (response) {
            let inviteNum = response.data.data;
            if (inviteNum != 'null') {
                inviteNum = Number(inviteNum).toFixed(4);

                $('.invite_tip_money_num').html(`${langMsg.t_invite} : <span>${inviteNum} IOST</span>`);
            };
        })
        .catch(function (error) {
            console.logz(error);
        });
};

//获取所有邀请奖励
let getAllinviteList = function (name, item) {
    let httpEndpoint = baseUrl + 'getContractStorage';
    axios.post(httpEndpoint, {
        id: hyAccount,
        key: 'refAllAmount:',
        by_longest_chain: true
    })
        .then(function (response) {

            let allInvite = Number(response.data.data).toFixed(4);
            if (allInvite === 'NaN') {
                allInvite = 0;
            };
            $('.invite_money').html(`<div>${langMsg.invite}${allInvite} IOST ${langMsg.out}</div> `);
        })
        .catch(function (error) {
            console.logz(error);
        });
}
getAllinviteList();
setInterval(() => {
    getAllinviteList();
}, 10000);

//计算时间
let formatDateTime = function (inputTime) {
    var date = new Date(inputTime);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d + ' ' + '　' + h + ':' + minute + ':' + second;
};

//计算倒计时
function countTime() {
    //获取当前时间  
    // let date = new Date();
    // let now = now;
    //设置截止时间  
    // let str = "2019/4/4 15:00:00";
    // let endDate = new Date(str);
    // let end = endDate.getTime();
    let end = beginTime / 1000000;

    //时间差  
    let leftTime = end - now / 1000000;
    //定义变量 d,h,m,s保存倒计时的时间  
    let d, h, m, s;
    if (leftTime >= 0) {
        d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
        h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
        m = Math.floor(leftTime / 1000 / 60 % 60);
        s = Math.floor(leftTime / 1000 % 60);
        h = h < 10 ? '0' + h : h;
        m = m < 10 ? '0' + m : m;
        s = s < 10 ? '0' + s : s;
        $('.time_box').show();
        $('.all_money').hide();
        $('.invite_money').hide();

        $('.save_btn').hide();
        $('.save_btn_load').show();
        $('.save_btn_load').html(langMsg.willStart);

    } else {
        $('.time_box').hide();
        $('.all_money').show();
        $('.invite_money').show();
        $('.save_btn').show();
        $('.save_btn_load').hide();
    };
    //将倒计时赋值到div中  
    overtime = h + ":" + m + ":" + s;
    $('.time').html(overtime);
    setTimeout(countTime, 1000);

};
countTime()


//获取开始时间
let getSwitch = function (name, item) {
    let httpEndpoint = baseUrl + 'getContractStorage';
    axios.post(httpEndpoint, {
        id: hyAccount,
        key: 'TimeSwitchKey',
        by_longest_chain: true
    })
        .then(function (response) {
            console.logz(response);
            beginTime = Number(response.data.data);
        })
        .catch(function (error) {
            console.logz(error);
        });
}
getSwitch();

//获取开关状态
let getSwitchAction = function (name, item) {
    let httpEndpoint = baseUrl + 'getContractStorage';
    axios.post(httpEndpoint, {
        id: hyAccount,
        key: 'SwitchKey',
        by_longest_chain: true
    })
        .then(function (response) {
            hySwitch = response.data.data;
            // gameOver();
        })
        .catch(function (error) {
            console.logz(error);
        });
};
getSwitchAction();
setInterval(() => {
    getSwitchAction();
}, 15000);
//结束处理
let gameOver = function (ary) {
    /*   if (hySwitch === 'false') {
           if (ary) {
               ary.forEach((item, index) => {
                   item.can = 0;
                   item.type = 'overlist';
               });
           };

           clearInterval(getListTimer);
           $('.game_over').show();
           $('.save_btn').hide();
           $('.save_btn_load').html(langMsg.save);
           $('.save_btn_load').show();

           $('.sell_btn').hide();
           $('.sell_btn_no').show();
           $('.sell_can_all').html(`0 <span>IOST</span>`);

       } else {*/
    $('.save_btn').show();
//    };
};


//判断是否能提现
let sellout = function () {
    // console.logz(sellCanaction);
    /*
        if (sellCanaction == 0) {
            $('.sell_btn').hide();
            $('.sell_btn_no').show();
        } else if (sellCanaction != 0 && hySwitch != 'false') {
            $('.sell_btn').show();
            $('.sell_btn_no').hide();
        }*/
    $('.sell_btn').show();

}
sellout();
setInterval(() => {
    sellout();
}, 4000);

//喇叭
let changeimg = function () {
    let ary = [
        `<img src='./img/gonggao0.png' class='notice_img lt' />`,
        `<img src='./img/gonggao1.png' class='notice_img lt' />`,
        `<img src='./img/gonggao2.png' class='notice_img lt' />`,
    ];
    let i = 0;
    setInterval(() => {
        if (i > 2) {
            i = 0
        };
        $('.notice_img').replaceWith(ary[i++]);
    }, 300);
};
changeimg();

//跑马灯
let toptext = function () {

    let wrap = $('.pmd-box'),
        first = $('.pmd-text')[0];
    console.logz(first);

    let move = () => {
        wrap.scrollLeft++;
        // wrap.scrollLeft=wrap.scrollLeft+='10px';
        if (wrap.scrollLeft >= first.scrollWidth) {
            wrap.scrollLeft = 0;
        };
    };
    let timer = setInterval(() => {
        move();
    }, 12);
    wrap.onmouseover = () => {
        window.clearInterval(timer);
    };
    wrap.onmouseout = () => {
        timer = window.setInterval(move, 12);
    };

};

//获取签到列表
let getLogList = function (name, log) {
    let httpEndpoint = baseUrl + 'getContractStorage';
    axios.post(httpEndpoint, {
        id: hyAccount,
        key: 'SignFIndex:' + name,
        by_longest_chain: true
    })
        .then(function (response) {
            let lognum = response.data.data;
            if (lognum === 'null') {
                log();
            } else {
                getLogTime(lognum, name, log);
            };
        })
        .catch(function (error) {
            console.logz(error);
        });
};

//获取登陆时间
let getLogTime = function (index, name, log) {

    let httpEndpoint = baseUrl + 'getContractStorage';
    axios.post(httpEndpoint, {
        id: hyAccount,
        key: 'SignKIndex:' + name,
        field: index - 1 + '',
        by_longest_chain: true
    })
        .then(function (response) {
            console.logz(response.data.data);
            let logTime = (Number(response.data.data) - 28800) * 1000;
            let endYear = new Date().getFullYear();
            let endMonth = new Date().getMonth();
            let endDay = new Date().getDate();
            let endTime = new Date(endYear, endMonth, endDay);
            console.logz('当天0点时间======>', endTime);

            endTime = Date.parse(new Date(endTime));
            let addtime = logTime - endTime;
            if (addtime < 0) {
                log();
            };
        })
        .catch(function (error) {
            console.logz(error);
        });
};

setInterval(() => {
//if( document.getElementById("whichcoin").value == "iplay" || document.getElementById("whichcoin").value == "splash") {
    if(1==1){
//            rpc.blockchain.getBalance(hyAccount, 'iplay',true).then(
        //              function(herro) {
//            axios.get(`https://api.iost.io/getTokenBalance/${hyAccount}/iplay/true`)
        //              .then(function (herro) {

        axios.post('https://api.iost.io/getContractStorage', {
            id: 'ContractCAcLL12M2BoU1xEstVM4guLg4DCruxVALm9qCCqTyyZe',
            key: 'pledge',
            field: hyAccount,
//          field: 'ContractCAcLL12M2BoU1xEstVM4guLg4DCruxVALm9qCCqTyyZe',
            by_longest_chain: true
        })
            .then(function (herro) {
//console.log('herro is',JSON.parse(herro.data).data)
                let myifry = document.getElementById("repayb0xxx").value;
//let mypct = parseFloat(myifry)/parseFloat(document.getElementById("currsupply").innerHTML) * parseFloat(JSON.parse(herro.data.data).amount) 
//document.getElementById("exrate").innerHTML = addcomma(mypct.toFixed(2).toString())
            });
        let filled_number = document.getElementById("savem33").value;

//console.log(filled_number)
        var correct_answer;
        /*if ( document.getElementById("whichcoin").value == "iplay"){
         correct_answer = parseFloat(filled_number) * 0.01076890625;
        } else {
         correct_answer = parseFloat(filled_number) *0.01076890625 * 0.9;

        }
        correct_answer = correct_answer.toFixed(2)*/
        if (document.getElementById("whichcoin").value == "iplay"){
            correct_answer = parseFloat(filled_number) * 0.0000025;
        } else if (document.getElementById("whichcoin").value == "iost"){
            correct_answer = parseFloat(filled_number) * 0.0005;
        } else if (document.getElementById("whichcoin").value == "vost"){
            correct_answer = parseFloat(filled_number) * 0.0005;
        } else if (document.getElementById("whichcoin").value == "itrx"){
            correct_answer = parseFloat(filled_number) * 0.001128668;
        } else if (document.getElementById("whichcoin").value == "win"){
            correct_answer = parseFloat(filled_number) * 0.0000014;
        } else if (document.getElementById("whichcoin").value == "frziplay"){
            correct_answer = parseFloat(filled_number) * 0.0000025;
        }





        correct_answer = correct_answer.toFixed(8)
        $('.wallet_balance_text').html('You will receive '+(correct_answer)+' iFRY');
    }
//    clearInterval(timer);
    //   getTime();
    /*save_loans.forEach(function(qq,ww) {
    if (document.getElementById("changeme").value.slice(4) === qq.split(':')[1]){
    document.getElementById("amt0wed").innerHTML = qq.split(':')[2]
    }//if statement
    });*/
//dofunct2()
}, 1000);
//console.log(document.getElementById("changeme").value)

let dofunct2 = function() {
    axios.get('https://api.iost.io/' + 'getChainInfo')
        .then(function(rez) {
//console.logz('rez is',rez.data.head_block);
            let curr_block = rez.data.head_block
            axios.post('https://api.iost.io/getContractStorage', {
                id: 'ContractEFgc2UTTp7BNBL6wECaWhLmLSGcoXWMtyfHzF2bm6Cik',
                key: userMsg._id+"_owed",
                // field: hyAccount,
//          field: 'ContractCAcLL12M2BoU1xEstVM4guLg4DCruxVALm9qCCqTyyZe',
                by_longest_chain: true
            }).then(function(itsmegg) {
//userMsg._id
//console.log('itsme',itsme.data.data);
//if(itsme.data.data != 'null'){
                var sellDan = parseFloat(itsmegg.data.data.split(':')[0])

                if(isNaN(sellDan)){
                    sellDan = 0;
                }
                axios.post('https://api.iost.io/getContractStorage', {
                    id: 'ContractGmS2fu3p6RimmMPfsBSNio7grtvom3yxg8ta132SE9f8',
                    key: userMsg._id+"_owed",
                    // field: hyAccount,
//          field: 'ContractCAcLL12M2BoU1xEstVM4guLg4DCruxVALm9qCCqTyyZe',
                    by_longest_chain: true
                }).then(function(itsme2) {
//userMsg._id
//console.log('itsme',itsme.data.data);
//if(itsme.data.data != 'null'){
                    var sellBan = parseFloat(itsme2.data.data.split(':')[0])
                    axios.post('https://api.iost.io/getContractStorage', {
                        id: 'Contract7XjHf6KwmpXejex5ssC7oWLYtpHghJYApzGej98wDLTj',
                        key: userMsg._id+"_owed",
                        // field: hyAccount,
//          field: 'ContractCAcLL12M2BoU1xEstVM4guLg4DCruxVALm9qCCqTyyZe',
                        by_longest_chain: true
                    }).then(function(itsme) {

                        sellCan = parseFloat(itsme.data.data.split(':')[0])
                        if(isNaN(sellCan)){
                            sellCan = 0;
                        }
                        console.log('sellban is',sellBan)
                        if(isNaN(sellBan)){
                            sellBan = 0;
                        }
                        /*if(document.getElementById('wdasset') && document.getElementById('wdasset').value==="idt"){
                            $('.sell_can_all').html(`${sellCan} <span> IDT ::</span> ${sellBan} <span> WIN</span>

                        <select id=wdasset style="zoom:180%;">
                        <option value=win>WIN</option>
                        <option value=idt>IDT</option>
                        </select>
                        `);
                        } else if (document.getElementById('wdasset') && document.getElementById('wdasset').value==="win"){
                        console.log('made it here!')
                            $('.sell_can_all').html(`${sellCan} <span> IDT ::</span> ${sellBan} <span> WIN</span>

                        <select id=wdasset style="zoom:180%;">
                        <option value=win>WIN</option>
                        <option value=idt>IDT</option>
                        </select>
                        `);
                        } else {*/
                        if(whatselect === "win"){
                            $('.sell_can_all').html(`${sellCan} <span> IDT ::</span> ${sellBan} <span> WIN ::</span> ${sellDan} <span> iFRY</span>

<select id=wdasset style="zoom:180%;">
<option value=win>WIN</option>
<option value=idt>IDT</option>
<option value=ifry>iFRY</option>

</select>
`);
                        } else if(whatselect === "idt") {
//    $('.sell_can_all').html(`${sellCan} <span> IDT ::</span> ${sellBan} <span> WIN</span>
                            $('.sell_can_all').html(`${sellCan} <span> IDT ::</span> ${sellBan} <span> WIN ::</span> ${sellDan} <span> iFRY</span>

<select id=wdasset style="zoom:180%;">
<option value=idt>IDT</option>
<option value=win>WIN</option>
<option value=ifry>iFRY</option>

</select>
`);
                        } else if(whatselect === "ifry") {
//    $('.sell_can_all').html(`${sellCan} <span> IDT ::</span> ${sellBan} <span> WIN</span>
                            $('.sell_can_all').html(`${sellCan} <span> IDT ::</span> ${sellBan} <span> WIN ::</span> ${sellDan} <span> iFRY</span>

<select id=wdasset style="zoom:180%;">
<option value=ifry>iFRY</option>
<option value=win>WIN</option>
<option value=idt>IDT</option>

</select>
`);
                        }
                        whatselect=(document.getElementById('wdasset').value);
//}
                        console.log(sellCan)
                        saveTotal = parseInt(curr_block) - parseInt(itsme.data.data.split(':')[1]);
                        saveTotal *= -1
                        saveTotal /= 2
                        saveTotal /= (86400)
                        saveTotal *= 24;
                        saveTotal = saveTotal.toFixed(3)



                        saveTotal2 = parseInt(curr_block) - parseInt(itsme2.data.data.split(':')[1]);
                        saveTotal2 *= -1
                        saveTotal2 /= 2
                        saveTotal2 /= (86400)
                        saveTotal2 *= 24;
                        saveTotal2 = saveTotal2.toFixed(3)



                        saveTotal3 = parseInt(curr_block) - parseInt(itsmegg.data.data.split(':')[1]);
                        saveTotal3 *= -1
                        saveTotal3 /= 2
                        saveTotal3 /= (86400)
                        saveTotal3 *= 24;
                        saveTotal3 = saveTotal3.toFixed(3)


                        if(isNaN(saveTotal2) || saveTotal2 < 0){
                            saveTotal2 = 0;
                        }
                        if(isNaN(saveTotal) || saveTotal < 0){
                            saveTotal=0;

                        }
                        if(isNaN(saveTotal3) || saveTotal3 < 0){
                            saveTotal3 = 0;
                        }
                        $('.sell_total_num').html(`IDT<br> WIN<br>iFRY`);
                        $('.sell_invite_num').html(`${saveTotal} <span>Hours <br> </span>${saveTotal2} <span>Hours</span>
<br> </span>${saveTotal3} <span>Hours</span>
`);
//$('.sell_invite_num').style+="zoom:80%;"
                        $('.sell_total_num')[0].style.zoom="60%"
                        $('.sell_invite_num')[0].style.zoom="60%"
                    });
//}
                });
            });//outer axios
        });//outer vote counter
}



setInterval(function(){

    whatselect=(document.getElementById('wdasset').value);

},300);



$('.null').html('');
/*
let htmlstring = " <li> <div><h6>"+ '' +"</font>Proposal #1 "+''+" </h6> <p>Ends in "+'3:23:12 '+"</p> </div> <div> <p>"+''
+" Test poll #1: Who is the lead developer of guppys?</p> <p></p> </div> <div> "
+"<h6>"+''+" 23.22% - 3.123 Votes</h6> <p>Option A - MC</p> </div> <div> <h6>"+''+" 20.55% - 2.994 Votes</h6> <p>Option B - Emcee</p> </div> <div><a href=\"#open-modal\" style=\"color:#20C99F\">VOTE</a></div></li> "
    $('.null').append(htmlstring);
*/

axios.post('https://api.iost.io/getContractStorage', {
    id: 'ContractEFgc2UTTp7BNBL6wECaWhLmLSGcoXWMtyfHzF2bm6Cik',
    key: "currentproposal",
    // field: hyAccount,
//          field: 'ContractCAcLL12M2BoU1xEstVM4guLg4DCruxVALm9qCCqTyyZe',
    by_longest_chain: true
}).then(function(itsme) {
    function encodeHTML(s) {
        return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
    }
//console.log('itsme',(itsme.data.data));
    document.getElementById('curprop').innerText = encodeHTML(itsme.data.data);
});
axios.post('https://api.iost.io/getContractStorage', {
    id: 'ContractEFgc2UTTp7BNBL6wECaWhLmLSGcoXWMtyfHzF2bm6Cik',
    key: "votecount",
    // field: hyAccount,
//          field: 'ContractCAcLL12M2BoU1xEstVM4guLg4DCruxVALm9qCCqTyyZe',
    by_longest_chain: true
}).then(function(totalvoted) {
    totalvoted = parseFloat(JSON.parse(totalvoted.data.data)[0]);
    axios.post('https://api.iost.io/getContractStorage', {
        id: 'ContractEFgc2UTTp7BNBL6wECaWhLmLSGcoXWMtyfHzF2bm6Cik',
        key: "currentproposaldata",
        // field: hyAccount,
//          field: 'ContractCAcLL12M2BoU1xEstVM4guLg4DCruxVALm9qCCqTyyZe',
        by_longest_chain: true
    }).then(function(itsme2) {
        itsme2=JSON.parse(itsme2.data.data);
        console.log('itsme2',itsme2);
        let findmax = [parseFloat(itsme2.acount),parseFloat(itsme2.bcount),parseFloat(itsme2.ccount),parseFloat(itsme2.dcount)
            ,parseFloat(itsme2.ecount),parseFloat(itsme2.fcount),parseFloat(itsme2.gcount)
        ];
        var max = findmax.reduce(function(a, b) {
            return Math.max(a, b);
        });
        let findsecmax = findmax.indexOf(max);
        let clonearrz = findmax.slice(0);
        clonearrz.splice(findsecmax,1);

        var max2 = clonearrz.reduce(function(a, b) {
            return Math.max(a, b);
        });
        console.log('max2 is',max2);
        var maxa = '';
        var maxb = ''
        var maxc = ''
        var maxd = ''
        var maxe = ''
        var maxf = ''
        var maxg = ''
        var themax = 0;
        var thesecmax=0;
        console.log('max is',max)
        if(parseFloat(itsme2.gcount) == max2){
            thesecmax='ggg'
        }
        if(parseFloat(itsme2.fcount) == max2){
            thesecmax='fff'
        }
        if(parseFloat(itsme2.ecount) == max2){
            thesecmax='eee'
        }
        if(parseFloat(itsme2.dcount) == max2){
            thesecmax='ddd'
        }
        if(parseFloat(itsme2.ccount) == max2){
            thesecmax='ccc'
        }

        if(parseFloat(itsme2.bcount) == max2){
            thesecmax='bbb'
        }
        if(parseFloat(itsme2.acount) == max2){
            thesecmax='aaa'
        }



        if(parseFloat(itsme2.gcount) == max){
            maxg = 'style=\"color:#4dfb82;\"'
            themax='ggg'
        }
        if(parseFloat(itsme2.fcount) == max){
            maxf = 'style=\"color:#4dfb82;\"'
            themax='fff'
        }
        if(parseFloat(itsme2.ecount) == max){
            maxe = 'style=\"color:#4dfb82;\"'
            themax='eee'
        }
        if(parseFloat(itsme2.dcount) == max){
            maxd = 'style=\"color:#4dfb82;\"'
            themax='ddd'
        }
        if(parseFloat(itsme2.ccount) == max){
            maxc = 'style=\"color:#4dfb82;\"'
            themax='ccc';
        }
        if(parseFloat(itsme2.bcount) == max){
            maxb = 'style=\"color:#4dfb82;\"'
            themax='bbb';
        }
        if(parseFloat(itsme2.acount) == max){
            maxa = 'style=\"color:#4dfb82;\"'
            themax='aaa';
        }
        function encodeHTML(s) {
            return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
        }
        document.getElementById('optionzz').innerHTML =
            // axios.post('https://api.iost.io/getContractStorage', {
            //       id: 'ContractEFgc2UTTp7BNBL6wECaWhLmLSGcoXWMtyfHzF2bm6Cik',
            //     key: "currentproposal",
            // field: hyAccount,
//          field: 'ContractCAcLL12M2BoU1xEstVM4guLg4DCruxVALm9qCCqTyyZe',
//if(parseFloat(itsme2.acount)===max){
            '</br><input type=\"radio\" name=\"gender\" value=\"a\"> &nbsp;<span id=aaa '+maxa+' >'+encodeHTML(itsme2.a)+' - '+parseFloat(itsme2.acount)+' Votes - '+
            parseFloat(parseFloat(itsme2.acount)/totalvoted*100).toFixed(2)+'%</span><br>'
            +
            '<input type=\"radio\" name=\"gender\" value=\"b\"> &nbsp;<span id=bbb '+maxb+' >'+encodeHTML(itsme2.b)+' - '+parseFloat(itsme2.bcount)+' Votes - '+
            parseFloat(parseFloat(itsme2.bcount)/totalvoted*100).toFixed(2)+'%</span><br>'
            +
            '<input type=\"radio\" name=\"gender\" value=\"c\"> &nbsp;<span id=ccc '+maxc+' >'+encodeHTML(itsme2.c)+' - '+parseFloat(itsme2.ccount)+' Votes - '+
            parseFloat(parseFloat(itsme2.ccount)/totalvoted*100).toFixed(2)+'%</span><br>'

            +
            '<input type=\"radio\" name=\"gender\" value=\"d\"> &nbsp;<span id=ddd '+maxd+' >'+encodeHTML(itsme2.d)+' - '+parseFloat(itsme2.dcount)+' Votes - '+
            parseFloat(parseFloat(itsme2.dcount)/totalvoted*100).toFixed(2)+'%</span><br>'
            +
            '<input type=\"radio\" name=\"gender\" value=\"e\"> &nbsp;<span id=eee '+maxe+' >'+encodeHTML(itsme2.e)+' - '+parseFloat(itsme2.ecount)+' Votes - '+
            parseFloat(parseFloat(itsme2.ecount)/totalvoted*100).toFixed(2)+'%</span><br>'
            +
            '<input type=\"radio\" name=\"gender\" value=\"f\"> &nbsp;<span id=fff '+maxf+' >'+encodeHTML(itsme2.f)+' - '+parseFloat(itsme2.fcount)+' Votes - '+
            parseFloat(parseFloat(itsme2.fcount)/totalvoted*100).toFixed(2)+'%</span><br>'
            +
            '<input type=\"radio\" name=\"gender\" value=\"g\"> &nbsp;<span id=ggg '+maxg+' >'+encodeHTML(itsme2.g)+' - '+parseFloat(itsme2.gcount)+' Votes - '+
            parseFloat(parseFloat(itsme2.gcount)/totalvoted*100).toFixed(2)+'%</span><br>'
//+'</br>'
//'itsme2.a
        ;



        let htmlstring = " <li> <div><h6>"+ '' +"</font>Proposal #1 "+''+" </h6> <p id=\"updatemegg\">Ends in "+'00:00:00 '+"</p> </div> <div> <p id=\"leaddev\" style=\"font-weight:bold;color:gold;\"></p> <p></p> </div> <div> "
            +"<h6>Winning Vote</h6><p style=\"color:#4dfb82;zoom:80%;\">"+document.getElementById(themax).innerText.substring(0,80)+'...'+document.getElementById(themax).innerText.slice(-28)+"</p>  </div> <div> <h6>"+''+" Proposer</h6> <p>"+'kingcrypto'+"</p> </div> <div><a href=\"#open-modal\" style=\"color:#20C99F\">VOTE</a></div></li> "
//console.log(itsme.data.data)
        $('.null').append(htmlstring);
//document.getElementById('leaddev').innerText = itsme.data.data;
        document.getElementById('leaddev').innerText = document.getElementById('curprop').innerText;

    });
//document.getElementById('leaddev').innerText = itsme.data.data;

});



$('.nullz').html('<li style=\"height:600px;\"><div style=\"font-weight:bold;color:#58F8FF;width:100%;font-size:30px;\">Submit New Proposal</div>'
    +'<div style=\"width:100%;\"><span style="color:gold;">Please input your consensus proposal into the text box below.</span></br></br></br>'
    +'<input id=proptitle style=\"width:50%;zoom:200%;border-radius:25px;\" class=save_input></input></br>'
    +'</br>Options (Not all boxes must be filled)</br>'
    +'</br>A. <input id=oppa style=\"width:30%;zoom:200%;border-radius:25px;\" class=save_input></input></br>'

    //+'</br>Option B</br>'
    +'B. <input id=oppb style=\"width:30%;zoom:200%;border-radius:25px;\" class=save_input></input></br>'


    //+'</br>Option C</br>'
    +'C. <input id=oppc style=\"width:30%;zoom:200%;border-radius:25px;\" class=save_input></input></br>'

    //+'</br>Option D</br>'
    +'D. <input id=oppd style=\"width:30%;zoom:200%;border-radius:25px;\" class=save_input></input></br>'


    +'</br></br><div style=\"width:100%;\"><span style=\"color:goldenrod;\">Fee: 2500 IOST for each proposal. If over 1000 i/FRY is voted, 2000 IOST is returned! 500 IOST is for RAM. </span></br></br>Otherwise, 1000 IOST goes to i/FRY dividends, 1000 IOST for Team, and 500 IOST for RAM.</br></br> Voted i/FRY will be frozen for 72 hours. Divs will be held by the contract for future rewards for good proposals.</div></br>'
    +'<input style="zoom:110%;" type="submit" class=gonglao value="Submit Proposal and Fee" onclick="submitproposal()"></input>'



    +'</div></br>'
    +'<div style=\"color:transparent;\">___</div></li>');
setTimeout(function(){
    axios.post('https://api.iost.io/getContractStorage', {
        id: 'ContractEFgc2UTTp7BNBL6wECaWhLmLSGcoXWMtyfHzF2bm6Cik',
        key: "proposalarray",
        // field: hyAccount,
//          field: 'ContractCAcLL12M2BoU1xEstVM4guLg4DCruxVALm9qCCqTyyZe',
        by_longest_chain: true
    }).then(function(round2) {
        var proparr = JSON.parse(round2.data.data)
        axios.post('https://api.iost.io/getContractStorage', {
            id: 'ContractEFgc2UTTp7BNBL6wECaWhLmLSGcoXWMtyfHzF2bm6Cik',
            key: "proposer",
            // field: hyAccount,
//          field: 'ContractCAcLL12M2BoU1xEstVM4guLg4DCruxVALm9qCCqTyyZe',
            by_longest_chain: true
        }).then(function(round3) {
            round3=JSON.parse(round3.data.data);
            proparr.forEach(function(izem,k){
                if(document.getElementsByClassName('list_box')[0].innerText.includes(izem)){
                    return;
                }
                var maxa ='';
                var maxb='';
                var maxc ='';
                var maxd=''
                var thesecmax=''
                console.log('round3',round3)
                // axios.post('https://api.iost.io/getContractStorage', {
                //       id: 'ContractEFgc2UTTp7BNBL6wECaWhLmLSGcoXWMtyfHzF2bm6Cik',
                //     key: "proposers",
                // field: hyAccount,
//          field: 'ContractCAcLL12M2BoU1xEstVM4guLg4DCruxVALm9qCCqTyyZe',
                //       by_longest_chain: true
                // }).then(function(round3) {
//round3 = JSON.parse(round3.data.data)
                function encodeHTML(s) {
                    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
                }
                izem = encodeHTML(izem)
                let htmlstring = " <li> <div><h6>"+ '' +"</font>Proposal #"+parseInt(k+1)+" </h6> <p id=\"\">Ends in "+'00:00:00 '+"</p> </div> <div> <p id=\"\" style=\"font-weight:bold;color:gold;\">"+izem+"</p> <p></p> </div> <div> "
                    +"<h6>Winning Vote</h6><p></p>  </div> <div> <h6>"+''+" Proposer</h6> <p>"+round3[k]+"</p> </div> <div><a href=\"#open-modal\" style=\"color:#DC143C\">SOON</a></div></li> "
                $('.null').append(htmlstring);



                console.log(izem)
            });

        });
    });
},2000);
