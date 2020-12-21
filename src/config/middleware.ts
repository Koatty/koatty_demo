/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2020-05-12 00:07:26
 */
export default {
    list: ["JwtMiddleware", "ViewMiddleware"], //加载的中间件列表
    config: { //中间件配置
        "StaticMiddleware": {
            // dir: '/static', // resource path
            // prefix: '', // the url prefix you wish to add, default to ''
            // alias: {}, // object map of aliases. See below
            // gzip: true, // when request's accept-encoding include gzip, files will compressed by gzip.
            // usePrecompiledGzip: false, // try use gzip files, loaded from disk, like nginx gzip_static
            // buffer: false, // store the files in memory instead of streaming from the filesystem on each request
            // filter: [], // (function | array) - filter files at init dir, for example - skip non build (source) files. If array set - allow only listed files
            // maxAge: 3600 * 24 * 7, // cache control max age for the files, 0 by default.
            // preload: false, // caches the assets on initialization or not, default to true. always work together with options.dynamic.
            // cache: false // dynamic load file which not cached on initialization.
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