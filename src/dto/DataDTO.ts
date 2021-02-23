/**
 * @ author: richen
 * @ copyright: Copyright (c) - <richenlin(at)gmail.com>
 * @ license: MIT
 * @ version: 2019-12-31 11:19:48
 */
import { IsNotEmpty, IsIn } from "koatty_validation";

export class DataDTO {
    @IsNotEmpty({ message: "数据模型类名称不能为空" })
    name: string;
    @IsNotEmpty({ message: "数据规则描述不能为空" })
    desc: string;

    condition: string;

    create_time: number;
    update_time: number;

    @IsIn([0, 1], { message: "状态值只能为0或1" })
    status: number;
    page: number;
}