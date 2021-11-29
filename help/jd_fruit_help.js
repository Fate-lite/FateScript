/*
东东水果:脚本更新地址 jd_fruit_help.js
更新时间：2021-11-7
活动入口：京东APP我的-更多工具-东东农场

0 0 * * * jd_fruit_help.js
=========================Loon=============================
*/
const $ = new Env('东东农场互助');
let cookiesArr = [], cookie = '', jdFruitShareArr = [], isBox = false, notify, newShareCodes, allMessage = '';
//助力好友分享码(最多3个,否则后面的助力失败),原因:京东农场每人每天只有3次助力机会
//此此内容是IOS用户下载脚本到本地使用，填写互助码的地方，同一京东账号的好友互助码请使用@符号隔开。
//下面给出两个账号的填写示例（iOS只支持2个京东账号）

let shareCodes = ["40cf6440db1943e2a9d1a6ae28366100","948da82d3b0b44dcbad90353cd177408","31c5eed3c8b4448ca04db3a04ffe6d21","ace5af81ef034576bcd5b3b42dee37b9","28c8d02f8f1848538103068925a2f9f2","bc51cef8da954eca99cf8684c3cd6d51","74bd01f2678944e8aae61c0e87905633","87c1338b66e84879b2c94c1b069f775b","7ab9cc3847b84a3eb43063c41950022c","077f44caec524b829764f25a1fe36231","30a40de0601c4c2386ab5cae5dbcabf4","3e9557b5f3734f42925b8c1312d14fe4","2af2fd5d4b814eed9bbe85ee0c4d846c","237a88f44a9d4e158fa5a1d4fa3139eb","b4b0e13e9c2d4a118d11e1986ab71913","0580e4bae4314fe7ba8c8164f7506f55","c85dff36024346f48c4555657996b4b8","6e07ee2071a446498f872fd61a39d987","6864df95c9454bf9b4e3c368ec445a9f","c42cde24eb0b461497a9082cf96eeceb","c3dbab40f7fe438aade22208734ffc0a","370d43a50c4a45a0bdc112746faf2632","b2992c3b6e5e4b5b9bca438bf8381900","943ee9838acd4210af935fac0aec6101","e5be359a14674498b47dfe2b4bd9c0ea","2be52f1c1ab44eb3be82af0da10d0c32","f3e3e58bcbdc49a5bd7a6ddc72d71806","22a42f660a74403690740d98a7a8a6b8","e6e86649ebe94965aef2f849fd916c75","b2337adeefd14943aca31869b42c79f1","4df59c4af323450fa324c539bae6cef6","8dac1466c371488f90d943ddd8509702","d1fbedc210bd4f88b8e4506f0e7f4be1","c578ef4edad0483ea4f3655288ea31dd","b7fbcca039f94698a9eaae7634202c08","e14774ead3614176ab059778cf8449a3","4d010ace5ae0473eb2db18c4255b30ec","27ca32bd0163495ab338dbbe3d94b68d","4c2790c1818d46b5b448c470b56b4632","89eff712dee44cf6a1235181609822af"];

