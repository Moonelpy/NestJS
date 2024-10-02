import { Injectable } from '@nestjs/common';
import { BookDto } from './dto/book.dto';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './schemas/book.schema';
import { Connection, Model } from 'mongoose';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private BookModel: Model<BookDocument>,
    @InjectConnection() private connections: Connection,
  ) {}

  async createBook(data): Promise<BookDocument> {
    const newBook = await new this.BookModel(data);

    return newBook.save();
  }

  async findAll(): Promise<BookDocument[]> {
    const books = await this.BookModel.find({});

    return books;
  }

  async findOne(id: string): Promise<BookDocument> {
    const book = await this.BookModel.findOne({ _id: id });
    return book;
  }

  async update(createBook: BookDto, id: string): Promise<BookDocument> {
    const updatedBook = await this.BookModel.findByIdAndUpdate(id, createBook, {
      new: true,
    });
    return updatedBook;
  }

  async delete(id: string) {
    await this.BookModel.findOneAndDelete({ _id: id });
  }
}
