import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  HttpStatus,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentDto } from './dto/payment.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from './utils/file-filter';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  async create(@Body() createPaymentDto: PaymentDto) {
    return await this.paymentService.create(createPaymentDto);
  }

  @Get('/:id')
  async findOne(@Param('id') id: string): Promise<PaymentDto> {
    return await this.paymentService.findOne(id);
  }

  @UseInterceptors(FileInterceptor('file', { fileFilter }))
  @Post('/:id/upload-file')
  async addImageTopayment(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
  ) {
    return await this.paymentService.addFileToPayment(file, id);
  }
}
