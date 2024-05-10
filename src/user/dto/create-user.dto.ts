import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {

  @IsNotEmpty()
  readonly uid!: string;

  @IsNotEmpty()
  readonly username!: string;

  @IsNotEmpty()
  readonly email!: string;

  // @IsNotEmpty()
  // readonly password!: string;
}
