# Plan de Desarrollo - Plataforma de Crowdfunding "Nuestras Voces"

## 1. PENSAMIENTO Y PLANIFICACIÓN ✅

### Análisis del Proyecto:
- **Proyecto**: Documental "Nuestras Voces" sobre el doblaje mexicano
- **Presupuesto**: $7.26M MXN total, necesita $5M MXN vía crowdfunding
- **Modelo**: Keep-it-all (sin mínimo, campaña abierta indefinidamente)
- **Público**: Usuarios mexicanos de todas las edades + donantes internacionales
- **Enfoque**: Usabilidad para usuarios no tecnológicos

### Guía de Estilo Identificada:
- **Colores**: Palette nostálgica con tonos cálidos, teal/verde aqua, naranja, magenta, azul, verde lima
- **Estética**: Elementos de cabinas de grabación, micrófonos vintage, estilo pop art/comic
- **Tipografía**: Fuentes bold y modernas con elementos gráficos dinámicos
- **Elementos**: Estrellas, rayos dinámicos, patrones de puntos, fondos radiales

## 2. LISTA DE TAREAS A DESARROLLAR

### FASE 1: CONFIGURACIÓN Y DISEÑO BASE
- [ ] **Configurar entorno de desarrollo Web (React + Vite + Tailwind)**
- [ ] **Configurar entorno de desarrollo Mobile (React Native)**
- [ ] **Crear sistema de colores y tipografías basado en guía de estilo**
- [ ] **Implementar componentes base de UI**
- [ ] **Configurar estructura de routing**

### FASE 2: COMPONENTES PRINCIPALES
- [ ] **Header/Navigation con logo "Nuestras Voces"**
- [ ] **Hero Section con video pitch integrado**
- [ ] **Barra de progreso de financiación**
- [ ] **Formulario de donación con niveles de recompensas**
- [ ] **Sistema de recompensas visuales**
- [ ] **Footer con información de contacto**

### FASE 3: FUNCIONALIDADES CORE
- [ ] **Panel de transparencia en tiempo real**
  - [ ] Gráficos de uso de fondos (pastel/barras)
  - [ ] Actualizaciones de progreso
  - [ ] Área protegida para donantes
- [ ] **Sistema de recompensas personalizadas (11 niveles oficiales)**
  - [ ] Nivel 1: Voz Solidaria – $200 MXN
  - [ ] Nivel 2: Voz Comprometida – $300 MXN
  - [ ] Nivel 3: Voz que Inspira – $500 MXN
  - [ ] Nivel 4: Voz que Acompaña – $1,000 MXN
  - [ ] Nivel 5: Voz Presente – $2,000 MXN
  - [ ] Nivel 6: Voz Cercana – $5,000 MXN
  - [ ] Nivel 7: Voz que Resuena – $10,000 MXN
  - [ ] Nivel 8: Voz Conectada – $25,000 MXN
  - [ ] Nivel 9: Voz Inolvidable – $50,000 MXN
  - [ ] Nivel 10: Voz del Documental – $100,000 MXN
  - [ ] Nivel 11: Voz Eterna – $1,000,000 MXN
- [ ] **Integración de métodos de pago (MOCK)**
  - [ ] Conekta/Mercado Pago simulation
  - [ ] Stripe internacional simulation
  - [ ] Criptomonedas simulation

### FASE 4: GAMIFICACIÓN Y ENGAGEMENT
- [ ] **Sistema de insignias para donantes**
- [ ] **Tabla de clasificación pública**
- [ ] **Sistema de puntos por compartir en redes**
- [ ] **Botones de compartir (WhatsApp, Twitter, Instagram, TikTok)**
- [ ] **Kit de prensa digital descargable**

### FASE 5: SOPORTE Y TRANSPARENCIA
- [ ] **Chatbot de IA (simulado)**
- [ ] **Sección FAQ completa**
- [ ] **Sistema de contratos de coproducción digital**
- [ ] **Panel de administrador con métricas**
- [ ] **Integración Google Analytics (mock)**

### FASE 6: RESPONSIVE Y MOBILE
- [ ] **Adaptación responsive completa**
- [ ] **App móvil React Native**
- [ ] **Optimización para adultos mayores**
- [ ] **Navegación simplificada (máximo 1-2 clics)**

### FASE 7: LOCALIZACIÓN Y ACCESIBILIDAD
- [ ] **Soporte español/inglés**
- [ ] **Alto contraste para accesibilidad**
- [ ] **Texto claro y simple**
- [ ] **Botones grandes y claros**

