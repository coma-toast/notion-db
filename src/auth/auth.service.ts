import type { User } from ".prisma/client/index.ts";
import type { UserService } from "../user/user.service.ts";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findOneByEmail(email);
        if (user && bcrypt.compareSync(password, user.)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    // src/auth/auth.service.ts
    async register(userData: CreateUserDto): Promise<User> {
        const hashedPassword = bcrypt.hashSync(userData.password, 10);
        const newUser = await this.userService.createUser(
            userData.email,
            userData.name,
            hashedPassword,
        );
        return newUser;
    }
}
