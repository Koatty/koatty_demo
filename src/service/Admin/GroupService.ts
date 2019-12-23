/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2019-12-23 13:53:31
 */
import { Service, Base, Autowired } from "koatty";
import { App } from '../../App';
import { CommonService } from '../CommonService';
import { GroupModel } from '../../model/GroupModel';

@Service()
export class GroupService extends CommonService {
    app: App;
    @Autowired()
    Model: GroupModel;

    init() {
        //property
    }
}