### FASE 8: TESTING Y DOCUMENTACIÓN
- [ ] **Pruebas unitarias con Jest**
- [ ] **Testing de usabilidad**
- [ ] **Documentación README completa**
- [ ] **Guía de despliegue**

## 3. ESPECIFICACIONES TÉCNICAS

### Web App (React):
- **Framework**: React 18+ con Vite
- **Styling**: Tailwind CSS con configuración personalizada
- **State Management**: Context API + useState/useReducer
- **Routing**: React Router v6
- **Testing**: Jest + React Testing Library
- **Build**: Vite para desarrollo y producción

### Mobile App (React Native):
- **Framework**: React Native con Expo
- **Navigation**: React Navigation v6
- **Styling**: React Native StyleSheet + componentes reutilizables
- **State**: Context API compartido con web

### Shared Components:
- **Design System**: Componentes base reutilizables
- **Types**: TypeScript definitions compartidas
- **Utils**: Funciones de utilidad común
- **Assets**: Imágenes, iconos, videos

## 4. ESTRUCTURA DE ARCHIVOS CREADA

```
nuestras-voces-crowdfunding/
├── web-app/           # Aplicación web React
│   ├── src/
│   │   ├── components/    # Componentes reutilizables
│   │   ├── pages/        # Páginas principales
│   │   ├── assets/       # Imágenes, videos, etc.
│   │   ├── styles/       # Estilos globales y Tailwind config
│   │   ├── utils/        # Funciones de utilidad
│   │   └── hooks/        # Custom React hooks
│   └── public/           # Archivos estáticos
├── mobile-app/        # Aplicación móvil React Native
│   └── src/
│       ├── components/
│       ├── screens/
│       ├── assets/
│       ├── styles/
│       ├── utils/
│       └── hooks/
├── shared/            # Componentes y lógica compartida
│   ├── components/
│   ├── styles/
│   ├── utils/
│   ├── types/
│   └── assets/
├── tasks/             # Documentación y planning
├── docs/              # Documentación técnica
└── Assets/            # Recursos de diseño originales
```

## 5. CONFIGURACIONES CLAVE

### Colores de la Marca (basados en referencias):
```css
:root {
  --primary-teal: #2dd4bf;      /* Verde aqua principal */
  --primary-orange: #f97316;    /* Naranja vibrante */
  --primary-magenta: #ec4899;   /* Magenta/rosa */
  --primary-blue: #3b82f6;      /* Azul vibrante */
  --primary-purple: #8b5cf6;    /* Púrpura */
  --primary-green: #84cc16;     /* Verde lima */
  --primary-red: #ef4444;       /* Rojo */
  
  --neutral-dark: #1f2937;      /* Texto oscuro */
  --neutral-light: #f9fafb;     /* Fondo claro */
  --neutral-gray: #6b7280;      /* Texto secundario */
}
```

### Tipografías:
- **Headings**: Font bold, sans-serif moderna
- **Body**: Font regular, fácil lectura
- **Display**: Font extra-bold para títulos principales

### Componentes Clave:
1. **ProgressBar**: Barra de financiación con animaciones
2. **DonationCard**: Tarjetas de niveles de donación (11 niveles)
3. **BadgeSystem**: Sistema de insignias gamificado
4. **TransparencyDashboard**: Panel de transparencia
5. **SocialShare**: Botones de compartir redes sociales

## RECOMPENSAS OFICIALES - SISTEMA DE 11 NIVELES

### 🟡 Nivel 1: Voz Solidaria – $200 MXN
- Nombre en créditos del documental
- Fondo de pantalla exclusivo (digital)
- Agradecimiento por correo electrónico

### 🟡 Nivel 2: Voz Comprometida – $300 MXN  
- Todo lo anterior
- Sticker digital para redes sociales con tu nombre
- Acceso anticipado al tráiler oficial

### 🟠 Nivel 3: Voz que Inspira – $500 MXN
- Todo lo anterior
- Agradecimiento público en redes sociales
- Póster digital del documental
- Invitación a evento virtual de preestreno

### 🟠 Nivel 4: Voz que Acompaña – $1,000 MXN
- Todo lo anterior
- Acceso a "detrás de cámaras" exclusivo (material extra)
- Versión descargable del soundtrack original

