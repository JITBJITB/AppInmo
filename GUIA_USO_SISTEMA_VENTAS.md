# Guía de Uso - Sistema de Ventas con Lógica Financiera

## 📋 Resumen

Este documento explica cómo funciona el sistema de ventas con la nueva lógica financiera implementada, incluyendo descuentos, adicionales y aporte inmobiliaria.

## 🎯 Flujo Completo de una Venta

### 1. **Selección de Unidad**
El usuario selecciona un departamento disponible.
- **Valor Base**: Ejemplo 1,500 UF

### 2. **Selección de Cliente**
El usuario selecciona o crea un cliente.

### 3. **Configuración Financiera** (¡NUEVO!)

#### A. Descuento (Opcional)
- **Rango**: 1% - 15%
- **Aplica sobre**: Solo el valor base del departamento
- **Ejemplo**: 10% de descuento sobre 1,500 UF = 150 UF de descuento
- **Resultado**: 1,350 UF

#### B. Adicionales (Opcionales)
Se agregan **DESPUÉS** del descuento:
- ☑️ **Estacionamiento**: +350 UF
- ☑️ **Bodega**: +100 UF
- **Subtotal**: 1,350 + 350 + 100 = **1,800 UF**

#### C. Aporte Inmobiliaria (Opcional)
- **Porcentaje**: 10% del subtotal
- **Propósito**: Evitar que el cliente pague pie, el banco financia más
- **Cálculo**: 1,800 × 0.10 = **180 UF**
- **Total Final**: 1,800 + 180 = **1,980 UF**

#### D. Forma de Pago
Debe sumar **exactamente** el total (1,980 UF):

| Método | Monto |
|--------|-------|
| Reserva | 20 UF |
| Ahorro | 200 UF |
| Aporte Inmobiliario | 180 UF |
| Crédito Fundit | 500 UF |
| Crédito Hipotecario | 1,080 UF |
| **TOTAL** | **1,980 UF** ✓ |

### 4. **Generación de Cotización**
El usuario puede generar una cotización PDF con:
- Datos del cliente
- Desglose detallado de precios
- Forma de pago
- Fecha de cotización

### 5. **Confirmación de Venta**
Si todo está correcto, se crea la ficha de venta en el sistema.

## 🔧 Uso en el Frontend

### Componente: `StepPaymentComponent`

```typescript
// El componente calcula automáticamente:
// 1. Valor con descuento
// 2. Adicionales
// 3. Subtotal
// 4. Aporte inmobiliaria
// 5. Total final

// Validación en tiempo real:
isValid = Math.abs(sumaPago - valorTotal) < 0.1;
```

### Ejemplo de Interacción del Usuario

1. **Ingresa descuento**: 10%
   - Se muestra: "- 150 UF"
   
2. **Selecciona Estacionamiento**: ✓
   - Se muestra: "+ 350 UF"
   
3. **Selecciona Bodega**: ✓
   - Se muestra: "+ 100 UF"
   
4. **Activa Aporte Inmobiliaria**: ✓
   - Se calcula automáticamente: "+ 180 UF"
   - Se muestra: **"Total: 1,980 UF"**
   
5. **Distribuye forma de pago**:
   - Reserva: 20
   - Ahorro: 200
   - Aporte: 180 (bloqueado, calculado automáticamente)
   - Fundit: 500
   - Hipotecario: 1,080
   
6. **Validación**:
   - ✓ Suma: 1,980 UF
   - ✓ Coincide con total
   - Botón "Confirmar Venta" se habilita

## 🔌 Integración Backend-Frontend

### Endpoint: `POST /sales`

**Request:**
```json
{
  "unidadId": 1,
  "clienteId": 1,
  "descuentoPorcentaje": 10,
  "incluyeEstacionamiento": true,
  "incluyeBodega": true,
  "usaAporteInmobiliaria": true,
  "formaPago": {
    "reserva": 20,
    "ahorro": 200,
    "aporteInmobiliario": 180,
    "creditoFundit": 500,
    "creditoHipotecario": 1080
  }
}
```

**Response (Éxito):**
```json
{
  "id": 1,
  "folio": "F-1732645200000",
  "estadoFicha": "BORRADOR",
  "valorTotalUf": 1980,
  "descuentoPorcentaje": 10,
  "valorDescuentoUf": 150,
  "bonoPie": true,
  "hasFundit": true,
  "creditoFunditMonto": 500,
  "montoHipotecario": 1080,
  "createdAt": "2025-11-26T16:00:00.000Z"
}
```

**Response (Error de Validación):**
```json
{
  "statusCode": 400,
  "message": "La suma de la forma de pago (1900) no coincide con el valor total (1980)",
  "error": "Bad Request"
}
```

### Endpoint: `POST /sales/cotizacion`

**Request:** (Mismo que POST /sales)

**Response:**
```json
{
  "clienteNombre": "Juan Pérez González",
  "clienteRut": "12.345.678-9",
  "proyectoNombre": "Edificio Vista Mar",
  "unidadNumero": "101",
  "unidadTipo": "2D+2B",
  "valorBaseUf": 1500,
  "descuentoPorcentaje": 10,
  "valorDescuentoUf": 150,
  "valorConDescuentoUf": 1350,
  "valorEstacionamientoUf": 350,
  "valorBodegaUf": 100,
  "subtotalUf": 1800,
  "valorAporteInmobiliariaUf": 180,
  "valorTotalUf": 1980,
  "formaPago": {
    "reserva": 20,
    "ahorro": 200,
    "aporteInmobiliario": 180,
    "creditoFundit": 500,
    "creditoHipotecario": 1080
  },
  "fechaCotizacion": "2025-11-26T16:00:00.000Z"
}
```

## ⚠️ Errores Comunes

### Error 1: Suma de pagos no coincide
```
BadRequestException: La suma de la forma de pago (1900) no coincide con el valor total (1980)
```
**Solución**: Ajustar los montos en la forma de pago para que sumen exactamente el total.

### Error 2: Descuento fuera de rango
```
ValidationError: descuentoPorcentaje must not be greater than 15
```
**Solución**: El descuento debe estar entre 1% y 15%.

### Error 3: Unidad no disponible
```
BadRequestException: La unidad ya no está disponible
```
**Solución**: Seleccionar otra unidad disponible.

## 📊 Reglas de Negocio

1. **Descuento**:
   - Mínimo: 1%
   - Máximo: 15%
   - Aplica SOLO al valor base del departamento

2. **Adicionales**:
   - Se suman DESPUÉS del descuento
   - Valores fijos por proyecto

3. **Aporte Inmobiliaria**:
   - Siempre es 10% del subtotal
   - Se calcula automáticamente
   - Campo bloqueado en el frontend

4. **Forma de Pago**:
   - Debe sumar 100% del total
   - Tolerancia de 0.01 UF para redondeo

## 🧪 Casos de Prueba

Ver archivo `EJEMPLOS_LOGICA_FINANCIERA.js` para casos de prueba detallados con:
- Ejemplo 1: Sin descuento ni adicionales
- Ejemplo 2: Con descuento y estacionamiento
- Ejemplo 3: Caso completo con todos los elementos
- Ejemplo 4: Error de validación

## 🚀 Próximos Pasos

1. **Generación de PDF**: Implementar generación real de PDF para cotizaciones
2. **Asignación de Adicionales**: Asignar estacionamientos y bodegas específicos
3. **Historial de Cotizaciones**: Guardar cotizaciones generadas
4. **Reportes**: Dashboard con estadísticas de ventas
