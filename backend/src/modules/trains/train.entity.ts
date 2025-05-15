import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Train {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column() 
    name: string;

    @Column() 
    from: string;

    @Column() 
    to: string;

    @Column('timestamp') 
    departure: Date;

    @Column('timestamp') 
    arrival: Date;

    @CreateDateColumn()
    createdAt: Date;
}