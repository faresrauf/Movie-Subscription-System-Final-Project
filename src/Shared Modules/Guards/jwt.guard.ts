/*eslint-disable*/
import { Request } from 'express';
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { config } from "dotenv";
import { IS_PUBLIC_KEY } from '../Decorators/public.decorator';
config();

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.get<boolean>(IS_PUBLIC_KEY, context.getHandler());
        if (isPublic) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException('Provide a token!');
        }

        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.SECRET_KEY
            });
            const userid = payload.id;

            // Append username to the request object
            request.userid = userid;
            request.role = payload.role;
        } catch {
            throw new UnauthorizedException();
        }

        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        return request.headers.authorization;
    }
}