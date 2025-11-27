-- Seed Data for InmoApp

-- Insertar Proyectos
INSERT INTO Proyectos (nombre, direccion, comuna, imagen_principal_url) VALUES
('Edificio Vista Mar', 'Av. del Mar 1234', 'La Serena', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80'),
('Condominio Los Andes', 'Calle Los Andes 567', 'Las Condes', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80')
ON CONFLICT (nombre) DO NOTHING;

-- Insertar Unidades para Edificio Vista Mar (ID 1 asumiendo serial)
-- Nota: Usamos subquery para obtener el ID por nombre para ser más robustos
INSERT INTO Unidades (proyecto_id, nombre, tipologia, metros_cuadrados, piso, valor_uf, estado) VALUES
((SELECT id FROM Proyectos WHERE nombre = 'Edificio Vista Mar'), '101', '2D/2B', 65.5, 1, 3500.00, 'Disponible'),
((SELECT id FROM Proyectos WHERE nombre = 'Edificio Vista Mar'), '102', '1D/1B', 45.0, 1, 2800.00, 'Reservada'),
((SELECT id FROM Proyectos WHERE nombre = 'Edificio Vista Mar'), '201', '3D/2B', 85.0, 2, 4500.00, 'Disponible'),
((SELECT id FROM Proyectos WHERE nombre = 'Edificio Vista Mar'), '202', '2D/2B', 68.0, 2, 3600.00, 'Vendida');

-- Insertar Unidades para Condominio Los Andes
INSERT INTO Unidades (proyecto_id, nombre, tipologia, metros_cuadrados, piso, valor_uf, estado) VALUES
((SELECT id FROM Proyectos WHERE nombre = 'Condominio Los Andes'), 'A-101', '3D/3B', 120.0, 1, 8500.00, 'Disponible'),
((SELECT id FROM Proyectos WHERE nombre = 'Condominio Los Andes'), 'A-102', '3D/3B', 120.0, 1, 8500.00, 'Disponible'),
((SELECT id FROM Proyectos WHERE nombre = 'Condominio Los Andes'), 'B-201', '4D/3B', 140.0, 2, 9800.00, 'Reservada');

-- Insertar Usuario Admin por defecto
INSERT INTO Usuarios (nombre, email, password_hash, rol) VALUES
('Admin User', 'admin@inmoapp.cl', '$2b$10$EpIxT98hP7jF.L7eG.X.VO/y/0.0.0.0.0.0.0.0.0.0.0.0.0', 'Admin') -- Hash de ejemplo
ON CONFLICT (email) DO NOTHING;
