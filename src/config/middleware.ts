/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2019-11-04 19:46:53
 */
export default {
    list: ['TypeormMid', 'StoreMid', 'ViewMid'], //加载的中间件列表
    config: { //中间件配置
        ViewMid: {
            engine_config: { cache: true }, //模版引擎配置
            view_path: process.env.ROOT_PATH + '/static/view' //模板目录
        }
    }
};