import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PaymentDto } from './dto/payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { AccountEntity } from 'src/db/entities/account.entity';
import { PaymentEntity } from 'src/db/entities/payment.entity';
import { S3Service } from 'src/s3/s3.service';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly acconuntRepository: Repository<AccountEntity>,
    @InjectRepository(PaymentEntity)
    private readonly paymentRepository: Repository<PaymentEntity>,
    private dataSource: DataSource,
    private s3Service: S3Service,
  ) {}

  async create(createPaymentDto: PaymentDto) {
    const paymentToSave: PaymentEntity = {
      id_account: createPaymentDto.id_account,
      data: createPaymentDto.data,
      valor: createPaymentDto.valor,
      descricao: createPaymentDto.descricao,
    };
    try {
      const foundAccount = await this.acconuntRepository.findOne({
        where: { id: paymentToSave.id_account },
      });
      if (!foundAccount) {
        throw new HttpException(
          `Account not found`,
          HttpStatus.NOT_FOUND,
        );
      }
  
      if (foundAccount.saldo_inicial < paymentToSave.valor) {
        throw new HttpException(
          `Insufficient account balance`,
          HttpStatus.BAD_REQUEST,
        );
      }
      const transaction = await this.dataSource.transaction(async (manager) => {
        foundAccount.saldo_inicial -= paymentToSave.valor;
        await this.acconuntRepository.save(foundAccount);
        return await this.paymentRepository.save(paymentToSave);
      });
      return this.mapEntityToDto(transaction);
    } catch (error) {
      throw new HttpException(
        `Error creating Payment`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(id: string): Promise<PaymentDto> {
    let foundPayment: PaymentEntity;
    try {
      foundPayment = await this.paymentRepository.findOne({
        where: [{ id }],
      });
      if (!foundPayment) {
        throw new HttpException(`payment not found`, HttpStatus.NOT_FOUND);
      }
      return this.mapEntityToDto(foundPayment);
    } catch (error) {
      throw new HttpException(
        `Error retrieving Payment`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async addFileToPayment(file: Express.Multer.File, id: string) {
    try {
      const foundpayment = await this.paymentRepository.findOne({
        where: { id },
      });
      if (!foundpayment) {
        throw new HttpException(`Payment not found`, HttpStatus.NOT_FOUND);
      }
  
      const key = `${file.fieldname}${Date.now()}`;
      const imageUrl = await this.s3Service.uploadFile(file, key);
  
      await this.paymentRepository.update({ id }, { image: imageUrl });
    } catch (error) {
      throw new HttpException(
        `Error while adding file`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private mapEntityToDto(paymenteEntity: PaymentEntity): PaymentDto {
    return {
      id: paymenteEntity.id,
      id_account: paymenteEntity.id_account,
      data: paymenteEntity.data,
      descricao: paymenteEntity.descricao,
      valor: +paymenteEntity.valor,
      image: paymenteEntity.image,
    };
  }
}
