import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { BooksService } from './books.service';
import { AppModule } from '../app.module';
import { IBook } from './interfaces/book.interface';

describe('E2e tests', () => {
  let app: INestApplication;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let booksService: BooksService;

  const book: IBook = {
    title: 'Война и Мир',
    description: 'Титанический труд',
    authors: 'Л.Н. Толстой',
    favorite: true,
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    booksService = moduleRef.get<BooksService>(BooksService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('Создание книги', async () => {
    await request(app.getHttpServer())
      .post('/books')
      .send(book)
      .expect(201)
      .then((response) => {
        expect(response.body.title).toBe(book.title);
        expect(response.body.description).toBe(book.description);
        expect(response.body.authors).toBe(book.authors);
        expect(response.body.favorite === 'true').toBe(book.favorite);
      });
  });

  it('Получить все книги', async () => {
    // предсоздание книги
    await request(app.getHttpServer()).post('/books').send(book).expect(201);

    await request(app.getHttpServer())
      .get('/books')
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body[0]._id).toBeDefined();
        expect(response.body[0].title).toBeDefined();
        expect(response.body[0].description).toBeDefined();
        expect(response.body[0].authors).toBeDefined();
        expect(response.body[0].favorite).toBeDefined();
      });
  });

  it('Получить книгу по ID', async () => {
    let bookId = '';
    // предсоздание книги
    await request(app.getHttpServer())
      .get('/books')
      .expect(200)
      .then((response) => {
        bookId = response.body[0]._id;
      });

    await request(app.getHttpServer())
      .get(`/books/${bookId}`)
      .expect(200)
      .then((response) => {
        expect(response.body.title).toBeDefined();
        expect(response.body.description).toBeDefined();
        expect(response.body.authors).toBeDefined();
        expect(response.body.favorite).toBeDefined();
      });
  });

  it('Обновление книги', async () => {
    let bookId = '';
    // предсоздание книги
    await request(app.getHttpServer())
      .get('/books')
      .send(book)
      .expect(200)
      .then((response) => {
        bookId = response.body[0]._id;
      });

    const updateBook: IBook = {
      title: '1',
      description: '2',
      authors: '3',
      favorite: true,
    };

    await request(app.getHttpServer())
      .put(`/books/update/${bookId}`)
      .send(updateBook)
      .expect(200)
      .then((response) => {
        expect(response.body._id).toBe(bookId);
        expect(response.body.title).toBe(updateBook.title);
        expect(response.body.description).toBe(updateBook.description);
        expect(response.body.authors).toBe(updateBook.authors);
        expect(response.body.favorite === 'true').toBe(updateBook.favorite);
      });
  });

  it('Удаление книги', async () => {
    let bookId = '';
    await request(app.getHttpServer())
      .get('/books')
      .send(book)
      .expect(200)
      .then((response) => {
        bookId = response.body[0]._id;
      });

    await request(app.getHttpServer())
      .delete(`/books/delete/${bookId}`)
      .expect(200);

    await request(app.getHttpServer())
      .get(`/books/${bookId}`)
      .expect(404)
      .then((response) => {
        expect(response.body.message).toBe('Книга не найдена');
      }); // книга не найдена
  });
});
