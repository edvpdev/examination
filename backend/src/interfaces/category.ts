import { IsString } from 'class-validator';

export class Category {
  @IsString()
  title: string;
  @IsString()
  id: string;
}
