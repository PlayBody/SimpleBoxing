import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Relation } from 'typeorm';
import { Fighter } from './Fighter.entity';
import { Event } from './Event.entity';

@Entity()
export class Fight extends BaseEntity{
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Event, (event) => event.id)
  @JoinColumn({ name: 'event_id' })
  event!: Relation<Event>;

  @Column()
  event_id!: number;

  @ManyToOne(() => Fighter, (fighter) => fighter.id)
  @JoinColumn({ name: 'fighter1_id' })
  fighter1!: Relation<Fighter>;

  @Column()
  fighter1_id!: number;

  @ManyToOne(() => Fighter, (fighter) => fighter.id)
  @JoinColumn({ name: 'fighter2_id' })
  fighter2!: Relation<Fighter>;
  
  @Column()
  fighter2_id!: number;

  @Column({ nullable: false })
  result!: number;

  @Column({ nullable: false })
  method!: string;

  @Column({ nullable: false })
  round!: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at!: Date;
}