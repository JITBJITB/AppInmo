export interface Unidad {
    id: number;
    proyectoId: number;
    nombre: string;
    tipologia: string;
    metrosCuadrados: number;
    piso: number;
    valorUf: number;
    estado: 'Disponible' | 'Reservada' | 'Vendida';
    reservaExpiraEn?: string; // Optional: expiration date for reserved units
}

export interface Proyecto {
    id: number;
    nombre: string;
    direccion: string;
    comuna: string;
    imagenPrincipalUrl: string;
    unidades?: Unidad[];
}
export interface DocumentoCliente {
    id: number;
    tipoDocumento: string;
    urlS3: string;
    estadoValidacion: string;
    createdAt: string;
}

export interface Cliente {
    id: number;
    nombre1?: string;
    nombre2?: string;
    apellido1?: string;
    apellido2?: string;
    nombreCompleto: string;
    rut: string;
    email: string;
    telefono: string;
    fechaNacimiento?: string;
    estadoCivil?: string;
    profesion?: string;
    renta?: number;
    nacionalidad?: string;
    direccionCalle?: string;
    direccionNumero?: string;
    direccionComuna?: string;
    direccionCiudad?: string;
    direccionRegion?: string;
    direccionPais?: string;
    documentos?: DocumentoCliente[];
}

export interface CuotaDto {
    numero: number;
    monto: number;
    fechaVencimiento: string;
}

export interface FormaPago {
    reserva: number;
    ahorro: number;
    aporteInmobiliario: number;
    creditoFundit: number;
    creditoHipotecario: number;
}

export interface CreateFichaDto {
    unidadId: number;
    clienteId: number;
    descuentoPorcentaje?: number;
    incluyeEstacionamiento: boolean;
    incluyeBodega: boolean;
    usaAporteInmobiliaria: boolean;
    formaPago: FormaPago;
    // Legacy fields kept for compatibility if needed, but should be replaced by formaPago
    pieMonto?: number;
    reservaMonto?: number;
    cuotas?: CuotaDto[];
}

export interface FichaVenta {
    id: number;
    folio: string;
    estadoFicha: string;
    unidad: Unidad;
    clientePrincipal?: Cliente;
    agente?: { id: number; nombre: string; email: string };
    valorTotalUf: number;
    comisionBrokerMonto?: number;
    estadoComisionBroker?: string;
    createdAt: string;
}

export interface Cuota {
    id: number;
    numeroCuota: number;
    montoCuota: number;
    fechaVencimiento: string;
    estado: string;
    fechaPago?: string;
}

export interface PlanPago {
    id: number;
    tipoPlan: string;
    montoTotal: number;
    montoPie: number;
    montoReserva: number;
    saldoAPagar: number;
    numeroCuotas: number;
    cuotas?: Cuota[];
}
