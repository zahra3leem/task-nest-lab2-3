import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwt: JwtService,
  ) {}

  async signIn(user: LoginDto) {
    const storedUser: User = await this.usersService.findOneByEmail(user.email);
    if (!storedUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const isMatch = await bcrypt.compare(user.password, storedUser.password);
    if (!isMatch) {
      throw new HttpException('Password is incorrect', HttpStatus.UNAUTHORIZED);
    }
    return storedUser;
  }

  async signUp(createUserDto: CreateUserDto) {
    const storedUser = await this.usersService.findOneByEmail(
      createUserDto.email,
    );
    if (storedUser) {
      throw new HttpException('Email already exists', HttpStatus.CONFLICT);
      // throw new ConflictException();
    }
    if (createUserDto.password !== createUserDto.passwordConfirm) {
      throw new HttpException('Passwords do not match', HttpStatus.BAD_REQUEST);
      // throw new BadRequestException();
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    const newUser: CreateUserDto = {
      username: createUserDto.username,
      password: hashedPassword,
      email: createUserDto.email,
      age: createUserDto.age,
      passwordConfirm: null,
    };
    return await this.usersService.create(newUser);
  }

  async generateToken(user: any) {
    const token = this.jwt.signAsync({ user }, { secret: 'secret' });

    return token;
  }
}
