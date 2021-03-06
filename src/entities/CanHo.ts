import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BenChoThue } from './BenChoThue';
import { CanHoTienNghiCanHo } from './CanHoTienNghiCanHo';
import { HinhAnhCanHo } from './HinhAnhCanHo';
import { NgayDaDat } from './NgayDaDat';
import { PhieuDatPhong } from './PhieuDatPhong';

@Entity('CanHo', { schema: 'dbo' })
export class CanHo {
  @Column('nvarchar', { primary: true, name: 'MaCanHo', length: 255 })
  maCanHo: string;

  @Column('nvarchar', { primary: true, name: 'MaBCT', length: 255 })
  maBct: string;

  @Column('nvarchar', { name: 'TenCanHo', length: 255 })
  tenCanHo: string;

  @Column('nvarchar', { name: 'DienTich', length: 255 })
  dienTich: string;

  @Column('float', { name: 'Gia', precision: 53 })
  gia: number;

  @Column('int', { name: 'SoLuongKhach' })
  soLuongKhach: number;

  @Column('ntext', { name: 'MoTa', nullable: true })
  moTa: string | null;

  @Column('int', { name: 'SoLuongCon' })
  soLuongCon: number;

  @Column('nvarchar', { name: 'ThongTinGiuong', length: 255 })
  thongTinGiuong: string;

  @Column('datetime', { name: 'ThoiGianCapNhat', nullable: true })
  thoiGianCapNhat: Date;

  @ManyToOne(() => BenChoThue, (benChoThue) => benChoThue.canHos)
  @JoinColumn([{ name: 'MaBCT', referencedColumnName: 'maBct' }])
  maBct2: BenChoThue;

  @OneToMany(
    () => CanHoTienNghiCanHo,
    (canHoTienNghiCanHo) => canHoTienNghiCanHo.canHo,
  )
  canHoTienNghiCanHos: CanHoTienNghiCanHo[];

  @OneToMany(() => HinhAnhCanHo, (hinhAnhCanHo) => hinhAnhCanHo.canHo)
  hinhAnhCanHos: HinhAnhCanHo[];

  @OneToMany(() => NgayDaDat, (ngayDaDat) => ngayDaDat.canHo)
  ngayDaDats: NgayDaDat[];

  @OneToMany(() => PhieuDatPhong, (phieuDatPhong) => phieuDatPhong.canHo)
  phieuDatPhongs: PhieuDatPhong[];
  tienNghiCanHo: [];
}
