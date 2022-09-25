import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateBookDto,
  EditBookDto,
} from './dto';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  getBooks(userId: number) {
    return this.prisma.book.findMany({
      where: {
        userId,
      },
    });
  }

  getBookById(
    userId: number,
    bookId: number,
  ) {
    return this.prisma.book.findFirst({
      where: {
        id: bookId,
        userId,
      },
    });
  }

  async createBook(
    userId: number,
    dto: CreateBookDto,
  ) {
    const book =
      await this.prisma.book.create({
        data: {
          userId,
          ...dto,
        },
      });

    return book;
  }

  async editBookById(
    userId: number,
    bookId: number,
    dto: EditBookDto,
  ) {
    // get the book by id
    const book =
      await this.prisma.book.findUnique({
        where: {
          id: bookId,
        },
      });

    // check if user owns the book
    if (!book || book.userId !== userId)
      throw new ForbiddenException(
        'Access to resources denied',
      );

    return this.prisma.book.update({
      where: {
        id: bookId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteBookById(
    userId: number,
    bookId: number,
  ) {
    const book =
      await this.prisma.book.findUnique({
        where: {
          id: bookId,
        },
      });

    // check if user owns the book
    if (!book || book.userId !== userId)
      throw new ForbiddenException(
        'Access to resources denied',
      );

    await this.prisma.book.delete({
      where: {
        id: bookId,
      },
    });
  }
}
