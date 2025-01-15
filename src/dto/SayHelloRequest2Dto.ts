/*
 * @Description: 数据传输处理层
 * @Usage: 
 * @Author: xxx
 * @Date: 2020-12-22 15:24:25
 * @LastEditTime: 2025-01-14 15:10:39
 */

import { Component } from "koatty";
import { IsDefined } from "koatty_validation";
//_ENUM_IMPORT

@Component()
export class SayHelloRequest2Dto {
  // @IsNotEmpty()
  // name: string;

  /**
  * 如果未添加其他规则,属性必须具备@IsDefined()装饰器
  * 否则DTO实例参数自动赋值会失效
  */
  // @IsDefined() 
  // memo: string;

  @IsDefined()
  id: string;

  @IsDefined()
  name: string;

  @IsDefined()
  phone: string;
}