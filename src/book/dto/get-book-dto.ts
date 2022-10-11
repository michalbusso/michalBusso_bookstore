import { Type } from 'class-transformer';
import {
    IsBoolean,
    isBoolean,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    isString,
  } from 'class-validator';
  
  export class GetBookDto {

    @IsNumber()
    @IsNotEmpty()
    categoryId?: number;

    @IsString()
    @IsNotEmpty()
    orderBy?: string;


    @IsBoolean()
    @IsNotEmpty()
    asc?: boolean;
  }