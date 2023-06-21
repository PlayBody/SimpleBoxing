import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Fighter extends BaseEntity{
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ nullable: true })
  nickname!: string;

  @Column({ type: 'date', nullable: true })
  birthdate!: Date;

  @Column({ nullable: true })
  height!: number;

  @Column({ nullable: true })
  weight_class!: string;

  @Column({ nullable: true })
  nationality!: string;

  @Column({ nullable: true })
  team!: string;

  @Column({ default: 0 })
  wins!: number;

  @Column({ default: 0 })
  losses!: number;

  @Column({ default: 0 })
  knockouts!: number;

  @Column({ default: 0 })
  draws!: number;

  @Column({ default: 0 })
  submissions!: number;

  @Column({ default: 0 })
  del_flag!: number

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at!: Date;
}
