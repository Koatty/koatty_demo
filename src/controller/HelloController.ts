/*
 * @Description: gRPC 控制器
 * @Usage: 接收处理路由参数
 * @Author: xxx
 * @Date: 2020-12-22 15:24:25
 * @LastEditTime: 2022-03-08 16:04:38
 */

import { KoattyContext, Controller, BaseController, Autowired, RequestMapping, RequestBody } from 'koatty';
import { App } from '../App';
import { SayHelloRequestDto } from '../dto/SayHelloRequestDto';
import { SayHelloReplyDto } from '../dto/SayHelloReplyDto';

@Controller('/Hello') // Consistent with proto.service name
export class HelloController extends BaseController {
  app: App;
  ctx: KoattyContext;

  /**
   * Custom constructor
   *
   */
  init() {
    //todo
  }


  /**
   * SayHello 接口
   * 访问路径  grpc://127.0.0.1/Hello/SayHello
   *
   * @param {SayHelloRequestDto} data
   * @returns
   */
  @RequestMapping('/SayHello') // Consistent with proto.service.method name
  SayHello(@RequestBody() params: SayHelloRequestDto): Promise<SayHelloReplyDto> {
    console.log(this.ctx.headers);

    const res = new SayHelloReplyDto();
    res.message = params.name;
    return Promise.resolve(res);
  }

}