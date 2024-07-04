import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

import { LoginDto } from './dtos/login.dto';
import { AuthResponseDto } from './dtos/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() data: LoginDto): Promise<AuthResponseDto> {
    return await this.authService.signIn(data);
  }
}
