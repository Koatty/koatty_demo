/*
 * @Description: 数据传输处理层
 * @Usage: 
 * @Author: xxx
 * @Date: 2020-12-22 15:24:25
 * @LastEditTime: 2023-08-17 11:46:39
 */

import { Component } from "koatty";
import { IsNotEmpty, IsDefined } from "koatty_validation";
import { PhoneType } from "./PhoneType";
//_ENUM_IMPORT

@Component()
export class SayHelloRequestDto {
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
  phone: PhoneType;
}