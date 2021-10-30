/**
 * 京喜牧场红包助力
 * cron: 0 0 * * * jd_jxmc_fast.ts
 */

import axios from 'axios'
import {Md5} from "ts-md5"
import * as path from 'path'
import {sendNotify} from './sendNotify'
import {
    requireConfig,
    getBeanShareCode,
    getFarmShareCode,
    wait,
    requestAlgo,
    h5st,
    exceptCookie,
    resetHosts,
    randomString
} from './TS_USER_AGENTS'

const cow = require('./utils/jd_jxmc.js').cow
const token = require('./utils/jd_jxmc.js').token

let cookie: string = '', res: any = '', shareCodes: string[] = [], homePageInfo: any, jxToken: any, UserName: string,
    index: number
let shareCodesHbSelf: string[] = [], shareCodesHbHw: string[] = [], shareCodesSelf: string[] = [],
    shareCodesHW: string[] = []

!(async () => {
    try {
        resetHosts()
    } catch (e) {
    }
    await requestAlgo()
    let cookiesArr: any = await requireConfig()
    if (process.argv[2]) {
        console.log('收到命令行cookie')
        cookiesArr = [unescape(process.argv[2])]
    }
    let except: string[] = exceptCookie(path.basename(__filename))

    for (let i = 0; i < cookiesArr.length; i++) {
        cookie = cookiesArr[i]
        UserName = decodeURIComponent(cookie.match(/pt_pin=([^;]*)/)![1])
        index = i + 1
        console.log(`\n开始【京东账号${index}】${UserName}\n`)
        if (except.includes(encodeURIComponent(UserName))) {
            console.log('已设置跳过')
            continue
        }
        jxToken = await token(cookie)
        homePageInfo = await api('queryservice/GetHomePageInfo', 'activeid,activekey,channel,isgift,isqueryinviteicon,isquerypicksite,jxmc_jstoken,phoneid,sceneid,timestamp', {
            isgift: 1,
            isquerypicksite: 1,
            isqueryinviteicon: 1
        })
        if (homePageInfo.data.maintaskId !== 'pause') {
            console.log('init...')
            for (let j = 0; j < 20; j++) {
                res = await api('operservice/DoMainTask', 'activeid,activekey,channel,jxmc_jstoken,phoneid,sceneid,step,timestamp', {step: homePageInfo.data.maintaskId})
                if (res.data.maintaskId === 'pause')
                    break
                await wait(2000)
            }
        }
        homePageInfo = await api('queryservice/GetHomePageInfo', 'activeid,activekey,channel,isgift,isqueryinviteicon,isquerypicksite,jxmc_jstoken,phoneid,sceneid,timestamp', {
            isgift: 1,
            isquerypicksite: 1,
            isqueryinviteicon: 1
        })
        let lastgettime: number
        if (homePageInfo.data?.cow?.lastgettime) {
            lastgettime = homePageInfo.data.cow.lastgettime
        } else {
            continue
        }
        let food: number = 0
        try {
            food = homePageInfo.data.materialinfo[0].value
        } catch (e: any) {
            console.log('未开通？黑号？')
            continue
        }
        if (homePageInfo && homePageInfo.data.sharekey != undefined)){
            console.log('助力码:', homePageInfo.data.sharekey)
            shareCodesSelf.push(homePageInfo.data.sharekey)
            try {
                await makeShareCodes(homePageInfo.data.sharekey)
            } catch (e: any) {
                console.log(e)
            }
        }

        // 红包
        res = await api('operservice/GetInviteStatus', 'activeid,activekey,channel,jxmc_jstoken,phoneid,sceneid,timestamp')
        console.log('红包助力:', res.data.sharekey)
        if (res && res.data.sharekey != undefined){
            shareCodesHbSelf.push(res.data.sharekey)
            try {
                await makeShareCodesHb(res.data.sharekey)
            } catch (e: any) {
            }
        }

    }
    for (let i = 0; i < cookiesArr.length; i++) {
        await getCodes()
        // 获取随机红包码
        shareCodes = Array.from(new Set([...shareCodesHbSelf]))
        cookie = cookiesArr[i]
        jxToken = await token(cookie)
        for (let j = 0; j < shareCodes.length; j++) {
            console.log(`账号${i + 1}去助力${shareCodes[j]}`)
            res = await api('operservice/InviteEnroll', 'activeid,activekey,channel,jxmc_jstoken,phoneid,sceneid,sharekey,timestamp', {sharekey: shareCodes[j]})
            if (res.ret === 0) {
                console.log('成功')
            } else if (res.ret === 2711) {
                console.log('上限')
                break
            } else {
                console.log('失败：', res)
            }
            await wait(8000)
        }
    }
})()

