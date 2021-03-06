/**
 * @ author: richen
 * @ copyright: Copyright (c) - <richenlin(at)gmail.com>
 * @ license: MIT
 * @ version: 2019-11-11 18:34:38
 */

const crypto = require("crypto");

/**
 * 是否MD5串
 *
 * @param {string} value
 * @returns {boolean}
 */
export function isMd5(value: string): boolean {
    return (/^[a-f0-9]{32}$/).test(value.toLowerCase());
}

/**
 * 是否邮箱
 *
 * @param {string} value
 * @returns
 */
export function email(value: string): boolean {
    const reg = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
    return reg.test(value);
}

/**
 * 是否中文姓名
 *
 * @param {string} value
 * @returns {boolean}
 */
export function cnname(value: string): boolean {
    const reg = /^[\u4E00-\u9FA5A-Za-z\s]+(·[\u4E00-\u9FA5A-Za-z]+)*$/;
    return reg.test(value);
}

/**
 * 是否身份证号码
 *
 * @param {string} value
 * @returns
 */
export function idnumber(value: string): boolean {
    if (/^\d{15}$/.test(value)) {
        return true;
    }
    if ((/^\d{17}[0-9X]$/).test(value)) {
        const vs = '1,0,x,9,8,7,6,5,4,3,2'.split(',');
        const ps: any[] = '7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2'.split(',');
        const ss: any[] = value.toLowerCase().split('');
        let r = 0;
        for (let i = 0; i < 17; i++) {
            r += ps[i] * ss[i];
        }
        const isOk = (vs[r % 11] === ss[17]);
        return isOk;
    }
    return false;
}

/**
 * 是否手机号
 *
 * @param {string} value
 * @returns {boolean}
 */
export function mobile(value: string): boolean {
    const reg = /^(13|14|15|16|17|18|19)\d{9}$/;
    return reg.test(value);
}

/**
 * 邮编
 *
 * @param {string} value
 * @returns {boolean}
 */
export function zipcode(value: string): boolean {
    const reg = /^\d{6}$/;
    return reg.test(value);
}

/**
 * url
 *
 * @param {string} value
 * @returns
 */
export function url(value: string): boolean {
    const reg = /^http(s?):\/\/(?:[A-za-z0-9-]+\.)+[A-za-z]{2,4}(?:[\/\?#][\/=\?%\-&~`@[\]\':+!\.#\w]*)?$/;
    return reg.test(value);
}

/**
 * uuid
 *
 * @param {number} len
 * @returns
 */
export function uuid(len: number) {
    const str = crypto.randomBytes(Math.ceil(len * 0.75)).toString('base64').slice(0, len);
    return str.replace(/[\+\/]/g, '_');
}