### 🔵 Nivel 5: Voz Presente – $2,000 MXN
- Todo lo anterior
- Invitación VIP a premier digital (con presencia del equipo creativo)
- PDF digital del guion original con notas del director

### 🔵 Nivel 6: Voz Cercana – $5,000 MXN
- Todo lo anterior
- Videomensaje personalizado de un protagonista o del director
- Souvenir físico firmado (póster, libreta o postal)
- Nombre en sección especial de créditos como "Donante Visionario"

### 🟣 Nivel 7: Voz que Resuena – $10,000 MXN
- Todo lo anterior
- Videollamada privada grupal con el equipo creativo
- Invitación VIP a la premier presencial (en ciudad sede)
- Agradecimiento en el evento de lanzamiento (si asiste)

### 🟣 Nivel 8: Voz Conectada – $25,000 MXN
- Todo lo anterior
- Crédito como "Colaborador Honorario" en los créditos iniciales
- Souvenir físico premium (caja conmemorativa con varios objetos firmados)
- Acceso a sesiones privadas de montaje o revisión del documental

### 🔴 Nivel 9: Voz Inolvidable – $50,000 MXN
- Todo lo anterior
- Entrevista personal (grabada o en vivo) publicada en redes del proyecto
- Participación en una reunión de toma de decisiones creativas (observador/a)
- Pase doble a todos los eventos del documental (premier, proyecciones, etc.)

### 🔴 Nivel 10: Voz del Documental – $100,000 MXN
- Todo lo anterior
- Participación como actor/actriz de voz doblando una línea real del documental
- Crédito como "Voz Invitada" en los créditos oficiales
- Mención en notas de prensa y material promocional si lo deseas

### 🔴 Nivel 11: Voz Eterna – $1,000,000 MXN
- Todo lo anterior
- Aparición en el documental (grabación física o imagen), en acuerdo con el equipo creativo
- Crédito como Productor Asociado
- Reconocimiento especial en el evento de clausura del proyecto
- Invitación a todas las giras o festivales donde participe el documental

### 💡 Elementos "Comodín" Adicionales:
- Certificados digitales de apoyo al cine documental independiente
- Acceso exclusivo a una "Cápsula de Tiempo": carta del equipo para ser abierta en 5 años
- Insignias digitales coleccionables, una por cada nivel (gamificación simbólica)
- Participación en sorteo para asistir al rodaje de una escena adicional o sesión de doblaje

## 6. MENSAJES CLAVE DE LA PLATAFORMA

### Mensaje Principal:
"Cada peso cuenta para llevar el doblaje mexicano a la pantalla. ¡No hay mínimo ni límite!"

### Propuesta de Valor:
- Transparencia total en el uso de fondos
- Recompensas exclusivas del mundo del doblaje
- Apoyo a una tradición cultural mexicana
- Sin comisiones de plataforma

### Call to Actions:
- "Apoya Nuestras Voces"
- "Dona Ahora"
- "Únete a la Misión"
- "Preserva el Doblaje Mexicano"

## 7. INTEGRA CIONES SIMULADAS

### Pagos:
- Mock de Conekta/Mercado Pago
- Mock de Stripe Internacional  
- Mock de BitPay/Coinbase Commerce
- Calculadora de comisiones transparente

### Analytics:
- Mock de Google Analytics
- Dashboard de métricas simuladas
- Reportes automáticos semanales

### Comunicación:
- Chatbot básico con respuestas predefinidas
- Sistema de tickets simulado
- Integration con WhatsApp/Email mock

## 8. CRITERIOS DE ÉXITO

### Funcionalidad:
- [x] Navegación intuitiva (1-2 clics máximo)
- [x] Formulario de donación simple
- [x] Información clara y transparente
- [x] Responsive en todos los dispositivos

### Diseño:
- [x] Coherente con guía de estilo "Nuestras Voces"  
- [x] Accesible para usuarios no tecnológicos
- [x] Elementos nostálgicos del doblaje
- [x] Call-to-actions claros y prominentes

### Rendimiento:
- [x] Carga rápida (< 3 segundos)
- [x] Funciona offline básico
- [x] Optimizado para móviles
- [x] SEO optimizado

---

## ESTADO ACTUAL: ✅ ANÁLISIS Y PLANIFICACIÓN COMPLETADOS

**Siguiente paso**: Validación del plan con el usuario antes de proceder con la implementación.

**Tiempo estimado total**: 5-7 días de desarrollo
**Prioridad**: Alta - Prototipo funcional requerido