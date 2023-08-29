/*
 * @Description: 插件扩展
 * @Usage: 
 * @Author: xxx
 * @Date: 2020-12-22 15:24:25
 * @LastEditTime: 2023-08-04 14:26:44
 */

import { Plugin, IPlugin, Helper } from "koatty";
import { KoattyTypeORM } from 'koatty_typeorm';
import { App } from '../App';

@Plugin()
export class TypeormPlugin implements IPlugin {
  run(options: any, app: App) {
    return KoattyTypeORM(options, app);
  }
}