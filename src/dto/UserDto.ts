/*
 * @Description: 数据传输处理层
 * @Usage: 新增用户数据处理
 * @Author: xxx
 * @Date: 2020-12-22 16:10:51
 * @LastEditTime: 2023-08-16 16:30:32
 */
import { Component } from "koatty";
import { IsNotEmpty } from "koatty_validation";

@Component()
export class UserDto {
  @IsNotEmpty({ message: "手机号码不能为空" })
  phoneNum: string;

  userName: string;
}
