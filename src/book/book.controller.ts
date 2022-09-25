import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { BookService } from './book.service';
import {
  CreateBookDto,
  EditBookDto,
} from './dto';

@UseGuards(JwtGuard)
@Controller('books')
export class BookController {
  constructor(
    private bookService: BookService,
  ) {}

  @Get()
  getBooks(@GetUser('id') userId: number) {
    return this.bookService.getBooks(
      userId,
    );
  }

  @Get(':id')
  getBookById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookId: number,
  ) {
    return this.bookService.getBookById(
      userId,
      bookId,
    );
  }

  @Post()
  createBook(
    @GetUser('id') userId: number,
    @Body() dto: CreateBookDto,
  ) {
    return this.bookService.createBook(
      userId,
      dto,
    );
  }

  @Patch(':id')
  editBookById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookId: number,
    @Body() dto: EditBookDto,
  ) {
    return this.bookService.editBookById(
      userId,
      bookId,
      dto,
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteBookById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookId: number,
  ) {
    return this.bookService.deleteBookById(
      userId,
      bookId,
    );
  }
}
