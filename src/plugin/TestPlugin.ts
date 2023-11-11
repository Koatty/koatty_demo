/*
 * @Description: 插件扩展
 * @Usage: Test插件实现
 * @Author: xxx
 * @Date: 2020-12-22 16:00:49
 * @LastEditTime: 2023-11-11 10:33:05
 */

import { Plugin, IPlugin, Logger } from 'koatty';
import { App } from '../App';
// import { TestPlugin } from 'xxx';

@Plugin()
export class TestPlugin implements IPlugin {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  run(options: any, app: App) {
    // return TestPlugin(options, app);
    // or
    // todo something
    Logger.Debug("TestPlugin");
    return Promise.resolve();
  }
}
