/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2019-10-17 11:41:29
 */
import { App } from "../App";
import { Service, Autowired } from "koatty";
import { UserModel } from "../model/UserModel";

@Service()
export class TestService {
    public app: App;
    @Autowired('UserModel', 'COMPONENT')
    private userModel: UserModel;

    public sayHello() {
        return this.userModel.find();
    }
}