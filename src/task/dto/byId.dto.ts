import { IsNotEmpty, IsMongoId } from 'class-validator';

export class ByIdTaskDto {
  @IsMongoId()
  @IsNotEmpty()
  readonly _id: string;
}
