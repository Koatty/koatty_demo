/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2019-11-14 19:31:30
 */

/*
//创建mysql数据库表

CREATE TABLE `think_group` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '组织id',
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '组织名称',
  `icon` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '组织图标',
  `desc` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '组织描述',
  `address` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '组织地址',
  `phone` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '组织电话',
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '组织邮箱',
  `attribute` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '组织标签',
  `type` int(11) DEFAULT 0 COMMENT '组织类型',
  `create_time` int(11) DEFAULT NULL COMMENT '创建时间',
  `update_time` int(11) DEFAULT NULL COMMENT '更新时间',
  `status` int(11) DEFAULT 1 COMMENT '组织状态',
  PRIMARY KEY (`id`),
  KEY `name` (`name`),
  KEY `phone` (`phone`),
  KEY `type` (`type`),
  KEY `email` (`email`),
  KEY `status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


INSERT INTO `think_group` (`id`, `name`, `icon`, `desc`, `address`, `phone`, `email`, `attribute`, `type`, `create_time`, `update_time`, `status`)
VALUES
	(1,X'E585ACE58FB8',X'',X'E585ACE58FB8',X'',X'',X'',X'',0,NULL,NULL,1);

CREATE TABLE `think_role` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '角色ID',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '角色名称',
  `desc` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '角色描述',
  `status` int(11) DEFAULT 0 COMMENT '角色状态',
  `rule_ids` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '角色对应规则列',
  `data_ids` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '角色对应数据权限',
  `ext` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '角色扩展',
  PRIMARY KEY (`id`),
  UNIQUE KEY `think_auth_role_name_unique` (`name`),
  KEY `status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `think_role` (`id`, `name`, `desc`, `status`, `rule_ids`, `data_ids`, `ext`)
VALUES
	(1,X'E8B685E7BAA7E7AEA1E79086E59198',X'E8B685E7BAA7E7AEA1E79086E59198',1,'','','');


CREATE TABLE `think_user` (
  `id` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户ID',
  `openid` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '预留第三方微信登录',
  `phonenum` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '手机号 （登录账号）',
  `password` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '登录密码',
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '用户email',
  `nickname` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '用户昵称',
  `realname` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '用户真实名称',
  `icon` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '用户头像',
  `last_login_time` int(11) DEFAULT 0 COMMENT '用户最后登录时间',
  `last_login_ip` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '用户最后登录ip',
  `birthday` int(11) DEFAULT 0 COMMENT '用户生日',
  `gender` int(11) DEFAULT 2 COMMENT '用户性别0女1男2不确定',
  `website` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '用户网站',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '用户备注',
  `create_time` int(11) DEFAULT 0 COMMENT '创建时间',
  `update_time` int(11) DEFAULT 0 COMMENT '更新时间',
  `end_time` int(11) DEFAULT 0 COMMENT '到期时间',
  `roleid` int(11) DEFAULT 0 COMMENT '用户对应角色',
  `groupid` int(11) DEFAULT 0 COMMENT '用户对应群组',
  `status` int(11) DEFAULT 0 COMMENT '用户状态',
  PRIMARY KEY (`id`),
  KEY `openid` (`openid`),
  KEY `phonenum` (`phonenum`),
  KEY `nickname` (`nickname`),
  KEY `email` (`email`),
  KEY `status` (`status`),
  KEY `roleid` (`roleid`),
  KEY `groupid` (`groupid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `think_user` (`id`, `openid`, `phonenum`, `password`, `email`, `nickname`, `realname`, `icon`, `last_login_time`, `last_login_ip`, `birthday`, `gender`, `website`, `remark`, `create_time`, `update_time`, `end_time`, `roleid`, `groupid`, `status`)
VALUES
	('yvjPI2ziMqdHuuGPa0X87mZQtILiSsZ4',X'',X'3133333333333333333333',X'3936653739323138393635656237326339326135343964643561333330313132',X'61646D696E4061646D696E2E636E',X'74657374',X'E6B58BE8AF95','',0,X'',0,2,X'',X'',0,0,0,1,1,1);

CREATE TABLE `think_role_rule` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '规则ID',
  `name` varchar(50) CHARSET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '规则路径',
  `desc` varchar(100) CHARSET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '规则名称',
  `pid` int(11) DEFAULT '0' COMMENT '规则父级ID',
  `level` int(11) DEFAULT '1' COMMENT '规则等级',
  `icon` varchar(30) CHARSET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '规则图标',
  `condition` varchar(50) CHARSET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '规则查询条件',
  `isshow` int(11) DEFAULT '0' COMMENT '是否作为菜单',
  `listorders` int(11) DEFAULT '0' COMMENT '显示菜单的顺序',
  `create_time` int(11) DEFAULT NULL COMMENT '创建时间',
  `update_time` int(11) DEFAULT NULL COMMENT '更新时间',
  `status` int(11) DEFAULT '0' COMMENT '状态',
  PRIMARY KEY (`id`),
  KEY `pid` (`pid`),
  KEY `level` (`level`),
  KEY `status` (`status`),
  KEY `isshow` (`isshow`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `think_role_data` (
  `id` int(11) NOT NULL COMMENT '数据权限id',
  `name` varchar(45) CHARSET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '数据模型类名称',
  `desc` varchar(45) CHARSET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '数据规则描述',
  `condition` text CHARSET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '数据筛选条件',
  `create_time` int(11) DEFAULT NULL COMMENT '创建时间',
  `update_time` int(11) DEFAULT NULL COMMENT '更新时间',
  `status` int(11) DEFAULT '1' COMMENT '状态',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


*/
import { Service, Base, Value, Helper, Autowired } from "koatty";
import { App } from '../../App';
import { UserModel } from '../../model/UserModel';
import { RoleModel } from '../../model/RoleModel';
import { RoleRuleModel } from '../../model/RoleRuleModel';
import { RoleDataModel } from '../../model/RoleDataModel';

