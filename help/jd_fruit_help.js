/*
东东农场互助
更新时间：2021-11-30
活动入口：京东APP我的-更多工具-东东农场
5 0 * * * jd_fruit_help.js
*/
const $ = new Env('东东农场互助');
let cookiesArr = [], cookie = '', jdFruitShareArr = [], isBox = false, notify, newShareCodes, allMessage = '';
//助力好友分享码(最多3个,否则后面的助力失败),原因:京东农场每人每天只有3次助力机会
//此此内容是IOS用户下载脚本到本地使用，填写互助码的地方，同一京东账号的好友互助码请使用@符号隔开。
//下面给出两个账号的填写示例（iOS只支持2个京东账号）
let shareCodes = ["40cf6440db1943e2a9d1a6ae28366100","948da82d3b0b44dcbad90353cd177408","31c5eed3c8b4448ca04db3a04ffe6d21","ace5af81ef034576bcd5b3b42dee37b9","28c8d02f8f1848538103068925a2f9f2","7ab9cc3847b84a3eb43063c41950022c","c770301c955d4e0a9b286e85db8a1d49","7d539fb5bc964f6f918f82f82010de23","e04ca02a29b1409d80e4337b4e6cb58c","a05e974a14bf4bbc940a934a6c2ef4bd","5deb9bf2c1f84ffd91674b0e20735556","077f44caec524b829764f25a1fe36231","9720492084c44b7b8cd5e30f9da6990a","30a40de0601c4c2386ab5cae5dbcabf4","3e9557b5f3734f42925b8c1312d14fe4","74bd01f2678944e8aae61c0e87905633","237a88f44a9d4e158fa5a1d4fa3139eb","c42cde24eb0b461497a9082cf96eeceb","9fe484d11915492c85df4739aa44dd0a","2af2fd5d4b814eed9bbe85ee0c4d846c","ad7c9586788149a2845d48f06e19a763","0580e4bae4314fe7ba8c8164f7506f55","6864df95c9454bf9b4e3c368ec445a9f","046dce62c6554c5cac78317fae7ece0b","bc51cef8da954eca99cf8684c3cd6d51","5daad3ad44d14513867690082673a6c5","87c1338b66e84879b2c94c1b069f775b","6e07ee2071a446498f872fd61a39d987","06061a4672c64210b0f54babc19997aa","c85dff36024346f48c4555657996b4b8","a7bf416ad1c248fc946fcbde6de70e7d","767f42a825d843c397e512078e66f8ec","b4b0e13e9c2d4a118d11e1986ab71913","07d5422b650b4d60836a17ddfe6f4149","6fb6c6d987994a9797d08a1bee2ecc1e","de0d326bbdf84572a6a8f5f996e036b1","21618d40160046e3be3762c4fffe9b62","ae3c08a8366349c896fba8898eb8fdc0","f7c69a776f15494d9fd989a2f3fdffd7","f929059907bb44218a7b5212da38db74","26d02abd781748159da5421d1cf25aa4","7507ef3e20314d4d8164ecf3cfd0001e","4fac93784d2b41e1a9ef9130bad61c0b","872e51f0470146e494dc8ae15c72a37d","eec7efe59b5c4d33975b69eb0a6b46f9","0835f7ea9e564088976c0314752f7a88","4d68b7204b4e499f9762377adbfb8f23","d6a3b62ad1eb4f9b95c42359b37e9253","5b2bb38b38b94b388f48bddff08b2961","42de39aa1fae4733985d5751b9ed0a13","82b053b1a5c341bcacab6db98727e82a","faf4bdc5efef4d5a8d0ae0ebfb82ad52","65bd45580cd94034a1b82e77d4e557eb"];
let shareCodes2 = ["40cf6440db1943e2a9d1a6ae28366100","948da82d3b0b44dcbad90353cd177408","31c5eed3c8b4448ca04db3a04ffe6d21","ace5af81ef034576bcd5b3b42dee37b9","28c8d02f8f1848538103068925a2f9f2","7ab9cc3847b84a3eb43063c41950022c","c770301c955d4e0a9b286e85db8a1d49","7d539fb5bc964f6f918f82f82010de23","e04ca02a29b1409d80e4337b4e6cb58c","a05e974a14bf4bbc940a934a6c2ef4bd","5deb9bf2c1f84ffd91674b0e20735556","077f44caec524b829764f25a1fe36231","9720492084c44b7b8cd5e30f9da6990a","30a40de0601c4c2386ab5cae5dbcabf4","3e9557b5f3734f42925b8c1312d14fe4","74bd01f2678944e8aae61c0e87905633","237a88f44a9d4e158fa5a1d4fa3139eb","c42cde24eb0b461497a9082cf96eeceb","9fe484d11915492c85df4739aa44dd0a","2af2fd5d4b814eed9bbe85ee0c4d846c","ad7c9586788149a2845d48f06e19a763","0580e4bae4314fe7ba8c8164f7506f55","6864df95c9454bf9b4e3c368ec445a9f","046dce62c6554c5cac78317fae7ece0b","bc51cef8da954eca99cf8684c3cd6d51","5daad3ad44d14513867690082673a6c5","87c1338b66e84879b2c94c1b069f775b","6e07ee2071a446498f872fd61a39d987","06061a4672c64210b0f54babc19997aa","c85dff36024346f48c4555657996b4b8","a7bf416ad1c248fc946fcbde6de70e7d","767f42a825d843c397e512078e66f8ec","b4b0e13e9c2d4a118d11e1986ab71913","07d5422b650b4d60836a17ddfe6f4149","6fb6c6d987994a9797d08a1bee2ecc1e","de0d326bbdf84572a6a8f5f996e036b1","21618d40160046e3be3762c4fffe9b62","ae3c08a8366349c896fba8898eb8fdc0","f7c69a776f15494d9fd989a2f3fdffd7","f929059907bb44218a7b5212da38db74","26d02abd781748159da5421d1cf25aa4","7507ef3e20314d4d8164ecf3cfd0001e","4fac93784d2b41e1a9ef9130bad61c0b","872e51f0470146e494dc8ae15c72a37d","eec7efe59b5c4d33975b69eb0a6b46f9","0835f7ea9e564088976c0314752f7a88","4d68b7204b4e499f9762377adbfb8f23","d6a3b62ad1eb4f9b95c42359b37e9253","5b2bb38b38b94b388f48bddff08b2961","42de39aa1fae4733985d5751b9ed0a13","82b053b1a5c341bcacab6db98727e82a","faf4bdc5efef4d5a8d0ae0ebfb82ad52","65bd45580cd94034a1b82e77d4e557eb"];
let message = '', subTitle = '', option = {}, isFruitFinished = false;
let jdNotify = false;//是否关闭通知，false打开通知推送，true关闭通知推送
let randomCount = $.isNode() ? 20 : 5;
const JD_API_HOST = 'https://api.m.jd.com/client.action';
const ZLC = !(process.env.JD_JOIN_ZLC && process.env.JD_JOIN_ZLC === 'false')
!(async () => {
    await requireConfig();
    if (!cookiesArr[0]) {
        $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
        return;
    }
    for (let i = 25; i < cookiesArr.length; i++) {
        if (cookiesArr[i]) {
            cookie = cookiesArr[i];
            $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
            $.index = i + 1;
            $.isLogin = true;
            $.nickName = '';
            await TotalBean();
            console.log(`\n开始【京东账号${$.index}】${$.nickName || $.UserName}\n`);
            if (!$.isLogin) {
                $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
                if ($.isNode()) {
                    await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
                }
                continue
            }
            message = '';
            subTitle = '';
            option = {};
            $.retry = 0;

            await masterHelpShare();
            await turntableFarm()
        }
    }
    if ($.isNode() && allMessage && $.ctrTemp) {
        await notify.sendNotify(`${$.name}`, `${allMessage}`)
    }
})()
    .catch((e) => {
        $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
    })
    .finally(() => {
        $.done();
    })

