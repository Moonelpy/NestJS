import { IBook } from '../interfaces/book.interface';

export class BookDto implements IBook {
  id: string;
  title: string;
  description: string;
  authors: string;
  favorite: boolean;
}
