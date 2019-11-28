/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2019-11-27 09:52:25
 */
import { Service, Base, Autowired } from "koatty";
import { App } from '../App';
import { RoleDataModel } from "../model/RoleDataModel";
import { CommonService, MoInterface } from './CommonService';

@Service()
export class DataService extends CommonService {
    app: App;
    @Autowired()
    Model: RoleDataModel;

    init() {
        //property
    }

}