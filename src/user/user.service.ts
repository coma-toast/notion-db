import { Injectable } from "@nestjs/common";
import type { DbService } from "../db/db.service.ts";
import type { User } from "@prisma/client";

@Injectable()
export class UserService {
    constructor(private db: DbService) {}

    async findOneByEmail(email: string): Promise<User | null> {
        return await this.db.user.findUnique({
            where: { email },
        });
    }
}
