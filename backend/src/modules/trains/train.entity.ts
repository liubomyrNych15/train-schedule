import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Unique } from 'typeorm';

@Entity()
@Unique(["name", "from", "to"])
export class TrainEntity {
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