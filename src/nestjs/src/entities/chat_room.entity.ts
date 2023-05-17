import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { My_Message } from './message.entity';
import { My_Membership } from './membership.entity';

@Entity('chat_room')
export class My_ChatRoom {
  @PrimaryGeneratedColumn()
  chatroom_id: number;

  /*@Column()
  password: string;

  @Column()
  name: string;

  @Column()
  isChannel: boolean;

  @Column()
  isPublic: boolean;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @OneToMany(() => My_Message, (message) => message.chatroom)
  messages: My_Message[];

  @OneToMany(() => My_Membership, (membership) => membership.chatroom)
  memberships: My_Membership[];*/
}
