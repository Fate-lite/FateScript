/*
推送邀请码
cron 0 0 * * * jd_my_query.js
 */

// prettier-ignore
const $ = new Env('推送邀请码');
const JD_API_HOST = 'https://m.jingxi.com';
const helpAuthor = false;
const notify = $.isNode() ? require('./sendNotify') : '';
let jdNotify = true;//是否关闭通知，false打开通知推送，true关闭通知推送
const randomCount = $.isNode() ? 1 : 1;
let tuanActiveId = `6S9y4sJUfA2vPQP6TLdVIQ==`;
const jxOpenUrl = `openjd://virtual?params=%7B%20%22category%22:%20%22jump%22,%20%22des%22:%20%22m%22,%20%22url%22:%20%22https://wqsd.jd.com/pingou/dream_factory/index.html%22%20%7D`;
let cookiesArr = [], cookie = '', message = '', allMessage = '';

var factorySharCodesFate = ['Gskrh9hZJN5MJBkCIrN2eQ==', '5SY_XijoPDoVPKAzab3tRA==', 'phKfNTFXwHG_iQRYuBXXCw==', '87tEu9tp4_e9EUmE3f63Eg==', 'adSzD5Vcdx2u38wSle_YLQ==', 'tD2vV4oOZ-278u9c3YhN6A==', 'GP7OkbO_tfcozbkMpRw_DQ==', '-9GPm3huWJcq-lalq34pzQ==', 'j0jHl2b2ejP5EsWTTxVFRA=='];
// var cashSharCodesFate = ['IR8-a-qzZfs78m7TwnMW,IRs1bey2Zv8', 'ZE9hMJTHBblZjTuduBM,IRs1bey2Zv8', 'eU9Ya-2xYvwl82eHwyBBhw,IRs1bey2Zv8', '9pCRtFUxsnSrrQ,IRs1bey2Zv8', 'ZE93G7rJPKl6pDSCrTU,IRs1bey2Zv8', 'eU9YarrhYKp1oGfdyXQT0A,IRs1bey2Zv8', 'eU9YarjjY_1z-TzQn3FF3g,IRs1bey2Zv8', 'eU9YDL7EBr1vrheRowJ0,IRs1bey2Zv8', 'eU9Yaeu7Yf8jpz-Ez3pAhw,IRs1bey2Zv8', 'eU9YaL7hZKp1-WqByCdF1Q,IRs1bey2Zv8', 'eU9Yae7gM_QhoGmGmnoS1A,IRs1bey2Zv8', 'chg1au66Zvo,IRs1bey2Zv8', 'eU9YaLnmY_typWnQyXES0g,IRs1bey2Zv8', 'eU9YLp7RMJ9klyeiuSR2,IRs1bey2Zv8', 'eU9YFYjbMYVPty-ztiJP,IRs1bey2Zv8', 'eU9YaejnYvwi8W7cw3QahA,IRs1bey2Zv8'];
var plantBeanHelpSharCodesFate = ['3anhauzclvtd5xvo5pqwbe7tsnqwzmygsqdivxy', 'zmuoamarz6g57bc2xumnpe2esd2cz45k2t3udgq', '4npkonnsy7xi3f5ex4qzfk22pdqnxfknkrpjdya', 'ngmcv4pacszmzdxukxtgo654km', '45syqbie6cumajez6zyh652objprakie2xaae7a', 'olmijoxgmjutylqcwdocjor5tg2e4fgmflkztgq', 'olmijoxgmjutz77fqmdbw37he4fo66sduuj76zq', 'wrqpt6mmzjh2zh43qm3lhpoxolztzq5hsz7sxui', 'mlrdw3aw26j3w5ains777eex4kqcnqzjpm44bgq', 'e7lhibzb3zek2ka5m3jh2ass6dyvy5vap4w35si', 'mlrdw3aw26j3xljhnl5eclhagjlxbknrecn2yda', '72rx7jhpzm6rxw57zsxuyuzyke', 'e7lhibzb3zek33nilnkjryxyx4ybyhqm7ossppa', '4vvbjlml6tdfcb35xxka5hvfbpt76ddzkn27miy', 'qmnmamd3ukiwrrsjljlvu42kupdmw4randel3aq', 'mlrdw3aw26j3xwu7huqqwhyx5ex5jdmfzrdz6uy'];
var jxncSharCodesFate = ['69775f9063257f94840d822bd8398d4b', '1a1b32e3df8f2cb6b10d7bcc0ff70154', '3b88811aa2740ad911995caf9082b483', 'bf359f8a02a0a84b83c46261b6543962', '70fa60d7b3cf627c686a1b45e0a7c31d', 'd7a846745f132c9d2eb62d2955697082', '7ec89fc9af1fd81c4bbf32a44d595930'];
var bookShopSharCodesFate = ['21cf43f0bd0449549d9811956b55c7df', '7a4d04b695d6400f8663998d4a8db0fd'];
var jdAiXiaoChuSharCodes = ["2867233","2117046","3756861","3087864","3844023","3844050","3284134","3844101","3844126","3869869","3912376"];
var jdFruitSharCodes = ["40cf6440db1943e2a9d1a6ae28366100","948da82d3b0b44dcbad90353cd177408","31c5eed3c8b4448ca04db3a04ffe6d21","28c8d02f8f1848538103068925a2f9f2","bc51cef8da954eca99cf8684c3cd6d51","ace5af81ef034576bcd5b3b42dee37b9","7d539fb5bc964f6f918f82f82010de23","fa69e1ffbfc144cc96417cc12cd3a5ee","87c1338b66e84879b2c94c1b069f775b","c42cde24eb0b461497a9082cf96eeceb","74bd01f2678944e8aae61c0e87905633","6864df95c9454bf9b4e3c368ec445a9f","c85dff36024346f48c4555657996b4b8","06061a4672c64210b0f54babc19997aa","2c972333021f4914ad33f0f88e7047cf","7ab9cc3847b84a3eb43063c41950022c","077f44caec524b829764f25a1fe36231","60aad383b9d84b849fc8ea87fe72709a"];
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
$.tuanIds = [];
if ($.isNode()) {
    Object.keys(jdCookieNode).forEach((item) => {
        cookiesArr.push(jdCookieNode[item])
    })
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
    if (process.env.DREAMFACTORY_FORBID_ACCOUNT) process.env.DREAMFACTORY_FORBID_ACCOUNT.split('&').map((item, index) => Number(item) === 0 ? cookiesArr = [] : cookiesArr.splice(Number(item) - 1 - index, 1))
} else {
    cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}
!(async () => {
    $.CryptoJS = $.isNode() ? require('crypto-js') : CryptoJS;
    await requireConfig();
    if (!cookiesArr[0]) {
        $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});
        return;
    }

    $.log('开始京喜工厂邀请码推送请求')
    for (let codeFate of factorySharCodesFate) {
        await dreamFactoryHelp(codeFate);
    };


    $.log('开始种豆得豆邀请码推送请求')
    for (let codeFate of plantBeanHelpSharCodesFate) {
        await plantBeanHelp(codeFate);
    };

    $.log('开始爱消除邀请码推送请求')
    for (let codeFate of jdAiXiaoChuSharCodes) {
        await axcHelp(codeFate);
    };


    $.log('开始东东农场除邀请码推送请求')
    for (let codeFate of jdFruitSharCodes) {
        await axcHelp(codeFate);
    };


    $.log('开始京喜农场邀请码推送请求')
    for (let codeFate of jxncSharCodesFate) {
        await jxncHelp(codeFate);
    };

    $.log('开始书店邀请码推送请求')
    for (let codeFate of bookShopSharCodesFate) {
        await bookShopHelp(codeFate);
    };


})()
    .catch((e) => {
        $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
    })
    .finally(() => {
        $.done();
    })

async function jdDreamFactory() {
    try {
        await dreamFactoryHelp();
        await cashHelp();
    } catch (e) {
        $.logErr(e)
    }
}

