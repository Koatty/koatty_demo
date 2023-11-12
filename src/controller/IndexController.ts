/*
 * @Description: 业务层
 * @Usage: 接收处理路由参数
 * @Author: xxx
 * @Date: 2020-12-22 15:31:17
 * @LastEditTime: 2023-11-11 11:17:23
 */

import {
  Controller, Autowired, GetMapping, Post, PostMapping, KoattyContext,
  Before, BaseController, PathVariable, Header
} from 'koatty';
import { Valid, Validated } from "koatty_validation";
import { App } from '../App';
import { UserDto } from '../dto/UserDto';
import { TestService } from '../service/TestService';

@Controller('/')
export class IndexController extends BaseController {
  app: App;
  ctx: KoattyContext;

  @Autowired()
  protected TestService: TestService;

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
  index(): Promise<any> {
    this.ctx.status = 200;
    return this.ok('Hi Koatty');
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
    return this.ok("success", userInfo);
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
    return this.ok('success', { userInfo });
  }

  /**
   * html 渲染
   *
   * @returns
   * @memberof TestController
   */
  @GetMapping('/html')
  html(): Promise<any> {
    this.ctx.state = { title: 'Koatty', content: 'Hello, Koatty!' };
    return this.ctx.render('index.html');
  }
}
