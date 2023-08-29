/*
 * @Description: 中间件
 * @Usage: 
 * @Author: xxx
 * @Date: 2020-12-22 15:24:25
 * @LastEditTime: 2023-08-22 11:07:21
 */

import { KoattyContext, Middleware, IMiddleware, KoattyNext } from 'koatty';
import mount from 'koa-mount';
import Provider from 'oidc-provider';
import { App } from '../App';

const defaultOpt = {
  //默认配置项
};


@Middleware()
export class OidcMiddleware implements IMiddleware {
  run(options: any, app: App) {
    options = { ...defaultOpt, ...options };
    //应用启动执行一次
    const oidc = new Provider('http://localhost:3000', options);
    app.use(mount('/oidc', oidc.app));
    return function (ctx: KoattyContext, next: KoattyNext) {
      return next();
    };
  }
}