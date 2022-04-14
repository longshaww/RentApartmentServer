import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { PhieuDatPhong } from "./PhieuDatPhong";

@Index(
  "PK__ChiTietD__ABCCB672AA8BC6CF",
  ["maChiTietDatPhong", "maCanHo", "maBct", "maDatPhong", "maKhachHang"],
  { unique: true }
)
@Entity("ChiTietDatPhong", { schema: "dbo" })
export class ChiTietDatPhong {
  @Column("nvarchar", { primary: true, name: "MaChiTietDatPhong", length: 255 })
  maChiTietDatPhong: string;

  @Column("nvarchar", { primary: true, name: "MaCanHo", length: 255 })
  maCanHo: string;

  @Column("nvarchar", { primary: true, name: "MaBCT", length: 255 })
  maBct: string;

  @Column("nvarchar", { primary: true, name: "MaDatPhong", length: 255 })
  maDatPhong: string;

  @Column("nvarchar", { primary: true, name: "MaKhachHang", length: 255 })
  maKhachHang: string;

  @Column("float", { name: "TongTienCanHo", precision: 53 })
  tongTienCanHo: number;

  @Column("int", { name: "SoLuongCanHo" })
  soLuongCanHo: number;

  @Column("datetime", { name: "ThoiGianNhan" })
  thoiGianNhan: Date;

  @Column("datetime", { name: "ThoiGianTra" })
  thoiGianTra: Date;

  @ManyToOne(
    () => PhieuDatPhong,
    (phieuDatPhong) => phieuDatPhong.chiTietDatPhongs
  )
  @JoinColumn([
    { name: "MaDatPhong", referencedColumnName: "maDatPhong" },
    { name: "MaCanHo", referencedColumnName: "maCanHo" },
    { name: "MaBCT", referencedColumnName: "maBct" },
    { name: "MaKhachHang", referencedColumnName: "maKhachHang" },
  ])
  phieuDatPhong: PhieuDatPhong;
}