-- Script de Creación de Base de Datos para InmoApp (V 4.0 - ERP Completo)
-- Base de Datos: PostgreSQL

-- Tabla de Proyectos Inmobiliarios
CREATE TABLE Proyectos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL UNIQUE,
    direccion VARCHAR(255),
    comuna VARCHAR(100),
    imagen_principal_url TEXT, -- URL a la imagen en S3
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Unidades (Departamentos, etc.)
CREATE TABLE Unidades (
    id SERIAL PRIMARY KEY,
    proyecto_id INT NOT NULL REFERENCES Proyectos(id) ON DELETE RESTRICT,
    nombre VARCHAR(100) NOT NULL, -- ej. "Depto 101", "Oficina 202"
    tipologia VARCHAR(100), -- ej. "2D/1B", "Estudio"
    metros_cuadrados DECIMAL(10, 2),
    piso INT NOT NULL DEFAULT 1, -- Para la vista de edificio
    valor_uf DECIMAL(12, 2) NOT NULL,
    estado VARCHAR(50) NOT NULL DEFAULT 'Disponible', -- 'Disponible', 'Reservada', 'Vendida'
    reserva_expira_en TIMESTAMP WITH TIME ZONE DEFAULT NULL, -- Para el timer de reserva
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(proyecto_id, nombre), -- No pueden existir dos "Depto 101" en el mismo proyecto
    CHECK (estado IN ('Disponible', 'Reservada', 'Vendida'))
);

-- Tabla de Adicionales (Bodegas, Estacionamientos)
CREATE TABLE Adicionales (
    id SERIAL PRIMARY KEY,
    proyecto_id INT NOT NULL REFERENCES Proyectos(id) ON DELETE RESTRICT,
    tipo VARCHAR(100) NOT NULL, -- 'Bodega', 'Estacionamiento', 'Bicicletero'
    nombre VARCHAR(100) NOT NULL, -- ej. "B-101", "E-20"
    valor_uf DECIMAL(10, 2) NOT NULL,
    estado VARCHAR(50) NOT NULL DEFAULT 'Disponible', -- 'Disponible', 'Asignado', 'Vendido'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(proyecto_id, tipo, nombre),
    CHECK (estado IN ('Disponible', 'Asignado', 'Vendido'))
);

-- Tabla de Usuarios del Sistema (Admins, Agentes, Brokers)
CREATE TABLE Usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL, -- Se guarda el hash, NUNCA la clave en texto plano
    rol VARCHAR(50) NOT NULL DEFAULT 'Broker', -- 'Admin', 'Agente', 'Broker', 'Contabilidad'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    CHECK (rol IN ('Admin', 'Agente', 'Broker', 'Contabilidad'))
);

-- Tabla Pivote para asignar qué Proyectos puede ver cada Broker
CREATE TABLE Broker_Proyectos (
    id SERIAL PRIMARY KEY,
    broker_id INT NOT NULL REFERENCES Usuarios(id) ON DELETE CASCADE,
    proyecto_id INT NOT NULL REFERENCES Proyectos(id) ON DELETE CASCADE,
    
    UNIQUE(broker_id, proyecto_id) -- Un broker solo puede estar asignado una vez a un proyecto
);

