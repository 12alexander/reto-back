import { IsAlphanumeric, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  readonly name;

  @IsNotEmpty()
  @IsEmail()
  readonly email;

  @IsNotEmpty()
  @IsAlphanumeric()
  readonly pass;
}
