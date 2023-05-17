import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { My_Player } from './player.entity';
import { My_ChatRoom } from './chat_room.entity';

@Entity('My_Message')
export class My_Message {
  @PrimaryGeneratedColumn()
  message_id: number;

  /*@Column()
  content: string;

  @Column()
  created_at: Date;

  @ManyToOne(() => My_Player, (player) => player.messages)
  sender: My_Player;

  @ManyToOne(() => My_ChatRoom, (chat_room) => chat_room.messages)
  chatroom: My_ChatRoom;*/
}