// 助力好友
async function masterHelpShare() {
    console.log('开始助力好友')
    await initForFarm();
    let salveHelpAddWater = 0;
    let remainTimes = 3;//今日剩余助力次数,默认3次（京东农场每人每天3次助力机会）。
    for (let i = 0; i < shareCodes.length; i++) {
        let code = shareCodes[i];
        console.log(`${$.UserName}开始助力: ${code}`);
        if (!code) continue;
        await masterHelp(code);
        if ($.helpResult.code === '0') {
            if ($.helpResult.helpResult.code === '0') {
                //助力成功
                salveHelpAddWater += $.helpResult.helpResult.salveHelpAddWater;
                console.log(`【助力好友结果】: 已成功给【${$.helpResult.helpResult.masterUserInfo.nickName}】助力`);
                console.log(`给好友【${$.helpResult.helpResult.masterUserInfo.nickName}】助力获得${$.helpResult.helpResult.salveHelpAddWater}g水滴`)
            } else if ($.helpResult.helpResult.code === '8') {
                console.log(`【助力好友结果】: 助力【${$.helpResult.helpResult.masterUserInfo.nickName}】失败，您今天助力次数已耗尽`);
                break
            } else if ($.helpResult.helpResult.code === '9') {
                console.log(`【助力好友结果】: 之前给【${$.helpResult.helpResult.masterUserInfo.nickName}】助力过了`);
            } else if ($.helpResult.helpResult.code === '10') {
                console.log(`【助力好友结果】: 好友【${$.helpResult.helpResult.masterUserInfo.nickName}】已满五人助力`);
                shareCodes.splice(i, 1)
                i--
            } else {
                console.log(`助力其他情况：${JSON.stringify($.helpResult.helpResult)}`);
            }
            console.log(`【今日助力次数还剩】${$.helpResult.helpResult.remainTimes}次\n`);
            remainTimes = $.helpResult.helpResult.remainTimes;
            if ($.helpResult.helpResult.remainTimes === 0) {
                console.log(`您当前助力次数已耗尽，跳出助力`);
                break
            }
        } else {
            console.log(`助力失败::${JSON.stringify($.helpResult)}`);
            break;
        }
    }
}

