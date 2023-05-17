import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { My_Player } from './player.entity';

@Entity('relations')
export class My_Relation {
  @PrimaryGeneratedColumn()
  relation_id: number;

  /*@Column()
  relationStatus: string;

  @Column()
  receiver: number;

  @ManyToOne(() => My_Player, (player) => player.receivedRelations)
  receiverPlayer: My_Player;*/
}
