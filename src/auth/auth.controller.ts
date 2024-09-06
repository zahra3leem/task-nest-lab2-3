import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  async signIn(@Body() user: LoginDto) {
    const loggedInUser = await this.authService.signIn(user);
    const token = await this.authService.generateToken(loggedInUser);
    return { message: 'logged in successfully', user: loggedInUser, token };
  }
  @Post('signup')
  async signup(@Body() user: CreateUserDto) {
    const newUser = await this.authService.signUp(user);
    const token = await this.authService.generateToken(newUser);
    return { message: 'signup successful', user: newUser, token };
  }
}
