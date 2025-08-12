import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    //Lógica do método para buscar todos os usuarios
    async getAllUser(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }

    //Lógica para o método de criar usuarioç
    async createUser(createUserDto: CreateUserDto): Promise<UserEntity>{

        //Lógicac da criptografia da senha:
        const saltOrRounds = 10;

        const passwordHashed = await bcrypt.hash(createUserDto.password, saltOrRounds);

        return this.userRepository.save({
            ...createUserDto,
            typeUser: 1,
            password: passwordHashed,
        });
    }

    async getUserByIdUsingRelations(userId: number): Promise<UserEntity | null> {
        return this.userRepository.findOne({
            where: {
                id: userId,
            },
            relations: {
                addresses: {
                    city: {
                        state: true,
                    }
                }
            },
        });
    }

    async findUserById(userId: number): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: {
                id: userId,
            }
        });

        if (!user) {
            throw new NotFoundException(`UserId: ${userId} not found`);
        }

        return user;
    }

    async findUserByEmail(email: string): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: {
                email,
            }
        });

        if (!user) {
            throw new NotFoundException(`Email: ${email} not found`);
        }

        return user;
    }
}
