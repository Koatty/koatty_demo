/*
 * @Description: 业务层
 * @Usage: 接收处理路由参数
 * @Author: xxx
 * @Date: 2020-12-22 15:31:17
 * @LastEditTime: 2025-01-14 15:21:55
 */

import {
  Autowired,
  Before,
  Controller,
  GetMapping,
  Header,
  KoattyContext,
  Logger,
  Output,
  PathVariable,
  Post, PostMapping
} from 'koatty';
import { Valid, Validated } from "koatty_validation";
import { App } from '../App';
import { UserDto } from '../dto/UserDto';
import { TestService } from '../service/TestService';

@Controller('/')
export class IndexController {
  app: App;
  ctx: KoattyContext;

  @Autowired()
  protected TestService: TestService;

  /**
   * constructor
   *
   */
  constructor(ctx: KoattyContext) {
    this.ctx = ctx;
  }

  /**
   * @api {get} / index接口
   * @apiGroup Test
   * 
   * 
   * @apiSuccessExample {json} Success
   * {"code":1,"message":"","data":{}}
   * 
   * @apiErrorExample {json} Error
   * {"code":0,"message":"错误信息","data":null}
   */
  @GetMapping()
  index() {
    this.ctx.status = 200;
    return Output.ok('Hi Koatty');
  }

  /**
   * @api {get} /get?userId= get接口
   * @apiGroup Test
   * 
   * @apiParam {number} id  userId.
   * 
   * @apiSuccessExample {json} Success
   * {"code":1,"message":"","data":{}}
   * 
   * @apiErrorExample {json} Error
   * {"code":0,"message":"错误信息","data":null}
   */
  @GetMapping("/get/:id")
  @Before("AuthAspect")
  async get(
    @Header("x-access-token") token: string,
    @Valid("IsNotEmpty", "id不能为空") @PathVariable("id") id: number): Promise<any> {
    const userInfo = await this.TestService.getUser(id);
    return Output.ok("success", userInfo);
  }

  /**
   * @api {post} /add add接口
   * @apiGroup Test
   * 
   * @apiParamClass (src/dto/UserDto.ts) {UserDto}
   * 
   * @apiSuccessExample {json} Success
   * {"code":1,"message":"","data":{}}
   * 
   * @apiErrorExample {json} Error
   * {"code":0,"message":"错误信息","data":null}
   */
  @PostMapping('/add')
  @Validated()
  @Before("AuthAspect")
  async add(
    @Header("x-access-token") token: string,
    @Post() data: UserDto): Promise<any> {
    const userInfo = await this.TestService.addUser(data);
    return Output.ok('success', { userInfo });
  }

  /**
   * html 渲染
   *
   * @returns
   * @memberof TestController
   */
  @GetMapping('/html')
  html(): Promise<any> {
    Logger.Debug("X-Request-Id:" + this.ctx.get("X-Request-Id"))
    this.ctx.state = { title: 'Koatty', content: 'Hello, Koatty!' };
    return this.ctx.render('index.html');
  }
}
