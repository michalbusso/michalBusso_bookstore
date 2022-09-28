import {   Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards, } from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { User as UserEntity } from '.prisma/client';
import { CartService } from './cart.service';
import { BookAddCartDto, RemoveCartItemDto } from './dto/cart.dto';
import { GlobalResponseType } from 'src/utils/type';

@UseGuards(JwtGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  async addBookToCart(
    @GetUser() userId: number,
    @Body() bookAddCartDto: BookAddCartDto,
  ) {
    return await this.cartService.addBookToCart(userId, bookAddCartDto);
  }

  @Get('view')
  async viewCartBook(    @GetUser() userId: number,
  ) {
    return await this.cartService.viewCartBook(userId);
  }

  @Delete('remove')
  async removeCartBook(
    @GetUser() userId: number,
    @Body() removeCartItemDto: RemoveCartItemDto,
  ): GlobalResponseType {
    return await this.cartService.removeCartBook(userId, removeCartItemDto);
  }
}
