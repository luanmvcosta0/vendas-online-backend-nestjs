import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { User } from './interfaces/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    private users: User[] = [];

    //Lógica do método para buscar todos os usuarios
    async getAllUser(): Promise<User[]> {
        return this.users;
    }

    //Lógica para o método de criar usuarioç
    async createUser(createUserDto: CreateUserDto): Promise<User>{
        //Lógicac da criptografia da senha:
        const saltOrRounds = 10;
        const passwordHashed = await bcrypt.hash(createUserDto.password, saltOrRounds);

        const user: User = {
            ...createUserDto,
            id: this.users.length + 1,
            password: passwordHashed
        }

        this.users.push(user);

        console.log('passwordHashed:', passwordHashed)

        //Retorno da criptografia da senha(Lógica do código acuma):
        return user;
    }
}
