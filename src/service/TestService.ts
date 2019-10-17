/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2019-10-17 11:57:11
 */
import { App } from "../App";
import { Service, Autowired, logger } from "koatty";
import { UserModel } from "../model/UserModel";
import { TestModel } from "../model/TestModel";
import { Connection } from "typeorm";

@Service()
export class TestService {
    public app: App;
    private connection: Connection;
    @Autowired('UserModel', 'COMPONENT')
    private userModel: UserModel;

    init() {
        this.connection = this.app.connection;
    }


    public sayHello() {
        return this.userModel.find();
    }

    async sayHello2(param: string) {
        logger.info('TestService.sayHello2', param);
        return TestModel.findOne();
    }

    async typeSave() {
        const testRepository = this.connection.getRepository(TestModel);
        return testRepository.findOne();
    }
}