//天天抽奖助力
async function turntableFarm() {
    console.log('开始天天抽奖--好友助力--每人每天只有三次助力机会.')
    for (let i = 0; i < shareCodes2.length; i++) {
        code = shareCodes2[i];
        await lotteryMasterHelp(code);
        if ($.lotteryMasterHelpRes.helpResult.code === '0') {
            console.log(`天天抽奖-助力${$.lotteryMasterHelpRes.helpResult.masterUserInfo.nickName}成功\n`)
        } else if ($.lotteryMasterHelpRes.helpResult.code === '11') {
            console.log(`天天抽奖-不要重复助力${$.lotteryMasterHelpRes.helpResult.masterUserInfo.nickName}\n`)
        } else if ($.lotteryMasterHelpRes.helpResult.code === '13') {
            console.log(`天天抽奖-助力${$.lotteryMasterHelpRes.helpResult.masterUserInfo.nickName}失败,助力次数耗尽\n`);
            break;
        } else if ($.lotteryMasterHelpRes.helpResult.code === '10') {
            console.log(`【助力好友结果】: 好友【${$.helpResult.helpResult.masterUserInfo.nickName}】已满`);
            console.log(shareCodes2.length)
            shareCodes2.splice(i, 1)
            i--
        }else if ($.lotteryMasterHelpRes.helpResult.code === '6') {
            console.log(`此账号无法进行天天抽奖助力！！（黑号）\n`);
            break;
        }
    }
}

function runTimes() {
    return new Promise((resolve, reject) => {
        $.get({
            url: `https://api.jdsharecode.xyz/api/runTimes?activityId=farm&sharecode=${$.farmInfo.farmUserPro.shareCode}`
        }, (err, resp, data) => {
            if (err) {
                console.log('上报失败', err)
                reject(err)
            } else {
                console.log(data)
                resolve()
            }
        })
    })
}

