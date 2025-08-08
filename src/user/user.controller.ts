import { Body, Controller, Get, Post } from '@nestjs/common';
import type { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { UserEntity } from './interfaces/user.entity';

@Controller('user')
export class UserController {
    
    // Injeta o service no controller para acessar a lógica de negócio.
    constructor(private readonly userService: UserService) {};

    //Método para buscar todos os usuários
    @Get()
    async getAllUsers(): Promise<UserEntity[]> {
        return this.userService.getAllUser();
    }

    //Método para crirar um usuário
    @Post()
    async createUser(@Body() createUser: CreateUserDto): Promise<UserEntity> {
        return this.userService.createUser(createUser);
    }

}