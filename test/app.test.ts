/*
 * @Description: 
 * @Usage: 
 * @Author: richen
 * @Date: 2022-03-10 11:49:05
 * @LastEditTime: 2022-03-10 19:01:59
 */
import request from 'supertest';
import { ExecBootStrap } from 'koatty';
import { App } from '../src/App';


describe('UT example', () => {

  let server: any;
  beforeAll(async () => {
    jest.useFakeTimers();
    const appInstance = await ExecBootStrap()(App);
    server = await appInstance.listen();
  });

  afterAll(done => {
    server.close();
    done();
  });

  it('request', async () => {
    const rsp = await request(server).get('/');
    expect(rsp.status).toBe(200);
  });
});