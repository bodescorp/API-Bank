import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FindAllParameters } from './dto/report.dto';
import { PaymentDto } from 'src/payment/dto/payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentEntity } from 'src/db/entities/payment.entity';
import { Between, FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly paymentRepository: Repository<PaymentEntity>,
  ) {}
  async create(
    id: string,
    params: FindAllParameters,
  ): Promise<{ payments: PaymentDto[]; totalAmount: number }> {
    const searchParams: FindOptionsWhere<PaymentEntity> = {};

    if (params.startDate && params.endDate) {
      searchParams.data = Between(
        new Date(params.startDate),
        new Date(params.endDate),
      );
    }
    try {
      const paymentFound = await this.paymentRepository.find({
        where: [{ ...searchParams, id_account: id }],
      });
      const payments = paymentFound.map((paymentEntity) =>
        this.mapEntityToDto(paymentEntity),
      );
      const totalAmount = payments.reduce(
        (sum, payment) => sum + +payment.valor,
        0,
      );

      return { payments, totalAmount };
    } catch (error) {
      throw new HttpException(
        `Error generating report`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private mapEntityToDto(paymentDto: PaymentEntity): PaymentDto {
    return {
      id: paymentDto.id,
      id_account: paymentDto.id_account,
      descricao: paymentDto.descricao,
      data: paymentDto.data,
      valor: +paymentDto.valor,
    };
  }
}
