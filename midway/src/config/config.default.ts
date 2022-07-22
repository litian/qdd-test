import { MidwayConfig } from '@midwayjs/core';
import path = require('path');

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1658390295623_1587',
  koa: {
    port: 7001,
  },
  orm: {
    type: 'sqlite',
    database: '/Users/lijianchun/opt/sqlite/test.db',
    entities: [path.resolve(__dirname, '../entity/*.entity.ts')],
    synchronize: true,
    logging: true,
  },
  jwt: {
    secret: 'xxx', // fs.readFileSync('xxxxx.key')
    expiresIn: '2d', // https://github.com/vercel/ms
  },
} as MidwayConfig;
