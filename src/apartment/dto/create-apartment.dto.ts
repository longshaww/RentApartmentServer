import { ApiProperty } from '@nestjs/swagger';

export class CreateApartmentDto {
  @ApiProperty()
  maBct: string;
  @ApiProperty()
  tenCanHo: string;
  @ApiProperty()
  dienTich: string;
  @ApiProperty()
  gia: number;
  @ApiProperty()
  soLuongKhach: number;
  @ApiProperty()
  soLuongCon: number;
  @ApiProperty()
  hinhAnh: string[];
  @ApiProperty()
  moTa: string | null;
}
