import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';

@Provide()
export class UserModel {
  @InjectEntityModel(UserEntity)
  userRepo: Repository<UserEntity>;

  /**
   * 根据用户名和密码获取用户信息
   * @param username {String} 用户名
   * @param password {String} 用户密码
   */
  async getUserByUsernameAndPassword(username, password): Promise<UserEntity> {
    // console.log(44444);
    // save entity
    const user = await this.userRepo.findOne({ where: { username, password } });
    // console.log('get user res:', user);
    return user;
  }
  async getAll() {
    const list = await this.userRepo.find({});
    // console.log('get user res:', list);
    return list;
  }
  /**
   * 插入用户
   * @param username {String} 用户名
   * @param password {String} 用户密码
   */
  async set(username, password) {
    const user = new UserEntity();
    user.username = username;
    user.password = password;
    const res = await this.userRepo.save(user);
    console.log('insert user res:', res);
  }
}
