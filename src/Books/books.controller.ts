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
import { BookDto } from './dto/book.dto';
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
  createBook(@Body() book: BookDto) {
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
  update(
    @Param('id', ObjectIdValidationPipe) id: string,
    @Body() book: BookDto,
  ) {
    return this.bookService.update(book, id);
  }

  @UseInterceptors(ExRequestInterceptor)
  @Delete('delete/:id')
  delete(@Param('id') id: string) {
    return this.bookService.delete(id);
  }

  @Delete('delete')
  deleteAll() {
    return this.bookService.deleteAll();
  }
}