function dreamFactoryHelp(codeFate) {
    return new Promise(resolve => {
        $.get({
            url: "https://actapi.tyh52.com/act/set/dreamFactory/" + codeFate
        }, (err, resp, data) => {
            try {
                if (data) {
                    data = JSON.parse(data);
                    if (data.code == 1) {
                        console.log("提交自己的邀請碼成功",codeFate);
                    } else {
                        console.log("已经提交过自己的邀请码",codeFate);
                    }
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve(data);
            }
        })
    });
}

function cashHelp(codeFate) {
    return new Promise(resolve => {
        $.get({
            url: "https://actapi.tyh52.com/act/set/jd_cash/" + codeFate
        }, (err, resp, data) => {
            try {
                if (data) {
                    data = JSON.parse(data);
                    if (data.code == 1) {
                        console.log("提交自己的邀請碼成功",codeFate);
                    } else {
                        console.log("已经提交过自己的邀请码",codeFate);
                    }
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve(data);
            }
        })
    });
}

function axcHelp(codeFate) {
    return new Promise(resolve => {
        $.get({
            url: "https://actapi.tyh52.com/act/set/ddaixiaochu/" + codeFate
        }, (err, resp, data) => {
            try {
                if (data) {
                    data = JSON.parse(data);
                    if (data.code == 1) {
                        console.log("提交自己的邀請碼成功",codeFate);
                    } else {
                        console.log("已经提交过自己的邀请码",codeFate);
                    }
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve(data);
            }
        })
    });
}

function plantBeanHelp(codeFate) {
    return new Promise(resolve => {
        $.get({
            url: "https://actapi.tyh52.com/act/set/plantBean/" + codeFate
        }, (err, resp, data) => {
            try {
                if (data) {
                    data = JSON.parse(data);
                    if (data.code == 1) {
                        console.log("提交自己的邀請碼成功",codeFate);
                    } else {
                        console.log("已经提交过自己的邀请码",codeFate);
                    }
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve(data);
            }
        })
    });

}

function fruitHelp(codeFate) {
    return new Promise(resolve => {
        $.get({
            url: "http://api.tyh52.com/act/set/jd_fruit/" + codeFate
        }, (err, resp, data) => {
            try {
                if (data) {
                    data = JSON.parse(data);
                    if (data.code == 1) {
                        console.log("提交自己的邀請碼成功",codeFate);
                    } else {
                        console.log("已经提交过自己的邀请码",codeFate);
                    }
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve(data);
            }
        })
    });

}

function jxncHelp(codeFate) {
    return new Promise(resolve => {
        $.get({
            url: "https://actapi.tyh52.com/act/set/jxnc/" + codeFate
        }, (err, resp, data) => {
            try {
                if (data) {
                    data = JSON.parse(data);
                    if (data.code == 1) {
                        console.log("提交自己的邀請碼成功",codeFate);
                    } else {
                        console.log("已经提交过自己的邀请码",codeFate);
                    }
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve(data);
            }
        })
    });
}

function bookShopHelp(codeFate) {
    return new Promise(resolve => {
        $.get({
            url: "https://actapi.tyh52.com/act/set/bookshop/" + codeFate
        }, (err, resp, data) => {
            try {
                if (data) {
                    data = JSON.parse(data);
                    if (data.code == 1) {
                        console.log("提交自己的邀請碼成功",codeFate);
                    } else {
                        console.log("已经提交过自己的邀请码",codeFate);
                    }
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve(data);
            }
        })
    });

}

// 收取发电机的电力
function collectElectricity(facId = $.factoryId, help = false, master) {
    return new Promise(async resolve => {
        // let url = `/dreamfactory/generator/CollectCurrentElectricity?zone=dream_factory&apptoken=&pgtimestamp=&phoneID=&factoryid=${facId}&doubleflag=1&sceneval=2&g_login_type=1`;
        // if (help && master) {
        //   url = `/dreamfactory/generator/CollectCurrentElectricity?zone=dream_factory&factoryid=${facId}&master=${master}&sceneval=2&g_login_type=1`;
        // }
        let body = `factoryid=${facId}&apptoken=&pgtimestamp=&phoneID=&doubleflag=1`;
        if (help && master) {
            body += `factoryid=${facId}&master=${master}`;
        }
        $.get(taskurl(`generator/CollectCurrentElectricity`, body, `_time,apptoken,doubleflag,factoryid,pgtimestamp,phoneID,timeStamp,zone`), (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if (safeGet(data)) {
                        data = JSON.parse(data);
                        if (data['ret'] === 0) {
                            if (help) {
                                $.ele += Number(data.data['loginPinCollectElectricity'])
                                console.log(`帮助好友收取 ${data.data['CollectElectricity']} 电力，获得 ${data.data['loginPinCollectElectricity']} 电力`);
                                message += `【帮助好友】帮助成功，获得 ${data.data['loginPinCollectElectricity']} 电力\n`
                            } else {
                                $.ele += Number(data.data['CollectElectricity'])
                                console.log(`收取电力成功: 共${data.data['CollectElectricity']} `);
                                message += `【收取发电站】收取成功，获得 ${data.data['CollectElectricity']} 电力\n`
                            }
                        } else {
                            if (help) {
                                console.log(`收取好友电力失败:${data.msg}\n`);
                            } else {
                                console.log(`收取电力失败:${data.msg}\n`);
                            }
                        }
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve();
            }
        })
    })
}









async function PickUp(encryptPin = $.encryptPin, help = false) {
    $.pickUpMyselfComponent = true;
    const GetUserComponentRes = await GetUserComponent(encryptPin, 500);
    if (GetUserComponentRes && GetUserComponentRes['ret'] === 0) {
        const { componentList } = GetUserComponentRes['data'];
        if (componentList && componentList.length <= 0) {
            if (help) {
                $.log(`好友【${encryptPin}】地下暂无零件可收`)
            } else {
                $.log(`自家地下暂无零件可收`)
            }
            $.pickUpMyselfComponent = false;
        }
        for (let item of componentList) {
            await $.wait(1000);
            const PickUpComponentRes = await PickUpComponent(item['placeId'], encryptPin);
            if (PickUpComponentRes) {
                if (PickUpComponentRes['ret'] === 0) {
                    const data = PickUpComponentRes['data'];
                    if (help) {
                        console.log(`收取好友[${encryptPin}]零件成功:获得${data['increaseElectric']}电力\n`);
                        $.pickFriendEle += data['increaseElectric'];
                    } else {
                        console.log(`收取自家零件成功:获得${data['increaseElectric']}电力\n`);
                        $.pickEle += data['increaseElectric'];
                    }
                } else {
                    if (help) {
                        console.log(`收好友[${encryptPin}]零件失败：${PickUpComponentRes.msg},直接跳出`)
                    } else {
                        console.log(`收自己地下零件失败：${PickUpComponentRes.msg},直接跳出`);
                        $.pickUpMyselfComponent = false;
                    }
                    break
                }
            }
        }
    }
}
function GetUserComponent(pin = $.encryptPin, timeout = 0) {
    return new Promise(resolve => {
        setTimeout(() => {
            $.get(taskurl('usermaterial/GetUserComponent', `pin=${pin}`, `_time,pin,zone`), (err, resp, data) => {
                try {
                    if (err) {
                        console.log(`${JSON.stringify(err)}`)
                        console.log(`${$.name} API请求失败，请检查网路重试`)
                    } else {
                        if (safeGet(data)) {
                            data = JSON.parse(data);
                            if (data['ret'] === 0) {

                            } else {
                                console.log(`GetUserComponent失败：${JSON.stringify(data)}`)
                            }
                        }
                    }
                } catch (e) {
                    $.logErr(e, resp)
                } finally {
                    resolve(data);
                }
            })
        }, timeout)
    })
}
//收取地下随机零件电力API

function PickUpComponent(index, encryptPin) {
    return new Promise(resolve => {
        $.get(taskurl('usermaterial/PickUpComponent', `placeId=${index}&pin=${encryptPin}`, `_time,pin,placeId,zone`), (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if (safeGet(data)) {
                        data = JSON.parse(data);
                        // if (data['ret'] === 0) {
                        //   data = data['data'];
                        //   if (help) {
                        //     console.log(`收取好友[${encryptPin}]零件成功:获得${data['increaseElectric']}电力\n`);
                        //     $.pickFriendEle += data['increaseElectric'];
                        //   } else {
                        //     console.log(`收取自家零件成功:获得${data['increaseElectric']}电力\n`);
                        //     $.pickEle += data['increaseElectric'];
                        //   }
                        // } else {
                        //   if (help) {
                        //     console.log(`收好友[${encryptPin}]零件失败：${JSON.stringify(data)}`)
                        //   } else {
                        //     console.log(`收零件失败：${JSON.stringify(data)}`)
                        //   }
                        // }
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data);
            }
        })
    })
}

function getFriendList(sort = 0) {
    return new Promise(async resolve => {
        $.get(taskurl('friend/QueryFactoryManagerList', `sort=${sort}`, `_time,sort,zone`), async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if (safeGet(data)) {
                        data = JSON.parse(data);
                        if (data['ret'] === 0) {
                            data = data['data'];
                            if (data.list && data.list.length <= 0) {
                                console.log(`查询好友列表完成，共${$.friendList.length}好友，下面开始拾取好友地下的零件\n`);
                                return
                            }
                            let friendsEncryptPins = [];
                            for (let item of data.list) {
                                friendsEncryptPins.push(item.encryptPin);
                            }
                            $.friendList = [...$.friendList, ...friendsEncryptPins];
                            if (!$.isNode()) return
                            await getFriendList(data.sort);
                        } else {
                            console.log(`QueryFactoryManagerList异常：${JSON.stringify(data)}`)
                        }
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve();
            }
        })
    })
}
function getFactoryIdByPin(pin) {
    return new Promise((resolve, reject) => {
        // const url = `/dreamfactory/userinfo/GetUserInfoByPin?zone=dream_factory&pin=${pin}&sceneval=2`;
        $.get(taskurl('userinfo/GetUserInfoByPin', `pin=${pin}`), (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if (safeGet(data)) {
                        data = JSON.parse(data);
                        if (data['ret'] === 0) {
                            if (data.data.factoryList) {
                                //做此判断,有时候返回factoryList为null
                                // resolve(data['data']['factoryList'][0]['factoryId'])
                                $.stealFactoryId = data['data']['factoryList'][0]['factoryId'];
                            }
                        } else {
                            console.log(`异常：${JSON.stringify(data)}`)
                        }
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve();
            }
        })
    })
}

// 开团
async function tuanActivity() {
    const tuanConfig = await QueryActiveConfig();
    if (tuanConfig && tuanConfig.ret === 0) {
        const { activeId, surplusOpenTuanNum, tuanId } = tuanConfig['data']['userTuanInfo'];
        console.log(`今日剩余开团次数：${surplusOpenTuanNum}次`);
        $.surplusOpenTuanNum = surplusOpenTuanNum;
        if (!tuanId && surplusOpenTuanNum > 0) {
            //开团
            $.log(`准备开团`)
            await CreateTuan();
        } else if (tuanId) {
            //查询词团信息
            const QueryTuanRes = await QueryTuan(activeId, tuanId);
            if (QueryTuanRes && QueryTuanRes.ret === 0) {
                const { tuanInfo } = QueryTuanRes.data;
                if ((tuanInfo && tuanInfo[0]['endTime']) <= QueryTuanRes['nowTime'] && surplusOpenTuanNum > 0) {
                    $.log(`之前的团已过期，准备重新开团\n`)
                    await CreateTuan();
                }
                for (let item of tuanInfo) {
                    const { realTuanNum, tuanNum, userInfo } = item;
                    $.log(`\n开团情况:${realTuanNum}/${tuanNum}\n`);
                    if (realTuanNum === tuanNum) {
                        for (let user of userInfo) {
                            if (user.encryptPin === $.encryptPin) {
                                if (user.receiveElectric && user.receiveElectric > 0) {
                                    console.log(`您在${new Date(user.joinTime * 1000).toLocaleString()}开团奖励已经领取成功\n`)
                                    if ($.surplusOpenTuanNum > 0) await CreateTuan();
                                } else {
                                    $.log(`开始领取开团奖励`);
                                    await tuanAward(item.tuanActiveId, item.tuanId);//isTuanLeader
                                }
                            }
                        }
                    } else {
                        $.tuanIds.push(tuanId);
                        $.log(`\n此团未达领取团奖励人数：${tuanNum}人\n`)
                    }
                }
            }
        }
    }
}
async function joinLeaderTuan() {
    $.tuanIdS = null;
    if (!$.tuanIdS) await updateTuanIdsCDN('https://gitee.com/Soundantony/updateTeam/raw/master/shareCodes/jd_updateFactoryTuanId.json');
    if ($.tuanIdS && $.tuanIdS.tuanIds) {
        for (let tuanId of $.tuanIdS.tuanIds) {
            if (!tuanId) continue
            await JoinTuan(tuanId);
        }
    }
    $.tuanIdS = null;
    if (!$.tuanIdS) await updateTuanIdsCDN('https://gitee.com/Soundantony/updateTeam/raw/master/shareCodes/jd_updateFactoryTuanId.json');
    if ($.tuanIdS && $.tuanIdS.tuanIds) {
        for (let tuanId of $.tuanIdS.tuanIds) {
            if (!tuanId) continue
            await JoinTuan(tuanId);
        }
    }
}
//可获取开团后的团ID，如果团ID为空并且surplusOpenTuanNum>0，则可继续开团
//如果团ID不为空，则查询QueryTuan()
function QueryActiveConfig() {
    return new Promise((resolve) => {
        const body = `activeId=${escape(tuanActiveId)}&tuanId=`;
        const options = taskTuanUrl(`QueryActiveConfig`, body, `_time,activeId,tuanId`)
        $.get(options, async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`);
                } else {
                    if (safeGet(data)) {
                        data = JSON.parse(data);
                        if (data['ret'] === 0) {
                            const { userTuanInfo } = data['data'];
                            console.log(`\n团活动ID  ${userTuanInfo.activeId}`);
                            console.log(`团ID  ${userTuanInfo.tuanId}\n`);
                        } else {
                            console.log(`QueryActiveConfig异常：${JSON.stringify(data)}`);
                        }
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data);
            }
        })
    })
}
function QueryTuan(activeId, tuanId) {
    return new Promise((resolve) => {
        const body = `activeId=${escape(activeId)}&tuanId=${escape(tuanId)}`;
        const options = taskTuanUrl(`QueryTuan`, body, `_time,activeId,tuanId`)
        $.get(options, async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`);
                } else {
                    if (safeGet(data)) {
                        data = JSON.parse(data);
                        if (data['ret'] === 0) {
                            // $.log(`\n开团情况:${data.data.tuanInfo.realTuanNum}/${data.data.tuanInfo.tuanNum}\n`)
                        } else {
                            console.log(`异常：${JSON.stringify(data)}`);
                        }
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data);
            }
        })
    })
}
//开团API
function CreateTuan() {
    return new Promise((resolve) => {
        const body =`activeId=${escape(tuanActiveId)}&isOpenApp=1`
        const options = taskTuanUrl(`CreateTuan`, body, '_time,activeId,isOpenApp')
        $.get(options, async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`);
                } else {
                    if (safeGet(data)) {
                        data = JSON.parse(data);
                        if (data['ret'] === 0) {
                            console.log(`开团成功tuanId为\n${data.data['tuanId']}`);
                            $.tuanIds.push(data.data['tuanId']);
                        } else {
                            console.log(`开团异常：${JSON.stringify(data)}`);
                        }
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve();
            }
        })
    })
}

// 参加团活动
function JoinTuan(tuanId, stk = '_time,activeId,tuanId') {
    return new Promise((resolve) => {
        const body = `activeId=${escape(tuanActiveId)}&tuanId=${escape(tuanId)}`;
        const options = taskTuanUrl(`JoinTuan`, body, '_time,activeId,tuanId')
        $.get(options, async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`);
                } else {
                    if (safeGet(data)) {
                        data = JSON.parse(data);
                        if (data['ret'] === 0) {
                            console.log(`参团成功\n${JSON.stringify(data)}\n`);
                        } else {
                            console.log(`参团失败：${JSON.stringify(data)}`);
                        }
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve();
            }
        })
    })
}

