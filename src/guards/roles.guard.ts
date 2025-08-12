import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { LoginPayLoad } from 'src/auth/dtos/loginPayload.dto';
import { ROLES_KEY } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/user-type.enum';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private readonly jwtService: JwtService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<UserType[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()],
        );

        if (!requiredRoles) {
            return true;
        }

        const { authorization } = context.switchToHttp().getRequest().headers;

        const loginPayload: LoginPayLoad | undefined = await this.jwtService
            .verifyAsync(authorization, {
            secret: process.env.JWT_SECRET,
        })
        .catch(() => undefined);

        if (!loginPayload) {
            return false;
        }

        return requiredRoles.some(role => Number(role) === loginPayload.typeUser);
    }
}