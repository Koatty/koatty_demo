/*
 * @Description: 数据持久层
 * @Usage: 
 * @Author: xxx
 * @Date: 2020-12-22 15:24:25
 * @LastEditTime: 2024-12-10 14:55:41
 */
import { Component } from 'koatty';
import { App } from '../App';
import { UserEntity } from './entity/UserEntity';
import { FindOptionsWhere, SaveOptions } from 'typeorm';

@Component()
export class UserModel {
  app: App;
  /**
   * Find
   * @param where 
   * @returns  
   */
  Find(where: FindOptionsWhere<UserEntity>) {
    return UserEntity.findOneBy(where);
  }

  /**
   * FindAll
   * @param where 
   * @returns 
   */
  FindAll(where: FindOptionsWhere<UserEntity>) {
    return UserEntity.findBy(where);
  }
  /**
   * Pagination
   * @param where 
   * @param pageNo 
   * @param pageSize 
   * @param orderBy 
   * @returns 
   */
  async Pagination(where: FindOptionsWhere<UserEntity>,
    pageNo: number = 1, pageSize: number = 10, orderBy?: {
      sort: string, order?: "ASC" | "DESC", nulls?: "NULLS FIRST" | "NULLS LAST"
    }) {
    const builder = await UserEntity.createQueryBuilder().where(where);
    const count = await builder.getCount();
    const skip = ((pageNo > 0 ? pageNo : 1) - 1) * pageSize;
    const lastPage = (count % pageSize) === 0 ? count / pageSize : Math.trunc(count / pageSize) + 1;
    const res = await builder
      .orderBy(orderBy.sort, orderBy.order, orderBy.nulls)
      .skip(skip)
      .take(pageSize)
      .getMany();
    return {
      pageNo: pageNo,
      pageSize: pageSize,
      prevPage: pageNo > 1 ? (pageNo - 1) : 1,
      nextPage: count > (skip + pageSize) ? pageNo + 1 : pageNo,
      lastPage: lastPage,
      from: skip <= count ? skip + 1 : 0,
      to: (count > skip + pageSize) ? skip + pageSize : count,
      total: count,
      data: res || []
    }
  }

  /**
   * Add
   * @param entity 
   * @returns 
   */
  Add(entity: UserEntity | UserEntity[]) {
    return UserEntity.insert(entity)
  }

  /**
   * @description: Update           
   * @param {UserEntity} entity
   * @param {FindOptionsWhere} where
   * @return {*}
   */
  Update(entity: UserEntity, where: FindOptionsWhere<UserEntity>) {
    return UserEntity.update(where, entity);
  }

  /**
   * Delete
   * @param where 
   * @returns 
   */
  Delete(where: FindOptionsWhere<UserEntity>) {
    return UserEntity.delete(where);
  }
}
