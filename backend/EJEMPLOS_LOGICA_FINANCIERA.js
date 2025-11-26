/**
 * EJEMPLO DE USO - LÓGICA FINANCIERA
 * 
 * Este archivo muestra cómo funciona la lógica de cálculo financiero
 * para la venta de departamentos con descuentos, adicionales y aporte inmobiliaria.
 */

// ============================================
// EJEMPLO 1: Cálculo Básico Sin Descuento
// ============================================

const ejemplo1 = {
    // Datos de entrada
    input: {
        unidadId: 1,
        clienteId: 1,
        descuentoPorcentaje: 0,  // Sin descuento
        incluyeEstacionamiento: false,
        incluyeBodega: false,
        usaAporteInmobiliaria: false,
        formaPago: {
            reserva: 20,
            ahorro: 100,
            aporteInmobiliario: 0,
            creditoFundit: 0,
            creditoHipotecario: 1380
        }
    },

    // Valores de ejemplo
    valorBaseUnidad: 1500, // UF
    valorEstacionamiento: 350, // UF
    valorBodega: 100, // UF

    // Cálculo paso a paso
    calculo: {
        // 1. Aplicar descuento
        descuentoMonto: 1500 * (0 / 100), // = 0 UF
        valorConDescuento: 1500 - 0, // = 1500 UF

        // 2. Agregar adicionales
        valorEstacionamiento: 0, // No incluye
        valorBodega: 0, // No incluye
        subtotal: 1500 + 0 + 0, // = 1500 UF

        // 3. Calcular aporte inmobiliaria
        aporteInmobiliaria: 0, // No usa aporte

        // 4. Total final
        valorTotal: 1500 + 0, // = 1500 UF
    },

    // Validación de forma de pago
    validacion: {
        sumaPagos: 20 + 100 + 0 + 0 + 1380, // = 1500 UF
        esValido: true, // sumaPagos === valorTotal
        mensaje: "✓ La suma de pagos coincide con el total"
    }
};

// ============================================
// EJEMPLO 2: Con Descuento y Estacionamiento
// ============================================

const ejemplo2 = {
    input: {
        unidadId: 2,
        clienteId: 2,
        descuentoPorcentaje: 5,  // 5% de descuento
        incluyeEstacionamiento: true,
        incluyeBodega: false,
        usaAporteInmobiliaria: false,
        formaPago: {
            reserva: 20,
            ahorro: 150,
            aporteInmobiliario: 0,
            creditoFundit: 0,
            creditoHipotecario: 1655
        }
    },

    valorBaseUnidad: 1500,
    valorEstacionamiento: 350,
    valorBodega: 100,

    calculo: {
        // 1. Aplicar descuento al valor base
        descuentoMonto: 1500 * (5 / 100), // = 75 UF
        valorConDescuento: 1500 - 75, // = 1425 UF

        // 2. Agregar adicionales
        valorEstacionamiento: 350, // Incluye estacionamiento
        valorBodega: 0,
        subtotal: 1425 + 350 + 0, // = 1775 UF

        // 3. Aporte inmobiliaria
        aporteInmobiliaria: 0,

        // 4. Total
        valorTotal: 1775 + 0, // = 1775 UF
    },

    validacion: {
        sumaPagos: 20 + 150 + 0 + 0 + 1655, // = 1825 UF
        esValido: false, // ¡ERROR! No coincide
        diferencia: 1825 - 1775, // = 50 UF de más
        mensaje: "✗ Error: La suma de pagos (1825 UF) no coincide con el total (1775 UF)"
    }
};

// ============================================
// EJEMPLO 3: Caso Completo con Aporte Inmobiliaria
// ============================================

const ejemplo3 = {
    input: {
        unidadId: 3,
        clienteId: 3,
        descuentoPorcentaje: 10,  // 10% de descuento
        incluyeEstacionamiento: true,
        incluyeBodega: true,
        usaAporteInmobiliaria: true,  // ¡Usa aporte!
        formaPago: {
            reserva: 20,
            ahorro: 200,
            aporteInmobiliario: 189.75,  // Calculado automáticamente
            creditoFundit: 500,
            creditoHipotecario: 1178
        }
    },

    valorBaseUnidad: 1500,
    valorEstacionamiento: 350,
    valorBodega: 100,

    calculo: {
        // 1. Aplicar descuento SOLO al departamento
        descuentoMonto: 1500 * (10 / 100), // = 150 UF
        valorConDescuento: 1500 - 150, // = 1350 UF

        // 2. Agregar adicionales DESPUÉS del descuento
        valorEstacionamiento: 350,
        valorBodega: 100,
        subtotal: 1350 + 350 + 100, // = 1800 UF

        // 3. Calcular aporte inmobiliaria (10% del subtotal)
        aporteInmobiliaria: 1800 * 0.10, // = 180 UF

        // 4. Total final
        valorTotal: 1800 + 180, // = 1980 UF
    },

    validacion: {
        sumaPagos: 20 + 200 + 180 + 500 + 1080, // = 1980 UF
        esValido: true,
        mensaje: "✓ La suma de pagos coincide con el total"
    },

    desglose: {
        "Valor Base Departamento": "1,500 UF",
        "Descuento (10%)": "-150 UF",
        "Valor con Descuento": "1,350 UF",
        "Estacionamiento": "+350 UF",
        "Bodega": "+100 UF",
        "Subtotal": "1,800 UF",
        "Aporte Inmobiliaria (10%)": "+180 UF",
        "TOTAL FINAL": "1,980 UF",
        "": "",
        "Forma de Pago:": "",
        "  - Reserva": "20 UF",
        "  - Ahorro": "200 UF",
        "  - Aporte Inmobiliario": "180 UF",
        "  - Crédito Fundit": "500 UF",
        "  - Crédito Hipotecario": "1,080 UF",
        "  TOTAL PAGOS": "1,980 UF ✓"
    }
};

