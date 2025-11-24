import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index } from 'typeorm';

@Entity('tasks')
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ default: 'Pendiente' })
    @Index()
    status: string; // 'Pendiente', 'En Progreso', 'Completada'

    @Column({ name: 'assigned_role', nullable: true })
    assignedRole: string; // 'Contabilidad', 'Gerencia', etc.

    @Column({ name: 'related_entity_id', nullable: true })
    relatedEntityId: number;

    @Column({ name: 'related_entity_type', nullable: true })
    relatedEntityType: string; // 'GuaranteedRentBenefit', etc.

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;
}
