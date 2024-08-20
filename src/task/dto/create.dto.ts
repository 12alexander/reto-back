import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  readonly user: string;

  @IsString()
  @IsNotEmpty()
  readonly task: string;
}
