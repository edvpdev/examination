import { IsArray, IsString } from 'class-validator';

export class User {
  @IsString() id: string;
  @IsArray() roles: string[];
  @IsString() fullName: string;
  @IsString() email: string;
  @IsString() password: string;
}
