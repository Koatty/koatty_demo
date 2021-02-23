/**
 * @ author: richen
 * @ copyright: Copyright (c) - <richenlin(at)gmail.com>
 * @ license: MIT
 * @ version: 2019-12-31 11:32:33
 */
import { IsNotEmpty, IsPhoneNumber, IsEmail, IsIn } from "koatty_validation";

export class GroupDTO {

    /**
     * 组织名称
     *
     * @type {string}
     * @memberof GroupDTO
     */
    @IsNotEmpty({ message: "组织名称不能为空" })
    name: string;
    /**
     * 组织描述
     *
     * @type {string}
     * @memberof GroupDTO
     */
    @IsNotEmpty({ message: "组织描述不能为空" })
    desc: string;
    /**
     * 地址
     *
     * @type {string}
     * @memberof GroupDTO
     */
    address: string;

    /**
     * 组织电话
     *
     * @type {string}
     * @memberof GroupDTO
     */
    @IsPhoneNumber("CH", { message: "组织电话格式错误" })
    phone: string;

    /**
     * 组织邮箱
     *
     * @type {string}
     * @memberof GroupDTO
     */
    @IsEmail({}, { message: "组织邮箱格式错误" })
    email: string;

    /**
     * 组织标签
     *
     * @type {string}
     * @memberof GroupDTO
     */
    attribute: string;

    /**
     * 组织类型
     *
     * @type {number}
     * @memberof GroupDTO
     */
    @IsNotEmpty({ message: "组织类型不能为空" })
    type: number;

    /**
     * 创建时间
     *
     * @type {number}
     * @memberof GroupDTO
     */
    create_time: number;

    /**
     * 更新时间
     *
     * @type {number}
     * @memberof GroupDTO
     */
    update_time: number;

    /**
     * 状态
     *
     * @type {number}
     * @memberof GroupDTO
     */
    @IsIn([0, 1], { message: "状态值只能为0或1" })
    status: number;

    /**
     * 当前页码
     *
     * @type {number}
     * @memberof GroupDTO
     */
    page: number;
}