let message = '', subTitle = '', option = {}, isFruitFinished = false;
const retainWater = 0;//保留水滴大于多少g,默认100g;
let jdNotify = false;//是否关闭通知，false打开通知推送，true关闭通知推送
let jdFruitBeanCard = false;//农场使用水滴换豆卡(如果出现限时活动时100g水换20豆,此时比浇水划算,推荐换豆),true表示换豆(不浇水),false表示不换豆(继续浇水),脚本默认是浇水
let randomCount = $.isNode() ? 20 : 5;
const JD_API_HOST = 'https://api.m.jd.com/client.action';
const urlSchema = `openjd://virtual?params=%7B%20%22category%22:%20%22jump%22,%20%22des%22:%20%22m%22,%20%22url%22:%20%22https://h5.m.jd.com/babelDiy/Zeus/3KSjXqQabiTuD1cJ28QskrpWoBKT/index.html%22%20%7D`;
!(async () => {
    await requireConfig();
    if (!cookiesArr[0]) {
        $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});
        return;
    }
    for (let i = 0; i < cookiesArr.length; i++) {
        if (cookiesArr[i]) {
            cookie = cookiesArr[i];
            $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
            $.index = i + 1;
            $.isLogin = true;
            $.nickName = '';
            await TotalBean();
            console.log(`\n开始【京东账号${$.index}】${$.nickName || $.UserName}\n`);
            if (!$.isLogin) {
                $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});

                if ($.isNode()) {
                    await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
                }
                continue
            }
            message = '';
            subTitle = '';
            option = {};
            await shareCodesFormat();
            await jdFruit();
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
async function jdFruit() {
    subTitle = `【京东账号${$.index}】${$.nickName || $.UserName}`;
    try {
        await initForFarm();
        if ($.farmInfo.farmUserPro) {
            message = `【水果名称】${$.farmInfo.farmUserPro.name}\n`;
            console.log(`\n【京东账号${$.index}（${$.UserName}）的${$.name}好友互助码】${$.farmInfo.farmUserPro.shareCode}\n`);
            await submitCode();
            console.log(`\n【已成功兑换水果】${$.farmInfo.farmUserPro.winTimes}次\n`);
            message += `【已兑换水果】${$.farmInfo.farmUserPro.winTimes}次\n`;
            await masterHelpShare();//助力好友
            if ($.farmInfo.treeState === 2 || $.farmInfo.treeState === 3) {
                option['open-url'] = urlSchema;
                $.msg($.name, ``, `【京东账号${$.index}】${$.nickName || $.UserName}\n【提醒⏰】${$.farmInfo.farmUserPro.name}已可领取\n请去京东APP或微信小程序查看\n点击弹窗即达`, option);
                if ($.isNode()) {
                    await notify.sendNotify(`${$.name} - 账号${$.index} - ${$.nickName || $.UserName}水果已可领取`, `【京东账号${$.index}】${$.nickName || $.UserName}\n【提醒⏰】${$.farmInfo.farmUserPro.name}已可领取\n请去京东APP或微信小程序查看`);
                }
                return
            } else if ($.farmInfo.treeState === 1) {
                console.log(`\n${$.farmInfo.farmUserPro.name}种植中...\n`)
            } else if ($.farmInfo.treeState === 0) {
                // 已下单购买, 但未开始种植新的水果
                option['open-url'] = urlSchema;
                $.msg($.name, ``, `【京东账号${$.index}】 ${$.nickName || $.UserName}\n【提醒⏰】您忘了种植新的水果\n请去京东APP或微信小程序选购并种植新的水果\n点击弹窗即达`, option);
                if ($.isNode()) {
                    await notify.sendNotify(`${$.name} - 您忘了种植新的水果`, `京东账号${$.index} ${$.nickName || $.UserName}\n【提醒⏰】您忘了种植新的水果\n请去京东APP或微信小程序选购并种植新的水果`);
                }
                return
            }
            await turntableFarm() //天天抽奖得好礼
        } else {
            console.log(`初始化农场数据异常, 请登录京东 app查看农场0元水果功能是否正常,农场初始化数据: ${JSON.stringify($.farmInfo)}`);
            message = `【数据异常】请手动登录京东app查看此账号${$.name}是否正常`;
        }
    } catch (e) {
        console.log(`任务执行异常，请检查执行日志 ‼️‼️`);
        $.logErr(e);
        const errMsg = `京东账号${$.index} ${$.nickName || $.UserName}\n任务执行异常，请检查执行日志 ‼️‼️`;
        if ($.isNode()) await notify.sendNotify(`${$.name}`, errMsg);
        $.msg($.name, '', `${errMsg}`)
    }
    await showMsg();
}