//查询所有的团情况(自己开团以及参加别人的团)
function QueryAllTuan() {
    return new Promise((resolve) => {
        const body = `activeId=${escape(tuanActiveId)}&pageNo=1&pageSize=10`;
        const options = taskTuanUrl(`QueryAllTuan`, body, '_time,activeId,pageNo,pageSize')
        $.get(options, async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`);
                } else {
                    if (safeGet(data)) {
                        data = JSON.parse(data);
                        if (data['ret'] === 0) {
                            const { tuanInfo } = data;
                            for (let item of tuanInfo) {
                                if (item.tuanNum === item.realTuanNum) {
                                    // console.log(`参加团主【${item.tuanLeader}】已成功`)
                                    const { userInfo } = item;
                                    for (let item2 of userInfo) {
                                        if (item2.encryptPin === $.encryptPin) {
                                            if (item2.receiveElectric && item2.receiveElectric > 0) {
                                                console.log(`${new Date(item2.joinTime * 1000).toLocaleString()}参加团主【${item2.nickName}】的奖励已经领取成功`)
                                            } else {
                                                console.log(`开始领取${new Date(item2.joinTime * 1000).toLocaleString()}参加团主【${item2.nickName}】的奖励`)
                                                await tuanAward(item.tuanActiveId, item.tuanId, item.tuanLeader === $.encryptPin);//isTuanLeader
                                            }
                                        }
                                    }
                                } else {
                                    console.log(`${new Date(item.beginTime * 1000).toLocaleString()}参加团主【${item.tuanLeader}】失败`)
                                }
                            }
                        } else {
                            console.log(`QueryAllTuan异常：${JSON.stringify(data)}`);
                        }
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data);
            }
        })
    })
}

//开团人的领取奖励API
function tuanAward(activeId, tuanId, isTuanLeader = true) {
    return new Promise((resolve) => {
        const body = `activeId=${escape(activeId)}&tuanId=${escape(tuanId)}`;
        const options = taskTuanUrl(`Award`, body, '_time,activeId,tuanId')
        $.get(options, async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`);
                } else {
                    if (safeGet(data)) {
                        data = JSON.parse(data);
                        if (data['ret'] === 0) {
                            if (isTuanLeader) {
                                console.log(`开团奖励(团长)${data.data['electric']}领取成功`);
                                message += `【开团(团长)奖励】${data.data['electric']}领取成功\n`;
                                if ($.surplusOpenTuanNum > 0) {
                                    $.log(`开团奖励(团长)已领取，准备开团`);
                                    await CreateTuan();
                                }
                            } else {
                                console.log(`参团奖励${data.data['electric']}领取成功`);
                                message += `【参团奖励】${data.data['electric']}领取成功\n`;
                            }
                        } else if (data['ret'] === 10212) {
                            console.log(`${JSON.stringify(data)}`);

                            if (isTuanLeader && $.surplusOpenTuanNum > 0) {
                                $.log(`团奖励已领取，准备开团`);
                                await CreateTuan();
                            }
                        } else {
                            console.log(`异常：${JSON.stringify(data)}`);
                        }
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve();
            }
        })
    })
}

function updateTuanIdsCDN(url) {
    return new Promise(async resolve => {
        $.get({url,
            headers:{
                "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
            }}, (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                } else {
                    if (safeGet(data)) {
                        $.tuanIdS = JSON.parse(data);
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve();
            }
        })
        await $.wait(3000)
        resolve();
    })
}

