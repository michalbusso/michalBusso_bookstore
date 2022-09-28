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
import { StoreService } from './store.service';
import {
  CreateStoreDto,
  EditStoreDto,
} from './dto';

@UseGuards(JwtGuard)
@Controller('stores')
export class StoreController {
  constructor(
    private storeService: StoreService,
  ) {}

  @Get()
  getStores(@GetUser('id') userId: number) {
    return this.storeService.getStores(
      userId,
    );
  }

  @Get(':id')
  getStoreById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) storeId: number,
  ) {
    return this.storeService.getStoreById(
      userId,
      storeId,
    );
  }

  @Post()
  createStore(
    @GetUser('id') userId: number,
    @Body() dto: CreateStoreDto,
  ) {
    //return this.storeService.createStore(
    //  userId,
    //  dto,
    //);
  }

  @Patch(':id')
  editStoreById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) storeId: number,
    @Body() dto: EditStoreDto,
  ) {
    return this.storeService.editStoreById(
      userId,
      storeId,
      dto,
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteStoreById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) storeId: number,
  ) {
    return this.storeService.deleteStoreById(
      userId,
      storeId,
    );
  }
}