//天天抽奖活动
async function turntableFarm() {
    await initForTurntableFarm();
    if ($.initForTurntableFarmRes.code === '0') {
        //领取定时奖励 //4小时一次
        let {timingIntervalHours, timingLastSysTime, sysTime, timingGotStatus, remainLotteryTimes, turntableInfos} = $.initForTurntableFarmRes;

        if (!timingGotStatus) {
            console.log(`是否到了领取免费赠送的抽奖机会----${sysTime > (timingLastSysTime + 60*60*timingIntervalHours*1000)}`)
            if (sysTime > (timingLastSysTime + 60*60*timingIntervalHours*1000)) {
                await timingAwardForTurntableFarm();
                console.log(`领取定时奖励结果${JSON.stringify($.timingAwardRes)}`);
                await initForTurntableFarm();
                remainLotteryTimes = $.initForTurntableFarmRes.remainLotteryTimes;
            } else {
                console.log(`免费赠送的抽奖机会未到时间`)
            }
        } else {
            console.log('4小时候免费赠送的抽奖机会已领取')
        }
        if ($.initForTurntableFarmRes.turntableBrowserAds && $.initForTurntableFarmRes.turntableBrowserAds.length > 0) {
            for (let index = 0; index < $.initForTurntableFarmRes.turntableBrowserAds.length; index++) {
                if (!$.initForTurntableFarmRes.turntableBrowserAds[index].status) {
                    console.log(`开始浏览天天抽奖的第${index + 1}个逛会场任务`)
                    await browserForTurntableFarm(1, $.initForTurntableFarmRes.turntableBrowserAds[index].adId);
                    if ($.browserForTurntableFarmRes.code === '0' && $.browserForTurntableFarmRes.status) {
                        console.log(`第${index + 1}个逛会场任务完成，开始领取水滴奖励\n`)
                        await browserForTurntableFarm(2, $.initForTurntableFarmRes.turntableBrowserAds[index].adId);
                        if ($.browserForTurntableFarmRes.code === '0') {
                            console.log(`第${index + 1}个逛会场任务领取水滴奖励完成\n`)
                            await initForTurntableFarm();
                            remainLotteryTimes = $.initForTurntableFarmRes.remainLotteryTimes;
                        }
                    }
                } else {
                    console.log(`浏览天天抽奖的第${index + 1}个逛会场任务已完成`)
                }
            }
        }
        //天天抽奖助力
        console.log('开始天天抽奖--好友助力--每人每天只有三次助力机会.')
        for (let code of newShareCodes) {
            if (code === $.farmInfo.farmUserPro.shareCode) {
                console.log('天天抽奖-不能自己给自己助力\n')
                continue
            }
            await lotteryMasterHelp(code);
            // console.log('天天抽奖助力结果',lotteryMasterHelpRes.helpResult)
            if ($.lotteryMasterHelpRes.helpResult.code === '0') {
                console.log(`天天抽奖-助力${$.lotteryMasterHelpRes.helpResult.masterUserInfo.nickName}成功\n`)
            } else if ($.lotteryMasterHelpRes.helpResult.code === '11') {
                console.log(`天天抽奖-不要重复助力${$.lotteryMasterHelpRes.helpResult.masterUserInfo.nickName}\n`)
            } else if ($.lotteryMasterHelpRes.helpResult.code === '13') {
                console.log(`天天抽奖-助力${$.lotteryMasterHelpRes.helpResult.masterUserInfo.nickName}失败,助力次数耗尽\n`);
                break;
            }
        }
        console.log(`---天天抽奖次数remainLotteryTimes----${remainLotteryTimes}次`)
        //抽奖
        if (remainLotteryTimes > 0) {
            console.log('开始抽奖')
            let lotteryResult = '';
            for (let i = 0; i < new Array(remainLotteryTimes).fill('').length; i++) {
                await lotteryForTurntableFarm()
                console.log(`第${i + 1}次抽奖结果${JSON.stringify($.lotteryRes)}`);
                if ($.lotteryRes.code === '0') {
                    turntableInfos.map((item) => {
                        if (item.type === $.lotteryRes.type) {
                            console.log(`lotteryRes.type${$.lotteryRes.type}`);
                            if ($.lotteryRes.type.match(/bean/g) && $.lotteryRes.type.match(/bean/g)[0] === 'bean') {
                                lotteryResult += `${item.name}个，`;
                            } else if ($.lotteryRes.type.match(/water/g) && $.lotteryRes.type.match(/water/g)[0] === 'water') {
                                lotteryResult += `${item.name}，`;
                            } else {
                                lotteryResult += `${item.name}，`;
                            }
                        }
                    })
                    //没有次数了
                    if ($.lotteryRes.remainLotteryTimes === 0) {
                        break
                    }
                }
            }
            if (lotteryResult) {
                console.log(`【天天抽奖】${lotteryResult.substr(0, lotteryResult.length - 1)}\n`)
                // message += `【天天抽奖】${lotteryResult.substr(0, lotteryResult.length - 1)}\n`;
            }
        }  else {
            console.log('天天抽奖--抽奖机会为0次')
        }
    } else {
        console.log('初始化天天抽奖得好礼失败')
    }
}

