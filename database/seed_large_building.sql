-- Seed Data for Large Building

-- Insertar Proyecto Grande
INSERT INTO Proyectos (nombre, direccion, comuna, imagen_principal_url) VALUES
('Edificio Torre Central', 'Av. Libertador 999', 'Santiago Centro', 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=1000&q=80')
ON CONFLICT (nombre) DO NOTHING;

-- Generar Unidades (10 pisos, 8 deptos por piso)
DO $$
DECLARE
    p_id INT;
    piso INT;
    depto INT;
    estado_random TEXT;
    estados TEXT[] := ARRAY['Disponible', 'Disponible', 'Disponible', 'Reservada', 'Vendida']; -- Más peso a Disponible
BEGIN
    SELECT id INTO p_id FROM Proyectos WHERE nombre = 'Edificio Torre Central';

    FOR piso IN 1..10 LOOP
        FOR depto IN 1..8 LOOP
            -- Seleccionar estado aleatorio
            estado_random := estados[1 + floor(random() * array_length(estados, 1))];
            
            INSERT INTO Unidades (proyecto_id, nombre, tipologia, metros_cuadrados, piso, valor_uf, estado)
            VALUES (
                p_id,
                piso || LPAD(depto::text, 2, '0'), -- Ej: 101, 102... 1001, 1002
                CASE WHEN depto <= 2 THEN '1D/1B' WHEN depto <= 6 THEN '2D/2B' ELSE '3D/2B' END,
                CASE WHEN depto <= 2 THEN 45.0 WHEN depto <= 6 THEN 70.0 ELSE 95.0 END,
                piso,
                CASE WHEN depto <= 2 THEN 2500 + (piso * 50) WHEN depto <= 6 THEN 4000 + (piso * 80) ELSE 5500 + (piso * 100) END,
                estado_random
            )
            ON CONFLICT (proyecto_id, nombre) DO NOTHING;
        END LOOP;
    END LOOP;
END $$;
