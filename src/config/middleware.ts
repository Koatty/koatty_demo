/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2019-10-17 11:55:50
 */
export default {
    list: ['TypeormMid', 'TestMid'], //加载的中间件列表
    config: { //中间件配置
        TestMid: {
            test: 1
        },
        TypeormMid: {
            "type": "mysql", //mysql, mariadb, postgres, sqlite, mssql, oracle, mongodb, cordova
            "host": "192.168.0.150",
            "port": 3306,
            "username": "test",
            "password": "test",
            "database": "test",
            "synchronize": false, //true 每次运行应用程序时实体都将与数据库同步
            "logging": true,
            "entities": [`${process.env.APP_PATH}/model/*`]
        }
    }
};