import { Model } from 'mongoose';
import { User } from '../../interfaces/user';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<User>);
    findUser(email: string): Promise<User>;
}
