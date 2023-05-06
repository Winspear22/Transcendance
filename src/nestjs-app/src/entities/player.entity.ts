import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('players')
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string

  @Column({ nullable: true })
  avatar: string;

  @Column({type: 'boolean', default: 1, })
  toto: boolean;

  @Column({type: 'boolean', default: 1, })
  toto2: boolean;

}