interface Params {
    isgift?: number,
    isquerypicksite?: number,
    petid?: string,
    itemid?: string,
    type?: string,
    taskId?: number
    configExtra?: string,
    sharekey?: string,
    currdate?: string,
    token?: string,
    isqueryinviteicon?: number,
    showAreaTaskFlag?: number,
    jxpp_wxapp_type?: number,
    dateType?: string,
    step?: string,
}

async function getTask() {
    console.log('刷新任务列表')
    res = await api('GetUserTaskStatusList', 'bizCode,dateType,jxpp_wxapp_type,showAreaTaskFlag,source', {
        dateType: '',
        showAreaTaskFlag: 0,
        jxpp_wxapp_type: 7
    })
    for (let t of res.data.userTaskStatusList) {
        if (t.completedTimes == t.targetTimes && t.awardStatus === 2) {
            res = await api('Award', 'bizCode,source,taskId', {taskId: t.taskId})
            if (res.ret === 0) {
                let awardCoin = res.data.prizeInfo.match(/:(.*)}/)![1] * 1
                console.log('领奖成功:', awardCoin)
                await wait(4000)
                return 1
            } else {
                console.log('领奖失败:', res)
                return 0
            }
        }

        if (t.dateType === 2 && t.completedTimes < t.targetTimes && t.awardStatus === 2 && t.taskType === 2) {
            res = await api('DoTask', 'bizCode,configExtra,source,taskId', {taskId: t.taskId, configExtra: ''})
            if (res.ret === 0) {
                console.log('任务完成')
                await wait(5000)
                return 1
            } else {
                console.log('任务失败:', res)
                return 0
            }
        }
    }
    return 0
}

async function api(fn: string, stk: string, params: Params = {}) {
    let url: string
    if (['GetUserTaskStatusList', 'DoTask', 'Award'].indexOf(fn) > -1) {
        url = h5st(`https://m.jingxi.com/newtasksys/newtasksys_front/${fn}?_=${Date.now()}&source=jxmc&bizCode=jxmc&_stk=${encodeURIComponent(stk)}&_ste=1&sceneval=2`, stk, params, 10028)
    } else {
        url = h5st(`https://m.jingxi.com/jxmc/${fn}?channel=7&sceneid=1001&activeid=jxmc_active_0001&activekey=null&jxmc_jstoken=${jxToken['farm_jstoken']}&timestamp=${jxToken['timestamp']}&phoneid=${jxToken['phoneid']}&_stk=${encodeURIComponent(stk)}&_ste=1&_=${Date.now() + 2}&sceneval=2`, stk, params, 10028)
    }
    try {
        let {data}: any = await axios.get(url, {
            headers: {
                'Host': 'm.jingxi.com',
                'User-Agent': `jdpingou;iPhone;5.9.0;12.4.1;${randomString(40)};network/wifi;`,
                'Referer': 'https://st.jingxi.com/pingou/jxmc/index.html',
                'Cookie': cookie
            }
        })
        if (typeof data === 'string')
            return JSON.parse(data.replace(/jsonpCBK.?\(/, '').split('\n')[0])
        return data
    } catch (e: any) {
        console.log('api Error:', e)
        return {}
    }
}

function makeShareCodes(code: string) {
    return new Promise(async (resolve, reject) => {
        let bean: string = await getBeanShareCode(cookie)
        let farm: string = await getFarmShareCode(cookie)
        let pin: string = cookie.match(/pt_pin=([^;]*)/)![1]
        pin = Md5.hashStr(pin)
        resetHosts()
        await axios.get(`https://api.jdsharecode.xyz/api/autoInsert/jxmc?sharecode=${code}&bean=${bean}&farm=${farm}&pin=${pin}`, {timeout: 10000})
            .then((res: any) => {
                if (res.data.code === 200)
                    console.log('已自动提交助力码')
                else
                    console.log('提交失败！已提交farm的cookie才可提交cfd')
                resolve(200)
            })
            .catch(() => {
                reject('访问助力池出错')
            })
    })
}

function makeShareCodesHb(code: string) {
    return new Promise(async (resolve, reject) => {
        let bean: string = await getBeanShareCode(cookie)
        let farm: string = await getFarmShareCode(cookie)
        let pin: string = cookie.match(/pt_pin=([^;]*)/)![1]
        pin = Md5.hashStr(pin)
        resetHosts()
        await axios.get(`https://api.jdsharecode.xyz/api/autoInsert/jxmchb?sharecode=${code}&bean=${bean}&farm=${farm}&pin=${pin}`, {timeout: 10000})
            .then((res: any) => {
                if (res.data.code === 200)
                    console.log('已自动提交红包码')
                else
                    console.log('提交失败！已提交farm的cookie才可提交cfd')
                resolve(200)
            })
            .catch(() => {
                reject('访问助力池出错')
            })
    })
}

async function getCodes() {
    try {
        let {data}: any = await axios.get('https://api.jdsharecode.xyz/api/HW_CODES')
        shareCodesHW = data.jxmc || []
        shareCodesHbHw = data.jxmchb || []
    } catch (e) {
    }
}
