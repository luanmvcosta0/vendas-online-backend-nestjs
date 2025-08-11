import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import type { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { ReturnUserDto } from './dtos/returnUser.dto';

@Controller('user')
export class UserController {
    
    // Injeta o service no controller para acessar a lógica de negócio.
    constructor(private readonly userService: UserService) {};

    //Método para buscar todos os usuários
    @Get()
    async getAllUsers(): Promise<ReturnUserDto[]> {
        return (await this.userService.getAllUser()).map((userEntity) => 
            new ReturnUserDto(userEntity));
    }

    //Método para crirar um usuário
    @UsePipes(ValidationPipe)
    @Post()
    async createUser(@Body() createUser: CreateUserDto): Promise<UserEntity> {
        return this.userService.createUser(createUser);
    }

}