//助力好友
async function masterHelpShare() {
    console.log('开始助力好友')
    let salveHelpAddWater = 0;
    let remainTimes = 3;//今日剩余助力次数,默认3次（京东农场每人每天3次助力机会）。
    let helpSuccessPeoples = '';//成功助力好友
    console.log(`格式化后的助力码::${JSON.stringify(newShareCodes)}\n`);

    for (let code of newShareCodes) {
        console.log(`开始助力京东账号${$.index} - ${$.nickName || $.UserName}的好友: ${code}`);
        if (!code) continue;
        if (code === $.farmInfo.farmUserPro.shareCode) {
            console.log('不能为自己助力哦，跳过自己的shareCode\n')
            continue
        }
        await masterHelp(code);
        if ($.helpResult.code === '0') {
            if ($.helpResult.helpResult.code === '0') {
                //助力成功
                salveHelpAddWater += $.helpResult.helpResult.salveHelpAddWater;
                console.log(`【助力好友结果】: 已成功给【${$.helpResult.helpResult.masterUserInfo.nickName}】助力`);
                console.log(`给好友【${$.helpResult.helpResult.masterUserInfo.nickName}】助力获得${$.helpResult.helpResult.salveHelpAddWater}g水滴`)
                helpSuccessPeoples += ($.helpResult.helpResult.masterUserInfo.nickName || '匿名用户') + ',';
            } else if ($.helpResult.helpResult.code === '8') {
                console.log(`【助力好友结果】: 助力【${$.helpResult.helpResult.masterUserInfo.nickName}】失败，您今天助力次数已耗尽`);
            } else if ($.helpResult.helpResult.code === '9') {
                console.log(`【助力好友结果】: 之前给【${$.helpResult.helpResult.masterUserInfo.nickName}】助力过了`);
            } else if ($.helpResult.helpResult.code === '10') {
                console.log(`【助力好友结果】: 好友【${$.helpResult.helpResult.masterUserInfo.nickName}】已满五人助力`);
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
        }
    }
    if ($.isLoon() || $.isQuanX() || $.isSurge()) {
        let helpSuccessPeoplesKey = timeFormat() + $.farmInfo.farmUserPro.shareCode;
        if (!$.getdata(helpSuccessPeoplesKey)) {
            //把前一天的清除
            $.setdata('', timeFormat(Date.now() - 24 * 60 * 60 * 1000) + $.farmInfo.farmUserPro.shareCode);
            $.setdata('', helpSuccessPeoplesKey);
        }
        if (helpSuccessPeoples) {
            if ($.getdata(helpSuccessPeoplesKey)) {
                $.setdata($.getdata(helpSuccessPeoplesKey) + ',' + helpSuccessPeoples, helpSuccessPeoplesKey);
            } else {
                $.setdata(helpSuccessPeoples, helpSuccessPeoplesKey);
            }
        }
        helpSuccessPeoples = $.getdata(helpSuccessPeoplesKey);
    }
    if (helpSuccessPeoples && helpSuccessPeoples.length > 0) {
        message += `【您助力的好友👬】${helpSuccessPeoples.substr(0, helpSuccessPeoples.length - 1)}\n`;
    }
    if (salveHelpAddWater > 0) {
        // message += `【助力好友👬】获得${salveHelpAddWater}g💧\n`;
        console.log(`【助力好友👬】获得${salveHelpAddWater}g💧\n`);
    }
    message += `【今日剩余助力👬】${remainTimes}次\n`;
    console.log('助力好友结束，即将开始领取额外水滴奖励\n');
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
// ========================API调用接口========================
//鸭子，点我有惊喜
async function getFullCollectionReward() {
    return new Promise(resolve => {
        const body = {"type": 2, "version": 6, "channel": 2};
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


// 初始化集卡抽奖活动数据API
async function initForTurntableFarm() {
    $.initForTurntableFarmRes = await request(arguments.callee.name.toString(), {version: 4, channel: 1});
}
async function lotteryForTurntableFarm() {
    await $.wait(2000);
    console.log('等待了2秒');
    $.lotteryRes = await request(arguments.callee.name.toString(), {type: 1, version: 4, channel: 1});
}

async function timingAwardForTurntableFarm() {
    $.timingAwardRes = await request(arguments.callee.name.toString(), {version: 4, channel: 1});
}

async function browserForTurntableFarm(type, adId) {
    if (type === 1) {
        console.log('浏览爆品会场');
    }
    if (type === 2) {
        console.log('天天抽奖浏览任务领取水滴');
    }
    const body = {"type": type,"adId": adId,"version":4,"channel":1};
    $.browserForTurntableFarmRes = await request(arguments.callee.name.toString(), body);
    // 浏览爆品会场8秒
}
//天天抽奖浏览任务领取水滴API
async function browserForTurntableFarm2(type) {
    const body = {"type":2,"adId": type,"version":4,"channel":1};
    $.browserForTurntableFarm2Res = await request('browserForTurntableFarm', body);
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

//领取5人助力后的额外奖励API
async function masterGotFinishedTaskForFarm() {
    const functionId = arguments.callee.name.toString();
    $.masterGotFinished = await request(functionId);
}
//助力好友信息API
async function masterHelpTaskInitForFarm() {
    const functionId = arguments.callee.name.toString();
    $.masterHelpResult = await request(functionId);
}
//新版助力好友信息API
async function farmAssistInit() {
    const functionId = arguments.callee.name.toString();
    $.farmAssistResult = await request(functionId, {"version":14,"channel":1,"babelChannel":"120"});
}
//新版领取助力奖励API
async function receiveStageEnergy() {
    const functionId = arguments.callee.name.toString();
    $.receiveStageEnergy = await request(functionId, {"version":14,"channel":1,"babelChannel":"120"});
}
//接受对方邀请,成为对方好友的API
async function inviteFriend() {
    $.inviteFriendRes = await request(`initForFarm`, {
        imageUrl: "",
        nickName: "",
        shareCode: arguments[0] + '-inviteFriend',
        version: 4,
        channel: 2
    });
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
 * 水滴雨API
 */
async function waterRainForFarm() {
    const functionId = arguments.callee.name.toString();
    const body = {"type": 1, "hongBaoTimes": 100, "version": 3};
    $.waterRain = await request(functionId, body);
}
/**
 * 打卡领水API
 */
async function clockInInitForFarm() {
    const functionId = arguments.callee.name.toString();
    $.clockInInit = await request(functionId);
}

// 连续签到API
async function clockInForFarm() {
    const functionId = arguments.callee.name.toString();
    $.clockInForFarmRes = await request(functionId, {"type": 1});
}

//关注，领券等API
async function clockInFollowForFarm(id, type, step) {
    const functionId = arguments.callee.name.toString();
    let body = {
        id,
        type,
        step
    }
    if (type === 'theme') {
        if (step === '1') {
            $.themeStep1 = await request(functionId, body);
        } else if (step === '2') {
            $.themeStep2 = await request(functionId, body);
        }
    } else if (type === 'venderCoupon') {
        if (step === '1') {
            $.venderCouponStep1 = await request(functionId, body);
        } else if (step === '2') {
            $.venderCouponStep2 = await request(functionId, body);
        }
    }
}

// 领取连续签到7天的惊喜礼包API
async function gotClockInGift() {
    $.gotClockInGiftRes = await request('clockInForFarm', {"type": 2})
}

//定时领水API
async function gotThreeMealForFarm() {
    const functionId = arguments.callee.name.toString();
    $.threeMeal = await request(functionId);
}
/**
 * 浏览广告任务API
 * type为0时, 完成浏览任务
 * type为1时, 领取浏览任务奖励
 */
async function browseAdTaskForFarm(advertId, type) {
    const functionId = arguments.callee.name.toString();
    if (type === 0) {
        $.browseResult = await request(functionId, {advertId, type});
    } else if (type === 1) {
        $.browseRwardResult = await request(functionId, {advertId, type});
    }
}
// 被水滴砸中API
async function gotWaterGoalTaskForFarm() {
    $.goalResult = await request(arguments.callee.name.toString(), {type: 3});
}
//签到API
async function signForFarm() {
    const functionId = arguments.callee.name.toString();
    $.signResult = await request(functionId);
}
/**
 * 初始化农场, 可获取果树及用户信息API
 */
async function initForFarm() {
    return new Promise(resolve => {
        const option =  {
            url: `${JD_API_HOST}?functionId=initForFarm`,
            body: `body=${escape(JSON.stringify({"version":4}))}&appid=wh5&clientVersion=9.1.0`,
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

// 初始化任务列表API
async function taskInitForFarm() {
    console.log('\n初始化任务列表')
    const functionId = arguments.callee.name.toString();
    $.farmTask = await request(functionId, {"version":14,"channel":1,"babelChannel":"120"});
}
//获取好友列表API
async function friendListInitForFarm() {
    $.friendList = await request('friendListInitForFarm', {"version": 4, "channel": 1});
    // console.log('aa', aa);
}
// 领取邀请好友的奖励API
async function awardInviteFriendForFarm() {
    $.awardInviteFriendRes = await request('awardInviteFriendForFarm');
}
//为好友浇水API
async function waterFriendForFarm(shareCode) {
    const body = {"shareCode": shareCode, "version": 6, "channel": 1}
    $.waterFriendForFarmRes = await request('waterFriendForFarm', body);
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
            // await notify.sendNotify(`${$.name} - 账号${$.index} - ${$.nickName || $.UserName}`, `${subTitle}\n${message}`);
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

//提交互助码
function submitCode() {
    return new Promise(async resolve => {
        $.get({url: `http://www.helpu.cf/jdcodes/submit.php?code=${$.farmInfo.farmUserPro.shareCode}&type=farm`, timeout: 10000}, (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if (data) {
                        //console.log(`随机取个${randomCount}码放到您固定的互助码后面(不影响已有固定互助)`)
                        data = JSON.parse(data);
                        if (data.code === 300) {
                            console.log(`🐔东东农场-互助码已提交！🐔`);
                        }else if (data.code === 200) {
                            console.log(`🐔东东农场-互助码提交成功！🐔`);
                        }
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data || {"code":500});
            }
        })
        await $.wait(10000);
        resolve({"code":500})
    })
}
function shareCodesFormat() {
    return new Promise(async resolve => {
        // console.log(`第${$.index}个京东账号的助力码:::${$.shareCodesArr[$.index - 1]}`)
        newShareCodes = [];
        if ($.shareCodesArr[$.index - 1]) {
            newShareCodes = $.shareCodesArr[$.index - 1].split('@');
        } else {
            console.log(`由于您第${$.index}个京东账号未提供shareCode,将采纳本脚本自带的助力码\n`)
            const tempIndex = $.index > shareCodes.length ? (shareCodes.length - 1) : ($.index - 1);
            newShareCodes = shareCodes[tempIndex].split('@');
        }
        console.log(`第${$.index}个京东账号将要助力的好友${JSON.stringify(newShareCodes)}`)
        resolve();
    })
}
function requireConfig() {
    return new Promise(resolve => {
        console.log('开始获取配置文件\n')
        notify = $.isNode() ? require('./sendNotify') : '';
        //Node.js用户请在jdCookie.js处填写京东ck;
        const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
        const jdFruitShareCodes = $.isNode() ? require('./jdFruitShareCodes.js') : '';
        //IOS等用户直接用NobyDa的jd cookie
        if ($.isNode()) {
            Object.keys(jdCookieNode).forEach((item) => {
                if (jdCookieNode[item]) {
                    cookiesArr.push(jdCookieNode[item])
                }
            })
            if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
        } else {
            cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
        }
        console.log(`共${cookiesArr.length}个京东账号\n`)
        $.shareCodesArr = [];
        if ($.isNode()) {
            Object.keys(jdFruitShareCodes).forEach((item) => {
                if (jdFruitShareCodes[item]) {
                    $.shareCodesArr.push(jdFruitShareCodes[item])
                }
            })
        } else {
            if ($.getdata('jd_fruit_inviter')) $.shareCodesArr = $.getdata('jd_fruit_inviter').split('\n').filter(item => !!item);
            console.log(`\nBoxJs设置的${$.name}好友邀请码:${$.getdata('jd_fruit_inviter') ? $.getdata('jd_fruit_inviter') : '暂无'}\n`);
        }
        // console.log(`$.shareCodesArr::${JSON.stringify($.shareCodesArr)}`)
        // console.log(`jdFruitShareArr账号长度::${$.shareCodesArr.length}`)
        console.log(`您提供了${$.shareCodesArr.length}个账号的农场助力码\n`);
        resolve()
    })
}
function TotalBean() {
    return new Promise(async resolve => {
        const options = {
            "url": `https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2`,
            "headers": {
                "Accept": "application/json,text/plain, */*",
                "Content-Type": "application/x-www-form-urlencoded",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "zh-cn",
                "Connection": "keep-alive",
                "Cookie": cookie,
                "Referer": "https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2",
                "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1")
            }
        }
        $.post(options, (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if (data) {
                        data = JSON.parse(data);
                        if (data['retcode'] === 13) {
                            $.isLogin = false; //cookie过期
                            return
                        }
                        if (data['retcode'] === 0 && data.base && data.base.nickname) {
                            $.nickName = data.base.nickname;
                        }
                    } else {
                        console.log(`京东服务器返回空数据`)
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
function request(function_id, body = {}, timeout = 1000){
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
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
