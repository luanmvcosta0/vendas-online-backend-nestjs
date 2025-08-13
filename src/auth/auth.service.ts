import { Injectable, NotFoundException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dtos/login.dto';
import { UserService } from '../user/user.service';
import { ReturnLogin } from './dtos/returnLogin.dto';
import { ReturnUserDto } from '../user/dtos/returnUser.dto';

@Injectable()
export class AuthService {

    constructor (
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async login(loginDto: LoginDto): Promise<ReturnLogin> {
    const user = await this.userService
        .findUserByEmail(loginDto.email)
        .catch(() => undefined);

    if (!user) {
        throw new NotFoundException("Email or password invalid");
    }

    const isMatch = await compare(loginDto.password, user?.password || '');

    if (!isMatch) {
        throw new NotFoundException("Email or password invalid");
    }

    return {
        accessToken: this.jwtService.sign({ id: 1 }),
        user: new ReturnUserDto(user),
    };
}

}
