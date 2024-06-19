import { UserRepository } from './user.repository';
import { User } from './user.schema';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    private sendConfirmationEmail;
    register(email: string, city: string): Promise<User>;
    confirmEmail(email: string): Promise<User>;
    unsubscribe(email: string): Promise<User>;
}
