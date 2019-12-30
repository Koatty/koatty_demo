/**
 * @ author: richen
 * @ copyright: Copyright (c) - <richenlin(at)gmail.com>
 * @ license: MIT
 * @ version: 2019-12-31 00:45:30
 */
import { IsNotEmpty } from "koatty";
export class GroupDTO {
    @IsNotEmpty()
    name: string;
}