// 商品可兑换时的通知
async function exchangeProNotify() {
    await GetShelvesList();
    let exchangeEndTime, exchangeEndHours, nowHours;
    //脚本运行的UTC+8时区的时间戳
    let nowTimes = new Date(new Date().getTime() + new Date().getTimezoneOffset()*60*1000 + 8*60*60*1000);
    if ($.shelvesList && $.shelvesList.length > 0) console.log(`\n  商品名     兑换状态`)
    for (let shel of $.shelvesList) {
        console.log(`${shel['name']}    ${shel['exchangeStatus'] === 1 ? '未兑换' : shel['exchangeStatus'] === 2 ? '已兑换' : '兑换超时'}`)
        if (shel['exchangeStatus'] === 1) {
            exchangeEndTime = shel['exchangeEndTime'] * 1000;
            $.picture = shel['picture'];
            // 兑换截止时间点
            exchangeEndHours = new Date(exchangeEndTime + new Date().getTimezoneOffset()*60*1000 + 8*60*60*1000).getHours();
            //兑换截止时间(年月日 时分秒)
            $.exchangeEndTime = new Date(exchangeEndTime + new Date().getTimezoneOffset()*60*1000 + 8*60*60*1000).toLocaleString('zh', {hour12: false});
            //脚本运行此时的时间点
            nowHours = nowTimes.getHours();
        }
    }
    if (exchangeEndTime) {
        //比如兑换(超时)截止时间是2020/12/8 09:20:04,现在时间是2020/12/6
        if (nowTimes < exchangeEndTime) {
            //还可以兑换
            // 一:在兑换超时这一天(2020/12/8 09:20:04)的前2小时内通知
            if ((exchangeEndTime - nowTimes.getTime()) <= 3600000 * 2) {
                let expiredTime = parseInt(((exchangeEndTime - nowTimes.getTime()) / (60*1000)).toFixed(0))
                $.msg($.name, ``, `【京东账号${$.index}】${$.nickName}\n【生产商品】${$.productName}${expiredTime}分钟后兑换超时\n【兑换截止时间】${$.exchangeEndTime}\n请速去京喜APP->首页->好物0元造进行兑换`, {'open-url': jxOpenUrl, 'media-url': $.picture})
                // if ($.isNode()) await notify.sendNotify(`${$.name} - 京东账号${$.index} - ${$.nickName}`, `【京东账号${$.index}】${$.nickName}\n【生产商品】${$.productName}${(exchangeEndTime - nowTimes) / 60*60*1000}分钟后兑换超时\n【兑换截止时间】${$.exchangeEndTime}\n请速去京喜APP->首页->好物0元造进行兑换`, { url: jxOpenUrl })
                if ($.isNode()) allMessage += `【京东账号${$.index}】${$.nickName}\n【生产商品】${$.productName}${expiredTime}分钟后兑换超时\n【兑换截止时间】${$.exchangeEndTime}\n请速去京喜APP->首页->好物0元造进行兑换${$.index !== cookiesArr.length ? '\n\n' : ''}`
            }
            //二:在兑换超时日期前的时间一天通知三次(2020/12/6 9,10,11点,以及在2020/12/7 9,10,11点各通知一次)
            if (nowHours === exchangeEndHours || nowHours === (exchangeEndHours + 1) || nowHours === (exchangeEndHours + 2)) {
                $.msg($.name, ``, `【京东账号${$.index}】${$.nickName}\n【生产商品】${$.productName}已可兑换\n【兑换截止时间】${$.exchangeEndTime}\n请速去京喜APP->首页->好物0元造进行兑换`, {'open-url': jxOpenUrl, 'media-url': $.picture})
                // if ($.isNode()) await notify.sendNotify(`${$.name} - 京东账号${$.index} - ${$.nickName}`, `【京东账号${$.index}】${$.nickName}\n【生产商品】${$.productName}已可兑换\n【兑换截止时间】${$.exchangeEndTime}\n请速去京喜APP->首页->好物0元造进行兑换`, { url: jxOpenUrl })
                if ($.isNode()) allMessage += `【京东账号${$.index}】${$.nickName}\n【生产商品】${$.productName}已可兑换\n【兑换截止时间】${$.exchangeEndTime}\n请速去京喜APP->首页->好物0元造进行兑换${$.index !== cookiesArr.length ? '\n\n' : ''}`
            }
        } else {
            //兑换已超时
            $.msg($.name, ``, `【京东账号${$.index}】${$.nickName}\n【生产商品】${$.productName}兑换已超时，请重新选择商品生产\n【兑换截止时间】${$.exchangeEndTime}`, {'open-url': jxOpenUrl})
            // if ($.isNode()) await notify.sendNotify(`${$.name} - 京东账号${$.index} - ${$.nickName}`, `【京东账号${$.index}】${$.nickName}\n【生产商品】${$.productName}兑换已超时，请重新选择商品生产\n【兑换截止时间】${$.exchangeEndTime}`, { url: jxOpenUrl })
            if ($.isNode()) allMessage += `【京东账号${$.index}】${$.nickName}\n【生产商品】${$.productName}兑换已超时，请重新选择商品生产\n【兑换截止时间】${$.exchangeEndTime}${$.index !== cookiesArr.length ? '\n\n' : ''}`
        }
    }
}
// 显示执行的结果
async function showMsg() {
    return new Promise(async resolve => {
        message += `【收取自己零件】${$.pickUpMyselfComponent ? `获得${$.pickEle}电力` : `今日已达上限`}\n`;
        message += `【收取好友零件】${$.pickUpMyselfComponent ? `获得${$.pickFriendEle}电力` : `今日已达上限`}\n`;
        if ($.isNode() && process.env.DREAMFACTORY_NOTIFY_CONTROL) {
            $.ctrTemp = `${process.env.DREAMFACTORY_NOTIFY_CONTROL}` === 'false';
        } else if ($.getdata('jdDreamFactory')) {
            $.ctrTemp = $.getdata('jdDreamFactory') === 'false';
        } else {
            $.ctrTemp = `${jdNotify}` === 'false';
        }
        if (new Date().getHours() === 22) {
            $.msg($.name, '', `${message}`)
            $.log(`\n${message}`);
        } else {
            $.log(`\n${message}`);
        }
        resolve()
    })
}
function readShareCode() {
    console.log(`开始`)
    return new Promise(async resolve => {
        $.get({url: "https://gitee.com/Soundantony/RandomShareCode/raw/master/JD_Factory.json",headers:{
                "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
            }}, async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if (data) {
                        console.log(`随机取${randomCount}个码放到您固定的互助码后面(不影响已有固定互助)`)
                        data = JSON.parse(data);
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data);
            }
        })
        await $.wait(10000);
        resolve()
    })
}
//格式化助力码
function shareCodesFormat() {
    return new Promise(async resolve => {
        // console.log(`第${$.index}个京东账号的助力码:::${$.shareCodesArr[$.index - 1]}`)
        $.newShareCodes = [];
        if ($.shareCodesArr[$.index - 1]) {
            $.newShareCodes = $.shareCodesArr[$.index - 1].split('@');
        } else {
            console.log(`由于您第${$.index}个京东账号未提供shareCode,将采纳本脚本自带的助力码\n`)
            const tempIndex = $.index > inviteCodes.length ? (inviteCodes.length - 1) : ($.index - 1);
            $.newShareCodes = inviteCodes[tempIndex].split('@');
        }
        const readShareCodeRes = await readShareCode();
        if (readShareCodeRes && readShareCodeRes.code === 200) {
            $.newShareCodes = [...new Set([...$.newShareCodes, ...(readShareCodeRes.data || [])])];
        }
        console.log(`第${$.index}个京东账号将要助力的好友${JSON.stringify($.newShareCodes)}`)
        resolve();
    })
}
function requireConfig() {
    return new Promise(async resolve => {
        await updateTuanIdsCDN('https://gitee.com/Soundantony/updateTeam/raw/master/shareCodes/jd_updateFactoryTuanId.json');
        if ($.tuanIdS && $.tuanIdS.tuanActiveId) {
            tuanActiveId = $.tuanIdS.tuanActiveId;
        }
        console.log(`开始获取${$.name}配置文件\n`);
        console.log(`tuanActiveId: ${tuanActiveId}`)
        //Node.js用户请在jdCookie.js处填写京东ck;
        const shareCodes = $.isNode() ? require('./jdDreamFactoryShareCodes.js') : '';
        console.log(`共${cookiesArr.length}个京东账号\n`);
        $.shareCodesArr = [];
        if ($.isNode()) {
            Object.keys(shareCodes).forEach((item) => {
                if (shareCodes[item]) {
                    $.shareCodesArr.push(shareCodes[item])
                }
            })
        } else {
            if ($.getdata('jd_jxFactory')) $.shareCodesArr = $.getdata('jd_jxFactory').split('\n').filter(item => item !== "" && item !== null && item !== undefined);
            console.log(`\nBoxJs设置的京喜工厂邀请码:${$.getdata('jd_jxFactory')}\n`);
        }
        // console.log(`\n种豆得豆助力码::${JSON.stringify($.shareCodesArr)}`);
        console.log(`您提供了${$.shareCodesArr.length}个账号的${$.name}助力码\n`);
        resolve()
    })
}


function safeGet(data) {
    try {
        if (typeof JSON.parse(data) == "object") {
            return true;
        }
    } catch (e) {
        console.log(e);
        console.log(`京东服务器访问数据为空，请检查自身设备网络情况`);
        return false;
    }
}
function taskTuanUrl(functionId, body = '', stk) {
    let url = `https://m.jingxi.com/dreamfactory/tuan/${functionId}?${body}&_time=${Date.now()}&_=${Date.now() + 2}&sceneval=2&g_login_type=1&_ste=1`
    url += `&h5st=${decrypt(Date.now(), stk || '', '', url)}`
    if (stk) {
        url += `&_stk=${encodeURIComponent(stk)}`;
    }
    return {
        url,
        headers: {
            "Accept": "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-cn",
            "Connection": "keep-alive",
            "Cookie": cookie,
            "Host": "m.jingxi.com",
            "Referer": "https://st.jingxi.com/pingou/dream_factory/divide.html",
            "User-Agent": "jdpingou;iPhone;3.15.2;13.5.1;90bab9217f465a83a99c0b554a946b0b0d5c2f7a;network/wifi;model/iPhone12,1;appBuild/100365;ADID/696F8BD2-0820-405C-AFC0-3C6D028040E5;supportApplePay/1;hasUPPay/0;pushNoticeIsOpen/1;hasOCPay/0;supportBestPay/0;session/14;pap/JA2015_311210;brand/apple;supportJDSHWK/1;"
        }
    }
}

