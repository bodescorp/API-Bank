import { IsString, IsOptional, IsEnum } from 'class-validator';
import { AccountTypeEnum } from './account.dto';

export class FindAllParameters {
  @IsString({ message: 'O nome deve ser uma string' })
  @IsOptional()
  nome?: string;

  @IsEnum(AccountTypeEnum)
  @IsOptional()
  tipo_de_conta?: string;
}
