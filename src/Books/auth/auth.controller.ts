import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.auth.guard';
import { User } from '../schemas/user.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signUp')
  @UsePipes(ValidationPipe)
  signUp(@Body() user: User) {
    return this.authService.signUp(user);
  }

  @Post('/signIn')
  async singIn(@Body() body: { email: string; password: string }) {
    return this.authService.signIn(body.email, body.password);
  }
  @Get('/getAll')
  @UseGuards(JwtAuthGuard)
  getAll() {
    return this.authService.getAll();
  }

  @Post('/cleardb')
  clearDb() {
    return this.authService.clearDb();
  }
}
