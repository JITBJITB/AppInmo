import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from 'typeorm';

export class AddAuditAndBankingEntities1703456789000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // 1. Crear tabla estado_historial
        await queryRunner.createTable(
            new Table({
                name: 'estado_historial',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'ficha_venta_id',
                        type: 'int',
                        isNullable: false
                    },
                    {
                        name: 'estado_anterior',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'estado_nuevo',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'usuario_id',
                        type: 'int',
                        isNullable: false
                    },
                    {
                        name: 'motivo_desistimiento',
                        type: 'text',
                        isNullable: true
                    },
                    {
                        name: 'observaciones',
                        type: 'text',
                        isNullable: true
                    },
                    {
                        name: 'fecha_cambio',
                        type: 'timestamptz',
                        default: 'now()'
                    },
                ],
            }),
            true,
        );

        // 2. Crear índice compuesto en estado_historial
        await queryRunner.createIndex(
            'estado_historial',
            new TableIndex({
                name: 'IDX_estado_historial_ficha_fecha',
                columnNames: ['ficha_venta_id', 'fecha_cambio'],
            }),
        );

        // 3. Crear tabla broker_datos_bancarios
        await queryRunner.createTable(
            new Table({
                name: 'broker_datos_bancarios',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'usuario_id',
                        type: 'int',
                        isNullable: false,
                        isUnique: true
                    },
                    {
                        name: 'banco',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'tipo_cuenta',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'numero_cuenta',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'rut_titular',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'nombre_titular',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'comision_porcentaje',
                        type: 'decimal(5,2)',
                        isNullable: true
                    },
                    {
                        name: 'comision_monto_fijo',
                        type: 'decimal(12,2)',
                        isNullable: true
                    },
                    {
                        name: 'created_at',
                        type: 'timestamptz',
                        default: 'now()'
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamptz',
                        default: 'now()'
                    },
                ],
            }),
            true,
        );

        // 4. Agregar foreign keys
        await queryRunner.createForeignKey(
            'estado_historial',
            new TableForeignKey({
                columnNames: ['ficha_venta_id'],
                referencedTableName: 'fichas_venta',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            'estado_historial',
            new TableForeignKey({
                columnNames: ['usuario_id'],
                referencedTableName: 'usuarios',
                referencedColumnNames: ['id'],
                onDelete: 'RESTRICT',
            }),
        );

        await queryRunner.createForeignKey(
            'broker_datos_bancarios',
            new TableForeignKey({
                columnNames: ['usuario_id'],
                referencedTableName: 'usuarios',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
            }),
        );

        // 5. Agregar campos a unidades
        await queryRunner.query(`
            ALTER TABLE unidades 
            ADD COLUMN IF NOT EXISTS metros_terraza DECIMAL(10,2),
            ADD COLUMN IF NOT EXISTS metros_totales DECIMAL(10,2)
        `);

        // 6. Agregar updated_at a fichas_venta
        await queryRunner.query(`
            ALTER TABLE fichas_venta 
            ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now()
        `);

        // 7. Agregar campos a documentos_cliente
        await queryRunner.query(`
            ALTER TABLE documentos_cliente 
            ADD COLUMN IF NOT EXISTS nombre_archivo VARCHAR(255),
            ADD COLUMN IF NOT EXISTS numero_liquidacion INT
        `);

        // 8. Crear índice en documentos_cliente
        await queryRunner.createIndex(
            'documentos_cliente',
            new TableIndex({
                name: 'IDX_documentos_cliente_tipo',
                columnNames: ['cliente_id', 'tipo_documento'],
            }),
        );

        console.log('Migration completed: Added audit and banking entities');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Rollback en orden inverso
        await queryRunner.dropIndex('documentos_cliente', 'IDX_documentos_cliente_tipo');
        await queryRunner.query(`ALTER TABLE documentos_cliente DROP COLUMN IF EXISTS numero_liquidacion`);
        await queryRunner.query(`ALTER TABLE documentos_cliente DROP COLUMN IF EXISTS nombre_archivo`);
        await queryRunner.query(`ALTER TABLE fichas_venta DROP COLUMN IF EXISTS updated_at`);
        await queryRunner.query(`ALTER TABLE unidades DROP COLUMN IF EXISTS metros_totales`);
        await queryRunner.query(`ALTER TABLE unidades DROP COLUMN IF EXISTS metros_terraza`);
        await queryRunner.dropTable('broker_datos_bancarios');
        await queryRunner.dropTable('estado_historial');

        console.log('Migration rolled back: Removed audit and banking entities');
    }
}
