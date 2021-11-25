/*
 * @Description: WebSocket 控制器
 * @Usage: 接收处理路由参数
 * @Author: xxx
 * @Date: 2020-12-22 15:24:25
 * @LastEditTime: 2021-11-25 13:12:21
 */

import { KoattyContext, Controller, BaseController, Autowired, GetMapping } from 'koatty';
import { App } from '../App';
// import { TestService } from '../service/TestService';

@Controller('/requst')
export class RequstController extends BaseController {
  app: App;
  ctx: KoattyContext;

  // @Autowired()
  // protected TestService: TestService;

  /**
   * Custom constructor
   *
   */
  init() {
    //todo
  }

  /**
   * index 接口
   * 访问路径  ws://127.0.0.1/requst
   *
   * @returns
   * @memberof RequstController
   */
  @GetMapping('/')
  index(): Promise<any> {
    return this.ok('Hi Koatty');
  }

}