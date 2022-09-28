import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { identity } from 'rxjs';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateStoreDto,
  EditStoreDto,
} from './dto';

@Injectable()
export class StoreService {
  constructor(private prisma: PrismaService) {}

  getStores(userId: number) {
    return this.prisma.store.findMany({
      where: {
        userId,
      },
    });
  }

  getStoreById(
    userId: number,
    storeId: number,
  ) {
    return this.prisma.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });
  }

  /*async createStore(
    userId: number,
    dto: CreateStoreDto,
  ) {
    const store =
      await this.prisma.store.create({
        data:{
          userId: userId,
          

        }
      });

    return store;
  }*/

  async editStoreById(
    userId: number,
    storeId: number,
    dto: EditStoreDto,
  ) {
    // get the store by id
    const store =
      await this.prisma.store.findUnique({
        where: {
          id: storeId,
        },
      });

    // check if user owns the store
    if (!store || store.userId !== userId)
      throw new ForbiddenException(
        'Access to resources denied',
      );

    return this.prisma.store.update({
      where: {
        id: storeId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteStoreById(
    userId: number,
    storeId: number,
  ) {
    const store =
      await this.prisma.store.findUnique({
        where: {
          id: storeId,
        },
      });

    // check if user owns the store
    if (!store || store.userId !== userId)
      throw new ForbiddenException(
        'Access to resources denied',
      );

    await this.prisma.store.delete({
      where: {
        id: storeId,
      },
    });
  }
}
