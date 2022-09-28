import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class EditStoreDto {
  @IsString()
  @IsOptional()
  name?: string;

}
