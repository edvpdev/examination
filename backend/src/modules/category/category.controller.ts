import { CategoryService } from './category.service';
import {
  Controller,
  Put,
  Post,
  Delete,
  Get,
  Body,
  Query,
  Param,
} from '@nestjs/common';
import { Category } from '../../interfaces/category';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // @All
  // Pagination, default all
  // RETURN only title, id fields
  // IN ADMIN page, IN Question EDIT PAGE
  @Get()
  async getAllCategories(
    @Query('pageNumber') pageNumber = 1,
    @Query('pageSize') pageSize = 0,
  ): Promise<any> {
    const count: number = await this.categoryService.getCount();
    pageNumber =
      typeof pageNumber === 'string' ? parseInt(pageNumber) : pageNumber;
    pageSize = typeof pageSize === 'string' ? parseInt(pageSize) : pageSize;
    const res: Category[] = await this.categoryService.getAllCategories(
      pageNumber,
      pageSize,
    );
    return { res: res, total: count };
  }

  @Get(':id')
  async getExam(@Param('id') id: string): Promise<Category> {
    return this.categoryService.getCategory(id);
  }

  // @Admin
  // only title
  // RETURN category
  // IN admin, category edit page
  @Post()
  createCategory(@Body() category: Category): Promise<Category> {
    return this.categoryService.createCategory(category);
  }

  // @Admin
  // only title -> title
  // IN admin page
  // return updated caategory
  @Put(':id')
  updateCategory(
    @Param('id') categoryID: string,
    @Body() category: Category,
  ): Promise<Category> {
    return this.categoryService.updateCategory(categoryID, category);
  }

  // @Admin
  // IN category edit page, admin
  // RETURN success OR ERROR
  @Delete(':id')
  deleteCategory(@Param('id') categoryID: string): Promise<Category> {
    return this.categoryService.deleteCategory(categoryID);
  }
}
