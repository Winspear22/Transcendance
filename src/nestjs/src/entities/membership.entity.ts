import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { My_Player } from './player.entity';
import { My_ChatRoom } from './chat_room.entity';

@Entity('membership')
export class My_Membership {
  @PrimaryGeneratedColumn()
  membership_id: number;
  /*@Column()
  chatroom_id: number;
  @Column()
  role: string;
  @Column()
  isBanned: boolean;
  @Column()
  isMuted: boolean;

  @ManyToOne(() => My_Player, (player) => player.memberships)
  user: My_Player;

  @ManyToOne(() => My_ChatRoom, (chat_room) => chat_room.memberships)
  chatroom: My_ChatRoom;*/
}