-- Tabla de Clientes (Compradores)
CREATE TABLE Clientes (
    id SERIAL PRIMARY KEY,
    nombre_completo VARCHAR(255) NOT NULL,
    rut VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL,
    telefono VARCHAR(50),
    fecha_nacimiento DATE,
    estado_civil VARCHAR(50), -- 'Soltero', 'Casado (SB)', 'Casado (SC)', 'Casado (CP)', 'Viudo', 'Divorciado'
    profesion VARCHAR(100),
    direccion_calle VARCHAR(255),
    direccion_comuna VARCHAR(100),
    direccion_ciudad VARCHAR(100),
    direccion_pais VARCHAR(100) DEFAULT 'Chile',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabla para los Documentos del Cliente (almacenados en S3)
CREATE TABLE Documentos_Cliente (
    id SERIAL PRIMARY KEY,
    cliente_id INT NOT NULL REFERENCES Clientes(id) ON DELETE CASCADE,
    tipo_documento VARCHAR(100) NOT NULL, -- 'Carnet (Anverso)', 'Carnet (Reverso)', 'Liquidacion 1', 'CMF'
    url_s3 TEXT NOT NULL,
    estado_validacion VARCHAR(50) NOT NULL DEFAULT 'Pendiente', -- 'Pendiente', 'Aprobado', 'Rechazado'
    observacion_rechazo TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabla principal de Fichas de Venta (el corazón del negocio)
CREATE TABLE Fichas_Venta (
    id SERIAL PRIMARY KEY,
    unidad_id INT NOT NULL REFERENCES Unidades(id) ON DELETE RESTRICT,
    agente_id INT NOT NULL REFERENCES Usuarios(id) ON DELETE RESTRICT, -- El agente/broker que hizo la venta
    estado_ficha VARCHAR(50) NOT NULL DEFAULT 'Borrador', -- 'Borrador', 'En Revisión', 'Aprobada', 'Rechazada'
    valor_total_uf DECIMAL(12, 2) NOT NULL, -- Suma de unidad + adicionales
    bono_pie BOOLEAN DEFAULT FALSE,
    credito_fundit_monto DECIMAL(12, 2) DEFAULT 0,
    
    -- CAMPOS DE ESCRITURA
    estado_escritura VARCHAR(50) DEFAULT 'Pendiente', -- 'Pendiente', 'En Banco', 'En Notaría', 'Firmada Cliente', 'Firmada Inmo', 'Finalizada'
    banco_hipotecario VARCHAR(100) DEFAULT NULL,
    monto_hipotecario DECIMAL(12, 2) DEFAULT 0,
    fecha_firma_escritura_cliente DATE DEFAULT NULL,

    -- CAMPOS DE ENTREGA
    estado_entrega VARCHAR(50) DEFAULT 'Pendiente', -- 'Pendiente', 'Coordinada', 'Realizada'
    
    -- CAMPOS DE COMISIÓN
    comision_broker_monto DECIMAL(12, 2) DEFAULT 0,
    estado_comision_broker VARCHAR(50) DEFAULT 'Pendiente', -- 'Pendiente', 'Solicitar Factura', 'Factura Recibida', 'Pagada'
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    CHECK (estado_ficha IN ('Borrador', 'En Revisión', 'Aprobada', 'Rechazada')),
    CHECK (estado_escritura IN ('Pendiente', 'En Banco', 'En Notaría', 'Firmada Cliente', 'Firmada Inmo', 'Finalizada')),
    CHECK (estado_entrega IN ('Pendiente', 'Coordinada', 'Realizada')),
    CHECK (estado_comision_broker IN ('Pendiente', 'Solicitar Factura', 'Factura Recibida', 'Pagada'))
);

-- Tabla Pivote para asociar MÚLTIPLES Clientes a una Ficha de Venta (Manejo de Co-Compradores)
CREATE TABLE Ficha_Clientes (
    id SERIAL PRIMARY KEY,
    ficha_venta_id INT NOT NULL REFERENCES Fichas_Venta(id) ON DELETE CASCADE,
    cliente_id INT NOT NULL REFERENCES Clientes(id) ON DELETE RESTRICT,
    rol VARCHAR(50) NOT NULL DEFAULT 'Principal', -- 'Principal', 'Co-Comprador'
    
    UNIQUE(ficha_venta_id, cliente_id) -- No se puede agregar el mismo cliente dos veces a la misma ficha
);

-- Tabla Pivote para asociar Adicionales a una Ficha de Venta
CREATE TABLE Ficha_Adicionales (
    id SERIAL PRIMARY KEY,
    ficha_venta_id INT NOT NULL REFERENCES Fichas_Venta(id) ON DELETE CASCADE,
    adicional_id INT NOT NULL REFERENCES Adicionales(id) ON DELETE RESTRICT,
    
    UNIQUE(ficha_venta_id, adicional_id)
);

-- Documentos asociados a la VENTA (ej. Acta de Entrega, Cuadratura)
CREATE TABLE Documentos_Venta (
    id SERIAL PRIMARY KEY,
    ficha_venta_id INT NOT NULL REFERENCES Fichas_Venta(id) ON DELETE CASCADE,
    tipo_documento VARCHAR(100) NOT NULL, -- 'Acta de Entrega', 'Cuadratura Final', 'Garantías'
    url_s3 TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    CHECK (tipo_documento IN ('Acta de Entrega', 'Cuadratura Final', 'Garantías'))
);

-- Tabla de Planes de Pago (asociados a una Venta, ej. un Pagaré)
CREATE TABLE Planes_Pago (
    id SERIAL PRIMARY KEY,
    ficha_venta_id INT NOT NULL REFERENCES Fichas_Venta(id) ON DELETE CASCADE,
    tipo_plan VARCHAR(50) NOT NULL, -- 'Pagaré', 'Arriendo Garantizado', 'Crédito Directo'
    monto_total DECIMAL(12, 2) NOT NULL,
    numero_cuotas INT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Cuotas (detalles de un Plan de Pago)
CREATE TABLE Cuotas (
    id SERIAL PRIMARY KEY,
    plan_pago_id INT NOT NULL REFERENCES Planes_Pago(id) ON DELETE CASCADE,
    numero_cuota INT NOT NULL,
    monto_cuota DECIMAL(12, 2) NOT NULL,
    fecha_vencimiento DATE NOT NULL,
    estado VARCHAR(50) NOT NULL DEFAULT 'Pendiente', -- 'Pendiente', 'Pagada'
    fecha_pago DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    CHECK (estado IN ('Pendiente', 'Pagada'))
);

-- Creación de Índices para optimizar búsquedas comunes
CREATE INDEX idx_unidades_proyecto ON Unidades(proyecto_id);
CREATE INDEX idx_unidades_estado ON Unidades(estado);
CREATE INDEX idx_unidades_reserva_expira ON Unidades(reserva_expira_en) WHERE estado = 'Reservada';
CREATE INDEX idx_clientes_rut ON Clientes(rut);
CREATE INDEX idx_documentos_cliente_id ON Documentos_Cliente(cliente_id);
CREATE INDEX idx_fichas_venta_estado ON Fichas_Venta(estado_ficha);
CREATE INDEX idx_fichas_venta_estado_escritura ON Fichas_Venta(estado_escritura);
CREATE INDEX idx_fichas_venta_estado_comision ON Fichas_Venta(estado_comision_broker);
CREATE INDEX idx_documentos_venta_ficha ON Documentos_Venta(ficha_venta_id);
CREATE INDEX idx_ficha_clientes_ficha ON Ficha_Clientes(ficha_venta_id);
CREATE INDEX idx_ficha_clientes_cliente ON Ficha_Clientes(cliente_id);
CREATE INDEX idx_ficha_adicionales_ficha ON Ficha_Adicionales(ficha_venta_id);
CREATE INDEX idx_planes_pago_ficha ON Planes_Pago(ficha_venta_id);
CREATE INDEX idx_cuotas_plan ON Cuotas(plan_pago_id);
CREATE INDEX idx_cuotas_estado ON Cuotas(estado);