async function duck() {
    for (let i = 0; i < 10; i++) {
        //这里循环十次
        await getFullCollectionReward();
        if ($.duckRes.code === '0') {
            if (!$.duckRes.hasLimit) {
                console.log(`小鸭子游戏:${$.duckRes.title}`);
                // if ($.duckRes.type !== 3) {
                //   console.log(`${$.duckRes.title}`);
                //   if ($.duckRes.type === 1) {
                //     message += `【小鸭子】为你带回了水滴\n`;
                //   } else if ($.duckRes.type === 2) {
                //     message += `【小鸭子】为你带回快速浇水卡\n`
                //   }
                // }
            } else {
                console.log(`${$.duckRes.title}`)
                break;
            }
        } else if ($.duckRes.code === '10') {
            console.log(`小鸭子游戏达到上限`)
            break;
        }
    }
}

// 鸭子，点我有惊喜
async function getFullCollectionReward() {
    return new Promise(resolve => {
        const body = { "type": 2, "version": 6, "channel": 2 };
        $.post(taskUrl("getFullCollectionReward", body), (err, resp, data) => {
            try {
                if (err) {
                    console.log('\n东东农场: API查询请求失败 ‼️‼️');
                    console.log(JSON.stringify(err));
                    $.logErr(err);
                } else {
                    if (safeGet(data)) {
                        $.duckRes = JSON.parse(data);
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

async function browserForTurntableFarm(type, adId) {
    if (type === 1) {
        console.log('浏览爆品会场');
    }
    if (type === 2) {
        console.log('天天抽奖浏览任务领取水滴');
    }
    const body = { "type": type, "adId": adId, "version": 4, "channel": 1 };
    $.browserForTurntableFarmRes = await request(arguments.callee.name.toString(), body);
    // 浏览爆品会场8秒
}

/**
 * 天天抽奖拿好礼-助力API(每人每天三次助力机会)
 */
async function lotteryMasterHelp() {
    $.lotteryMasterHelpRes = await request(`initForFarm`, {
        imageUrl: "",
        nickName: "",
        shareCode: arguments[0] + '-3',
        babelChannel: "3",
        version: 4,
        channel: 1
    });
}

//天天抽奖浏览任务领取水滴API
async function browserForTurntableFarm2(type) {
    const body = { "type": 2, "adId": type, "version": 4, "channel": 1 };
    $.browserForTurntableFarm2Res = await request('browserForTurntableFarm', body);
}

// 助力好友API
async function masterHelp() {
    $.helpResult = await request(`initForFarm`, {
        imageUrl: "",
        nickName: "",
        shareCode: arguments[0],
        babelChannel: "3",
        version: 2,
        channel: 1
    });
}


/**
 * 初始化农场, 可获取果树及用户信息API
 */
async function initForFarm() {
    return new Promise(resolve => {
        const option = {
            url: `${JD_API_HOST}?functionId=initForFarm`,
            body: `body=${escape(JSON.stringify({ "version": 14 }))}&appid=wh5&clientVersion=9.1.0`,
            headers: {
                "accept": "*/*",
                "accept-encoding": "gzip, deflate, br",
                "accept-language": "zh-CN,zh;q=0.9",
                "cache-control": "no-cache",
                "cookie": cookie,
                "origin": "https://home.m.jd.com",
                "pragma": "no-cache",
                "referer": "https://home.m.jd.com/myJd/newhome.action",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site",
                "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
                "Content-Type": "application/x-www-form-urlencoded"
            },
            timeout: 10000,
        };
        $.post(option, (err, resp, data) => {
            try {
                if (err) {
                    console.log('\n东东农场: API查询请求失败 ‼️‼️');
                    console.log(JSON.stringify(err));
                    $.logErr(err);
                } else {
                    if (safeGet(data)) {
                        $.farmInfo = JSON.parse(data)
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

async function showMsg() {
    if ($.isNode() && process.env.FRUIT_NOTIFY_CONTROL) {
        $.ctrTemp = `${process.env.FRUIT_NOTIFY_CONTROL}` === 'false';
    } else if ($.getdata('jdFruitNotify')) {
        $.ctrTemp = $.getdata('jdFruitNotify') === 'false';
    } else {
        $.ctrTemp = `${jdNotify}` === 'false';
    }
    if ($.ctrTemp) {
        $.msg($.name, subTitle, message, option);
        if ($.isNode()) {
            allMessage += `${subTitle}\n${message}${$.index !== cookiesArr.length ? '\n\n' : ''}`;
            // await notify.sendNotify(`${$.name} - 账号${$.index} - ${$.nickName}`, `${subTitle}\n${message}`);
        }
    } else {
        $.log(`\n${message}\n`);
    }
}

function timeFormat(time) {
    let date;
    if (time) {
        date = new Date(time)
    } else {
        date = new Date();
    }
    return date.getFullYear() + '-' + ((date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)) + '-' + (date.getDate() >= 10 ? date.getDate() : '0' + date.getDate());
}

function readShareCode() {
    return new Promise(async resolve => {
        $.get({url: `https://api.jdsharecode.xyz/api/farm/${randomCount}`, timeout: 10000,}, (err, resp, data) => {
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

function requireConfig() {
    return new Promise(resolve => {
        console.log('开始获取配置文件\n')
        notify = $.isNode() ? require('./sendNotify') : '';
        //Node.js用户请在jdCookie.js处填写京东ck;
        const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
        // const jdFruitShareCodes = $.isNode() ? require('./jdFruitShareCodes.js') : '';
        //IOS等用户直接用NobyDa的jd cookie
        if ($.isNode()) {
            Object.keys(jdCookieNode).forEach((item) => {
                if (jdCookieNode[item]) {
                    cookiesArr.push(jdCookieNode[item])
                }
            })
            if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => { };
        } else {
            cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
        }
        console.log(`共${cookiesArr.length}个京东账号\n`)
        // $.shareCodesArr = [];
        // console.log(`您提供了${$.shareCodesArr.length}个账号的农场助力码\n`);
        resolve()
    })
}

function TotalBean() {
    return new Promise(async resolve => {
        const options = {
            url: "https://me-api.jd.com/user_new/info/GetJDUserInfoUnion",
            headers: {
                Host: "me-api.jd.com",
                Accept: "*/*",
                Connection: "keep-alive",
                Cookie: cookie,
                "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
                "Accept-Language": "zh-cn",
                "Referer": "https://home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&",
                "Accept-Encoding": "gzip, deflate, br"
            }
        }
        $.get(options, (err, resp, data) => {
            try {
                if (err) {
                    $.logErr(err)
                } else {
                    if (data) {
                        data = JSON.parse(data);
                        if (data['retcode'] === "1001") {
                            $.isLogin = false; //cookie过期
                            return;
                        }
                        if (data['retcode'] === "0" && data.data && data.data.hasOwnProperty("userInfo")) {
                            $.nickName = data.data.userInfo.baseInfo.nickname;
                        }
                    } else {
                        $.log('京东服务器返回空数据');
                    }
                }
            } catch (e) {
                $.logErr(e)
            } finally {
                resolve();
            }
        })
    })
}

function request(function_id, body = {}, timeout = 1000) {
    return new Promise(resolve => {
        setTimeout(() => {
            $.get(taskUrl(function_id, body), (err, resp, data) => {
                try {
                    if (err) {
                        console.log('\n东东农场: API查询请求失败 ‼️‼️')
                        console.log(JSON.stringify(err));
                        console.log(`function_id:${function_id}`)
                        $.logErr(err);
                    } else {
                        if (safeGet(data)) {
                            data = JSON.parse(data);
                        }
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve(data);
                }
            })
        }, timeout)
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

function taskUrl(function_id, body = {}) {
    return {
        url: `${JD_API_HOST}?functionId=${function_id}&body=${encodeURIComponent(JSON.stringify(body))}&appid=wh5`,
        headers: {
            "Host": "api.m.jd.com",
            "Accept": "*/*",
            "Origin": "https://carry.m.jd.com",
            "Accept-Encoding": "gzip, deflate, br",
            "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
            "Accept-Language": "zh-CN,zh-Hans;q=0.9",
            "Referer": "https://carry.m.jd.com/",
            "Cookie": cookie
        },
        timeout: 10000
    }
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

// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
