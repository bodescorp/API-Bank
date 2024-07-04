import {
  IsNotEmpty,
  IsDecimal,
  Min,
  IsOptional,
  IsUUID,
  IsEnum,
  IsNumber,
} from 'class-validator';

export enum AccountTypeEnum {
  CORRENTE = 'CORRENTE',
  POUPANCA = 'POUPANCA',
}

export class AccountDto {
  @IsUUID(4)
  @IsOptional()
  id?: string;

  @IsNotEmpty({ message: 'O nome não pode estar vazio' })
  nome: string;

  @IsNotEmpty({ message: 'O tipo de conta não pode estar vazio' })
  @IsEnum(AccountTypeEnum)
  tipo_de_conta: string;

  @IsNotEmpty({ message: 'O saldo inicial não pode estar vazio' })
  @IsNumber({}, { message: 'O valor deve ser um número' })
  @Min(0, { message: 'O saldo inicial não pode ser negativo' })
  // @IsDecimal(
  //   { decimal_digits: '2', force_decimal: true },
  //   {
  //     message:
  //       'O saldo inicial deve ser um valor decimal com duas casas decimais',
  //   },
  // )
  saldo_inicial: number;
}
