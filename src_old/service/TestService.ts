/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2019-10-17 10:41:35
 */
import { Service, logger, Base, Autowired } from "koatty";
import { UserModel } from "../model/UserModel";
import { TestModel } from "../model/TestModel";
import { Connection } from 'typeorm';

@Service()
export class TestService extends Base {
    private connection: Connection;

    init() {
        this.connection = this.app.connection;
    }

    @Autowired('UserModel', 'COMPONENT')
    private userModel: UserModel;

    async sayHello(param: string) {
        logger.info('TestService.sayHello', param);
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