@Service()
export class RbacService extends Base {
  app: App;
  @Value("rbac.auth_superrole")
  private supeRole: string;
  @Autowired()
  private userModel: UserModel;
  @Autowired()
  private roleModel: RoleModel;
  @Autowired()
  private roleRuleModel: RoleRuleModel;
  @Autowired()
  private roleDataModel: RoleDataModel;

  /**
   * 功能权限
   *
   * @param {string} path
   * @param {string} userid
   * @param {string} [relation="every"]
   * @returns
   * @memberof RbacService
   */
  async ruleAuth(path: string, userid: string, relation = "every") {
    if (Helper.isEmpty(userid) || Helper.isEmpty(path)) {
      return false;
    }
    const userInfo = await this.userModel.getInfo(userid);
    if (Helper.isEmpty(userInfo) || Helper.isEmpty(userInfo.roleid)) {
      return false;
    }
    if (userInfo.roleid === this.supeRole) {
      return true;
    }
    const logic = relation ? 'every' : 'some';
    const authList = await this.getAuthList(userInfo);
    return authList[logic]((item: string) => path.startsWith(item) || new RegExp(item).test(path));
  }

  /**
   * 
   *
   * @param {*} userInfo
   * @returns {Promise<any[]>}
   * @memberof RbacService
   */
  async getAuthList(userInfo: any): Promise<any[]> {
    if (Helper.isEmpty(userInfo) || Helper.isEmpty(userInfo.roleid)) {
      return [];
    }
    const roleInfo = await this.roleModel.getInfo(userInfo.roleid);
    if (Helper.isEmpty(roleInfo) || Helper.isEmpty(roleInfo.rule_ids)) {
      return [];
    }
    if (Helper.isString(roleInfo.rule_ids)) {
      roleInfo.rule_ids = (roleInfo.rule_ids).split(',');
    }

    const roleRules = [];
    const list = await this.roleRuleModel.getRoleRules(userInfo.roleid, roleInfo.rule_ids);
    for (const item of list) {
      roleRules.push(item.name);
    }
    return roleRules;
  }

  /**
   * 数据权限
   *
   * @param {string} userid
   * @param {string} model
   * @param {*} [map={}]
   * @returns
   * @memberof RbacService
   */
  async dataAuth(userid: string, model: string, map = {}) {
    if (Helper.isEmpty(userid) || Helper.isEmpty(model)) {
      return map;
    }
    const userInfo = await this.userModel.getInfo(userid);
    if (Helper.isEmpty(userInfo) || Helper.isEmpty(userInfo.roleid)) {
      return map;
    }
    if (userInfo.roleid === this.supeRole) {
      return map;
    }
    if (model) {
      const data: any = await this.getDataList(userInfo, model);
      map = { ...map, ...(data[model] || {}) };
    }
    return map;
  }

  /**
   *
   *
   * @param {*} userInfo
   * @param {string} model
   * @returns
   * @memberof RbacService
   */
  async getDataList(userInfo: any, model: string) {
    if (Helper.isEmpty(userInfo) || Helper.isEmpty(userInfo.roleid)) {
      return {};
    }
    const roleInfo = await this.roleModel.getInfo(userInfo.roleid);
    if (Helper.isEmpty(roleInfo) || Helper.isEmpty(roleInfo.data_ids)) {
      return {};
    }
    if (Helper.isString(roleInfo.data_ids)) {
      roleInfo.data_ids = (roleInfo.data_ids).split(',');
    }
    return this.roleDataModel.where({ id: roleInfo.data_ids, status: 1, name: model }).find();
  }
}