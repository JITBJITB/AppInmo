import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<Usuario>);
    findOne(email: string): Promise<Usuario | null>;
    findOneById(id: number): Promise<Usuario | null>;
    findAll(): Promise<Usuario[]>;
    create(usuario: Partial<Usuario>): Promise<Usuario>;
}