function taskurl(functionId, body = '', stk) {
    let url = `${JD_API_HOST}/dreamfactory/${functionId}?zone=dream_factory&${body}&sceneval=2&g_login_type=1&_time=${Date.now()}&_=${Date.now() + 2}&_ste=1`
    url += `&h5st=${encodeURIComponent(decrypt(Date.now(), stk, '', url))}`
    if (stk) {
        url += `&_stk=${encodeURIComponent(stk)}`;
    }
    return {
        url,
        headers: {
            'Cookie': cookie,
            'Host': 'm.jingxi.com',
            'Accept': '*/*',
            'Connection': 'keep-alive',
            'User-Agent': functionId === 'AssistFriend' ? "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.66 Safari/537.36" : 'jdpingou',
            'Accept-Language': 'zh-cn',
            'Referer': 'https://wqsd.jd.com/pingou/dream_factory/index.html',
            'Accept-Encoding': 'gzip, deflate, br',
        }
    }
}
function newtasksysUrl(functionId, taskId, stk) {
    let url = `${JD_API_HOST}/newtasksys/newtasksys_front/${functionId}?source=dreamfactory&bizCode=dream_factory&sceneval=2&g_login_type=1&_time=${Date.now()}&_=${Date.now() + 2}&_ste=1`;
    if (taskId) {
        url += `&taskId=${taskId}`;
    }
    if (stk) {
        url += `&_stk=${stk}`;
    }
    //传入url进行签名
    url += `&h5st=${decrypt(Date.now(), stk, '', url)}`
    return {
        url,
        "headers": {
            'Cookie': cookie,
            'Host': 'm.jingxi.com',
            'Accept': '*/*',
            'Connection': 'keep-alive',
            'User-Agent': "jdpingou;iPhone;3.15.2;13.5.1;90bab9217f465a83a99c0b554a946b0b0d5c2f7a;network/wifi;model/iPhone12,1;appBuild/100365;ADID/696F8BD2-0820-405C-AFC0-3C6D028040E5;supportApplePay/1;hasUPPay/0;pushNoticeIsOpen/1;hasOCPay/0;supportBestPay/0;session/14;pap/JA2015_311210;brand/apple;supportJDSHWK/1;",
            'Accept-Language': 'zh-cn',
            'Referer': 'https://wqsd.jd.com/pingou/dream_factory/index.html',
            'Accept-Encoding': 'gzip, deflate, br',
        }
    }
}
/*
修改时间戳转换函数，京喜工厂原版修改
 */
Date.prototype.Format = function (fmt) {
    var e,
        n = this, d = fmt, l = {
            "M+": n.getMonth() + 1,
            "d+": n.getDate(),
            "D+": n.getDate(),
            "h+": n.getHours(),
            "H+": n.getHours(),
            "m+": n.getMinutes(),
            "s+": n.getSeconds(),
            "w+": n.getDay(),
            "q+": Math.floor((n.getMonth() + 3) / 3),
            "S+": n.getMilliseconds()
        };
    /(y+)/i.test(d) && (d = d.replace(RegExp.$1, "".concat(n.getFullYear()).substr(4 - RegExp.$1.length)));
    for (var k in l) {
        if (new RegExp("(".concat(k, ")")).test(d)) {
            var t, a = "S+" === k ? "000" : "00";
            d = d.replace(RegExp.$1, 1 == RegExp.$1.length ? l[k] : ("".concat(a) + l[k]).substr("".concat(l[k]).length))
        }
    }
    return d;
}
function jsonParse(str) {
    if (typeof str == "string") {
        try {
            return JSON.parse(str);
        } catch (e) {
            console.log(e);
            $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie')
            return [];
        }
    }
}
function decrypt(time, stk, type, url) {
    stk = stk || (url ? getUrlQueryParams(url, '_stk') : '')
    if (stk) {
        // const random = '9c66+/6i1jjP';
        // const token = `tk01wc7621cbea8nQmVZSmlhZi94FdUu+YM8dL1NZhoyQSy2c0po7rgY+nXdXBWRaUzOoLBqlpqOccJ56KHSjVil7Q7w`;
        // const fingerprint = 2964628087631161;
        // const appId = 10001;
        const random = 'cNlpbJCwIFx/';
        let token = `tk01wc7951ceea8nVzY0UlBvK3QvPAfwG6UuVMo3YIwnuyPtwgIZr9BSCkJT96NMHRqNWCO5x0zbNsEA2bkjst3tYymV`;
        let fingerprint = 6318883301648161;
        const appId = 10001;
        const timestamp = new Date(time).Format("yyyyMMddhhmmssSSS");
        const str = `${token}${fingerprint}${timestamp}${appId}${random}`;
        const hash1 = $.CryptoJS.HmacSHA512(str, token).toString($.CryptoJS.enc.Hex);
        let st = '';
        stk.split(',').map((item, index) => {
            // sts += `${item}:${item === '_time' ? time : item === 'zone' ? 'dream_factory' : item === 'type' ? type || '1' : item}${index === stk.split(',').length -1 ? '' : '&'}`;
            st += `${item}:${getUrlData(url, item)}${index === stk.split(',').length -1 ? '' : '&'}`;
        })
        // const hash2 = $.CryptoJS.HmacSHA256(st, hash1).toString($.CryptoJS.enc.Hex);
        // const hash2 = $.CryptoJS.HmacSHA256(st, hash1.toString($.CryptoJS.enc.Hex)).toString($.CryptoJS.enc.Hex);
        const hash2 = $.CryptoJS.HmacSHA256(st, hash1.toString()).toString($.CryptoJS.enc.Hex);
        // console.log(`st:${st}\n`)
        // console.log(`hash2:${JSON.stringify(["".concat(timestamp.toString()), "".concat(fingerprint.toString()), "".concat(appId.toString()), "".concat(token), "".concat(hash2)])}\n`)
        // console.log(`h5st:${["".concat(timestamp.toString()), "".concat(fingerprint.toString()), "".concat(appId.toString()), "".concat(token), "".concat(hash2)].join(";")}\n`)
        return ["".concat(timestamp.toString()), "".concat(fingerprint.toString()), "".concat(appId.toString()), "".concat(token), "".concat(hash2)].join(";")
    } else {
        return '20210318144213808;8277529360925161;10001;tk01w952a1b73a8nU0luMGtBanZTHCgj0KFVwDa4n5pJ95T/5bxO/m54p4MtgVEwKNev1u/BUjrpWAUMZPW0Kz2RWP8v;86054c036fe3bf0991bd9a9da1a8d44dd130c6508602215e50bb1e385326779d'
    }
}
/**
 * 新增url参数获取函数
 * @param url_string
 * @param param
 * @returns {string|string}
 */
function getUrlQueryParams(url_string, param) {
    let  url = new URL(url_string);
    let data = url.searchParams.get(param);
    return data ? data : '';
}

/**
 * 获取url参数值
 * @param url
 * @param name
 * @returns {string}
 */
