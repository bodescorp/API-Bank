import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AccountDto, AccountTypeEnum } from './dto/account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from 'src/db/entities/account.entity';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { FindAllParameters } from './dto/account.findParams.dto';
import { UpdateAccountDto } from './dto/update.account.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly acconuntRepository: Repository<AccountEntity>,
  ) {}

  async create(createAccountDto: AccountDto) {
    const accountToSave: AccountEntity = {
      id: createAccountDto.id,
      nome: createAccountDto.nome,
      tipo_de_conta: createAccountDto.tipo_de_conta,
      saldo_inicial: createAccountDto.saldo_inicial,
    };
    try {
      const createdAccount = await this.acconuntRepository.save(accountToSave);
      return this.mapEntityToDto(createdAccount);
    } catch (error) {
      throw new HttpException('Invalid Account data.', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(params: FindAllParameters): Promise<AccountDto[]> {
    const searchParams: FindOptionsWhere<AccountEntity> = {};

    if (params.nome) {
      searchParams.nome = Like(`%${params.nome}%`);
    }
    if (params.tipo_de_conta) {
      searchParams.tipo_de_conta = Like(`%${params.tipo_de_conta}%`);
    }
    try {
      const accountFound = await this.acconuntRepository.find({
        where: [searchParams],
      });
      return accountFound.map((accountDto) => this.mapEntityToDto(accountDto));
    } catch (error) {
      throw new HttpException(
        'Error retrieving account',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(id: string): Promise<AccountDto> {
    let foundAccount: AccountEntity;

    try {
      foundAccount = await this.acconuntRepository.findOne({
        where: [{ id }],
      });
      if (!foundAccount) {
        throw new HttpException(`Account not found`, HttpStatus.NOT_FOUND);
      }
      return this.mapEntityToDto(foundAccount);
    } catch (error) {
      throw new HttpException(
        `Error retrieving accounts. Please check your input data.`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(id: string, updateAccountDto: UpdateAccountDto) {
    try {
      const foundAccount = await this.acconuntRepository.findOne({
        where: [{ id }],
      });

      if (!foundAccount) {
        throw new HttpException(`Account not found`, HttpStatus.NOT_FOUND);
      }

      Object.assign(foundAccount, updateAccountDto);

      await this.acconuntRepository.save(foundAccount);
    } catch (error) {
      throw new HttpException(
        `Error retrieving accounts. Please check your input data.`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: string) {
    try {
      const foundAccount = await this.acconuntRepository.findOne({
        where: [{ id }],
      });

      if (!foundAccount) {
        throw new HttpException(
          `Account not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      const result = await this.acconuntRepository.delete({ id });

      if (result.affected === 0) {
        throw new HttpException(
          `Error removing account`,
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {
      throw new HttpException(
        `Error removing account. Please check your input data.`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private mapEntityToDto(accountEntity: AccountEntity): AccountDto {
    return {
      id: accountEntity.id,
      nome: accountEntity.nome,
      tipo_de_conta: AccountTypeEnum[accountEntity.tipo_de_conta],
      saldo_inicial: +accountEntity.saldo_inicial,
    };
  }
}
