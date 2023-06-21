import { Entity, Column, JoinColumn, PrimaryGeneratedColumn, ManyToOne, BaseEntity } from 'typeorm';
import { Fighter } from './Fighter.entity';

@Entity()
export class Rank extends BaseEntity{
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  weight_class!: string;

  @ManyToOne(() => Fighter, (fighter) => fighter.id)
  @JoinColumn({ name: 'fighter_id' })
  fighter!: Fighter;
  
  @Column()
  fighter_id!: number;

  @Column({ nullable: false })
  score!: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at!: Date;
}
