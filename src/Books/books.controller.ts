import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { IBook } from './interfaces/book.interface';
import { JoiValidationPipe } from './validationJoi/JoiValidation.pipe';
import { validationSchema } from './schemas/book.validation.schema';
import { ObjectIdValidationPipe } from './pipe/ObjectId.validation.pipe';
import { ExRequestInterceptor } from './interceptors/ex-request-interceptor.service';

// @UseFilters(HttpExceptionFilter) для проверки включить, конфликт с ObjectIdValidationPipe

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @UsePipes(new JoiValidationPipe(validationSchema))
  @Post()
  createBook(@Body() book: IBook) {
    return this.bookService.createBook(book);
  }

  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ObjectIdValidationPipe) id: string) {
    return this.bookService.findOne(id);
  }

  @Put('update/:id')
  async update(
    @Param('id', ObjectIdValidationPipe) id: string,
    @Body() book: IBook,
  ) {
    const updatedBook = await this.bookService.update(book, id);
    return updatedBook;
  }

  @UseInterceptors(ExRequestInterceptor)
  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return await this.bookService.delete(id);
  }

  @Delete('delete')
  deleteAll() {
    return this.bookService.deleteAll();
  }
}
