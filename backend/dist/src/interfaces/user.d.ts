import { Document } from 'mongoose';
export declare class User extends Document {
    id: string;
    roles: string[];
    fullName: string;
    email: string;
    password: string;
}
