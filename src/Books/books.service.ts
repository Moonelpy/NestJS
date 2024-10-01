import { Injectable } from '@nestjs/common';
import { Book } from './dto/book.dto';

@Injectable()
export class BooksService {
  private booksDataBase: Book[] = [];

  public createBook(book: Book) {
    this.booksDataBase.push(book);
    return this.booksDataBase.filter((i) => i.id === book.id);
  }

  public findAll() {
    return this.booksDataBase;
  }

  public findOne(id: string) {
    return this.booksDataBase.find((item) => item.id === id);
  }

  public update(createBook: Book, id: string) {
    const book = this.booksDataBase.find((item) => item.id === id);

    if (!book) {
      throw new Error(`Книга с ${id} не найдена`);
    }

    Object.assign(book, createBook);
    return book;
  }

  public delete(id: string) {
    const index = this.booksDataBase.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.booksDataBase.splice(index, 1);
      return true;
    }
    return false;
  }
}
