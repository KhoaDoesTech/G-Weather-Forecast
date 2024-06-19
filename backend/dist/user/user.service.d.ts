import { User } from './user.schema';
import { EmailService } from '../email/email.service';
import { UserRepository } from '../user/user.repository';
export declare class UserService {
    private readonly userRepository;
    private readonly emailService;
    constructor(userRepository: UserRepository, emailService: EmailService);
    register(email: string, city: string): Promise<User>;
    confirmEmail(email: string): Promise<User>;
    unsubscribe(email: string): Promise<User>;
}
