import { Body, Controller, Get, Post } from '@nestjs/common';
import type { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { User } from './interfaces/user.interface';

@Controller('user')
export class UserController {
    
    // Injeta o service no controller para acessar a lógica de negócio.
    constructor(private readonly userService: UserService) {};

    //Método para buscar todos os usuários
    @Get()
    async getAllUsers(): Promise<User[]> {
        return this.userService.getAllUser();
    }

    //Método para crirar um usuário
    @Post()
    async createUser(@Body() createUser: CreateUserDto): Promise<User> {
        return this.userService.createUser(createUser);
    }

}