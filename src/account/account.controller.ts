import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountDto } from './dto/account.dto';
import { FindAllParameters } from './dto/account.findParams.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateAccountDto } from './dto/update.account.dto';

@UseGuards(AuthGuard)
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  async create(@Body() createAccountDto: AccountDto) {
    return await this.accountService.create(createAccountDto);
  }

  @Get()
  async findAll(@Query() params: FindAllParameters): Promise<AccountDto[]> {
    return await this.accountService.findAll(params);
  }

  @Get('/:id')
  async findOne(@Param('id') id: string): Promise<AccountDto> {
    return await this.accountService.findOne(id);
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() updateAccountDto:UpdateAccountDto) {
    await this.accountService.update(id, updateAccountDto);
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return await this.accountService.remove(id);
  }
}
