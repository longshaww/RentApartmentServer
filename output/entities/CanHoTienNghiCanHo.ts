import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { CanHo } from "./CanHo";
import { TienNghiCanHo } from "./TienNghiCanHo";

@Index(
  "PK__CanHo_Ti__D14A93D3A502E4F3",
  ["maCanHo", "maBct", "maTienNghiCanHo"],
  { unique: true }
)
@Entity("CanHo_TienNghiCanHo", { schema: "dbo" })
export class CanHoTienNghiCanHo {
  @Column("nvarchar", { primary: true, name: "MaCanHo", length: 255 })
  maCanHo: string;

  @Column("nvarchar", { primary: true, name: "MaBCT", length: 255 })
  maBct: string;

  @Column("nvarchar", { primary: true, name: "MaTienNghiCanHo", length: 255 })
  maTienNghiCanHo: string;

  @ManyToOne(() => CanHo, (canHo) => canHo.canHoTienNghiCanHos)
  @JoinColumn([
    { name: "MaCanHo", referencedColumnName: "maCanHo" },
    { name: "MaBCT", referencedColumnName: "maBct" },
  ])
  canHo: CanHo;

  @ManyToOne(
    () => TienNghiCanHo,
    (tienNghiCanHo) => tienNghiCanHo.canHoTienNghiCanHos
  )
  @JoinColumn([
    { name: "MaTienNghiCanHo", referencedColumnName: "maTienNghiCanHo" },
  ])
  maTienNghiCanHo2: TienNghiCanHo;
}