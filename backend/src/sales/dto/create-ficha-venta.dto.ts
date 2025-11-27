import { IsBoolean, IsNumber, IsOptional, IsObject, ValidateNested, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class FormaPagoDto {
    @ApiProperty({ description: 'Monto de reserva en UF' })
    @IsNumber()
    @Min(0)
    reserva: number;

    @ApiProperty({ description: 'Monto de ahorro/transferencia en UF' })
    @IsNumber()
    @Min(0)
    ahorro: number;

    @ApiProperty({ description: 'Monto de aporte inmobiliario en UF' })
    @IsNumber()
    @Min(0)
    aporteInmobiliario: number;

    @ApiProperty({ description: 'Monto de crédito Fundit en UF' })
    @IsNumber()
    @Min(0)
    creditoFundit: number;

    @ApiProperty({ description: 'Monto de crédito hipotecario en UF' })
    @IsNumber()
    @Min(0)
    creditoHipotecario: number;
}

export class CreateFichaVentaDto {
    @ApiProperty({ description: 'ID de la unidad' })
    @IsNumber()
    unidadId: number;

    @ApiProperty({ description: 'ID del cliente' })
    @IsNumber()
    clienteId: number;

    @ApiProperty({ description: 'Porcentaje de descuento (1-15%)', required: false })
    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(15)
    descuentoPorcentaje?: number;

    @ApiProperty({ description: 'Incluye estacionamiento' })
    @IsBoolean()
    incluyeEstacionamiento: boolean;

    @ApiProperty({ description: 'Incluye bodega' })
    @IsBoolean()
    incluyeBodega: boolean;

    @ApiProperty({ description: 'Usa aporte inmobiliaria' })
    @IsBoolean()
    usaAporteInmobiliaria: boolean;

    @ApiProperty({ description: 'Detalle de forma de pago' })
    @IsObject()
    @ValidateNested()
    @Type(() => FormaPagoDto)
    formaPago: FormaPagoDto;
}
