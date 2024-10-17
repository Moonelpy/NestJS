import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/users.service';
import { User } from '../schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(user: User) {
    return await this.userService.create(user);
  }

  async signIn(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = (await this.userService.findByEmail(email)) as User & {
      _id: string;
    };

    if (!user) {
      throw new UnauthorizedException('Пользователь не найден');
    }

    if (user.password !== password) {
      throw new UnauthorizedException('Неправильный пароль');
    }

    const payload = {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
    };

    const access_token = this.jwtService.sign(payload);

    return { access_token };
  }

  async getAll(): Promise<User[]> {
    const allUsers = await this.userService.findAll();
    return allUsers;
  }
  async clearDb(): Promise<string> {
    await this.userService.deleteAll();
    return 'OK';
  }
}
