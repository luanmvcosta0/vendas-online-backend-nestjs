import { Injectable, NotFoundException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UserEntity } from 'src/user/entities/user.entity';
import { LoginDto } from './dtos/login.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
    ) {}

    async login(loginDto: LoginDto): Promise<UserEntity> {
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

    return user;
}

}
