/**
 * @ author: richen
 * @ copyright: Copyright (c) - <richenlin(at)gmail.com>
 * @ license: MIT
 * @ version: 2019-12-31 11:59:28
 */
import { IsNotEmpty, IsMobile, Min, IsEmail, IsDate, IsIn } from "koatty_validation";

export class UserDTO {

    /**
     * 手机号（登录账号）
     *
     * @type {string}
     * @memberof UserDTO
     */
    @IsMobile({ message: "手机号码格式不正确" })
    phonenum: string;

    /**
     * 密码
     *
     * @type {string}
     * @memberof UserDTO
     */
    @Min(6)
    password: string;

    /**
     * Email
     *
     * @type {string}
     * @memberof UserDTO
     */
    @IsEmail({}, { message: "Email格式不正确" })
    email: string;

    /**
     * 用户昵称
     *
     * @type {string}
     * @memberof UserDTO
     */
    nickname: string;

    /**
     * 姓名
     *
     * @type {string}
     * @memberof UserDTO
     */
    realname: string;

    /**
     * 用户头像
     *
     * @type {string}
     * @memberof UserDTO
     */
    icon: string;

    /**
     * 用户生日 2018-01-01
     *
     * @type {string}
     * @memberof UserDTO
     */
    birthday: string;

    /**
     * 用户性别
     *
     * @type {number}
     * @memberof UserDTO
     */
    @IsIn([0, 1, 2], { message: "用户性别格式错误，0女1男2不确定" })
    gender: number;

    /**
     * 用户网站
     *
     * @type {string}
     * @memberof UserDTO
     */
    website: string;

    /**
     * 用户简介
     *
     * @type {string}
     * @memberof UserDTO
     */
    remark: string;

    /**
     * 到期时间 2019-01-01
     *
     * @type {string}
     * @memberof UserDTO
     */
    end_time: string;

    /**
     * 角色ID
     *
     * @type {number}
     * @memberof UserDTO
     */
    roleid: number;

    /**
     * 组织ID
     *
     * @type {number}
     * @memberof UserDTO
     */
    groupid: number;
    page: number;

}