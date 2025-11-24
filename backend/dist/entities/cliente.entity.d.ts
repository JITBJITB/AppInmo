import { DocumentoCliente } from './documento-cliente.entity';
import { FichaCliente } from './ficha-cliente.entity';
export declare class Cliente {
    id: number;
    nombreCompleto: string;
    rut: string;
    email: string;
    telefono: string;
    fechaNacimiento: Date;
    estadoCivil: string;
    profesion: string;
    direccionCalle: string;
    direccionComuna: string;
    direccionCiudad: string;
    direccionPais: string;
    createdAt: Date;
    documentos: DocumentoCliente[];
    fichasAsociadas: FichaCliente[];
}
