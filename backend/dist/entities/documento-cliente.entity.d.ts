import { Cliente } from './cliente.entity';
export declare class DocumentoCliente {
    id: number;
    clienteId: number;
    cliente: Cliente;
    tipoDocumento: string;
    urlS3: string;
    estadoValidacion: string;
    observacionRechazo: string;
    createdAt: Date;
}
