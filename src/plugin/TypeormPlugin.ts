/*
 * @Description: 插件扩展
 * @Usage: 
 * @Author: xxx
 * @Date: 2020-12-22 15:24:25
 * @LastEditTime: 2021-11-24 13:58:59
 */

import { Plugin, IPlugin, Helper } from "koatty";
import { typeorm } from 'koatty_typeorm';
import { App } from '../App';

@Plugin()
export class TypeormPlugin implements IPlugin {
  run(options: any, app: App) {
    return typeorm(options, app);
  }
}