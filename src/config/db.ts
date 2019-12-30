/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2019-10-12 14:13:12
 */
export default {
    /*database config*/
    database: {
        db_type: 'mysql', //support  postgresql,mysql...
        db_host: '127.0.0.1',
        db_port: 3306,
        db_name: 'test',
        db_user: 'root',
        db_pwd: '',
        db_prefix: '',
        db_charset: 'utf8'
    },

    // redis: {
    //     type: 'redis', //数据缓存类型 file,redis,memcache
    //     key_prefix: '', //缓存key前置
    //     timeout: null, //数据缓存有效期，单位: 秒
    //     redis_host: '127.0.0.1',
    //     redis_port: 6379,
    //     redis_password: '',
    //     redis_db: '0',
    //     redis_timeout: 5000, //try connection timeout
    // }
};