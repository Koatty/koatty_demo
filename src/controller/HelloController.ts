/*
 * @Description: 业务层
 * @Usage: 接收处理路由参数
 * @Author: xxx
 * @Date: 2020-12-22 15:24:25
 * @LastEditTime: 2023-09-10 11:14:07
 */

import { KoattyContext, Controller, BaseController, PostMapping, Post, Logger } from 'koatty';
import { App } from '../App';
import { SayHelloRequestDto } from '../dto/SayHelloRequestDto';
import { SayHelloReplyDto } from '../dto/SayHelloReplyDto';
import { SayHelloRequest2Dto } from '../dto/SayHelloRequest2Dto';
import { SayHelloReply2Dto } from '../dto/SayHelloReply2Dto';
//_IMPORT_LIST Important! Do not delete this line

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
   *
   * @param {SayHelloRequestDto} params
   * @returns
   */
  @PostMapping('/SayHello') // Consistent with proto.service.method name
  SayHello(@Post() params: SayHelloRequestDto): Promise<SayHelloReplyDto> {
    Logger.Debug(params);
    const res = new SayHelloReplyDto();
    return Promise.resolve(res);
  }

  /**
   * SayHello2 接口
   *
   * @param {SayHelloRequest2Dto} params
   * @returns
   */
  @PostMapping('/SayHello2') // Consistent with proto.service.method name
  SayHello2(@Post() params: SayHelloRequest2Dto): Promise<SayHelloReply2Dto> {
    Logger.Debug(params);
    const res = new SayHelloReply2Dto();
    return Promise.resolve(res);
  }
  //_METHOD_LIST Important! Do not delete this line

}