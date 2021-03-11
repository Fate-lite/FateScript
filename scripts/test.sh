# 更新lxk0301大佬的js脚本，日志为log/git_pull.log
55 5-23 * * * bash git_pull >> /jd/log/git_pull.log 2>&1

# 删除 RmLogDaysAgo 指定天数以前的旧日志，本行为不记录日志
57 13 * * * bash rm_log >/dev/null 2>&1

# 导出所有互助码清单，日志在log/export_sharecodes下
48 5 * * * bash export_sharecodes

# 重启挂机脚本，挂机脚本可以随容器启动而启动，建议需要重启挂机程序时直接重启容器，如实在不想通过重启容器而重启挂机程序，可以解除下一行注释
#33 13 * * * bash jd hangup



# 运行lxk0301大佬的js脚本，仅列出长期任务作初始化用，AutoAddCron=true时，将自动添加短期任务。
# 请保留任务名称中的前缀"jd_"，去掉后缀".js"，如果有些任务你不想运行，注释掉就好了，不要删除。
# 非lxk0301/jd_scripts仓库中的脚本不能以“jd_”、“jr_”、“jx_”开头。请在最后保留一个空行。
#5 9 * * * bash jd jd_bean_change
#33 4 * * * bash jd jd_bean_home
#4 0,9 * * * bash jd jd_bean_sign
#0,30 0 * * * bash jd jd_blueCoin
#7 8,12,18 * * * bash jd jd_bookshop
#0 0 * * * bash jd jd_car
#0 0 * * * bash jd jd_car_exchange
#27 */4 * * * bash jd jd_cash
#15 */2 * * * bash jd jd_cfd
#0 0 * * * bash jd jd_club_lottery
#10 7,23 * * * bash jd jd_crazy_joy
#10 12 * * * bash jd jd_crazy_joy_bonus
#18 * * * * bash jd jd_daily_egg
##20 9 * * 6 bash jd jd_delCoupon
#20 * * * * bash jd jd_dreamFactory
## */20 * * * * bash jd jd_family
#20 6,7 * * * bash jd jd_family
#5 6-18/6 * * * bash jd jd_fruit
#47 7 * * * bash jd jd_get_share_code
#35 6,22 * * * bash jd jd_global
#5 7,12,23 * * * bash jd jd_global_mh
#36 * * * * bash jd jd_jdfactory
#10 11 * * * bash jd jd_jdzz
#47 0,9,10,23 * * * bash jd jd_joy
#20 */1 * * * bash jd jd_joy_feedPets
#0 0-16/8 * * * bash jd jd_joy_reward
##10 11 * * * bash jd jd_joy_run
#13 0-21/3 * * * bash jd jd_joy_steal
#23 5,23 * * * bash jd jd_jxd
#0 9,12,18 * * * bash jd jd_jxnc
#23 1 * * * bash jd jd_kd
#10-20/5 12,23 * * * bash jd jd_live
#11 1 * * * bash jd jd_lotteryMachine
#0 */2 * * * bash jd jd_moneyTree
#10 7 * * * bash jd jd_ms
#20 0,20 * * * bash jd jd_necklace
#5 6-18/6 * * * bash jd jd_pet
#12 * * * * bash jd jd_pigPet
#0 7-22/1 * * * bash jd jd_plantBean
#1 0,23 * * * bash jd jd_price
#11 9 * * * bash jd jd_rankingList
#1 1 * * * bash jd jd_redPacket
#27 8 * * * bash jd jd_sgmh
#10 0 * * * bash jd jd_shop
#16 6,23 * * * bash jd jd_small_home
#8 */3 * * * bash jd jd_speed
#15 0,23 * * * bash jd jd_speed_redpocke
#1 1,6 * * * bash jd jd_speed_sign
#11 1-23/5 * * * bash jd jd_superMarket
#36 8,18 * * * bash jd jd_syj
#55 23 * * * bash jd jd_unsubscribe
#39 7 * * * bash jd jx_sign
#30,31 20-23/1 9,12 3 * bash jd jd_live_redrain
#5 1,23 * * * bash jd jd_nzmh
#5 5 */2 * *  bash jd jd_crazy_joy_coin
#22 23,0,9 * * * bash jd jd_entertainment
#10 0 */3 * *  bash jd jd_priceProtect
#0 1,17 * * *   bash jd jd_shake
##10 0 * * *  bash jd jd_try
#10 8,21 1-8/1 3 * bash jd jd_xmf
#10 * * * *  bash jd jx_cfd
#0 0 * * *  bash jd jx_cfdtx
