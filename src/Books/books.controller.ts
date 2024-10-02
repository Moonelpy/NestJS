import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { BookDto } from './dto/book.dto';
@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Post()
  createBook(@Body() book: BookDto) {
    return this.bookService.createBook(book);
  }
  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(id);
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() book: BookDto) {
    return this.bookService.update(book, id);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: string) {
    return this.bookService.delete(id);
  }

  @Delete('delete')
  deleteAll() {
    return this.bookService.deleteAll();
  }
}
