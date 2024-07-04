import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'payment' })
export class PaymentEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('uuid')
  id_account: string;

  @Column('decimal', { precision: 10, scale: 2 })
  valor: number;

  @Column({ type: 'timestamptz' })
  data: Date;

  @Column({ type: 'varchar' })
  descricao: string;

  @Column({ type: 'varchar', name:'url_image'})
  image?: string
}
