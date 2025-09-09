# 🎬 Nuestras Voces - Crowdfunding Platform

Una plataforma de crowdfunding diseñada específicamente para el documental "Nuestras Voces", que celebra la rica tradición del doblaje mexicano.

![Nuestras Voces](./public/nuestras-voces-hero.jpg)

## 📋 Descripción del Proyecto

"Nuestras Voces" es un documental que explora la historia y el impacto cultural del doblaje mexicano, destacando las voces icónicas que han dado vida a personajes memorables en cine, televisión y animación. Esta plataforma de crowdfunding permite a los fanáticos del doblaje apoyar el proyecto y acceder a recompensas exclusivas.

### 🎯 Características Principales

- **Modelo "Keep-it-All"**: Sin mínimo requerido, todos los fondos van directo al proyecto
- **11 Niveles de Recompensas**: Desde $200 MXN hasta $1,000,000 MXN
- **Transparencia Total**: Dashboard en tiempo real con uso detallado de fondos
- **Experiencias VIP**: Acceso exclusivo a rodajes y eventos especiales
- **Gamificación**: Sistema de puntos por compartir en redes sociales
- **Responsivo**: Diseño optimizado para móviles y desktop

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js (versión 18 o superior)
- npm o yarn
- Git

### Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/nuestras-voces-crowdfunding.git
   cd nuestras-voces-crowdfunding/web-app
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env.local
   # Edita .env.local con tus configuraciones
   ```

4. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   ```

5. **Compilar para producción**
   ```bash
   npm run build
   ```

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 18**: Biblioteca principal de UI
- **Vite**: Herramienta de build y desarrollo
- **React Router v6**: Navegación entre páginas
- **Tailwind CSS**: Framework de estilos
- **@tailwindcss/forms**: Plugin para formularios

### Características Técnicas
- **ES Modules**: Configuración moderna de JavaScript
- **PostCSS**: Procesamiento de CSS
- **Responsive Design**: Mobile-first approach
- **Component Architecture**: Arquitectura de componentes reutilizables

## 📁 Estructura del Proyecto

```
web-app/
├── public/
│   ├── index.html
│   └── assets/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── HeroSection.jsx
│   │   ├── ProgressSection.jsx
│   │   ├── RewardsSection.jsx
│   │   ├── RewardCard.jsx
│   │   ├── TransparencyPreview.jsx
│   │   ├── TransparencyDashboard.jsx
│   │   ├── FAQ.jsx
│   │   └── SocialShare.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   └── TransparencyPage.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── package.json
```

## 🎨 Guía de Estilos

### Paleta de Colores

La plataforma utiliza una paleta de colores vibrante inspirada en la estética nostálgica del doblaje mexicano:

- **Teal Principal**: `#2dd4bf` - Color principal de la marca
- **Naranja Vibrante**: `#f97316` - Acentos y CTAs secundarios
- **Azul**: `#3b82f6` - Enlaces y elementos informativos
- **Púrpura**: `#8b5cf6` - Elementos premium
- **Rojo**: `#ef4444` - Alertas y elementos VIP

### Tipografías

- **Display**: Poppins (títulos y headings)
- **Sans**: Inter (texto general)

### Componentes Personalizados

```css
.btn-primary - Botón principal
.btn-secondary - Botón secundario
.reward-card - Tarjeta de recompensa
.text-gradient - Texto con gradiente
```

## 💰 Sistema de Recompensas

La plataforma cuenta con 11 niveles de recompensas cuidadosamente diseñados:

### Niveles Básicos ($200 - $1,000 MXN)
- Acceso digital exclusivo
- Menciones en créditos
- Contenido behind-the-scenes

### Niveles Medios ($2,000 - $10,000 MXN)
- Productos físicos exclusivos
- Acceso a eventos virtuales
- Material adicional del documental

### Niveles Premium ($25,000 - $100,000 MXN)
- Experiencias presenciales
- Acceso a rodajes
- Consultorías personalizadas

### Niveles VIP ($250,000 - $1,000,000 MXN)
- Coproducción ejecutiva
- Experiencias únicas con actores de doblaje
- Derechos comerciales limitados

## 📊 Dashboard de Transparencia

### Características del Dashboard

- **Métricas en Tiempo Real**: Fondos totales, donantes, progreso
- **Desglose de Gastos**: Visualización detallada del uso de fondos
- **Actualizaciones del Proyecto**: Timeline con avances y hitos
- **Área Exclusiva**: Contenido premium para donantes

