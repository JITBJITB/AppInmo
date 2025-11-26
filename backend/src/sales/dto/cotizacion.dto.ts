import { ApiProperty } from '@nestjs/swagger';

export class CotizacionItemDto {
    @ApiProperty()
    descripcion: string;

    @ApiProperty()
    valorUf: number;
}

export class CotizacionDto {
    @ApiProperty()
    clienteNombre: string;

    @ApiProperty()
    clienteRut: string;

    @ApiProperty()
    proyectoNombre: string;

    @ApiProperty()
    unidadNumero: string;

    @ApiProperty()
    unidadTipo: string;

    @ApiProperty()
    valorBaseUf: number;

    @ApiProperty({ required: false })
    descuentoPorcentaje?: number;

    @ApiProperty({ required: false })
    valorDescuentoUf?: number;

    @ApiProperty()
    valorConDescuentoUf: number;

    @ApiProperty({ required: false })
    valorEstacionamientoUf?: number;

    @ApiProperty({ required: false })
    valorBodegaUf?: number;

    @ApiProperty()
    subtotalUf: number;

    @ApiProperty({ required: false })
    valorAporteInmobiliariaUf?: number;

    @ApiProperty()
    valorTotalUf: number;

    @ApiProperty()
    formaPago: {
        reserva: number;
        ahorro: number;
        aporteInmobiliario: number;
        creditoFundit: number;
        creditoHipotecario: number;
    };

    @ApiProperty()
    fechaCotizacion: Date;
}