function getUrlData(url, name) {
    const query = url.match(/\?.*/)[0].substring(1)
    const vars = query.split('&')
    for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split('=')
        if (pair[0] === name) {
            return pair[1];
        }
    }
    return ''
}
var _0xodV='jsjiami.com.v6',_0x3ed2=[_0xodV,'HMKfw5Afw7E=','w5jDl8KgFcO0','RVlBwqnCqFzCvlDDjMKLwp9/','wq/DrRIDU8OzeRAnwqdtw6XCgcOTDcO3w7h5E8OgCcKtw4w+ZMKOwr7CuBtEw5Brw7U=','wq9BMsKww6wFw79Cw6nDq8KHe2ElwoVLwogMAg==','w6I7w4dAwpYew4Vww5nDmcKLwrdjJhfDhsOg','wpTCmEvDhsOsw5DCnMOjw6HCjA==','dMKPw5NuK8Oew47Dm8KdDsOWw553wqAXwrDCoMOuwpDCrirDuFlPwodnw6sZa8K1w4ECNw==','wogtwrjChMOHAcKnE8KaZMOkUMKO','X8K7w7ZD','wrTCo8K5w4/DqcOUwo8KfsOewo3Dg2jCi3HDhATDvcOrw5PCpcKgcz7ClMOGwpAgw5PDmsKqJjHDj2TClC/DlcKpw6BNNlfCmcOmbmvCgcOvwrFUw5PCk8KjDER7ZcKjTsOuw5c6DkFewrMGUMOuw7lmwpArw43DpR4=','b8KXwo5hLA==','w4XCqiZCVn0w','c8KTw4xtMA==','U8OrI31E','w5/CikvDmcKtFQ==','w4zCh0nDnsK3EUU=','w4Jlw7FGwrTDuQ==','wr3DtQMdX8OTdwAr','BcKcwqTCgA0=','w6nCgMKTwo0dwpHDtlHDicKGw73DrcOlwpfDk8OMLcOewp3DisORHcKewpFMwowPTUYncAZUBA==','wpFgbyHDkg==','w4nDsVUpw7A=','w4jCj2LDlcKJ','w585WsOWJg==','w48BwqBvOA==','NiYhwpHCjg==','w5LDpV4Vw5Ax','XMOww58=','WjtjIMONwr9DwpY4w4bCm3XCsA==','Q39/','GnXCkC7Dm3suKsOrQsO+w6HDhA==','w6YPw7dow6I=','w4NNVcOGwrE=','wrluwqPDii7Du08Gw5QW','w4FnwpnCs8OjJ8KZ','w5bCmcORwqLCpQ==','w7AuYMO8KxHCmg==','XQBqw6XDig==','HHXCuBPDnw==','w7bCgsKFdcOGWQvChQfDqsKZw5M7w4PDosKwUCodw6/CgsOXBSDCq8KhU3vDpcKsw5oiL8Ojwr9rBGDCh8O6E0TDq8KTwrcSwroCwrjDuGQlcsK9w7NjAsO+w5MkDMOtQcOsYsKLe149w7M9woddacOwO8Ocwo/DrzNRV1zDixPDpMOQScOD','woRfPsKZw4k=','w6rCqmjCrMOWJS1mwqpkw7YxDsOdwp0YGsO+ZcOdUnPCi8OWwrhYOcOBw4rDrS7DlMKUwpbDtCfDrsKEUBvDog5QfA==','wq7DsyTCocODIScqw5kiw6l1ScOYwoAmHMO4RMOGSDjDhcKNwrxHcMOGw5/CuTDCmMKTw4PDoj3CvsOhXBPDrkkEKsKgwrHCuBl9wrVzw6PDvEnChsKLeMO5wpfCpVh3bVPDt8OywqYlw6Jxwo7DucOMcEbCscO6AMKyw7Yxwr8MCATDjw==','VMOJw5nDpVc=','w5XCk8Ohwo7CgA==','woZlwoDDqAs=','TREXwp3CgQ==','w4TCgsK2wq4s','wop9M8KBw6w=','woxwSTnDtw==','UcOsw7/DuG0=','w6XDjsKnJsOc','wqVsDcKXw4g=','LcKBwoTCvHo=','w5cEwqnCkg==','w7/ChsOwwrDCog==','wr/DvsKxwrTCpw==','UsKuw7dQFA==','wrdcfg==','JsO4QiY=','w5/CvH7Dv+istuazs+Wngei2r+++m+isnuail+acjOe+l+i2qOmHq+ivhg==','UXbDrQ==','H8Kvw5MZ','woZDwr3CnuitteawkeWniei1t++/keivluahquafoee+jOi2tOmEnuivpA==','WMKlw4B6KA==','P0fClRDDiQ==','VUhYw7PCog==','ScO/w5vDjGo=','SRE6wqvCocOR','PF7CqD7Dukw=','w7FSUMOuwrM=','w7LDicO1w5fDpw==','w71IU8Olwrc=','RGNaQ2/Cu8OlZw==','RkBHwqIYMcKF','wpvCnFrDl8KGw5TChMK7','wqHDsQrDrg==','w5rCtsOmwofCmQ==','Fx0i','CMKIwqDCgQ==','HVjDmsOF6K+U5rCL5aS06Lel776s6K2B5qCb5p27572n6LSb6Yay6K+K','w5hWQAjCsA==','w7pUYRLCrw==','w41RY8OmwqzDnsO/w6HCo1zDlsOPBgR9w73Dj3PClyjCtzIQfGrCkMK/w5fDlG7CsBsfU1dDwp3Dm8Omwqtgw5Y1wrHCrsOpaEp5V8KDP3XCvcKyw7TDuk4MwqXCvMO9','wrLCklTDn8Ktw53CkcKlwqLDh2fDicOuLnZ7w7zDinECaycRAcK8U1nDusOvacKywrl1ecOVw5g/wpggw5MHGEPDucOGHEIww7fCihrDmsOPR2FXw7F+WhjCll/CucO3ORhQwqFIw71bwqo6JA/DjlTDmsKQwp3DrVN3w6rDkVwVODtKw6PDusKZAEkawq7CmwrDvyd9Mg/CoyXDg8OCwr3CucOIw5BtclECw7NgUUpsVMKXw6rCgW/Dqh7Do1HCuwU2wrrDhcOQe0DDjcKBBcOyccK1wps3wpwpQVhSw4zCmcKUDG0=','w4LCvCtgaA==','UMOZw4TDj3U=','YMKZOsOXw6c=','woHDuSEZcA==','IMKsw683w4Q=','w5DDklYvw7U=','w67Ck1/CgMOP','w6bDiMKA','I8KkfcOZw7g=','w5pdUQBE','w5DCg8K+QsOP','NcKYwo7CgkA=','E1TCiB3DoA==','w63Cm8KA','wpbDjsKIwoM=','TXjDuMO/Rg==','w4VPw5w=','fh5REA==','wqNUMsKhw5hawqQ=','w67Cl8KDdsOQ','aGBgals=','w6zCrCZzRA==','w4JjwpnCtsOFNsKM','SExGw6DCsRo=','w7HCrwNsWg==','w4phw6tAwofDtMOw','w7TCrsO2wq0=','w63DiMKaOcOuwp4=','wohcwpLDuTbDn3w=','YV5OwqQ=','SnjDo8O4','w65HWcOQwpU=','TG1JZ1rCrA==','Xg5VEcOr','EAM1wpPCkw==','SzBQw6LDog==','VCdVEcO7','w7bCgsKFdcOGWQvChQzCu8OZwpB/w5rDosO7XywGwrLDjsOYAjHDqMKCUi3CvcKDw6gOFMOTwptBalPCuMOVPm/DlsK5wpA/wr4pwpPCvjlsQMOlw6VNGsOFwr5/HcOBfcKBYsKIQlk=','BcO2VSrCkTRAfWLCkMKzWcK2RyI4AS7DhmXDrsOMKkZqwrTDhDnDn8O1w7wHw7RJw6nDjMOAcFIBwqDCjSrCr8ODwrrDug0BwqYWwq0QK8OQJ8OswpnChHkpw6zCmMOFw4vCgcOAeD/DhjcFwrFzdMK3w6AXSsO4E8OZw5h5w79gfsO2wrozJWsfwoNCw5fDp0t5FsO+wrEEDW/DlsONwpzChSUQDsOtwqjCtiDDjkXCnXHCnH7Do8KgRzsESi5ew67Cj0FLwpAqbsKiwqXCt8Klw6/Cjylvw6LDu8Otw7fCmXbCu8OUE8KjWQ==','w5x3Vw==','LsKlwo/CqVM=','w5jDtMOIw7HDpg==','LMK7woLCqGA=','wpFhViHDlw==','wrfDqiUsTw==','w756w5DCjMKN','R2TDmHYf','w6kuw4k=','w4kKwrfCgw==','aMOYfwrorIrmsJrlpJDotbfvvZvorYnmoYPmnpznv4/ot4Hphr/oroU=','w5PDgMKcOsOw','wr9SbQzDgGRRwo4=','wojDjsKXwpXClA==','wpnDg8KJwoXChMKIwrE=','w4FEY8O3wpjCgcKkw78=','GAcswp4=','w4vCnx1MaA==','AxMuwrLCjA==','XEhDw4/CjQ==','w6jCmmDCgsOv','fFHDlFE6Fg==','w5hgSDh4','w4bCsBpXYg==','w7U9RMOuCw==','w6ggwrHCn8Kj','w4XDuMO5UR/Cjg==','w4dsw5Vlwo4=','d1rDp8OdWg==','wqnDlgXDq8Kp','w6p8eyBD','w7DCkyBnYg==','TZQTjsbEONdjKfWiAraYmi.coGm.v6=='];(function(_0x48a57a,_0x4c601c,_0x5c05cb){var _0x242fe5=function(_0x371110,_0x486239,_0x52c66c,_0x5adc75,_0x5b0bd4){_0x486239=_0x486239>>0x8,_0x5b0bd4='po';var _0x1fedca='shift',_0x5d6859='push';if(_0x486239<_0x371110){while(--_0x371110){_0x5adc75=_0x48a57a[_0x1fedca]();if(_0x486239===_0x371110){_0x486239=_0x5adc75;_0x52c66c=_0x48a57a[_0x5b0bd4+'p']();}else if(_0x486239&&_0x52c66c['replace'](/[TZQTbEONdKfWArYG=]/g,'')===_0x486239){_0x48a57a[_0x5d6859](_0x5adc75);}}_0x48a57a[_0x5d6859](_0x48a57a[_0x1fedca]());}return 0x7b6c8;};var _0x352cef=function(){var _0x276221={'data':{'key':'cookie','value':'timeout'},'setCookie':function(_0x1fe432,_0x20de25,_0x1b165c,_0x52841f){_0x52841f=_0x52841f||{};var _0x505e14=_0x20de25+'='+_0x1b165c;var _0x2f4f86=0x0;for(var _0x2f4f86=0x0,_0x1867d7=_0x1fe432['length'];_0x2f4f86<_0x1867d7;_0x2f4f86++){var _0x415be0=_0x1fe432[_0x2f4f86];_0x505e14+=';\x20'+_0x415be0;var _0x3b4664=_0x1fe432[_0x415be0];_0x1fe432['push'](_0x3b4664);_0x1867d7=_0x1fe432['length'];if(_0x3b4664!==!![]){_0x505e14+='='+_0x3b4664;}}_0x52841f['cookie']=_0x505e14;},'removeCookie':function(){return'dev';},'getCookie':function(_0x19edac,_0x3c095e){_0x19edac=_0x19edac||function(_0x4f1b8e){return _0x4f1b8e;};var _0x21d445=_0x19edac(new RegExp('(?:^|;\x20)'+_0x3c095e['replace'](/([.$?*|{}()[]\/+^])/g,'$1')+'=([^;]*)'));var _0x563641=typeof _0xodV=='undefined'?'undefined':_0xodV,_0x197360=_0x563641['split'](''),_0x4cf7f2=_0x197360['length'],_0x388f2c=_0x4cf7f2-0xe,_0x1274c2;while(_0x1274c2=_0x197360['pop']()){_0x4cf7f2&&(_0x388f2c+=_0x1274c2['charCodeAt']());}var _0x4e3408=function(_0x27e4aa,_0x3f1482,_0x5b9147){_0x27e4aa(++_0x3f1482,_0x5b9147);};_0x388f2c^-_0x4cf7f2===-0x524&&(_0x1274c2=_0x388f2c)&&_0x4e3408(_0x242fe5,_0x4c601c,_0x5c05cb);return _0x1274c2>>0x2===0x14b&&_0x21d445?decodeURIComponent(_0x21d445[0x1]):undefined;}};var _0x12cdf9=function(){var _0x20cd0a=new RegExp('\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*[\x27|\x22].+[\x27|\x22];?\x20*}');return _0x20cd0a['test'](_0x276221['removeCookie']['toString']());};_0x276221['updateCookie']=_0x12cdf9;var _0xbfbb00='';var _0xc4338c=_0x276221['updateCookie']();if(!_0xc4338c){_0x276221['setCookie'](['*'],'counter',0x1);}else if(_0xc4338c){_0xbfbb00=_0x276221['getCookie'](null,'counter');}else{_0x276221['removeCookie']();}};_0x352cef();}(_0x3ed2,0x1d2,0x1d200));var _0x4565=function(_0x10e465,_0x622ee3){_0x10e465=~~'0x'['concat'](_0x10e465);var _0x3be1d5=_0x3ed2[_0x10e465];if(_0x4565['nfYSEx']===undefined){(function(){var _0x4c742e=function(){var _0x461748;try{_0x461748=Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');')();}catch(_0x31d63b){_0x461748=window;}return _0x461748;};var _0x2cc8ba=_0x4c742e();var _0x1421e4='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x2cc8ba['atob']||(_0x2cc8ba['atob']=function(_0x2a4972){var _0x12f718=String(_0x2a4972)['replace'](/=+$/,'');for(var _0x31d52e=0x0,_0x5543b3,_0x3d2c0e,_0x17f770=0x0,_0x413161='';_0x3d2c0e=_0x12f718['charAt'](_0x17f770++);~_0x3d2c0e&&(_0x5543b3=_0x31d52e%0x4?_0x5543b3*0x40+_0x3d2c0e:_0x3d2c0e,_0x31d52e++%0x4)?_0x413161+=String['fromCharCode'](0xff&_0x5543b3>>(-0x2*_0x31d52e&0x6)):0x0){_0x3d2c0e=_0x1421e4['indexOf'](_0x3d2c0e);}return _0x413161;});}());var _0x47e5c0=function(_0x5802a6,_0x622ee3){var _0x1530b1=[],_0x26dc20=0x0,_0x5493ae,_0x53e962='',_0x1c9460='';_0x5802a6=atob(_0x5802a6);for(var _0x111697=0x0,_0x5b8b99=_0x5802a6['length'];_0x111697<_0x5b8b99;_0x111697++){_0x1c9460+='%'+('00'+_0x5802a6['charCodeAt'](_0x111697)['toString'](0x10))['slice'](-0x2);}_0x5802a6=decodeURIComponent(_0x1c9460);for(var _0x3aa26b=0x0;_0x3aa26b<0x100;_0x3aa26b++){_0x1530b1[_0x3aa26b]=_0x3aa26b;}for(_0x3aa26b=0x0;_0x3aa26b<0x100;_0x3aa26b++){_0x26dc20=(_0x26dc20+_0x1530b1[_0x3aa26b]+_0x622ee3['charCodeAt'](_0x3aa26b%_0x622ee3['length']))%0x100;_0x5493ae=_0x1530b1[_0x3aa26b];_0x1530b1[_0x3aa26b]=_0x1530b1[_0x26dc20];_0x1530b1[_0x26dc20]=_0x5493ae;}_0x3aa26b=0x0;_0x26dc20=0x0;for(var _0x2982c3=0x0;_0x2982c3<_0x5802a6['length'];_0x2982c3++){_0x3aa26b=(_0x3aa26b+0x1)%0x100;_0x26dc20=(_0x26dc20+_0x1530b1[_0x3aa26b])%0x100;_0x5493ae=_0x1530b1[_0x3aa26b];_0x1530b1[_0x3aa26b]=_0x1530b1[_0x26dc20];_0x1530b1[_0x26dc20]=_0x5493ae;_0x53e962+=String['fromCharCode'](_0x5802a6['charCodeAt'](_0x2982c3)^_0x1530b1[(_0x1530b1[_0x3aa26b]+_0x1530b1[_0x26dc20])%0x100]);}return _0x53e962;};_0x4565['QVAyPb']=_0x47e5c0;_0x4565['xlTQwr']={};_0x4565['nfYSEx']=!![];}var _0x13ea8c=_0x4565['xlTQwr'][_0x10e465];if(_0x13ea8c===undefined){if(_0x4565['GXgilR']===undefined){var _0x270eb2=function(_0x45c60a){this['zpZHJQ']=_0x45c60a;this['mHjBUs']=[0x1,0x0,0x0];this['QPtUus']=function(){return'newState';};this['CyJcyv']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*';this['CyPKPn']='[\x27|\x22].+[\x27|\x22];?\x20*}';};_0x270eb2['prototype']['ERVlDW']=function(){var _0x66282d=new RegExp(this['CyJcyv']+this['CyPKPn']);var _0x13954e=_0x66282d['test'](this['QPtUus']['toString']())?--this['mHjBUs'][0x1]:--this['mHjBUs'][0x0];return this['qKthMr'](_0x13954e);};_0x270eb2['prototype']['qKthMr']=function(_0x41ae79){if(!Boolean(~_0x41ae79)){return _0x41ae79;}return this['ESDPuM'](this['zpZHJQ']);};_0x270eb2['prototype']['ESDPuM']=function(_0x977487){for(var _0x58e728=0x0,_0x54a555=this['mHjBUs']['length'];_0x58e728<_0x54a555;_0x58e728++){this['mHjBUs']['push'](Math['round'](Math['random']()));_0x54a555=this['mHjBUs']['length'];}return _0x977487(this['mHjBUs'][0x0]);};new _0x270eb2(_0x4565)['ERVlDW']();_0x4565['GXgilR']=!![];}_0x3be1d5=_0x4565['QVAyPb'](_0x3be1d5,_0x622ee3);_0x4565['xlTQwr'][_0x10e465]=_0x3be1d5;}else{_0x3be1d5=_0x13ea8c;}return _0x3be1d5;};var _0x25df5c=function(){var _0x4f5271=!![];return function(_0xc35ee2,_0x24d6bf){var _0x2a3900=_0x4f5271?function(){if(_0x24d6bf){var _0x2aca62=_0x24d6bf['apply'](_0xc35ee2,arguments);_0x24d6bf=null;return _0x2aca62;}}:function(){};_0x4f5271=![];return _0x2a3900;};}();var _0x29f9c8=_0x25df5c(this,function(){var _0x3f7c08=function(){return'\x64\x65\x76';},_0x5ec7ec=function(){return'\x77\x69\x6e\x64\x6f\x77';};var _0x2d5423=function(){var _0x93f096=new RegExp('\x5c\x77\x2b\x20\x2a\x5c\x28\x5c\x29\x20\x2a\x7b\x5c\x77\x2b\x20\x2a\x5b\x27\x7c\x22\x5d\x2e\x2b\x5b\x27\x7c\x22\x5d\x3b\x3f\x20\x2a\x7d');return!_0x93f096['\x74\x65\x73\x74'](_0x3f7c08['\x74\x6f\x53\x74\x72\x69\x6e\x67']());};var _0x183bdc=function(){var _0x2103d6=new RegExp('\x28\x5c\x5c\x5b\x78\x7c\x75\x5d\x28\x5c\x77\x29\x7b\x32\x2c\x34\x7d\x29\x2b');return _0x2103d6['\x74\x65\x73\x74'](_0x5ec7ec['\x74\x6f\x53\x74\x72\x69\x6e\x67']());};var _0x154f33=function(_0x1a73bd){var _0x5410ff=~-0x1>>0x1+0xff%0x0;if(_0x1a73bd['\x69\x6e\x64\x65\x78\x4f\x66']('\x69'===_0x5410ff)){_0x49c441(_0x1a73bd);}};var _0x49c441=function(_0x4c1b32){var _0x2dee96=~-0x4>>0x1+0xff%0x0;if(_0x4c1b32['\x69\x6e\x64\x65\x78\x4f\x66']((!![]+'')[0x3])!==_0x2dee96){_0x154f33(_0x4c1b32);}};if(!_0x2d5423()){if(!_0x183bdc()){_0x154f33('\x69\x6e\x64\u0435\x78\x4f\x66');}else{_0x154f33('\x69\x6e\x64\x65\x78\x4f\x66');}}else{_0x154f33('\x69\x6e\x64\u0435\x78\x4f\x66');}});_0x29f9c8();function wuzhi(_0x331efd){var _0x1f3e05={'mWpZX':function(_0x1e1bb4,_0x49e8ab){return _0x1e1bb4!==_0x49e8ab;},'gOrFH':_0x4565('0','&vB^'),'jXfpz':_0x4565('1','PjDW'),'hoJsR':_0x4565('2','2$9('),'EvQSB':function(_0x1535e7,_0x1d3d0b){return _0x1535e7===_0x1d3d0b;},'MHuAs':_0x4565('3',')[P9'),'WCPTp':_0x4565('4',')LP*'),'hrVGb':function(_0x2a69fc){return _0x2a69fc();},'dcSxF':function(_0x18a870,_0xce9d86){return _0x18a870!==_0xce9d86;},'bYKWW':_0x4565('5','i^Sf'),'KhIXJ':_0x4565('6','uRTV'),'KdoUH':function(_0x21a69a,_0x192e62){return _0x21a69a*_0x192e62;},'JSvLU':_0x4565('7','iE36'),'rgESD':_0x4565('8','&G!P'),'edGhK':_0x4565('9',']2xG'),'HrNNl':_0x4565('a','![#N'),'oLEeT':_0x4565('b','BY7a'),'MTdkJ':_0x4565('c','MNLb'),'cNYXX':function(_0x5202dc,_0x9410c5){return _0x5202dc(_0x9410c5);},'fhBPn':_0x4565('d','CztG'),'dEBjm':_0x4565('e','MNLb'),'LDwhW':_0x4565('f','dYWR'),'CjxYV':_0x4565('10','MNLb')};var _0x3530ba=$[_0x4565('11',')LP*')][Math[_0x4565('12','MNLb')](_0x1f3e05[_0x4565('13','83yQ')](Math[_0x4565('14','(x&P')](),$[_0x4565('15','(x&P')][_0x4565('16','&vB^')]))];let _0x1921f5=_0x331efd[_0x4565('17','&G!P')];let _0x266561=_0x4565('18','wgK1')+_0x3530ba+';\x20'+cookie;let _0xc07868={'url':_0x4565('19','2c2('),'headers':{'Host':_0x1f3e05[_0x4565('1a','^Rps')],'Content-Type':_0x1f3e05[_0x4565('1b','w^SA')],'origin':_0x1f3e05[_0x4565('1c','(x&P')],'Accept-Encoding':_0x1f3e05[_0x4565('1d',')Fji')],'Cookie':_0x266561,'Connection':_0x1f3e05[_0x4565('1e','xsA]')],'Accept':_0x1f3e05[_0x4565('1f','f#uc')],'User-Agent':$[_0x4565('20','w^SA')]()?process[_0x4565('21','3Kug')][_0x4565('22','83zz')]?process[_0x4565('23','!Hn9')][_0x4565('24','0P1X')]:_0x1f3e05[_0x4565('25','![#N')](require,_0x1f3e05[_0x4565('26','Vt[N')])[_0x4565('27','H)fM')]:$[_0x4565('28','CztG')](_0x1f3e05[_0x4565('29','T&@2')])?$[_0x4565('2a',')Fji')](_0x1f3e05[_0x4565('2b','nLDG')]):_0x1f3e05[_0x4565('2c','0P1X')],'referer':_0x4565('2d','DtBW'),'Accept-Language':_0x1f3e05[_0x4565('2e',']2xG')]},'body':_0x4565('2f','S)vW')+_0x1921f5+_0x4565('30','S)vW')};return new Promise(_0x20f9cf=>{var _0x3c557e={'MZcxj':function(_0x32df79,_0x3433ae){return _0x1f3e05[_0x4565('31','3Kug')](_0x32df79,_0x3433ae);},'GQTRV':_0x1f3e05[_0x4565('32','T&@2')],'ovZkA':_0x1f3e05[_0x4565('33','H)fM')],'qaptg':_0x1f3e05[_0x4565('34','AoOX')],'TwGxl':function(_0x27d728,_0x1b73b6){return _0x1f3e05[_0x4565('35','2c2(')](_0x27d728,_0x1b73b6);},'ShxeW':_0x1f3e05[_0x4565('36',']2xG')],'XmDsh':_0x1f3e05[_0x4565('37','^Rps')],'hjuOQ':function(_0x584c1c){return _0x1f3e05[_0x4565('38','3Kug')](_0x584c1c);}};if(_0x1f3e05[_0x4565('39','uRTV')](_0x1f3e05[_0x4565('3a',']2xG')],_0x1f3e05[_0x4565('3b','wgK1')])){$[_0x4565('3c','4&@e')](_0xc07868,(_0x35040b,_0x22649f,_0xee8139)=>{try{if(_0x3c557e[_0x4565('3d','T&@2')](_0x3c557e[_0x4565('3e','l%Bf')],_0x3c557e[_0x4565('3f','MNLb')])){console[_0x4565('40','^Rps')]($[_0x4565('41','ZHcI')]+_0x4565('42','BY7a'));}else{if(_0x35040b){console[_0x4565('43','PjDW')]($[_0x4565('44','i^Sf')]+_0x4565('45','CztG'));}else{if(_0x3c557e[_0x4565('46','MNLb')](_0x3c557e[_0x4565('47','0P1X')],_0x3c557e[_0x4565('48','iE36')])){_0xee8139=JSON[_0x4565('49','3Kug')](_0xee8139);}else{$[_0x4565('4a','AoOX')](e);}}}}catch(_0x179a7a){$[_0x4565('4b','0P1X')](_0x179a7a);}finally{if(_0x3c557e[_0x4565('4c','Vt[N')](_0x3c557e[_0x4565('4d','UfK3')],_0x3c557e[_0x4565('4e','Vt[N')])){$[_0x4565('4f','9q1J')]=JSON[_0x4565('49','3Kug')](_0xee8139);$[_0x4565('50','vvVJ')]=$[_0x4565('51','BY7a')][_0x4565('52','2$9(')];}else{_0x3c557e[_0x4565('53','T&@2')](_0x20f9cf);}}});}else{console[_0x4565('54','f#uc')]($[_0x4565('55','wgK1')]+_0x4565('56','PjDW'));}});}function shuye72(){var _0x3156c3={'fzaAK':function(_0x3aecbb,_0xa85bbe){return _0x3aecbb===_0xa85bbe;},'iGmpz':_0x4565('57','az$o'),'zUrWi':_0x4565('58','az$o'),'OdCvJ':function(_0x3c775e){return _0x3c775e();},'QbQKe':function(_0x52cfaf,_0x3c2e96){return _0x52cfaf!==_0x3c2e96;},'kDFUA':function(_0x4f36cd,_0x4f2b61){return _0x4f36cd<_0x4f2b61;},'bLYOm':function(_0x30f16f,_0x518cfe){return _0x30f16f(_0x518cfe);},'AgsaI':_0x4565('59','Vt[N'),'aOroi':_0x4565('5a','BY7a')};return new Promise(_0x991fe1=>{var _0x3fa300={'NuOGz':function(_0x309076,_0x26be60){return _0x3156c3[_0x4565('5b',')LP*')](_0x309076,_0x26be60);},'SqCfp':_0x3156c3[_0x4565('5c','3Kug')],'CeGfh':_0x3156c3[_0x4565('5d','XW8B')],'Nqidu':function(_0x59f214){return _0x3156c3[_0x4565('5e','&G!P')](_0x59f214);},'HjlRg':function(_0x3741e2,_0x40960a){return _0x3156c3[_0x4565('5f','i^Sf')](_0x3741e2,_0x40960a);},'UiIMy':function(_0x46d1da,_0x1e50e7){return _0x3156c3[_0x4565('60','w^SA')](_0x46d1da,_0x1e50e7);},'KbNFJ':function(_0x4db365,_0x46f84b){return _0x3156c3[_0x4565('61','S)vW')](_0x4db365,_0x46f84b);}};$[_0x4565('62','uRTV')]({'url':_0x3156c3[_0x4565('63','X9R#')],'headers':{'User-Agent':_0x3156c3[_0x4565('64',')[P9')]}},async(_0x49b37b,_0x4e2cba,_0x5912af)=>{if(_0x3fa300[_0x4565('65','DtBW')](_0x3fa300[_0x4565('66','wgK1')],_0x3fa300[_0x4565('67','0P1X')])){if(_0x49b37b){console[_0x4565('68','2c2(')]($[_0x4565('69','l%Bf')]+_0x4565('56','PjDW'));}else{_0x5912af=JSON[_0x4565('6a','PjDW')](_0x5912af);}}else{try{if(_0x49b37b){console[_0x4565('6b','kDQX')]($[_0x4565('6c','83zz')]+_0x4565('42','BY7a'));}else{$[_0x4565('6d',']2xG')]=JSON[_0x4565('6e','DtBW')](_0x5912af);await _0x3fa300[_0x4565('6f','!Hn9')](shuye73);if(_0x3fa300[_0x4565('70',')LP*')]($[_0x4565('71','CztG')][_0x4565('72','iE36')],0x0)){for(let _0x48a213=0x0;_0x3fa300[_0x4565('73',')LP*')](_0x48a213,$[_0x4565('74','&vB^')][_0x4565('75','T&@2')][_0x4565('76','uRTV')]);_0x48a213++){let _0x4a875f=$[_0x4565('77','H)fM')][_0x4565('78','vvVJ')][_0x48a213];await $[_0x4565('79','PjDW')](0x1f4);await _0x3fa300[_0x4565('7a','Vt[N')](wuzhi,_0x4a875f);}}}}catch(_0x2b8073){$[_0x4565('7b','9q1J')](_0x2b8073);}finally{_0x3fa300[_0x4565('7c','83zz')](_0x991fe1);}}});});}function shuye73(){var _0x3106f9={'JROLP':function(_0x1e40da){return _0x1e40da();},'ywGCu':function(_0x3a6253,_0x290e3e){return _0x3a6253===_0x290e3e;},'WZkbW':_0x4565('7d','f#uc'),'oYWmK':function(_0xc37ecc,_0x761b02){return _0xc37ecc!==_0x761b02;},'xakHH':_0x4565('7e','nLDG'),'crkWU':function(_0x596b69,_0x4fe6aa){return _0x596b69===_0x4fe6aa;},'bvPvA':_0x4565('7f','83zz'),'OKkyg':function(_0x2c7e28){return _0x2c7e28();},'HLBMc':_0x4565('80','DtBW'),'yUECV':_0x4565('81','ZHcI')};return new Promise(_0x30499b=>{$[_0x4565('82',')[P9')]({'url':_0x3106f9[_0x4565('83','wgK1')],'headers':{'User-Agent':_0x3106f9[_0x4565('84','UfK3')]}},async(_0x4eaef6,_0x5f342e,_0x1c0e49)=>{var _0x48f821={'Rmhdj':function(_0x95ccdb){return _0x3106f9[_0x4565('85','wgK1')](_0x95ccdb);},'dEfMM':function(_0x367a95){return _0x3106f9[_0x4565('86','^Rps')](_0x367a95);}};try{if(_0x4eaef6){if(_0x3106f9[_0x4565('87','&G!P')](_0x3106f9[_0x4565('88','kDQX')],_0x3106f9[_0x4565('89','z[Y2')])){console[_0x4565('8a','![#N')]($[_0x4565('8b','4&@e')]+_0x4565('8c','ZHcI'));}else{_0x48f821[_0x4565('8d','uRTV')](_0x30499b);}}else{$[_0x4565('8e','^Rps')]=JSON[_0x4565('8f','l%Bf')](_0x1c0e49);$[_0x4565('90','l%Bf')]=$[_0x4565('91','Vt[N')][_0x4565('92','f#uc')];}}catch(_0x992605){if(_0x3106f9[_0x4565('93',')LP*')](_0x3106f9[_0x4565('94','f#uc')],_0x3106f9[_0x4565('95','iE36')])){_0x48f821[_0x4565('96','S)vW')](_0x30499b);}else{$[_0x4565('97','z[Y2')](_0x992605);}}finally{if(_0x3106f9[_0x4565('98',')[P9')](_0x3106f9[_0x4565('99',')LP*')],_0x3106f9[_0x4565('9a',')Fji')])){_0x3106f9[_0x4565('9b','4&@e')](_0x30499b);}else{$[_0x4565('9c','s1^!')](e);}}});});};_0xodV='jsjiami.com.v6';
// prettier-ignore
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
