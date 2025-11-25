import { DocumentoCliente } from './documento-cliente.entity';
import { FichaCliente } from './ficha-cliente.entity';
export declare class Cliente {
    id: number;
    nombre1: string;
    nombre2: string;
    apellido1: string;
    apellido2: string;
    nombreCompleto: string;
    rut: string;
    email: string;
    telefono: string;
    fechaNacimiento: Date;
    estadoCivil: string;
    profesion: string;
    renta: number;
    nacionalidad: string;
    direccionCalle: string;
    direccionNumero: string;
    direccionComuna: string;
    direccionCiudad: string;
    direccionRegion: string;
    direccionPais: string;
    createdAt: Date;
    documentos: DocumentoCliente[];
    fichasAsociadas: FichaCliente[];
}
