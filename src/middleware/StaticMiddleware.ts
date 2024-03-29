/**
 * @ author: richen
 * @ copyright: Copyright (c) - <richenlin(at)gmail.com>
 * @ license: BSD (3-Clause)
 * @ version: 2020-05-18 11:17:26
 */
import { Middleware, IMiddleware } from 'koatty';
import { App } from '../App';
import { KoattyStatic } from "koatty_static";

@Middleware()
export class StaticMiddleware implements IMiddleware {
  run(options: any, app: App) {
    return KoattyStatic(options, app);
  }
}