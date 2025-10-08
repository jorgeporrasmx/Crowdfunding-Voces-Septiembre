# Pasos para Activar Oxxo Pay en Producción

## ✅ Estado Actual

- ✅ Integración técnica completada
- ✅ Modo de pruebas funcionando
- ✅ Generación de vouchers OK
- ✅ UI/UX implementada
- ⏳ **Pendiente: Activación de cuenta empresarial**

---

## 📋 Requisitos de Digital@FEMSA para Producción

### Documentación necesaria (México):

1. **Constitutiva de la empresa**
   - Acta constitutiva
   - Debe estar vigente
   - Registrada ante notario público

2. **Identificación oficial del representante legal**
   - INE/IFE vigente
   - Pasaporte (en caso de extranjeros)

3. **Comprobante de domicilio fiscal**
   - No mayor a 3 meses
   - CFE, agua, teléfono, o estado de cuenta bancario
   - Debe coincidir con domicilio fiscal del RFC

4. **RFC (Registro Federal de Contribuyentes)**
   - Constancia de situación fiscal actualizada
   - Emitida por el SAT

5. **Estado de cuenta bancario**
   - Clabe interbancaria
   - Cuenta a nombre de la empresa
   - Para recibir los pagos procesados

6. **Poder notarial** (si aplica)
   - Si quien firma no es el representante legal
   - Debe facultar para actos de administración

---

## 🔄 Proceso de Activación

### 1. Contactar a Digital@FEMSA

**Email:** comercial@digitalfemsa.com o soporte@digitalfemsa.com

**Asunto:** Solicitud de activación de cuenta productiva - Oxxo Pay

**Mensaje sugerido:**
```
Estimado equipo de Digital@FEMSA:

Somos [Nombre de la empresa/proyecto], una plataforma de crowdfunding
para proyectos [descripción breve].

Ya hemos completado la integración técnica de Oxxo Pay en ambiente
de pruebas y estamos listos para pasar a producción.

Adjunto la documentación requerida:
- Acta constitutiva
- Identificación oficial del representante legal
- Comprobante de domicilio fiscal
- RFC y constancia de situación fiscal
- Estado de cuenta bancario

Agradecemos puedan orientarnos en los siguientes pasos.

Saludos cordiales,
[Nombre]
[Cargo]
[Teléfono de contacto]
```

### 2. Revisión de Documentos (3-5 días hábiles)

Digital@FEMSA revisará:
- ✅ Autenticidad de documentos
- ✅ Cumplimiento normativo
- ✅ Análisis de riesgo del negocio

### 3. Aprobación y Configuración

Una vez aprobado:
- 📧 Recibirás credenciales de producción
- 🔑 API Key de producción (key_live_xxxxx)
- 📊 Acceso al panel productivo

### 4. Activación en el Código

```bash
# Configurar API Key de producción
echo -n "key_live_XXXXX" | firebase functions:secrets:set DIGITALFEMSA_API_KEY

# Cambiar ambiente a producción
echo -n "prod" | firebase functions:secrets:set DIGITALFEMSA_ENVIRONMENT

# Desplegar
firebase deploy --only functions
```

---

## 💰 Tarifas y Comisiones (Productivo)

### Comisiones estándar de Oxxo Pay:

- **Porcentaje:** 3.5% + IVA por transacción
- **Cargo fijo:** $8 MXN + IVA por transacción
- **Sin costo mensual:** No hay cuota de mantenimiento

### Ejemplo de cálculo:

```
Donación:     $500.00 MXN
Comisión %:    $17.50 MXN (3.5%)
Cargo fijo:     $8.00 MXN
IVA:            $4.08 MXN (16%)
-----------------------------------
Total comisión: $29.58 MXN
Neto recibido: $470.42 MXN
```

### Liquidación:

- **Tiempo:** 48-72 horas después del pago
- **Transferencia:** Directa a cuenta bancaria registrada
- **Reporte:** Disponible en panel.digitalfemsa.io

---

## 🔒 Seguridad en Producción

### Checklist de seguridad:

- [ ] Llave privada configurada en Secret Manager (NUNCA en código)
- [ ] HTTPS habilitado en toda la aplicación
- [ ] Webhook con IP whitelist configurado
- [ ] Logs de transacciones habilitados
- [ ] Monitoreo de errores activo (Firebase)
- [ ] Backup de base de datos configurado
- [ ] Política de privacidad actualizada
- [ ] Términos y condiciones que incluyan Oxxo

