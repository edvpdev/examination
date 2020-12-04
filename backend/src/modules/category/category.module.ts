import { Module, forwardRef } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from '../../schemas/category.schema';
import { QuestionsModule } from '../questions/questions.module';

@Module({
  imports: [
    forwardRef(() => QuestionsModule),
    MongooseModule.forFeature([{ name: 'Categories', schema: CategorySchema }]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
