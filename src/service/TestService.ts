/*
 * @Description: 逻辑层
 * @Usage: 处理具体业务逻辑
 * @Author: xxx
 * @Date: 2020-12-22 15:59:51
 * @LastEditTime: 2025-01-14 16:34:27
 */

import { Autowired, Logger, Service } from 'koatty';
import { CacheAble } from "koatty_cacheable";
import { Scheduled } from "koatty_schedule";
import { App } from '../App';
import { UserDto } from '../dto/UserDto';
import { UserModel } from '../model/UserModel';
import { UserEntity } from '../model/entity/UserEntity';

@Service()
export class TestService {
  app: App;
  @Autowired()
  private userModel: UserModel;

  /**
   * 登录检测
   *
   * @param {string} token
   * @memberof TestService
   */
  checkLogin(token: string): boolean {
    return token.toLocaleLowerCase() === 'koatty';
  }

  /**
   * 获取用户信息
   *
   * @param {number} id
   * @memberof TestService
   */
  // 自动缓存,默认存储在内存,支持存储redis
  @CacheAble("getUser", {
    params: ["id"],
    timeout: 30,
  })
  getUser(id: number) {
    return this.userModel.Find({ id })
  }

  /**
   * 新增用户
   *
   * @param {UserDto} data
   * @memberof TestService
   */
  addUser(data: UserDto) {
    const user = new UserEntity();
    user.phoneNum = data.phoneNum;
    user.name = data.userName;
    return this.userModel.Add(user);
  }

  /**
   * cron job
   *
   * @memberof TestService
   */
  @Scheduled("0 * * * * *")
  //计划任务加锁，默认内存锁，配合redis可以实现分布式锁
  // @SchedulerLock("testCron") 
  testCron() {
    Logger.Debug('cron job');
  }
}
