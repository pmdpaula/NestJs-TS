import { IsNumber, IsOptional, IsString, IsUppercase } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @IsUppercase()
  name: string;

  @IsNumber()
  @IsOptional()
  level: number;
}
