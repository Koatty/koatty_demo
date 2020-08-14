/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2020-05-12 00:07:26
 */
export default {
    // list: ["StaticMiddleware", "CacheMiddleware", "JwtMiddleware", "ViewMiddleware"], //加载的中间件列表
    list: ["StaticMiddleware", "JwtMiddleware", "ViewMiddleware"], //加载的中间件列表
    config: { //中间件配置
        // StaticMiddleware: {
        //     cache: false
        // },
        CacheMiddleware: {
            type: 'redis', //数据缓存类型 file,redis,memcache
            key_prefix: 'Koatty:', //缓存key前置
            timeout: 6 * 3600, //数据缓存有效期，单位: 秒
            host: '192.168.0.150',
            port: 6379,
            password: '',
            db: '0',
            poolsize: 10, //pool size
            conn_timeout: 5000 //try connection timeout
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