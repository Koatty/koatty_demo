/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2019-11-20 15:18:40
 */
export default {
    list: ["Cache", "Token", "View"], //加载的中间件列表
    config: { //中间件配置
        // Static: {
        //     cache: false
        // },
        Token: {
            alg: 'HS256', //算法
            sub: 'token', //主题
            exp: 864000, //过期时间 1天
            key: 'DSP', //Secret,签名密码,请务必根据实际情况修改
            url: ['^\/doc\/.*', '^\/admin\/public\/login', '^\/admin\/index/index'] //无需检查的路由 , '^\/activity\/'
        },
        View: {
            view_path: process.env.ROOT_PATH + '/static', //模板目录
            engine_type: 'ejs', //模版引擎名称 ejs, pug
            engine_config: { cache: true }, //模版引擎配置
            content_type: 'text/html', //模版输出类型
            file_suffix: '.html', //模版文件名后缀
            file_depr: '_', //controller和action之间的分隔符
            default_theme: 'default' //默认模板主题
        }
    }
};