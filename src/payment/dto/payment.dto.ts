import {
  IsUUID,
  IsOptional,
  IsNotEmpty,
  IsNumber,
  Min,
  IsDate,
  IsString,
} from 'class-validator';

export class PaymentDto {
  @IsUUID(4)
  @IsOptional()
  id?: string;

  @IsNotEmpty()
  @IsUUID(4)
  id_account: string;

  @IsNotEmpty()
  @IsNumber({}, { message: 'O valor deve ser um número' })
  @Min(0, { message: 'O valor não pode ser negativo' })
  // @IsDecimal(
  //   { decimal_digits: '2', force_decimal: true },
  //   {
  //     message:
  //       'O saldo inicial deve ser um valor decimal com duas casas decimais',
  //   },
  // )
  valor: number;

  @IsNotEmpty()
  // @IsDate({ message: 'A data deve ser válida' })
  data: Date;

  @IsString({ message: 'A descrição deve ser uma string' })
  descricao?: string;

  image?:string
}
