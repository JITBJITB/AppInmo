# 🚀 Prompt Completo para Google AI Studio - Análisis AppInmo

## 📋 Instrucciones de Uso

1. **Abre Google AI Studio** (https://aistudio.google.com/)
2. **Crea un nuevo chat** o proyecto
3. **Adjunta el archivo** `FULL_CODE_CONTEXT.txt` que se encuentra en la raíz del proyecto
4. **Copia y pega** el prompt completo que se encuentra a continuación
5. **Espera el análisis** detallado de la IA

---

# 🎯 PROMPT PARA GOOGLE AI STUDIO

Actúa como un **Arquitecto de Software Senior** y **Desarrollador Full Stack** experto en:
- **Backend:** NestJS, TypeORM, PostgreSQL
- **Frontend:** Angular 18+, TypeScript, RxJS
- **Arquitectura:** Microservicios, RESTful APIs, Autenticación JWT

---

## 📦 CONTEXTO DEL PROYECTO

Estoy compartiendo el código fuente completo de **AppInmo**, una aplicación empresarial de gestión inmobiliaria que incluye:

### Funcionalidades Principales:
1. **Sistema de Ventas** - Gestión completa del ciclo de venta de propiedades
2. **Gestión de Clientes** - CRUD de clientes con documentación asociada
3. **Proyectos Inmobiliarios** - Administración de proyectos y unidades (departamentos, estacionamientos, bodegas)
4. **Sistema Financiero** - Cálculo de cuotas, planes de pago, descuentos, financiamiento
5. **Comisiones** - Cálculo y seguimiento de comisiones para brokers
6. **Post-Venta** - Gestión de promesas, escrituras, entregas
7. **Tareas y Workflow** - Sistema de tareas automáticas según el estado de la venta
8. **Dashboard** - KPIs y métricas de negocio
9. **Autenticación y Roles** - Sistema de usuarios con 7 roles diferentes

### Stack Tecnológico:
- **Backend:** NestJS + TypeORM + PostgreSQL
- **Frontend:** Angular 18 + TailwindCSS
- **Autenticación:** JWT + Passport
- **Base de Datos:** PostgreSQL con relaciones complejas

---

## 🎯 OBJETIVOS DEL ANÁLISIS

Necesito que realices un análisis **exhaustivo, riguroso y paso a paso** del código proporcionado. Debes cubrir:

### 1️⃣ ARQUITECTURA Y ESTRUCTURA GENERAL

**Backend:**
- Analiza la estructura de módulos en `backend/src/`
- Explica cómo se organizan los módulos: `auth`, `sales`, `finance`, `projects`, `clients`, `commissions`, `dashboard`, `documents`, `post-sales`, `tasks`, `users`
- Identifica el patrón de arquitectura utilizado (MVC, DDD, etc.)
- Evalúa la separación de responsabilidades

**Frontend:**
- Analiza la estructura de componentes en `frontend/src/app/`
- Identifica los módulos principales y sus rutas
- Evalúa la organización de servicios, componentes, guards, interceptors
- Revisa el sistema de navegación y lazy loading

**Comunicación:**
- Explica cómo se comunican frontend y backend
- Identifica todos los endpoints de la API
- Revisa el manejo de errores y respuestas HTTP

---

### 2️⃣ BASE DE DATOS - ANÁLISIS DETALLADO

**Entidades (revisa cada archivo en `backend/src/entities/`):**

Analiza cada entidad y documenta:
- **Campos:** Nombre, tipo, restricciones, valores por defecto
- **Relaciones:** OneToMany, ManyToOne, ManyToMany con otras entidades
- **Claves foráneas:** Correcta definición y cascadas
- **Índices:** Si existen y si son necesarios más

**Entidades principales a revisar:**
1. `usuario.entity.ts` - Usuarios del sistema
2. `cliente.entity.ts` - Clientes compradores
3. `proyecto.entity.ts` - Proyectos inmobiliarios
4. `unidad.entity.ts` - Unidades (departamentos, estacionamientos, bodegas)
5. `ficha-venta.entity.ts` - **CRÍTICA** - Ficha de venta principal
6. `ficha-cliente.entity.ts` - Relación cliente-venta
7. `ficha-adicional.entity.ts` - Adicionales en la venta
8. `plan-pago.entity.ts` - Planes de pago
9. `cuota.entity.ts` - Cuotas del plan de pago
10. `comision.entity.ts` - Comisiones de brokers
11. `documento-venta.entity.ts` - Documentos de venta
12. `documento-cliente.entity.ts` - Documentos de clientes
13. `escritura.entity.ts` - Escrituras
14. `entrega.entity.ts` - Entregas de propiedades
15. `task.entity.ts` - Tareas del workflow
16. `broker-proyecto.entity.ts` - Relación broker-proyecto
17. `guaranteed-rent-benefit.entity.ts` - Beneficio de arriendo garantizado

**Diagrama de Relaciones:**
- Crea un diagrama Mermaid ERD mostrando todas las relaciones entre entidades
- Identifica las relaciones más complejas
- Detecta posibles problemas de normalización o integridad referencial

**Análisis de Integridad:**
- ¿Hay campos que deberían ser NOT NULL y no lo son?
- ¿Faltan índices en campos de búsqueda frecuente?
- ¿Las cascadas están bien configuradas?
- ¿Hay riesgo de datos huérfanos?

---

### 3️⃣ BACKEND - ANÁLISIS MÓDULO POR MÓDULO

Para cada módulo, analiza:

#### **A) Módulo de Autenticación (`auth/`)**
- Estrategia JWT implementada
- Validación de usuarios y contraseñas (bcrypt)
- Guards: `JwtAuthGuard`, `RolesGuard`
- Decoradores: `@Roles()`
- Enum de roles: `UserRole`
- **Seguridad:** ¿Hay vulnerabilidades? ¿La SECRET_KEY está hardcodeada?

#### **B) Módulo de Ventas (`sales/`)**
- Flujo completo de creación de venta
- Estados de la ficha: `EstadoFicha` enum
- Lógica de cálculo financiero
- Validaciones de negocio
- **Crítico:** Revisa `sales.service.ts` línea por línea

#### **C) Módulo de Finanzas (`finance/`)**
- Cálculo de descuentos (1-15%)
- Cálculo de precio final (base + adicionales - descuento)
- Aporte Inmobiliaria (10% del total)
- Métodos de pago: Reserva, Ahorro, Aporte Inmobiliaria, Crédito Fundit, Crédito Hipotecario
- Validación: suma de métodos = 100%
- Generación de planes de pago y cuotas

#### **D) Módulo de Proyectos (`projects/`)**
- CRUD de proyectos
- Gestión de unidades (departamentos, estacionamientos, bodegas)
- Estados de unidades: Disponible, Reservada, Vendida, etc.
- Relación con brokers

#### **E) Módulo de Clientes (`clients/`)**
- CRUD de clientes
- Búsqueda por nombre/RUT
- Gestión de documentos de clientes
- Validaciones de datos personales

#### **F) Módulo de Comisiones (`commissions/`)**
- Cálculo de comisión (2% para brokers externos)
- Estados: Pendiente, Solicitar Factura, Factura Recibida, Pagada
- Filtrado por broker

#### **G) Módulo de Post-Venta (`post-sales/`)**
- Gestión de promesas
- Gestión de escrituras
- Gestión de entregas
- Workflow de estados

#### **H) Módulo de Tareas (`tasks/`)**
- Creación automática de tareas según estado de ficha
- Asignación de tareas a usuarios
- Estados de tareas

#### **I) Módulo de Dashboard (`dashboard/`)**
- KPIs: Ventas del mes, Fundit colocado, Cuotas atrasadas, Arriendos garantizados
- Ventas por broker
- Queries de agregación

#### **J) Módulo de Documentos (`documents/`)**
- Subida de documentos
- Asociación con ventas y clientes
- Almacenamiento

#### **K) Módulo de Usuarios (`users/`)**
- CRUD de usuarios
- Roles y permisos
- Hash de contraseñas

---

### 4️⃣ FRONTEND - ANÁLISIS COMPONENTE POR COMPONENTE

Revisa la estructura en `frontend/src/app/`:

#### **Componentes Principales:**
1. **Login** (`login/`) - Autenticación
2. **Dashboard** (`dashboard/`) - Vista principal con KPIs
3. **Projects** (`projects/`) - Listado y detalle de proyectos
4. **Building Viewer** (`building-viewer/`) - Visualización de inventario de edificios
5. **Sales Wizard** (`sales-wizard/`) - Wizard de creación de venta (multi-step)
6. **Clients** (`clients/`) - Gestión de clientes
7. **Commissions** (`commissions/`) - Vista de comisiones
8. **Post-Sales** (`post-sales/`) - Gestión post-venta

#### **Servicios:**
- `auth.service.ts` - Autenticación y manejo de tokens
- `sales.service.ts` - API de ventas
- `projects.service.ts` - API de proyectos
- `clients.service.ts` - API de clientes
- `finance.service.ts` - Cálculos financieros
- Otros servicios

#### **Guards:**
- `auth.guard.ts` - Protección de rutas
- `role.guard.ts` - Validación de roles

#### **Interceptors:**
- `auth.interceptor.ts` - Inyección de JWT en headers

#### **Models:**
- `models.ts` - Interfaces TypeScript que deben coincidir con las entidades del backend

---

### 5️⃣ LÓGICA DE NEGOCIO CRÍTICA

**Analiza en profundidad:**

#### **A) Flujo de Venta Completo**
Documenta paso a paso desde que un usuario crea una venta hasta que se guarda en BD:

1. Usuario selecciona proyecto y unidad en el frontend
2. Frontend valida disponibilidad
3. Usuario completa wizard de venta (cliente, financiamiento, documentos)
4. Frontend envía POST a `/sales`
5. Backend valida datos en `sales.controller.ts`
6. `sales.service.ts` ejecuta lógica de negocio:
   - Valida unidad disponible
   - Crea/asocia cliente
   - Calcula precio final con descuentos
   - Valida métodos de pago suman 100%
   - Crea ficha de venta
   - Crea plan de pago y cuotas
   - Actualiza estado de unidad
   - Crea tareas automáticas
   - Calcula comisión si es broker
7. TypeORM persiste en PostgreSQL con transacciones
8. Backend retorna ficha creada
9. Frontend redirige a vista de éxito

**Identifica:**
- ¿Dónde pueden fallar las validaciones?
- ¿Hay manejo de transacciones?
- ¿Qué pasa si falla a mitad del proceso?
- ¿Hay rollback?

#### **B) Cálculo Financiero**
Revisa `EJEMPLOS_LOGICA_FINANCIERA.js` y compara con la implementación real:

```
Precio Base Unidad (UF)
+ Estacionamiento (UF)
+ Bodega (UF)
= Subtotal (UF)
- Descuento (1-15% solo sobre precio base)
= Total Final (UF)

Aporte Inmobiliaria = 10% del Total Final (opcional)

Métodos de Pago (deben sumar 100%):
- Reserva
- Ahorro/Transferencia
- Aporte Inmobiliaria
- Crédito Fundit
- Crédito Hipotecario
```

¿La implementación coincide con esta lógica?

#### **C) Sistema de Tareas**
- ¿Cómo se crean las tareas automáticamente?
- ¿Qué tareas se crean para cada estado de ficha?
- ¿Cómo se asignan a los usuarios según su rol?

---

### 6️⃣ SEGURIDAD Y VULNERABILIDADES

**Analiza:**
1. **Autenticación:**
   - ¿La SECRET_KEY está en variables de entorno o hardcodeada?
   - ¿El tiempo de expiración del token es adecuado?
   - ¿Se valida correctamente el token en cada request?

2. **Autorización:**
   - ¿Los guards de roles funcionan correctamente?
   - ¿Hay endpoints sin protección que deberían tenerla?
   - ¿Un broker puede ver ventas de otros brokers?

3. **Validación de Datos:**
   - ¿Se validan los DTOs con class-validator?
   - ¿Hay sanitización de inputs?
   - ¿Protección contra SQL Injection? (TypeORM debería proteger)
   - ¿Protección contra XSS en el frontend?

4. **Manejo de Contraseñas:**
   - ¿Se usa bcrypt correctamente?
   - ¿Se retornan hashes de contraseñas en las respuestas?

5. **CORS:**
   - ¿Está configurado correctamente?

6. **Rate Limiting:**
   - ¿Hay protección contra ataques de fuerza bruta?

---

### 7️⃣ BUENAS PRÁCTICAS Y MEJORAS

**Evalúa:**
1. **Código:**
   - ¿Se siguen los principios SOLID?
   - ¿Hay código duplicado?
   - ¿Los nombres de variables/funciones son descriptivos?
   - ¿Hay comentarios donde son necesarios?

2. **Manejo de Errores:**
   - ¿Se usan excepciones personalizadas?
   - ¿Los errores se propagan correctamente al frontend?
   - ¿Hay logs adecuados?

3. **Performance:**
   - ¿Las queries están optimizadas?
   - ¿Se usan índices en la BD?
   - ¿Hay N+1 queries?
   - ¿Se usa paginación donde es necesario?

4. **Testing:**
   - ¿Existen tests unitarios?
   - ¿Existen tests de integración?
   - ¿Qué cobertura tienen?

5. **Documentación:**
   - ¿Hay Swagger/OpenAPI para la API?
   - ¿Hay README con instrucciones?
   - ¿Está documentado el modelo de datos?

---

### 8️⃣ SCRIPT DE SEED

Analiza `backend/src/seed.ts`:
- ¿Qué datos iniciales crea?
- ¿Es idempotente? (se puede ejecutar múltiples veces sin duplicar)
- ¿Crea datos de prueba realistas?
- ¿Cubre todos los casos de uso?

---

### 9️⃣ CONFIGURACIÓN Y DEPLOYMENT

Revisa:
- `docker-compose.yml` - ¿Está bien configurado?
- Variables de entorno - ¿Qué falta configurar?
- Scripts de BD en `database/` - ¿Son necesarios?
- `package.json` - Dependencias y scripts

---

## 📊 FORMATO DE RESPUESTA ESPERADO

Organiza tu respuesta de la siguiente manera:

### 1. RESUMEN EJECUTIVO
- Descripción general de la aplicación
- Tecnologías utilizadas
- Arquitectura general

### 2. DIAGRAMA DE ARQUITECTURA
- Diagrama Mermaid de la arquitectura completa
- Diagrama ERD de la base de datos

### 3. ANÁLISIS POR CAPAS

#### CAPA DE DATOS (Entidades y BD)
- Listado de todas las entidades
- Diagrama ERD
- Problemas encontrados
- Sugerencias de mejora

#### CAPA DE BACKEND (NestJS)
- Análisis módulo por módulo
- Endpoints documentados
- Lógica de negocio crítica explicada
- Problemas encontrados
- Sugerencias de mejora

#### CAPA DE FRONTEND (Angular)
- Análisis componente por componente
- Flujos de usuario
- Problemas encontrados
- Sugerencias de mejora

### 4. FLUJOS CRÍTICOS PASO A PASO
- Flujo de autenticación
- Flujo de creación de venta
- Flujo de cálculo financiero
- Flujo de tareas automáticas

### 5. SEGURIDAD
- Vulnerabilidades encontradas
- Recomendaciones de seguridad

### 6. PERFORMANCE
- Problemas de performance identificados
- Optimizaciones sugeridas

### 7. CALIDAD DE CÓDIGO
- Violaciones de buenas prácticas
- Refactorizaciones sugeridas
- Código duplicado

### 8. PLAN DE MEJORAS PRIORIZADAS
- Críticas (hacer inmediatamente)
- Importantes (hacer pronto)
- Deseables (hacer cuando sea posible)

### 9. CONCLUSIÓN
- Evaluación general del código
- Fortalezas del proyecto
- Debilidades del proyecto
- Recomendación final

---

## ⚠️ IMPORTANTE

- Sé **exhaustivo y riguroso** en tu análisis
- Proporciona **ejemplos de código** cuando sugieras mejoras
- Usa **diagramas Mermaid** para visualizar arquitectura y flujos
- Identifica **todos los problemas**, no solo los más obvios
- Prioriza las sugerencias por **impacto y urgencia**
- Mantén un tono **profesional, crítico pero constructivo**

---

## 🎯 COMIENZA EL ANÁLISIS

He adjuntado el archivo `FULL_CODE_CONTEXT.txt` que contiene todo el código fuente del proyecto.

**Por favor, comienza tu análisis exhaustivo siguiendo la estructura definida arriba.**
