import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Usuario)
        private usersRepository: Repository<Usuario>,
    ) { }

    async findOne(email: string): Promise<Usuario | null> {
        return this.usersRepository.findOne({ where: { email }, relations: ['brokerCompany'] });
    }

    async findOneById(id: number): Promise<Usuario | null> {
        return this.usersRepository.findOne({ where: { id }, relations: ['brokerCompany'] });
    }

    async findAll(): Promise<Usuario[]> {
        return this.usersRepository.find({ relations: ['brokerCompany'] });
    }

    async create(usuario: Partial<Usuario>): Promise<Usuario> {
        if (!usuario.passwordHash) {
            throw new Error('Password is required');
        }
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(usuario.passwordHash, salt);

        const newUser = this.usersRepository.create({
            ...usuario,
            passwordHash,
        });
        return this.usersRepository.save(newUser);
    }
}
