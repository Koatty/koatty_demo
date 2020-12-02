/**
 * @ author: richen
 * @ copyright: Copyright (c) - <richenlin(at)gmail.com>
 * @ license: MIT
 * @ version: 2019-12-31 11:47:54
 */
import { IsNotEmpty, IsIn } from "koatty";

export class RoleDTO {
    /**
     * 角色名称
     *
     * @type {string}
     * @memberof RoleDTO
     */
    @IsNotEmpty({ message: "角色名称不能为空" })
    name: string;
    /**
     * 角色描述
     *
     * @type {string}
     * @memberof RoleDTO
     */
    @IsNotEmpty({ message: "角色描述不能为空" })
    desc: string;

    /**
     * 角色功能权限
     *
     * @type {string}
     * @memberof RoleDTO
     */
    rule_ids: string;

    /**
     * 角色数据权限
     *
     * @type {string}
     * @memberof RoleDTO
     */
    data_ids: string;

    /**
     * 角色扩展字段
     *
     * @type {JSON}
     * @memberof RoleDTO
     */
    ext: JSON;

    /**
     * 状态
     *
     * @type {number}
     * @memberof RoleDTO
     */
    @IsIn([0, 1], { message: "状态值只能为0或1" })
    status: number;
    page: number;
}