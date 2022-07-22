import {
  Inject,
  Controller,
  Post,
  Get,
  Query,
  Body,
} from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { JwtService } from '@midwayjs/jwt';
import { UserModel } from '../model/user.model';
import { Validate } from '@midwayjs/validate';
import { UserLoginDTO } from '../dto/user.dto';

@Controller('/api/user')
export class UserController {
  @Inject()
  ctx: Context;

  @Inject()
  userModel: UserModel;

  @Inject()
  jwtService: JwtService;

  async _login(username, password) {
    const user = await this.userModel.getUserByUsernameAndPassword(
      username,
      password
    );

    if (user) {
      const token = await this.jwtService.sign(
        { username, user_id: user.id },
        'xxx',
        {
          expiresIn: '2d',
        }
      );
      return {
        code: 200,
        result: 'success',
        message: '登录成功',
        data: { username, user_id: user.id, token },
      };
    }

    return {
      code: 400,
      result: 'error',
      message: '账号或密码不正确',
      data: null,
    };
  }

  @Get('/login')
  @Validate()
  async login(@Query() query: UserLoginDTO) {
    const { username, password } = query;
    return this._login(username, password);
  }

  @Post('/login')
  async loginPost(@Body() body: UserLoginDTO) {
    const { username, password } = body;
    return this._login(username, password);
  }

  @Post('/add')
  async add(@Body() body: UserLoginDTO) {
    const { username, password } = body;
    const res = await this.userModel.set(username, password);
    return { success: true, message: 'OK', res };
  }
  @Get('/list')
  async list() {
    const list = await this.userModel.getAll();
    return { success: true, message: 'OK', list };
  }
}
