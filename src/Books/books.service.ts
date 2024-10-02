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
    return this.BookModel.find({});
  }

  async findOne(id: string): Promise<BookDocument> {
    return this.BookModel.findOne({ _id: id });
  }

  async update(createBook: BookDto, id: string): Promise<BookDocument> {
    return this.BookModel.findByIdAndUpdate(id, createBook, {
      new: true,
    });
  }

  async delete(id: string) {
    return this.BookModel.findOneAndDelete({ _id: id });
  }

  // Для отладки
  async deleteAll() {
    await this.BookModel.deleteMany({});
  }
}
