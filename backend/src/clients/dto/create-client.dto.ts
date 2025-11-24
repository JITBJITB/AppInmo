import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto {
    @ApiProperty({ example: 'John Doe', description: 'The name of the client' })
    name: string;

    @ApiProperty({ example: 'john@example.com', description: 'The email of the client' })
    email: string;

    @ApiProperty({ example: '+1234567890', description: 'The phone number of the client' })
    phone: string;

    @ApiProperty({ example: '123 Main St', description: 'The address of the client', required: false })
    address?: string;
}
