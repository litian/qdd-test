import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework, Application } from '@midwayjs/koa';

describe('test/controller/user.test.ts', () => {
  // create app
  let app: Application;

  beforeAll(async () => {
    // 只创建一次 app，可以复用
    try {
      // 由于Jest在BeforeAll阶段的error会忽略，所以需要包一层catch
      // refs: https://github.com/facebook/jest/issues/8688
      app = await createApp<Framework>();
    } catch (err) {
      console.error('test beforeAll error', err);
      throw err;
    }
  });

  afterAll(async () => {
    // close app
    await close(app);
  });
  it('/api/user/login 登录成功', async () => {
    // make request
    const result = await createHttpRequest(app)
      .get('/api/user/login')
      .query({ username: 'jack', password: 'redballoon' });

    // use expect by jest
    expect(result.status).toBe(200);
    expect(result.body.code).toBe(200);
    expect(result.body.result).toBe('success');
    expect(result.body.data.token).not.toBeUndefined();
  });
  it('/api/user/login 登录失败', async () => {
    const resultError = await createHttpRequest(app)
      .get('/api/user/login')
      .query({ username: 'jack', password: 'redballoon1' });

    // use expect by jest
    expect(resultError.status).toBe(200);
    expect(resultError.body.code).toBe(400);
    expect(resultError.body.result).toBe('error');
  });
  it('/api/user/login 登录超时失败', async () => {
    const resultError = await createHttpRequest(app)
      .get('/api/user/login')
      .timeout(1000)
      .query({ username: 'jack', password: 'redballoon1' });

    // use expect by jest
    expect(resultError.status).toBe(200);
    expect(resultError.body.code).toBe(400);
    expect(resultError.body.result).toBe('error');
  });
});
