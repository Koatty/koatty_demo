/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2019-10-17 14:27:13
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
    @Autowired()
    private userModel: UserModel;

    init() {
        this.connection = this.app.connection;
    }


    /**
     * 使用thinkorm查询
     *
     * @returns
     * @memberof TestService
     */
    public sayHello() {
        return this.userModel.find();
    }

    /**
     * 使用typeorm active record模式查询
     *
     * @param {string} param
     * @returns
     * @memberof TestService
     */
    async sayHello2(param: string) {
        logger.info('TestService.sayHello2', param);
        return TestModel.findOne();
    }

    /**
     * 使用typeorm repository模式查询
     *
     * @returns
     * @memberof TestService
     */
    async sayHello3() {
        const testRepository = this.connection.getRepository(TestModel);
        return testRepository.findOne();
    }
}