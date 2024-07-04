import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { PaymentDto } from 'src/payment/dto/payment.dto';
import { FindAllParameters } from './dto/report.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('/:id')
  async create(
    @Param('id') id: string,
    @Query() params: FindAllParameters,
  ): Promise<{ payments: PaymentDto[]; totalAmount: number }> {
    return await this.reportsService.create(id, params);
  }
}
