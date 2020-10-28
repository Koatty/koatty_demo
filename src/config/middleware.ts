/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2020-05-12 00:07:26
 */
export default {
    // list: ["StaticMiddleware", "JwtMiddleware", "ViewMiddleware"], //加载的中间件列表
    list: ["StaticMiddleware", "JwtMiddleware", "ViewMiddleware"], //加载的中间件列表
    config: { //中间件配置
        StaticMiddleware: {
            cache: true
        },
        JwtMiddleware: {
            alg: 'HS256', //算法
            sub: 'jwt', //主题
            exp: 86400, //过期时间, now() + 86400
            key: 'Koatty'
        },
        ViewMiddleware: {
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