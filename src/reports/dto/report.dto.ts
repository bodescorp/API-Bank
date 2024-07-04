import { IsDateString, IsOptional } from 'class-validator';

export class FindAllParameters {
//   @IsDateString()
  @IsOptional()
  startDate?: string;
  
//   @IsDateString()
  @IsOptional()
  endDate?: string;
}
