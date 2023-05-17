import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { My_Player } from './player.entity';

@Entity('game_history')
export class My_GameHistory {
  @PrimaryGeneratedColumn()
  gamehistory_id: number;

  /*@Column()
  mode: string;

  @Column()
  winner: number;

  @Column()
  loser: number;

  @Column()
  winner_score: number;

  @Column()
  loser_score: number;

  @Column()
  created_at: Date;

  @ManyToOne(() => My_Player, (player) => player.wonGames)
  winnerPlayer: My_Player;

  @ManyToOne(() => My_Player, (player) => player.lostGames)
  loserPlayer: My_Player;*/

}