---

## 🔔 Configurar Webhook de Producción

Una vez en producción, configura el webhook:

### URL del Webhook:
```
https://us-central1-nuestras-voces-crowdfunding.cloudfunctions.net/oxxoWebhook
```

### Eventos a suscribir:
- ✅ `order.paid` - Pago completado
- ✅ `order.expired` - Voucher expirado
- ✅ `order.canceled` - Orden cancelada

### Whitelist de IPs (requerido):
```
52.44.103.21
52.55.241.130
```

**Nota:** El webhook aún no está implementado. Ver sección siguiente.

---

## ⚠️ Pendientes Técnicos

### 1. Implementar Webhook para confirmación automática

**Actualmente:**
- ❌ Los pagos en Oxxo NO se confirman automáticamente
- ⚠️ Status de donación queda como "pending_oxxo" indefinidamente

**Necesario:**
- ✅ Crear función `oxxoWebhook` en Firebase Functions
- ✅ Validar firma HMAC del webhook
- ✅ Actualizar status de donación a "completed"
- ✅ Enviar email de confirmación al donante
- ✅ Registrar evento en analytics

**Prioridad:** ALTA (antes de producción)

### 2. Email de confirmación

**Actualmente:**
- ⚠️ No se envía email cuando se genera el voucher
- ⚠️ No se envía email cuando se completa el pago

**Necesario:**
- ✅ Integrar SendGrid o similar
- ✅ Template de "Voucher generado"
- ✅ Template de "Pago confirmado"

### 3. Panel de administración

**Recomendado:**
- Dashboard para ver donaciones pendientes de Oxxo
- Reconciliación manual si webhook falla
- Reportes de pagos recibidos

---

## 📊 Testing Pre-Producción

### Checklist antes de activar producción:

- [ ] Probar flujo completo con voucher de prueba
- [ ] Verificar que voucher se descarga correctamente
- [ ] Confirmar que donación se registra en Firestore
- [ ] Probar expiración de vouchers (webhook)
- [ ] Validar UI en mobile y desktop
- [ ] Verificar textos y traducciones
- [ ] Probar con diferentes montos ($50 - $10,000)
- [ ] Testing de errores (API caída, timeout, etc.)

---

## 📞 Contactos

**Digital@FEMSA:**
- Comercial: comercial@digitalfemsa.com
- Soporte técnico: soporte@digitalfemsa.com
- Panel: https://panel.digitalfemsa.io/
- Documentación: https://developers.digitalfemsa.io/

**Horario de atención:**
- Lunes a Viernes: 9:00 - 18:00 (horario CDMX)

---

## 🎯 Siguientes Pasos Recomendados

### Corto plazo (antes de producción):
1. ✅ Implementar webhook de confirmación
2. ✅ Configurar emails transaccionales
3. ✅ Preparar documentación legal
4. ✅ Solicitar activación a Digital@FEMSA

### Mediano plazo (optimizaciones):
1. Dashboard de administración
2. Reportes de conciliación
3. Reintentos automáticos si webhook falla
4. Notificaciones push cuando se completa pago

---

## 📝 Notas Importantes

1. **Modo Test vs Producción:**
   - En test: Los pagos en Oxxo NO se procesan realmente
   - En producción: Los pagos SÍ se cobran y transfieren

2. **Límites de Oxxo:**
   - Mínimo: No hay mínimo oficial (recomendado $50 MXN)
   - Máximo: $10,000 MXN por transacción
   - Para montos mayores: usar otro método

3. **Vigencia de vouchers:**
   - Configurado: 3 días
   - Después expira automáticamente
   - Digital@FEMSA envía webhook `order.expired`

4. **Horarios de pago:**
   - Oxxo acepta pagos 24/7
   - Confirmación en 1-30 minutos (usualmente inmediato)
   - Liquidación a tu cuenta: 48-72 horas

---

## ✅ Checklist Final para Producción

- [ ] Documentos legales preparados
- [ ] Webhook implementado y probado
- [ ] Emails configurados
- [ ] Cuenta aprobada por Digital@FEMSA
- [ ] Llave de producción configurada
- [ ] Testing exhaustivo completado
- [ ] Monitoreo y alertas configuradas
- [ ] Plan de contingencia documentado
- [ ] Equipo capacitado en uso del panel
- [ ] Política de reembolsos definida

---

**Última actualización:** 2025-10-02