### Categorías de Gastos

1. **Filmación y Producción (60%)**
   - Alquiler de estudios
   - Equipo técnico
   - Honorarios del equipo

2. **Equipo Técnico (20%)**
   - Editores
   - Diseñadores de sonido
   - Asistentes de producción

3. **Marketing y Distribución (10%)**
   - Promoción digital
   - Materiales publicitarios
   - Distribución en festivales

4. **Mantenimiento de Plataforma (10%)**
   - Hosting y dominio
   - Actualizaciones técnicas
   - Soporte al usuario

## 🔧 Configuración Avanzada

### Variables de Entorno

```env
VITE_APP_TITLE=Nuestras Voces
VITE_API_URL=https://api.nuestrasvoces.com
VITE_PAYMENT_GATEWAY=stripe
VITE_GOOGLE_ANALYTICS=G-XXXXXXXXXX
```

### Configuración de Pagos

La plataforma está preparada para integrar múltiples métodos de pago:

- Stripe (tarjetas internacionales)
- PayPal (donantes internacionales)
- Conekta (métodos mexicanos)
- Criptomonedas (Bitcoin, Ethereum)

### SEO y Analytics

- Meta tags optimizados
- Open Graph para redes sociales
- Google Analytics 4
- Schema.org markup

## 🚀 Despliegue

### Netlify (Recomendado)

1. Conectar repositorio de GitHub
2. Configurar comando de build: `npm run build`
3. Directorio de publicación: `dist`
4. Variables de entorno en panel de Netlify

### Vercel

```bash
npm i -g vercel
vercel --prod
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🧪 Testing

### Comandos de Testing

```bash
# Tests unitarios
npm run test

# Tests de integración
npm run test:integration

# Cobertura de código
npm run test:coverage

# Tests E2E
npm run test:e2e
```

### Checklist de Testing

- [ ] Componentes renderizan correctamente
- [ ] Navegación entre páginas funciona
- [ ] Formularios procesan datos
- [ ] Responsive design en móviles
- [ ] Accesibilidad (WCAG 2.1)
- [ ] Performance (Lighthouse > 90)

## 🔒 Seguridad

### Medidas Implementadas

- Sanitización de inputs
- HTTPS obligatorio
- Headers de seguridad configurados
- Rate limiting en APIs
- Validación client-side y server-side

### Variables Sensibles

- Nunca commitear claves API
- Usar variables de entorno
- Rotar claves regularmente
- Monitorear logs de seguridad

## 📱 Próximas Características

### Fase 2: Funcionalidades Avanzadas
- [ ] Integración con gateway de pagos
- [ ] Sistema de notificaciones push
- [ ] Panel de administración
- [ ] API REST completa
- [ ] Tests automatizados

### Fase 3: Expansión
- [ ] Aplicación móvil (React Native)
- [ ] Integración con redes sociales
- [ ] Sistema de referidos
- [ ] Multi-idioma (inglés)
- [ ] Análisis avanzado de métricas

## 🤝 Contribución

### Guía para Contribuidores

1. Fork del proyecto
2. Crear rama feature: `git checkout -b feature/nueva-caracteristica`
3. Commit cambios: `git commit -m 'Add: nueva característica'`
4. Push a la rama: `git push origin feature/nueva-caracteristica`
5. Crear Pull Request

### Estándares de Código

- ESLint + Prettier configurados
- Conventional Commits
- Tests requeridos para nuevas features
- Documentación actualizada

## 📧 Contacto y Soporte

- **Email**: hola@sutilde.com
- **WhatsApp**: +52 614 427 3301
- **Sitio Web**: https://nuestrasvoces.com
- **GitHub**: https://github.com/jorgeporras/nuestras-voces

### Horarios de Soporte

- **Lunes a Viernes**: 9:00 - 18:00 hrs (GMT-6)
- **Respuesta promedio**: 24 horas
- **Soporte técnico**: Disponible por email

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙏 Agradecimientos

- **Actores de Doblaje**: Por su inspiración y apoyo
- **Comunidad de Fans**: Por su pasión por el doblaje mexicano
- **Equipo Técnico**: Por hacer posible este proyecto
- **Donantes**: Por creer en "Nuestras Voces"

---

**© 2024 Nuestras Voces. Todos los derechos reservados.**

*Este proyecto está dedicado a preservar y celebrar la rica tradición del doblaje mexicano para las futuras generaciones.*