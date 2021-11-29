/*
 * @Description: WebSocket 控制器
 * @Usage: 接收处理路由参数
 * @Author: xxx
 * @Date: 2020-12-22 15:24:25
 * @LastEditTime: 2021-11-29 12:38:23
 */

import { KoattyContext, Controller, BaseController, Autowired, GetMapping, RequestMapping, RequestBody } from 'koatty';
import { Valid } from 'koatty_validation';
import { App } from '../App';
// import { TestService } from '../service/TestService';

@Controller('/request')
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
  @RequestMapping("/get")
  index(@RequestBody() @Valid("IsEmail") body: string): Promise<any> {
    this.ctx.websocket.on("test", (name: string) => {
      console.log(name);
    });
    return Promise.resolve(body);
  }

}