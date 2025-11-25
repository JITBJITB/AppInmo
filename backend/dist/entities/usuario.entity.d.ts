import { BrokerProyecto } from './broker-proyecto.entity';
import { BrokerCompany } from './broker-company.entity';
import { UserRole } from '../auth/roles.enum';
export declare class Usuario {
    id: number;
    nombre: string;
    email: string;
    passwordHash: string;
    rol: UserRole;
    createdAt: Date;
    proyectosAsignados: BrokerProyecto[];
    brokerCompanyId: number;
    brokerCompany: BrokerCompany;
}
