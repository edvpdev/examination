import { UserService } from '../user/user.service';
export declare class AuthController {
    private readonly userService;
    constructor(userService: UserService);
    login(email: string, plaintextPassword: string): Promise<{
        authJwtToken: any;
        user: {
            fullName: string;
            roles: string[];
        };
    }>;
}
