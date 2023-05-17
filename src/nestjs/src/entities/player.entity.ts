import { Entity, PrimaryGeneratedColumn, Column, OneToMany, PrimaryColumn } from 'typeorm';
import { My_Message } from './message.entity';
import { My_Membership } from './membership.entity';
import { My_GameHistory } from './game_history.entity';
import { My_Relation } from './relation.entity';

@Entity('players')
export class My_Player {
  @PrimaryColumn({unique: true})
  id: string;

  @Column({unique: true})
  nickname: string;

  /*@Column()
  mail: string;



  @Column()
  password: string

  @Column({ nullable: true })
  avatar: string;

  @Column()
  status: string;

  @Column()
  level: number;

  @Column()
  wins: number;

  @Column()
  loses: number;

  @Column({ type: 'boolean', default: false })
  twoFA: boolean;

  @OneToMany(() => My_Message, (message) => message.sender)
  messages: My_Message[];

  @OneToMany(() => My_Membership, (membership) => membership.user)
  memberships: My_Membership[];

  @OneToMany(() => My_GameHistory, (gameHistory) => gameHistory.winnerPlayer)
  wonGames: My_GameHistory[];

  @OneToMany(() => My_GameHistory, (gameHistory) => gameHistory.loserPlayer)
  lostGames: My_GameHistory[];

  @OneToMany(() => My_Relation, (relation) => relation.receiverPlayer)
  receivedRelations: My_Relation[];*/
}
