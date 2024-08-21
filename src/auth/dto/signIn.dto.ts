import { IsAlphanumeric, IsEmail, IsNotEmpty } from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email;

  @IsNotEmpty()
  @IsAlphanumeric()
  readonly pass;
}
