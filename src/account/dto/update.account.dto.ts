import { PartialType } from '@nestjs/mapped-types';
import { AccountDto, AccountTypeEnum } from './account.dto';
import { IsEnum, IsOptional, Min } from 'class-validator';

export class UpdateAccountDto extends PartialType(AccountDto) {
    @IsOptional()
  nome?: string;

  @IsOptional()
  @IsEnum(AccountTypeEnum, { message: 'Tipo de conta inválido' })
  tipo_de_conta?: string;

  @IsOptional()
  @Min(0, { message: 'O saldo inicial não pode ser negativo' })
  saldo_inicial?: number;
}
