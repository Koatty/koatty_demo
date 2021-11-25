/*
 * @Description: view中间件
 * @Usage: 
 * @Author: xxx
 * @Date: 2020-12-22 15:54:39
 * @LastEditTime: 2021-07-13 17:19:19
 */


import { Middleware, IMiddleware } from 'koatty';
import { Views } from 'koatty_views';
import { App } from '../App';

@Middleware()
export class ViewMiddleware implements IMiddleware {
  run(options: any, app: App): any {
    return Views(options, app);
  }
}

