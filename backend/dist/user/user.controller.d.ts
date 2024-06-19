import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    register(email: string, city: string): Promise<import("./user.schema").User>;
    confirmEmail(email: string): Promise<import("./user.schema").User>;
    unsubscribe(email: string): Promise<import("./user.schema").User>;
}
