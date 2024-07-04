import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'account' })
export class AccountEntity {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column({ type: 'varchar' })
    nome: string;

    @Column({ type: 'varchar' })
    tipo_de_conta: string;

    @Column("decimal", { precision: 10, scale: 2 })
    saldo_inicial: number;
}