/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2019-10-12 18:45:22
 */
import { Service, logger, Base } from "koatty";

@Service()
export class test extends Base {
    public sayHello(param: string) {
        logger.info(param);
        return 'Hello Koatty!';
    }
}