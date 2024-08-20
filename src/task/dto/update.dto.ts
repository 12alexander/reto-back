import { IsString, IsNotEmpty, IsMongoId } from 'class-validator';

export class UpdateTaskDto {
  @IsMongoId()
  @IsNotEmpty()
  readonly _id: string;

  @IsString()
  @IsNotEmpty()
  readonly task: string;
}
