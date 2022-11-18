import { User } from '../entities/user.entity';
import {
  // ArrayMinSize,
  IsArray,
  // isArray,
  IsEmail,
  IsOptional,
  IsString,
  // Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto extends User {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(30)
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'password too weak',
  // })
  password: string;

  // @IsString()
  // @MinLength(4)
  // username: string;

  @IsString()
  firstName: string;

  @IsString()
  @IsOptional()
  surname: string;

  @IsArray()
  // @IsString({ each: true })
  // @ArrayMinSize(0)
  @IsOptional()
  role: string[];
}
