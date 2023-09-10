/*
 * @Description: 插件扩展
 * @Usage: 
 * @Author: xxx
 * @Date: 2020-12-22 15:24:25
 * @LastEditTime: 2023-09-10 11:13:00
 */

import { Plugin, IPlugin } from "koatty";
import { KoattyTypeORM } from 'koatty_typeorm';
import { App } from '../App';

@Plugin()
export class TypeormPlugin implements IPlugin {
  run(options: any, app: App) {
    return KoattyTypeORM(options, app);
  }
}