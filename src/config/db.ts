/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2019-12-03 15:32:20
 */
export default {
    /*database config*/
    database: {
        db_type: 'mysql', //support  postgresql,mysql...
        // db_host: '127.0.0.1',
        db_host: '192.168.0.150',
        db_port: 3306,
        db_name: 'test',
        db_user: 'test',
        db_pwd: 'test',
        db_prefix: 'think_',
        db_charset: 'utf8'
    },

    redis: {
        type: 'redis', //数据缓存类型 file,redis,memcache
        key_prefix: 'DSP:', //缓存key前置
        timeout: null, //数据缓存有效期，单位: 秒
        // redis_host: '127.0.0.1',
        redis_host: '192.168.0.150',
        redis_port: 6379,
        redis_password: '',
        redis_db: '0',
        redis_timeout: 5000 //try connection timeout
    }
};