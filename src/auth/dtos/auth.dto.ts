import { IsNumber, IsString } from 'class-validator';
import { Request } from 'express';

export class AuthResponseDto {
  @IsString()
  token: string;

  @IsNumber()
  expiresIn: number;
}

export interface RequestWithUserId extends Request {
  user: {
    sub: string;

    username: string;
  };
}
