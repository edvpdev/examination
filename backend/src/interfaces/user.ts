import { IsArray, IsString } from 'class-validator';
import { Document } from 'mongoose';

export class User extends Document {
  @IsString() id: string;
  @IsArray() roles: string[];
  @IsString() fullName: string;
  @IsString() email: string;
  @IsString() password: string;
}
