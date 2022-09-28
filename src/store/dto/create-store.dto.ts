import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateStoreDto {
  @IsString()
  @IsNotEmpty()
  name: string;

}
