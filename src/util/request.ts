/**
 * @ author: richen
 * @ copyright: Copyright (c) - <richenlin(at)gmail.com>
 * @ license: MIT
 * @ version: 2019-12-12 16:36:48
 */

const retry = require('bluebird-retry');
const requestp = require('request-promise');
import { Helper, Logger } from 'koatty';


/**
 * 请求API接口
 * 
 * @param {plainObject} [form={}] 
 * @param {string} uri 
 * @param {string} [method='GET'] 
 * @param {plainObject} [headers={}] 
 * @param {number} [maxTries=3] 
 * @param {boolean} [json=true] 
 * @returns {promise}
 */
export function request(form: any = {}, uri: string, method = 'GET', headers: any = {}, maxTries = 1, json = true) {
    //
    const options: any = {
        uri,
        timeout: 10000,
        resolveWithFullResponse: true,
        pool: { maxSockets: Infinity }, // maxSockets: Infinity
        forever: true,
        strictSSL: false
    };
    if (json) {
        options.json = true; // Automatically parses the JSON string in the response
    }

    options.headers = headers;
    if (method.toUpperCase() === 'GET') {
        //get请将access_token放入header,防止参数过长
        options.headers = headers;
        options.qs = form;
        options.method = 'GET';
    } else {
        if (headers['Content-Type'] && headers['Content-Type'].indexOf('json') > -1) {
            if (options.json) {
                options.body = form;
            } else {
                options.body = JSON.stringify(form);
            }
        } else if (headers['Content-Type'] && headers['Content-Type'].indexOf('x-www-form') > -1) {
            options.form = form;
        } else if (headers['Content-Type'] && headers['Content-Type'].indexOf('multipart') > -1) {
            options.formData = form;
        } else {
            options.body = form;
        }
        //
        options.method = method;
    }
    const retryOption = {
        interval: 100, //重试时间间隔
        timeout: 30000, //总耗时长
        max_tries: maxTries //最大重试次数
    };
    if (maxTries > 1) {
        return retry(function () {
            // request
            return requestp(options).then((res: { body: any; }) => {
                // if (Helper.isEmpty(res.body)) {
                //     throw Error(JSON.stringify(res));
                // }
                return res.body;
            });
        }, retryOption).caught(function (err: any) {
            try {
                if (err.message.indexOf('{') > -1) {
                    err = JSON.parse(err.message.match(/{.*}$/)[0]);
                }
            } catch (e) { }
            Logger.write(process.env.LOGS_PATH, 'getInfoByHTTP', JSON.stringify({ uri: options.uri, headers: options.headers, form: options.form, code: err.statusCode, message: err.message }));
            return Promise.reject({ code: err.statusCode || 503, message: err.message });
        });
    } else {
        // request
        return requestp(options).then((res: { body: any; }) => {
            // if (Helper.isEmpty(res.body)) {
            //     throw Error(JSON.stringify(res));
            // }
            return res.body;
        }).catch((err: { statusCode: any; message: any; }) => {
            Logger.write(process.env.LOGS_PATH, 'getInfoByHTTP', JSON.stringify({ uri: options.uri, headers: options.headers, form: options.form, code: err.statusCode || '', message: err.message }));
            return Promise.reject({ code: err.statusCode || 503, message: err.message });
        });
    }

}
