import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDto } from './dto/users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  async create(@Body() user: UsersDto) {
    return await this.usersService.create(user);
  }
}
