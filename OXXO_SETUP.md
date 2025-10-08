# Configuración de Pagos Oxxo (Digital@FEMSA)

## 📋 Requisitos Previos

1. **Cuenta en Digital@FEMSA**
   - Registrarse en: https://panel.digitalfemsa.io/
   - Si tenías cuenta en Conekta para OXXO Pay, tus credenciales migraron automáticamente

2. **Credenciales necesarias:**
   - API Key (Access Token)
   - Ambiente (test/prod)

---

## 🔑 Paso 1: Obtener Credenciales

### Opción A: Cuenta Nueva en Digital@FEMSA

1. Visita https://panel.digitalfemsa.io/
2. Crea una cuenta comerciante
3. Completa el proceso de verificación
4. Ve a **Configuración → API Keys**
5. Copia tu **API Key** (comenzando con `key_`)

### Opción B: Migración desde Conekta

1. Visita https://panel.digitalfemsa.io/
2. Inicia sesión con las mismas credenciales de Conekta
3. Tus API keys se migraron automáticamente
4. El dominio cambió de `api.conekta.io` a `api.digitalfemsa.io`

---

## 🔒 Paso 2: Configurar Secrets en Firebase

Ejecuta los siguientes comandos en la terminal:

```bash
# Navegar al directorio del proyecto
cd /Users/jorgeporras/Documents/CODIGO/Plataforma\ de\ Crowdfunding/nuestras-voces-crowdfunding

# Configurar API Key de Digital@FEMSA
echo -n "key_xxxxxxxxxxxxx" | firebase functions:secrets:set DIGITALFEMSA_API_KEY

# Configurar ambiente (test o prod)
echo -n "test" | firebase functions:secrets:set DIGITALFEMSA_ENVIRONMENT
```

**IMPORTANTE:**
- Usa `echo -n` (sin salto de línea) para evitar errores
- Reemplaza `key_xxxxxxxxxxxxx` con tu API Key real
- Para producción, usa `"prod"` en lugar de `"test"`

---

## 🚀 Paso 3: Desplegar Firebase Functions

```bash
# Desplegar todas las funciones (incluida createOxxoPayment)
firebase deploy --only functions
```

Esto desplegará:
- `createOxxoPayment` - Genera vouchers de Oxxo
- `createPaymentUrl` - Procesa pagos con tarjeta (Fiserv)

---

## 🧪 Paso 4: Probar en Ambiente de Pruebas

### Flujo de prueba:

1. **En la aplicación web:**
   - Ir a http://localhost:3000 (desarrollo) o tu URL de producción
   - Hacer clic en "Quiero ser parte"
   - Llenar el formulario de donación
   - Seleccionar **"🏪 Oxxo"** como método de pago
   - Click en "Continuar al Pago"

2. **Generación del voucher:**
   - Se mostrará un código de barras
   - Referencia de pago numérica
   - Fecha de expiración (3 días)
   - Botón para descargar el voucher

3. **Pago en Oxxo (ambiente de pruebas):**
   - En ambiente de pruebas, el pago NO se procesará en tiendas reales
   - Para simular un pago completado, usa el webhook manual (ver sección Webhooks)

### Datos de prueba:

- **Monto mínimo:** $50 MXN
- **Monto máximo en Oxxo:** $10,000 MXN por transacción
- **Vigencia:** 3 días desde la generación

---

## 📊 Paso 5: Verificar Logs

Para ver los logs de las funciones:

```bash
# Ver logs en Firebase Console
open "https://console.firebase.google.com/project/nuestras-voces-crowdfunding/functions/logs"

# O usar CLI
firebase functions:log
```

Busca:
```
=== Oxxo Payment Debug ===
Environment: test
Order ID: DON-2025-XXXXXX
Amount (centavos): 50000
Customer: Juan Pérez
```

---

## 🔔 Webhooks (Confirmación de Pago)

### Configurar Webhook en Digital@FEMSA:

1. Ir a https://panel.digitalfemsa.io/
2. **Configuración → Webhooks**
3. Agregar nuevo webhook:
   - **URL:** `https://us-central1-nuestras-voces-crowdfunding.cloudfunctions.net/oxxoWebhook`
   - **Eventos:** Seleccionar `order.paid`
   - **Guardar**

4. **Whitelist de IPs** (requerido por Digital@FEMSA):
   - `52.44.103.21`
   - `52.55.241.130`
   - Puertos permitidos: `80`, `443`, `1025-10001`

### Eventos del Webhook:

Digital@FEMSA enviará notificaciones cuando:
- `order.paid` - El usuario pagó en Oxxo (confirmar donación)
- `order.expired` - Expiró el voucher sin pagar
- `order.canceled` - Se canceló manualmente

---

## 🔧 Troubleshooting

### Error: "No se pudo generar el voucher de Oxxo"

**Causa:** API Key incorrecta o ambiente mal configurado

**Solución:**
```bash
# Verificar secrets actuales
firebase functions:secrets:access DIGITALFEMSA_API_KEY
firebase functions:secrets:access DIGITALFEMSA_ENVIRONMENT

# Si son incorrectos, actualizarlos
echo -n "key_CORRECTO" | firebase functions:secrets:set DIGITALFEMSA_API_KEY
firebase deploy --only functions
```

### Error: "Payment method not supported"

**Causa:** El método `oxxo_cash` no está habilitado en tu cuenta

**Solución:**
- Contactar soporte de Digital@FEMSA
- Verificar que tu cuenta tenga OXXO Pay habilitado
- Email: soporte@digitalfemsa.com

### Error: "Amount exceeds limit"

**Causa:** El monto excede $10,000 MXN (límite de Oxxo)

**Solución:**
- Para montos mayores, dividir en múltiples pagos
- O usar otro método de pago (tarjeta, transferencia)

---

## 📚 Recursos Adicionales

- **Documentación oficial:** https://developers.digitalfemsa.io/
- **Panel de control:** https://panel.digitalfemsa.io/
- **Soporte:** soporte@digitalfemsa.com
- **GitHub SDK:** https://github.com/digitaltitransversal/digitalfemsa-node

---

## 🔐 Seguridad

### Credenciales en Producción:

```bash
# NUNCA expongas la API Key en el código
# Siempre usa Firebase Secret Manager
echo -n "key_PRODUCCION" | firebase functions:secrets:set DIGITALFEMSA_API_KEY
echo -n "prod" | firebase functions:secrets:set DIGITALFEMSA_ENVIRONMENT

# Desplegar
firebase deploy --only functions
```

### URLs de API:

- **Test:** No se especifica, se usa la misma API
- **Producción:** https://api.digitalfemsa.io

---

## ✅ Checklist de Configuración

- [ ] Cuenta creada en Digital@FEMSA
- [ ] API Key obtenida
- [ ] Secrets configurados en Firebase
- [ ] Functions desplegadas
- [ ] Prueba realizada con voucher
- [ ] Webhook configurado (para recibir confirmaciones)
- [ ] Whitelist de IPs actualizada
- [ ] Logs verificados

---

## 💰 Costos

**Digital@FEMSA (OXXO Pay):**
- Sin costo mensual
- Comisión por transacción: ~3.5% + $8 MXN
- Liquidación: 48-72 horas después del pago

**Ejemplo:**
- Donación: $500 MXN
- Comisión: $17.50 + $8 = $25.50 MXN
- Neto recibido: $474.50 MXN
