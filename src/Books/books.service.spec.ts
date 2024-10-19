import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { getModelToken } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import { Model } from 'mongoose';
import { IBook } from './interfaces/book.interface';

describe('BooksService(unit)', () => {
  let bookService: BooksService;
  let modelBook: Model<Book>;

  // Mock объект для модели книги
  const mockModel = {
    find: jest.fn(),
    findOne: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
    create: jest.fn(),
  };

  const mockDbConnection = {
    // Mock функция для соединения с базой данных
    close: jest.fn(),
  };

  const mockBook: IBook = {
    id: '66fd9e273bc79a271210cb4d',
    title: 'Война и Мир',
    description: 'Титанический труд',
    authors: 'Л.Н. Толстой',
    favorite: true,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getModelToken(Book.name),
          useValue: mockModel,
        },
        {
          provide: 'DatabaseConnection', // Добавляем mock для DatabaseConnection
          useValue: mockDbConnection,
        },
      ],
    }).compile();

    // Получаем сервис и модель
    bookService = module.get<BooksService>(BooksService);
    modelBook = module.get<Model<Book>>(getModelToken(Book.name));
  });

  it('Должен быть определен', () => {
    expect(bookService).toBeDefined();
  });

  it('Создание книги', async () => {
    const book: IBook = {
      id: '66fd9e273bc79a271210cb4d',
      title: 'Война и Мир',
      description: 'Титанический труд',
      authors: 'Л.Н. Толстой',
      favorite: true,
    };

    (modelBook.create as jest.Mock).mockResolvedValue(book);

    const result = await bookService.createBook(book);

    expect(result).toEqual(book);
    expect(modelBook.create).toHaveBeenCalledWith(book);
    expect(modelBook.create).toHaveBeenCalledTimes(1);
  });

  it('Ошибка при создании книги', async () => {
    const errorMessage = 'Ошибка создания книги';
    (modelBook.create as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(bookService.createBook({ ...mockBook })).rejects.toThrow(
      errorMessage,
    );
  });

  it('Поиск книги', async () => {
    (modelBook.findOne as jest.Mock).mockResolvedValue(mockBook);

    const foundBook = await bookService.findOne(mockBook.id);

    expect(foundBook).toBeDefined();
    expect(foundBook).toEqual(mockBook);
  });

  it('Найти все книги', async () => {
    (modelBook.find as jest.Mock).mockResolvedValue([mockBook, mockBook]);

    const books = await bookService.findAll();

    expect(books).toBeDefined();
    expect(books).toHaveLength(2);
    expect(books).toEqual([mockBook, mockBook]);
    expect(modelBook.find).toHaveBeenCalled();
  });

  it('Обновить книгу', async () => {
    const book: IBook = {
      id: '66fd9e273bc79a271210cb4d',
      title: 'Война и Мир',
      description: 'Титанический труд',
      authors: 'Л.Н. Толстой',
      favorite: true,
    };

    (modelBook.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockBook);

    const updatedBook = await bookService.update(book, mockBook.id);

    expect(updatedBook).toBeDefined();
    expect(updatedBook).toEqual(mockBook);
    expect(modelBook.findByIdAndUpdate).toHaveBeenCalledWith(
      mockBook.id,
      book,
      { new: true },
    );
  });

  it('Удалить книгу', async () => {
    (modelBook.findByIdAndDelete as jest.Mock).mockResolvedValue(mockBook);

    const deletedBook = await bookService.delete(mockBook.id);

    expect(deletedBook).toBeDefined();
    expect(deletedBook).toEqual(mockBook);
  });
});
