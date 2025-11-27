import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto {
    @ApiProperty({ example: 'Juan', description: 'Primer nombre del cliente' })
    nombre1: string;

    @ApiProperty({ example: 'Andres', description: 'Segundo nombre del cliente', required: false })
    nombre2?: string;

    @ApiProperty({ example: 'Perez', description: 'Primer apellido del cliente' })
    apellido1: string;

    @ApiProperty({ example: 'Gonzalez', description: 'Segundo apellido del cliente', required: false })
    apellido2?: string;

    @ApiProperty({ example: '12.345.678-9', description: 'RUT del cliente' })
    rut: string;

    @ApiProperty({ example: 'juan.perez@example.com', description: 'Email del cliente' })
    email: string;

    @ApiProperty({ example: '+56912345678', description: 'Teléfono del cliente', required: false })
    telefono?: string;

    @ApiProperty({ example: '1985-05-15', description: 'Fecha de nacimiento', required: false })
    fechaNacimiento?: Date;

    @ApiProperty({ example: 'Casado', description: 'Estado civil', required: false })
    estadoCivil?: string;

    @ApiProperty({ example: 'Ingeniero', description: 'Profesión', required: false })
    profesion?: string;

    @ApiProperty({ example: 1500000, description: 'Renta mensual', required: false })
    renta?: number;

    @ApiProperty({ example: 'Chilena', description: 'Nacionalidad', required: false })
    nacionalidad?: string;

    @ApiProperty({ example: 'Av. Libertador', description: 'Calle de dirección', required: false })
    direccionCalle?: string;

    @ApiProperty({ example: '1234', description: 'Número de dirección', required: false })
    direccionNumero?: string;

    @ApiProperty({ example: 'Santiago', description: 'Comuna', required: false })
    direccionComuna?: string;

    @ApiProperty({ example: 'Santiago', description: 'Ciudad', required: false })
    direccionCiudad?: string;

    @ApiProperty({ example: 'Metropolitana', description: 'Región', required: false })
    direccionRegion?: string;

    @ApiProperty({ example: 'Chile', description: 'País', required: false })
    direccionPais?: string;
}
