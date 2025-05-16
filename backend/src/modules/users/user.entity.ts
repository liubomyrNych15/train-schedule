import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    username: string;

    @Column()
    @Exclude()  
    passwordHash: string;

    @Column('text', { nullable: true })
    @Exclude() 
    refreshTokenHash?: string | null;

    @CreateDateColumn()
    createdAt: Date;
}