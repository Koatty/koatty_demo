/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2019-11-02 12:01:33
 */
import { Middleware, helper, logger, Value } from "koatty";
import { createConnection, Connection } from "typeorm";

const defaultOpt = {
    //默认配置项
    "type": "mysql", //mysql, mariadb, postgres, sqlite, mssql, oracle, mongodb, cordova
    "host": "localhost",
    "port": 3306,
    "username": "test",
    "password": "test",
    "database": "test",
    "synchronize": true, //true 每次运行应用程序时实体都将与数据库同步
    "logging": true,
    "entities": [`${process.env.APP_PATH}/model/*`]
};


@Middleware()
export class TypeormMid {
    @Value("typeorm", "db")
    private options: any;

    run(options: any, app: any) {
        options = { ...defaultOpt, ...this.options };
        const conn = function () {
            createConnection(options).then((connection: Connection) => {
                helper.define(app, 'connection', connection);
            }).catch((err) => {
                logger.error(err);
            });
        };
        //应用启动执行一次
        app.once('appReady', () => {
            conn();
        });
        return async function (ctx: any, next: any) {
            if (!app.connection) {
                await conn();
            }
            return next();
        };
    }
}