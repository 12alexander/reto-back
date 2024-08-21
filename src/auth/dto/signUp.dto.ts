import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Validate,
  ValidationArguments,
} from 'class-validator';

import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'matchPassword', async: false })
export class MatchPassword implements ValidatorConstraintInterface {
  validate(repass: string, args: ValidationArguments): boolean {
    const [object] = args.constraints;
    return object.pass === repass;
  }

  defaultMessage(): string {
    return 'Passwords do not match';
  }
}

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  readonly name;

  @IsNotEmpty()
  @IsEmail()
  readonly email;

  @IsNotEmpty()
  @IsStrongPassword()
  readonly pass;

  @IsNotEmpty()
  @IsStrongPassword()
  @Validate(MatchPassword, ['pass'])
  readonly repass;
}
