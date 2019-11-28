/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2019-11-28 12:19:10
 */
import { Service, Base, Autowired, Value, Koatty } from "koatty";
import { App } from '../App';
import { CommonService } from "./CommonService";
import { RoleModel } from "../model/RoleModel";

@Service()
export class RoleService extends CommonService {
    app: App;
    @Autowired()
    Model: RoleModel;

    init() {
        //property
    }


}