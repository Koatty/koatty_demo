import { Helper } from 'koatty';

/**
 * @ author: richen
 * @ copyright: Copyright (c) - <richenlin(at)gmail.com>
 * @ license: MIT
 * @ version: 2019-11-12 09:51:33
 */

// tslint:disable-next-line: no-empty-interface
interface MapInterface {

}

interface MoInterface {
    field: any[];
    sortby: any;
    ispage: boolean;
    pagesize: number;
    page: number;
}

interface PageData {
    //总条数
    count: number;
    //总页数
    total: number;
    //每页条数
    num: number;
    //当前页码
    page: number;
    //分页数据
    data: any[];
}



/**
 * 根据查询条件生成分页结果列表
 *
 * @param {*} model
 * @param {{}} map
 * @param {MoInterface} mo
 * @returns
 */
export async function list(model: any, map: {}, mo: MoInterface = { field: [], ispage: true, page: 1, pagesize: 20, sortby: {} }) {
    let defaultData: PageData = { count: 0, total: 0, num: mo.pagesize, page: mo.page || 1, data: [] };
    if (Helper.isEmpty(model)) {
        return defaultData;
    }

    if (Helper.isEmpty(mo.field)) {
        mo.field = [];
    }
    if (Helper.isEmpty(mo.ispage)) {
        mo.ispage = true;
    }
    if (Helper.isEmpty(mo.pagesize)) {
        mo.pagesize = 20;
    }
    if (Helper.isEmpty(map)) {
        map = {};
    }
    if (Helper.isEmpty(mo.sortby)) {
        const pk = await model.getPk();
        mo.sortby = { [pk]: 'DESC' };
    }

    if (mo.ispage === true) {
        defaultData = await model.field(mo.field).where(map).order(mo.sortby).countSelect({ page: mo.page, num: mo.pagesize }).catch(() => defaultData);
        return defaultData;
    } else {
        return model.field(mo.field).where(map).order(mo.sortby).select({ page: mo.page, num: mo.pagesize }).catch((): any[] => []);
    }
}

/**
 * 根据传入数据生成分页
 *
 * @param {any[]} data
 * @param {number} page
 * @param {number} [pagesize=20]
 * @returns
 */
export async function dataList(data: any[], page: number, pagesize = 20) {
    const defaultData: PageData = { count: 0, total: 0, num: pagesize, page: page || 1, data: [] };
    if (Helper.isEmpty(data)) {
        return defaultData;
    }

    defaultData.count = data.length || 0;
    if (defaultData.count % pagesize === 0) {
        defaultData.total = Helper.toInt(defaultData.count / pagesize);
    } else {
        defaultData.total = Helper.toInt(defaultData.count / pagesize) + 1;
    }

    if (page > defaultData.total) {
        defaultData.page = defaultData.total;
    }
    defaultData.data = data.slice((defaultData.page - 1 < 0 ? 0 : defaultData.page - 1) * pagesize, pagesize);
    return defaultData;
}

/**
 *
 *
 * @param {*} model
 * @param {string} [sql=""] sql语句,不包含limit
 * @param {MoInterface} mo
 * @returns
 */
export async function sqlList(model: any, sql = "", mo: MoInterface = { field: [], ispage: true, page: 1, pagesize: 20, sortby: {} }) {
    const defaultData: PageData = { count: 0, total: 0, num: mo.pagesize, page: mo.page || 1, data: [] };
    if (Helper.isEmpty(model) || Helper.isEmpty(sql)) {
        return defaultData;
    }

    if (Helper.isEmpty(mo.field)) {
        mo.field = [];
    }
    if (Helper.isEmpty(mo.ispage)) {
        mo.ispage = true;
    }
    if (Helper.isEmpty(mo.pagesize)) {
        mo.pagesize = 20;
    }

    if (Helper.isEmpty(mo.sortby)) {
        const pk = await model.getPk();
        mo.sortby = { [pk]: 'DESC' };
    }
    if (mo.ispage === true) {
        let limit = "";
        limit = ' limit ' + (mo.page - 1 < 0 ? 0 : mo.page - 1) * mo.pagesize + ',' + mo.pagesize;
        // tslint:disable-next-line: triple-equals
        if (model.config && model.config.db_type == 'postgresql') {
            // OFFSET
            limit = ' limit ' + mo.pagesize + ' offset ' + (mo.page - 1 < 0 ? 0 : mo.page - 1) * mo.pagesize;
        }
        const resData = await Promise.all([
            model.query(`select count(*) as totalcount from (${sql}) as counttable`),
            model.query(`${sql} ${limit}`)
        ]).catch((): any[] => [[{ totalcount: 0 }], 0]);
        defaultData.count = resData[0] && resData[0][0] && resData[0][0].totalcount ? resData[0][0].totalcount : 0;
        defaultData.data = resData[1] || [];
        if (defaultData.count % mo.pagesize === 0) {
            defaultData.total = Helper.toInt(defaultData.count / mo.pagesize);
        } else {
            defaultData.total = Helper.toInt(defaultData.count / mo.pagesize) + 1;
        }

        if (mo.page > defaultData.total) {
            defaultData.page = defaultData.total;
        }
        return defaultData;
    } else {
        return model.query(sql).catch((): any[] => []);
    }
}