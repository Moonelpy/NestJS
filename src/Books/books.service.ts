import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './schemas/book.schema';
import { Connection, Model } from 'mongoose';
import { IBook } from './interfaces/book.interface';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private BookModel: Model<BookDocument>,
    @InjectConnection() private connections: Connection,
  ) {}

  async createBook(book: IBook): Promise<BookDocument> {
    return await this.BookModel.create(book);
  }

  async findAll(): Promise<BookDocument[]> {
    return this.BookModel.find({});
  }

  async findOne(id: string): Promise<BookDocument> {
    const bookById = await this.BookModel.findOne({ _id: id });
    if (!bookById) {
      throw new NotFoundException('Книга не найдена');
    }
    return bookById;
  }

  async update(createBook: IBook, id: string): Promise<BookDocument> {
    return this.BookModel.findByIdAndUpdate(id, createBook, {
      new: true,
    });
  }

  async delete(id: string) {
    return this.BookModel.findByIdAndDelete({ _id: id });
  }

  // Для отладки
  async deleteAll() {
    await this.BookModel.deleteMany({});
  }
}
