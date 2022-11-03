/*
 * @Description: db配置
 * @Usage: 包括database、redis配置信息
 * @Author: xxx
 * @Date: 2020-12-22 15:24:25
 * @LastEditTime: 2022-11-03 16:16:17
 */

export default {
    /*database config*/
    "DataBase": { // used koatty_typeorm
        //默认配置项
        "type": "mysql", //mysql, mariadb, postgres, sqlite, mssql, oracle, mongodb, cordova
        host: "${mysql_host}",
        port: "${mysql_port}",
        username: "${mysql_user}",
        password: "${mysql_pass}",
        database: "test",

        "synchronize": false, //true 每次运行应用程序时实体都将与数据库同步
        "logging": true,
        "entities": [`${process.env.APP_PATH}/model/*`],
        "entityPrefix": ""
    },

    "CacheStore": {
        type: "memory", // redis or memory
        // key_prefix: "koatty",
        // host: '127.0.0.1',
        // port: 6379,
        // name: "",
        // username: "",
        // password: "",
        // db: 0,
        // timeout: 30,
        // pool_size: 10,
        // conn_timeout: 30
    },

};