// ============================================
// EJEMPLO 4: Error de Validación
// ============================================

const ejemplo4_error = {
    input: {
        unidadId: 4,
        clienteId: 4,
        descuentoPorcentaje: 15,  // Máximo permitido
        incluyeEstacionamiento: true,
        incluyeBodega: true,
        usaAporteInmobiliaria: true,
        formaPago: {
            reserva: 20,
            ahorro: 100,
            aporteInmobiliario: 175.5,
            creditoFundit: 0,
            creditoHipotecario: 1500  // ¡Monto incorrecto!
        }
    },

    valorBaseUnidad: 1500,
    valorEstacionamiento: 350,
    valorBodega: 100,

    calculo: {
        descuentoMonto: 1500 * (15 / 100), // = 225 UF
        valorConDescuento: 1500 - 225, // = 1275 UF
        valorEstacionamiento: 350,
        valorBodega: 100,
        subtotal: 1275 + 350 + 100, // = 1725 UF
        aporteInmobiliaria: 1725 * 0.10, // = 172.5 UF
        valorTotal: 1725 + 172.5, // = 1897.5 UF
    },

    validacion: {
        sumaPagos: 20 + 100 + 175.5 + 0 + 1500, // = 1795.5 UF
        esValido: false,
        diferencia: 1897.5 - 1795.5, // = 102 UF faltantes
        mensaje: "✗ Error: Faltan 102 UF. La suma de pagos debe ser exactamente 1897.5 UF",
        errorBackend: "BadRequestException: La suma de la forma de pago (1795.5) no coincide con el valor total (1897.5)"
    }
};

// ============================================
// REGLAS DE NEGOCIO
// ============================================

const reglasNegocio = {
    descuento: {
        minimo: 1,  // %
        maximo: 15, // %
        aplicaSolo: "Valor base del departamento (NO a adicionales)",
        validacion: "El descuento debe estar entre 1% y 15%"
    },

    adicionales: {
        estacionamiento: {
            valorEjemplo: 350, // UF
            aplicacion: "Se suma DESPUÉS del descuento"
        },
        bodega: {
            valorEjemplo: 100, // UF
            aplicacion: "Se suma DESPUÉS del descuento"
        }
    },

    aporteInmobiliaria: {
        porcentaje: 10, // %
        aplicaSobre: "Subtotal (Dept con descuento + Adicionales)",
        proposito: "Permite al cliente no pagar pie, el banco financia más UF",
        calculo: "Subtotal * 0.10"
    },

    formaPago: {
        componentes: [
            "Reserva",
            "Ahorro/Transferencia/Transbank/Getnet",
            "Aporte Inmobiliario (automático si se activa)",
            "Pagaré Fundit",
            "Crédito Hipotecario"
        ],
        validacion: "La suma de TODOS los componentes debe ser exactamente 100% del valor total",
        tolerancia: "0.01 UF (para errores de redondeo)"
    },

    ordenCalculo: [
        "1. Valor Base del Departamento",
        "2. Aplicar Descuento (1-15%) al valor base",
        "3. Sumar Estacionamiento (si aplica)",
        "4. Sumar Bodega (si aplica)",
        "5. Calcular Subtotal",
        "6. Calcular Aporte Inmobiliaria (10% del subtotal, si aplica)",
        "7. Calcular Valor Total Final",
        "8. Validar que Forma de Pago sume 100% del total"
    ]
};

// Exportar ejemplos para uso
module.exports = {
    ejemplo1,
    ejemplo2,
    ejemplo3,
    ejemplo3_completo: ejemplo3,
    ejemplo4_error,
    reglasNegocio
};

console.log("=".repeat(60));
console.log("EJEMPLOS DE LÓGICA FINANCIERA");
console.log("=".repeat(60));
console.log("\nEJEMPLO 3 - CASO COMPLETO:");
console.log(JSON.stringify(ejemplo3.desglose, null, 2));
