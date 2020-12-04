import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as password from 'password-hash-and-salt';
import * as jwt from 'jsonwebtoken';
import * as bcryptjs from 'bcryptjs';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') plaintextPassword: string,
  ) {
    const user = await this.userService.findUser(email);

    if (!user) {
      console.log('User does exist on the database.');
      throw new UnauthorizedException('User with such email does not exist');
    }

    const doMatch = await bcryptjs.compare(plaintextPassword, user.password);
    if (doMatch) {
      const authJwtToken = jwt.sign(
        { fullName: user.fullName, roles: user.roles },
        process.env.JWT_SECRET,
      );

      return {
        authJwtToken,
        user: { fullName: user.fullName, roles: user.roles },
      };
    } else {
      throw new UnauthorizedException('Incorrect Password');
    }
  }
}
