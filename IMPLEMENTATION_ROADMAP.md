# IMPLEMENTATION ROADMAP - NUESTRAS VOCES CROWDFUNDING
## Análisis Completo y Plan de Implementación

**Fecha**: 30 de Septiembre, 2025
**Proyecto**: Plataforma de Crowdfunding - Nuestras Voces Documental
**Estado Actual**: Prototipo UI con datos mock
**Objetivo**: Sistema de crowdfunding funcional completo

---

## TABLA DE CONTENIDOS

1. [Análisis del Estado Actual](#1-análisis-del-estado-actual)
2. [Arquitectura Actual vs Propuesta](#2-arquitectura-actual-vs-propuesta)
3. [Recomendación de Stack Backend](#3-recomendación-de-stack-backend)
4. [Esquema de Base de Datos](#4-esquema-de-base-de-datos)
5. [Plan de Limpieza Conekta](#5-plan-de-limpieza-conekta)
6. [Plan de Implementación por Fases](#6-plan-de-implementación-por-fases)
7. [Estimaciones de Tiempo](#7-estimaciones-de-tiempo)
8. [Riesgos y Mitigación](#8-riesgos-y-mitigación)

---

## 1. ANÁLISIS DEL ESTADO ACTUAL

### 1.1 Estructura del Proyecto

```
web-app/
├── src/
│   ├── components/        (15 componentes)
│   │   ├── common/        (Icons.jsx)
│   │   ├── ConektaCardForm.jsx      ⚠️ ELIMINAR
│   │   ├── ConektaOxxoForm.jsx      ⚠️ ELIMINAR
│   │   ├── DonationButton.jsx       ✅ Mantener (UI)
│   │   ├── DonationForm.jsx         🔄 Refactorizar
│   │   ├── FAQ.jsx                  ✅ Mantener
│   │   ├── Footer.jsx               ✅ Mantener
│   │   ├── Header.jsx               ✅ Mantener
│   │   ├── HeroSection.jsx          ✅ Mantener
│   │   ├── PaymentMethods.jsx       ⚠️ ELIMINAR (mock)
│   │   ├── PaymentMethodsV2.jsx     ⚠️ ELIMINAR (Conekta)
│   │   ├── ProgressSection.jsx      🔄 Refactorizar (datos mock)
│   │   ├── RewardCard.jsx           ✅ Mantener
│   │   ├── RewardsSection.jsx       🔄 Refactorizar
│   │   ├── SocialShare.jsx          ✅ Mantener
│   │   ├── TransparencyDashboard.jsx 🔄 Refactorizar (datos mock)
│   │   └── TransparencyPreview.jsx  🔄 Refactorizar (datos mock)
│   ├── config/
│   │   └── conekta.js               ⚠️ ELIMINAR
│   ├── data/
│   │   └── rewards.js               🔄 Migrar a DB
│   ├── pages/
│   │   ├── HomePage.jsx             ✅ Mantener
│   │   ├── PrivacyPage.jsx          ✅ Mantener
│   │   ├── TermsPage.jsx            ✅ Mantener
│   │   └── TransparencyPage.jsx     ✅ Mantener
│   ├── services/
│   │   └── conektaService.js        ⚠️ ELIMINAR
│   ├── utils/
│   │   └── formatMoney.js           ✅ Mantener
│   ├── App.jsx                      ✅ Mantener
│   └── main.jsx                     ✅ Mantener
└── package.json
```

### 1.2 Análisis Componente por Componente

#### 🟢 COMPONENTES UI-ONLY (Listos - No requieren cambios)

| Componente | Función | Estado | Notas |
|------------|---------|--------|-------|
| `Header.jsx` | Navegación principal | ✅ Completo | Agregar estado de auth |
| `Footer.jsx` | Pie de página con enlaces | ✅ Completo | - |
| `HeroSection.jsx` | Banner principal | ✅ Completo | - |
| `FAQ.jsx` | Preguntas frecuentes | ✅ Completo | Considera hacer dinámico |
| `SocialShare.jsx` | Compartir en redes | ✅ Completo | - |
| `RewardCard.jsx` | Card individual de recompensa | ✅ Completo | - |
| `Icons.jsx` | Biblioteca de iconos SVG | ✅ Completo | - |
| `HomePage.jsx` | Página principal | ✅ Completo | - |
| `TermsPage.jsx` | Términos y condiciones | ✅ Completo | - |
| `PrivacyPage.jsx` | Aviso de privacidad | ✅ Completo | - |
| `TransparencyPage.jsx` | Contenedor transparencia | ✅ Completo | - |

#### 🟡 COMPONENTES QUE REQUIEREN REFACTORIZACIÓN

**1. `DonationForm.jsx`** (lines: 296)
- **Estado Actual**: Formulario de donación con validación local
- **Problema**: Simula envío de pago con `alert()`, no persiste datos
- **Necesita**:
  - Conectar a backend para crear donación
  - Integración con sistema de autenticación
  - Redirección a pasarela de First Data
  - Almacenar en base de datos

**2. `ProgressSection.jsx`** (lines: 128)
- **Estado Actual**: Muestra progreso con valores hardcodeados
- **Problema**:
  ```javascript
  const [currentAmount, setCurrentAmount] = useState(0)
  const [targetAmount] = useState(5000000)
  const [donorCount, setDonorCount] = useState(0)
  ```
- **Necesita**:
  - Query a Supabase para obtener totales reales
  - Suscripción real-time a cambios
  - Cálculos dinámicos de porcentaje y promedio

**3. `RewardsSection.jsx`** (lines: 113)
- **Estado Actual**: Lee de archivo `data/rewards.js`
- **Problema**: Recompensas estáticas, no refleja inventario
- **Necesita**:
  - Leer de tabla `rewards` en DB
  - Mostrar stock disponible
  - Deshabilitar si no hay inventario

**4. `TransparencyDashboard.jsx`** (lines: 246)
- **Estado Actual**: Datos completamente ficticios
- **Problema**:
  ```javascript
  const [funds, setFunds] = useState({
    total: 850000,
    thisMonth: 125000,
    thisWeek: 45000
  })
  const fundUsage = [/* arrays hardcodeados */]
  ```
- **Necesita**:
  - Queries agregadas a tabla `donations`
  - Queries a tabla `expenses` (nueva)
  - Dashboard de actualizaciones desde DB
  - Sistema de autenticación para área de donantes

#### 🔴 COMPONENTES A ELIMINAR (Conekta)

| Archivo | Razón | Acción |
|---------|-------|--------|
| `ConektaCardForm.jsx` | Integración Conekta sin backend | Eliminar completo |
| `ConektaOxxoForm.jsx` | Integración Conekta sin backend | Eliminar completo |
| `PaymentMethods.jsx` | Simulación de pagos | Eliminar completo |
| `PaymentMethodsV2.jsx` | Wrapper de Conekta | Eliminar completo |
| `config/conekta.js` | Config de Conekta | Eliminar completo |
| `services/conektaService.js` | Servicio de Conekta | Eliminar completo |

**Total a eliminar**: ~1,200 líneas de código

### 1.3 Dependencias Actuales

```json
{
  "dependencies": {
    "react": "^19.1.1",
    "react-dom": "^19.1.1",
    "react-router-dom": "^7.7.1",
    "vite": "^7.0.6"
  },
  "devDependencies": {
    "@tailwindcss/forms": "^0.5.10",
    "autoprefixer": "^10.4.21",
    "postcss": "^8.5.6",
    "tailwindcss": "^3.4.17"
  }
}
```

**Notas importantes**:
- ✅ NO hay dependencias de Conekta (no está en package.json)
- ✅ Stack minimalista - fácil de extender
- ❌ NO hay backend libraries
- ❌ NO hay cliente de base de datos
- ❌ NO hay gestión de estado global (Context API está siendo usado implícitamente)

---

## 2. ARQUITECTURA ACTUAL VS PROPUESTA

### 2.1 Arquitectura Actual (Prototipo)

```
┌─────────────────────────────────────────────────┐
│           NAVEGADOR (Cliente)                   │
│                                                 │
│  ┌──────────────────────────────────────────┐  │
│  │   React App (Vite)                       │  │
│  │                                          │  │
│  │  Components (UI Only)                    │  │
│  │  ├─ DonationForm → alert() 🚫           │  │
│  │  ├─ ProgressSection → useState(0) 🚫    │  │
│  │  ├─ TransparencyDashboard → mock 🚫     │  │
│  │  └─ Conekta* → fetch('/api/...') ❌     │  │
│  │       (Falla - No hay API)              │  │
│  │                                          │  │
│  │  Data Sources                            │  │
│  │  └─ data/rewards.js (hardcoded)         │  │
│  └──────────────────────────────────────────┘  │
│                                                 │
│  ❌ No hay backend                              │
│  ❌ No hay base de datos                        │
│  ❌ No hay autenticación                        │
│  ❌ No hay persistencia                         │
└─────────────────────────────────────────────────┘
```

### 2.2 Arquitectura Propuesta (Producción)

```
┌─────────────────────────────────────────────────────────────────────┐
│                    NAVEGADOR (Cliente)                              │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │   React App (Vite) + Supabase Client                         │ │
│  │                                                               │ │
│  │  Components                                                   │ │
│  │  ├─ DonationForm → createDonation() ✅                       │ │
│  │  ├─ ProgressSection → useQuery('donations') ✅               │ │
│  │  ├─ TransparencyDashboard → Real-time subscriptions ✅       │ │
│  │  ├─ Auth Components (Login, Profile) 🆕                      │ │
│  │  └─ Admin Panel (Protected routes) 🆕                        │ │
│  │                                                               │ │
│  │  Services                                                     │ │
│  │  ├─ supabaseClient.js 🆕                                     │ │
│  │  ├─ authService.js 🆕                                        │ │
│  │  ├─ donationsService.js 🆕                                   │ │
│  │  └─ rewardsService.js 🆕                                     │ │
│  └───────────────────────────────────────────────────────────────┘ │
│                            ↕️ HTTPS                                 │
└─────────────────────────────────────────────────────────────────────┘
                              ↕️
┌─────────────────────────────────────────────────────────────────────┐
│                    SUPABASE (Backend as a Service)                  │
│                                                                     │
│  ┌─────────────────┐  ┌──────────────────┐  ┌──────────────────┐  │
│  │   PostgreSQL    │  │  Authentication  │  │  Storage (S3)    │  │
│  │                 │  │                  │  │                  │  │
│  │  • donations    │  │  • Magic Links   │  │  • Receipts PDF  │  │
│  │  • users        │  │  • Email/Pass    │  │  • Reward items  │  │
│  │  │  • rewards    │  │  • OAuth         │  │  • User uploads  │  │
│  │  • expenses     │  │  • JWT tokens    │  │                  │  │
│  │  • updates      │  │                  │  │                  │  │
│  │  • donor_codes  │  │  RLS Policies ✅ │  │  Bucket ACLs ✅  │  │
│  └─────────────────┘  └──────────────────┘  └──────────────────┘  │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │   Edge Functions (Serverless)                               │  │
│  │                                                              │  │
│  │   • webhook-firstdata/ → Procesa pagos ✅                   │  │
│  │   • send-email/ → Envía notificaciones ✅                   │  │
│  │   • generate-donor-code/ → Códigos únicos ✅                │  │
│  │   • calculate-transparency/ → Métricas agregadas ✅         │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
                              ↕️
┌─────────────────────────────────────────────────────────────────────┐
│                    SERVICIOS EXTERNOS                               │
│                                                                     │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐  │
│  │   First Data     │  │   Resend/SendGrid│  │   Vercel         │  │
│  │   (Pagos)        │  │   (Emails)       │  │   (Hosting)      │  │
│  │                  │  │                  │  │                  │  │
│  │  • Tarjetas      │  │  • Receipts      │  │  • Static site   │  │
│  │  • Webhooks      │  │  • Notifications │  │  • CDN           │  │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

### 2.3 Flujo de Donación Completo

```
Usuario → DonationForm.jsx
            ↓
    Valida datos (frontend)
            ↓
    createDonation({ amount, user_id, reward_id })
            ↓
    Supabase INSERT → donations (status: 'pending')
            ↓
    Genera donor_code único
            ↓
    Redirecciona a First Data Hosted Payment Page
            ↓
    [Usuario paga en First Data]
            ↓
    First Data → Webhook → Supabase Edge Function
            ↓
    UPDATE donations SET status='completed'
            ↓
    Trigger: send_receipt_email()
            ↓
    UPDATE campaign_totals (view materialized)
            ↓
    Real-time broadcast → Frontend actualiza ProgressSection
            ↓
    Usuario ve confirmación + recibe email
```

---

## 3. RECOMENDACIÓN DE STACK BACKEND

### 3.1 Comparativa de Opciones

| Criterio | Supabase | Firebase | Backend Custom (Node + Postgres) |
|----------|----------|----------|----------------------------------|
| **Curva de aprendizaje** | ⭐⭐⭐⭐⭐ Muy fácil | ⭐⭐⭐⭐ Fácil | ⭐⭐ Complejo |
| **Base de datos** | PostgreSQL (SQL) | Firestore (NoSQL) | PostgreSQL/MySQL |
| **Autenticación** | Integrada + Magic Links | Integrada + Muchos providers | Implementar desde cero |
| **Real-time** | PostgreSQL real-time ✅ | Firestore real-time ✅ | Socket.io (manual) |
| **Storage de archivos** | S3-compatible ✅ | Firebase Storage ✅ | S3/Cloudinary (manual) |
| **Edge Functions** | Deno runtime ✅ | Cloud Functions ✅ | Serverless Framework |
| **Costo (inicio)** | GRATIS hasta: 500MB DB, 2GB storage, 50K MAU | GRATIS hasta: 1GB storage, 50K reads/day | VPS $5-20/mes + DB |
| **Escalabilidad** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ (depende) |
| **SQL Queries** | ✅ SQL completo | ❌ Queries limitadas | ✅ SQL completo |
| **Row-level Security** | ✅ Nativo | ❌ Manual en reglas | ✅ Implementar |
| **Admin Panel** | ✅ Built-in | ✅ Built-in | ❌ Construir desde cero |
| **Migraciones** | ✅ Git-tracked | ⚠️ Limitadas | ✅ Knex/Prisma |
| **Backup automático** | ✅ Sí | ✅ Sí | ❌ Configurar |
| **Local Development** | ✅ Docker CLI | ⚠️ Emulators | ✅ Nativo |
| **TypeScript Support** | ✅ Auto-generated types | ✅ SDK tipado | ✅ Manual |
| **Tiempo de setup** | 1-2 horas | 2-3 horas | 2-3 días |

### 3.2 RECOMENDACIÓN: SUPABASE ⭐

**Decisión**: **Supabase** es la opción óptima para este proyecto.

#### Razones principales:

1. **PostgreSQL Real-Time**
   - Perfecto para dashboard de transparencia que se actualiza en vivo
   - Suscripciones a cambios en donations/expenses
   - Broadcast de totales recaudados

2. **Autenticación Integrada**
   - Magic links (sin contraseña) = mejor UX
   - JWT tokens manejados automáticamente
   - Row-level security para datos sensibles

3. **Edge Functions**
   - Ideal para webhook de First Data
   - Envío de emails transaccionales
   - Generación de códigos de donante
   - Deno runtime (TypeScript nativo)

4. **Storage**
   - Subir PDFs de recibos
   - Imágenes de recompensas
   - Material exclusivo para donantes

5. **Admin Dashboard Built-in**
   - Ver/editar datos directamente
   - Ejecutar queries SQL
   - Monitorear logs y performance

6. **Auto-generated Types**
   ```bash
   supabase gen types typescript > src/types/database.ts
   ```
   - TypeScript types automáticos desde schema
   - Autocomplete en VSCode

7. **Costo**
   - Free tier generoso (suficiente para MVP)
   - $25/mes Pro plan (cuando escales)
   - Sin costos ocultos

8. **Developer Experience**
   ```bash
   # Setup completo en 3 comandos
   npx supabase init
   npx supabase start
   npm install @supabase/supabase-js
   ```

#### Desventajas menores (mitigables):

- Vendor lock-in: Mitigable - Supabase es open source, puedes self-host
- Límites free tier: Alcanza para ~1000 donantes/mes sin problema
- Curva de aprendizaje SQL: Documentación excelente + ejemplos

### 3.3 Librerías a Instalar

```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.45.0",
    "@supabase/auth-helpers-react": "^0.5.0",
    "date-fns": "^3.0.0",
    "zod": "^3.22.4"
  },
  "devDependencies": {
    "supabase": "^1.200.0"
  }
}
```

---

## 4. ESQUEMA DE BASE DE DATOS

### 4.1 Diagrama ERD

```
┌─────────────────────┐
│      users          │
├─────────────────────┤
│ id (uuid) PK        │◄─────┐
│ email (unique)      │      │
│ full_name           │      │
│ role (enum)         │      │
│ created_at          │      │
│ updated_at          │      │
└─────────────────────┘      │
                             │
┌─────────────────────┐      │
│    rewards          │      │
├─────────────────────┤      │
│ id (int) PK         │◄──┐  │
│ level (int)         │   │  │
│ name                │   │  │
│ amount (decimal)    │   │  │
│ benefits (jsonb)    │   │  │
│ stock (int)         │   │  │
│ is_active (bool)    │   │  │
│ created_at          │   │  │
└─────────────────────┘   │  │
                          │  │
┌─────────────────────────────────┐
│        donations                │
├─────────────────────────────────┤
│ id (uuid) PK                    │
│ user_id (uuid) FK ──────────────┼──┘
│ reward_id (int) FK ─────────────┼──┘
│ amount (decimal)                │
│ fees (decimal)                  │
│ net_amount (decimal)            │
│ status (enum)                   │
│   - pending                     │
│   - completed                   │
│   - failed                      │
│   - refunded                    │
│ payment_method (text)           │
│ transaction_id (text)           │
│ donor_code (text, unique)       │
│ is_anonymous (bool)             │
│ message (text)                  │
│ receipt_url (text)              │
│ metadata (jsonb)                │
│ created_at                      │
│ completed_at                    │
└─────────────────────────────────┘
         │
         │
         ▼
┌─────────────────────┐
│   donor_codes       │
├─────────────────────┤
│ code (text) PK      │
│ donation_id (uuid) FK│
│ expires_at          │
│ uses_count (int)    │
│ max_uses (int)      │
└─────────────────────┘

┌─────────────────────┐
│     expenses        │
├─────────────────────┤
│ id (uuid) PK        │
│ category (enum)     │
│   - production      │
│   - equipment       │
│   - marketing       │
│   - platform        │
│ description         │
│ amount (decimal)    │
│ receipt_url (text)  │
│ date                │
│ approved_by (uuid) FK│
│ created_at          │
└─────────────────────┘

┌─────────────────────┐
│  project_updates    │
├─────────────────────┤
│ id (uuid) PK        │
│ title               │
│ description (text)  │
│ type (enum)         │
│   - milestone       │
│   - content         │
│   - funding         │
│ image_url           │
│ is_public (bool)    │
│ min_donor_level (int)│
│ created_by (uuid) FK│
│ created_at          │
│ published_at        │
└─────────────────────┘

┌─────────────────────┐
│ campaign_settings   │
├─────────────────────┤
│ id (int) PK         │
│ target_amount       │
│ current_amount      │
│ donor_count         │
│ start_date          │
│ end_date            │
│ is_active (bool)    │
│ updated_at          │
└─────────────────────┘
```

### 4.2 SQL Schema Completo

```sql
-- =============================================
-- SUPABASE DATABASE SCHEMA
-- Nuestras Voces Crowdfunding Platform
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- ENUMS
-- =============================================

CREATE TYPE user_role AS ENUM ('donor', 'admin', 'superadmin');
CREATE TYPE donation_status AS ENUM ('pending', 'completed', 'failed', 'refunded');
CREATE TYPE expense_category AS ENUM ('production', 'equipment', 'marketing', 'platform', 'other');
CREATE TYPE update_type AS ENUM ('milestone', 'content', 'funding');

-- =============================================
-- TABLES
-- =============================================

-- Users (extends Supabase auth.users)
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role user_role DEFAULT 'donor' NOT NULL,
  avatar_url TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Rewards
CREATE TABLE public.rewards (
  id SERIAL PRIMARY KEY,
  level INTEGER UNIQUE NOT NULL,
  name TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  color TEXT,
  icon TEXT,
  benefits JSONB NOT NULL DEFAULT '[]',
  stock INTEGER,
  is_active BOOLEAN DEFAULT TRUE,
  popular BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Donations
CREATE TABLE public.donations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  reward_id INTEGER REFERENCES public.rewards(id) ON DELETE SET NULL,

  -- Amounts
  amount DECIMAL(10,2) NOT NULL,
  fees DECIMAL(10,2) DEFAULT 0,
  net_amount DECIMAL(10,2) NOT NULL,

  -- Status
  status donation_status DEFAULT 'pending' NOT NULL,
  payment_method TEXT,
  transaction_id TEXT,

  -- Donor info
  donor_code TEXT UNIQUE,
  is_anonymous BOOLEAN DEFAULT FALSE,
  donor_name TEXT,
  donor_email TEXT NOT NULL,
  message TEXT,

  -- Files
  receipt_url TEXT,

  -- Metadata
  metadata JSONB DEFAULT '{}',

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,

  -- Indexes
  CONSTRAINT positive_amount CHECK (amount > 0)
);

CREATE INDEX idx_donations_user_id ON public.donations(user_id);
CREATE INDEX idx_donations_status ON public.donations(status);
CREATE INDEX idx_donations_created_at ON public.donations(created_at DESC);
CREATE INDEX idx_donations_donor_code ON public.donations(donor_code);

-- Donor Codes (for exclusive content access)
CREATE TABLE public.donor_codes (
  code TEXT PRIMARY KEY,
  donation_id UUID REFERENCES public.donations(id) ON DELETE CASCADE,
  expires_at TIMESTAMP WITH TIME ZONE,
  uses_count INTEGER DEFAULT 0,
  max_uses INTEGER DEFAULT 999,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Expenses
CREATE TABLE public.expenses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  category expense_category NOT NULL,
  description TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  receipt_url TEXT,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  approved_by UUID REFERENCES public.users(id),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  CONSTRAINT positive_expense_amount CHECK (amount > 0)
);

CREATE INDEX idx_expenses_category ON public.expenses(category);
CREATE INDEX idx_expenses_date ON public.expenses(date DESC);

-- Project Updates
CREATE TABLE public.project_updates (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  type update_type NOT NULL,
  image_url TEXT,
  is_public BOOLEAN DEFAULT TRUE,
  min_donor_level INTEGER DEFAULT 0,
  created_by UUID REFERENCES public.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published_at TIMESTAMP WITH TIME ZONE,

  CONSTRAINT valid_donor_level CHECK (min_donor_level >= 0 AND min_donor_level <= 11)
);

CREATE INDEX idx_updates_type ON public.project_updates(type);
CREATE INDEX idx_updates_published_at ON public.project_updates(published_at DESC);

-- Campaign Settings (singleton table)
CREATE TABLE public.campaign_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  target_amount DECIMAL(12,2) NOT NULL DEFAULT 5000000,
  current_amount DECIMAL(12,2) DEFAULT 0,
  donor_count INTEGER DEFAULT 0,
  start_date DATE,
  end_date DATE,
  is_active BOOLEAN DEFAULT TRUE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  CONSTRAINT one_row_only CHECK (id = 1)
);

-- Initialize campaign settings
INSERT INTO public.campaign_settings (id) VALUES (1);

-- =============================================
-- VIEWS
-- =============================================

-- Campaign Stats (materialized for performance)
CREATE MATERIALIZED VIEW campaign_stats AS
SELECT
  COUNT(*) FILTER (WHERE status = 'completed') as total_donors,
  COALESCE(SUM(amount) FILTER (WHERE status = 'completed'), 0) as total_raised,
  COALESCE(SUM(net_amount) FILTER (WHERE status = 'completed'), 0) as net_raised,
  COALESCE(AVG(amount) FILTER (WHERE status = 'completed'), 0) as avg_donation,
  COUNT(*) FILTER (WHERE status = 'completed' AND created_at > NOW() - INTERVAL '7 days') as donors_this_week,
  COALESCE(SUM(amount) FILTER (WHERE status = 'completed' AND created_at > NOW() - INTERVAL '7 days'), 0) as raised_this_week,
  COUNT(*) FILTER (WHERE status = 'completed' AND created_at > NOW() - INTERVAL '30 days') as donors_this_month,
  COALESCE(SUM(amount) FILTER (WHERE status = 'completed' AND created_at > NOW() - INTERVAL '30 days'), 0) as raised_this_month
FROM public.donations;

CREATE UNIQUE INDEX ON campaign_stats ((true));

-- Transparency breakdown view
CREATE VIEW transparency_breakdown AS
SELECT
  category,
  SUM(amount) as total_amount,
  COUNT(*) as expense_count,
  ROUND((SUM(amount) / NULLIF((SELECT SUM(amount) FROM public.expenses), 0) * 100), 2) as percentage
FROM public.expenses
GROUP BY category
ORDER BY total_amount DESC;

-- Recent donors (public, respecting anonymity)
CREATE VIEW recent_donors AS
SELECT
  CASE WHEN is_anonymous THEN 'Donante Anónimo' ELSE donor_name END as name,
  amount,
  created_at
FROM public.donations
WHERE status = 'completed'
ORDER BY created_at DESC
LIMIT 50;

-- =============================================
-- FUNCTIONS
-- =============================================

-- Generate unique donor code
CREATE OR REPLACE FUNCTION generate_donor_code()
RETURNS TEXT AS $$
DECLARE
  code TEXT;
  exists BOOLEAN;
BEGIN
  LOOP
    -- Generate code like: NV-2025-A1B2C3
    code := 'NV-' ||
            TO_CHAR(NOW(), 'YYYY') || '-' ||
            UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 6));

    -- Check if exists
    SELECT EXISTS(SELECT 1 FROM public.donations WHERE donor_code = code) INTO exists;
    EXIT WHEN NOT exists;
  END LOOP;

  RETURN code;
END;
$$ LANGUAGE plpgsql;

-- Update campaign stats trigger
CREATE OR REPLACE FUNCTION update_campaign_stats()
RETURNS TRIGGER AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY campaign_stats;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- TRIGGERS
-- =============================================

-- Auto-update updated_at
CREATE TRIGGER set_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_rewards_updated_at
  BEFORE UPDATE ON public.rewards
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Auto-generate donor code
CREATE OR REPLACE FUNCTION set_donor_code()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.donor_code IS NULL THEN
    NEW.donor_code := generate_donor_code();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER donations_set_donor_code
  BEFORE INSERT ON public.donations
  FOR EACH ROW EXECUTE FUNCTION set_donor_code();

-- Refresh stats on donation change
CREATE TRIGGER refresh_campaign_stats
  AFTER INSERT OR UPDATE OR DELETE ON public.donations
  FOR EACH STATEMENT EXECUTE FUNCTION update_campaign_stats();

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rewards ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all users" ON public.users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role IN ('admin', 'superadmin')
    )
  );

-- Donations policies
CREATE POLICY "Anyone can create donations" ON public.donations
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view own donations" ON public.donations
  FOR SELECT USING (
    user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role IN ('admin', 'superadmin')
    )
  );

CREATE POLICY "Admins can update donations" ON public.donations
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role IN ('admin', 'superadmin')
    )
  );

-- Rewards policies (public read)
CREATE POLICY "Anyone can view active rewards" ON public.rewards
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage rewards" ON public.rewards
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role IN ('admin', 'superadmin')
    )
  );

-- Expenses policies (admins only)
CREATE POLICY "Admins can manage expenses" ON public.expenses
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role IN ('admin', 'superadmin')
    )
  );

-- Project updates policies
CREATE POLICY "Anyone can view public updates" ON public.project_updates
  FOR SELECT USING (is_public = true AND published_at IS NOT NULL);

CREATE POLICY "Donors can view exclusive updates" ON public.project_updates
  FOR SELECT USING (
    is_public = false AND
    published_at IS NOT NULL AND
    EXISTS (
      SELECT 1 FROM public.donations d
      JOIN public.rewards r ON d.reward_id = r.id
      WHERE d.user_id = auth.uid()
        AND d.status = 'completed'
        AND r.level >= min_donor_level
    )
  );

CREATE POLICY "Admins can manage updates" ON public.project_updates
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role IN ('admin', 'superadmin')
    )
  );

-- =============================================
-- SEED DATA
-- =============================================

-- Insert rewards from current data/rewards.js
INSERT INTO public.rewards (level, name, amount, color, icon, benefits, popular) VALUES
(1, 'Voz Solidaria', 200, 'yellow', '🟡', '["Nombre en créditos del documental", "Fondo de pantalla exclusivo (digital)", "Agradecimiento por correo electrónico"]'::jsonb, false),
(2, 'Voz Comprometida', 300, 'yellow', '🟡', '["Todo lo anterior", "Sticker digital para redes sociales con tu nombre", "Acceso anticipado al tráiler oficial"]'::jsonb, false),
(3, 'Voz que Inspira', 500, 'orange', '🟠', '["Todo lo anterior", "Agradecimiento público en redes sociales", "Póster digital del documental", "Invitación a evento virtual de preestreno"]'::jsonb, true),
(4, 'Voz que Acompaña', 1000, 'orange', '🟠', '["Todo lo anterior", "Acceso a material extra del detrás de cámaras", "Versión descargable del soundtrack original"]'::jsonb, false),
(5, 'Voz Presente', 2000, 'blue', '🔵', '["Todo lo anterior", "Invitación VIP a premier digital (con presencia del equipo creativo)", "PDF digital del guion original con notas del director"]'::jsonb, true),
(6, 'Voz Cercana', 5000, 'blue', '🔵', '["Todo lo anterior", "Videomensaje personalizado de un protagonista o del director", "Souvenir físico firmado (póster, libreta o postal)", "Nombre en sección especial de créditos como Donante Visionario"]'::jsonb, false),
(7, 'Voz que Resuena', 10000, 'purple', '🟣', '["Todo lo anterior", "Videollamada privada grupal con el equipo creativo", "Invitación VIP a la premier presencial (en ciudad sede)", "Agradecimiento en el evento de lanzamiento (si asiste)"]'::jsonb, false),
(8, 'Voz Conectada', 25000, 'purple', '🟣', '["Todo lo anterior", "Crédito como Colaborador Honorario en los créditos iniciales", "Souvenir físico premium (caja conmemorativa con varios objetos firmados)", "Acceso a sesiones privadas de montaje o revisión del documental"]'::jsonb, false),
(9, 'Voz Inolvidable', 50000, 'red', '🔴', '["Todo lo anterior", "Entrevista personal (grabada o en vivo) publicada en redes del proyecto", "Participación en una reunión de toma de decisiones creativas (observador/a)", "Pase doble a todos los eventos del documental (premier, proyecciones, etc.)"]'::jsonb, false),
(10, 'Voz del Documental', 100000, 'red', '🔴', '["Todo lo anterior", "Participación como actor/actriz de voz doblando una línea real del documental", "Crédito como Voz Invitada en los créditos oficiales", "Mención en notas de prensa y material promocional si lo deseas"]'::jsonb, false),
(11, 'Voz Eterna', 1000000, 'red', '🔴', '["Todo lo anterior", "Aparición en el documental (grabación física o imagen), en acuerdo con el equipo creativo", "Crédito como Productor Asociado", "Reconocimiento especial en el evento de clausura del proyecto", "Invitación a todas las giras o festivales donde participe el documental"]'::jsonb, false);
```

### 4.3 Storage Buckets

```sql
-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES
  ('receipts', 'receipts', false),
  ('rewards', 'rewards', true),
  ('updates', 'updates', false),
  ('avatars', 'avatars', true);

-- Storage policies
CREATE POLICY "Users can upload own receipts" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'receipts' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Admins can view all receipts" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'receipts' AND
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role IN ('admin', 'superadmin')
    )
  );

CREATE POLICY "Anyone can view rewards images" ON storage.objects
  FOR SELECT USING (bucket_id = 'rewards');

CREATE POLICY "Admins can upload rewards" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'rewards' AND
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role IN ('admin', 'superadmin')
    )
  );
```

---

## 5. PLAN DE LIMPIEZA CONEKTA

### 5.1 Archivos a Eliminar

```bash
# Componentes Conekta
rm src/components/ConektaCardForm.jsx
rm src/components/ConektaOxxoForm.jsx
rm src/components/PaymentMethods.jsx
rm src/components/PaymentMethodsV2.jsx

# Configuración y servicios
rm src/config/conekta.js
rm src/services/conektaService.js
```

**Total**: 6 archivos, ~1,200 líneas de código

### 5.2 Dependencias de Componentes a Actualizar

**DonationForm.jsx** necesita actualización:

```javascript
// ANTES (línea 4)
import PaymentMethods from './PaymentMethods'

// DESPUÉS
import FirstDataRedirect from './FirstDataRedirect' // NUEVO componente
```

### 5.3 Crear Componente Placeholder de Pago

Crear `src/components/FirstDataRedirect.jsx`:

```javascript
import { useState, useEffect } from 'react'
import { formatMoney } from '../utils/formatMoney'
import { supabase } from '../services/supabaseClient'

const FirstDataRedirect = ({ amount, donationData, onSuccess, onError, onClose }) => {
  const [isProcessing, setIsProcessing] = useState(false)

  const handleProceedToPayment = async () => {
    setIsProcessing(true)

    try {
      // 1. Crear donación en Supabase (status: pending)
      const { data: donation, error } = await supabase
        .from('donations')
        .insert({
          amount: amount,
          donor_name: donationData.donorName,
          donor_email: donationData.email,
          message: donationData.message,
          is_anonymous: donationData.isAnonymous,
          status: 'pending'
        })
        .select()
        .single()

      if (error) throw error

      // 2. TODO: Redireccionar a First Data Hosted Payment Page
      // Por ahora, mostrar placeholder
      alert(
        `✅ Donación registrada con código: ${donation.donor_code}\n\n` +
        `🚧 Próximamente: Redirección a First Data para completar pago\n\n` +
        `💡 Por ahora, la donación queda en estado "pendiente"`
      )

      onSuccess({
        donationId: donation.id,
        donorCode: donation.donor_code
      })

    } catch (error) {
      console.error('Error creating donation:', error)
      onError(error.message)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Confirmar Donación
        </h2>

        <div className="bg-primary-teal/10 rounded-lg p-6 mb-6">
          <div className="text-center">
            <p className="text-gray-600 mb-2">Monto a donar:</p>
            <p className="text-4xl font-bold text-primary-teal">
              {formatMoney(amount)}
            </p>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-yellow-800">
            <strong>🚧 En desarrollo:</strong> Serás redirigido a First Data
            para completar el pago de forma segura.
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleProceedToPayment}
            disabled={isProcessing}
            className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all ${
              isProcessing
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-primary-teal hover:bg-primary-teal/90'
            }`}
          >
            {isProcessing ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Procesando...
              </div>
            ) : (
              'Registrar Donación (Pendiente Pago)'
            )}
          </button>

          <button
            onClick={onClose}
            disabled={isProcessing}
            className="w-full py-3 px-6 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}

export default FirstDataRedirect
```

### 5.4 Validación Post-Limpieza

Después de eliminar archivos, ejecutar:

```bash
# Buscar referencias a archivos eliminados
grep -r "ConektaCardForm" src/
grep -r "ConektaOxxoForm" src/
grep -r "PaymentMethods" src/
grep -r "conektaService" src/
grep -r "CONEKTA_CONFIG" src/

# Verificar que no hay imports rotos
npm run build

# Debe compilar sin errores relacionados a Conekta
```

---

## 6. PLAN DE IMPLEMENTACIÓN POR FASES

### FASE 1: Limpieza y Arquitectura Base
**Duración estimada**: 16-20 horas
**Prioridad**: CRÍTICA

#### Objetivos:
- Eliminar código Conekta
- Setup Supabase proyecto
- Configurar estructura de servicios
- Definir tipos TypeScript

#### Tareas:

**1.1 Limpieza Conekta** (2h)
- [ ] Eliminar 6 archivos Conekta
- [ ] Crear `FirstDataRedirect.jsx` placeholder
- [ ] Actualizar imports en `DonationForm.jsx`
- [ ] Verificar compilación sin errores

**1.2 Setup Supabase** (4h)
- [ ] Crear proyecto en Supabase.com
- [ ] Instalar CLI: `npm install -g supabase`
- [ ] Inicializar localmente: `npx supabase init`
- [ ] Ejecutar schema SQL completo (sección 4.2)
- [ ] Crear buckets de storage
- [ ] Verificar RLS policies activas

**1.3 Configurar Cliente Supabase** (3h)
- [ ] Instalar dependencias:
  ```bash
  npm install @supabase/supabase-js @supabase/auth-helpers-react date-fns zod
  ```
- [ ] Crear `src/services/supabaseClient.js`:
  ```javascript
  import { createClient } from '@supabase/supabase-js'

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables')
  }

  export const supabase = createClient(supabaseUrl, supabaseAnonKey)
  ```
- [ ] Crear `.env.local`:
  ```
  VITE_SUPABASE_URL=https://xxx.supabase.co
  VITE_SUPABASE_ANON_KEY=eyJxxx...
  ```
- [ ] Actualizar `.gitignore`:
  ```
  .env.local
  .env*.local
  ```

**1.4 Generar Types TypeScript** (2h)
- [ ] Generar types:
  ```bash
  npx supabase gen types typescript --project-id xxx > src/types/database.ts
  ```
- [ ] Crear `src/types/index.ts` con types auxiliares
- [ ] Configurar VSCode para autocomplete

**1.5 Crear Estructura de Servicios** (5h)
- [ ] `src/services/auth.service.js`
- [ ] `src/services/donations.service.js`
- [ ] `src/services/rewards.service.js`
- [ ] `src/services/transparency.service.js`
- [ ] Implementar funciones base con manejo de errores

**1.6 Setup Context de Auth** (4h)
- [ ] Crear `src/contexts/AuthContext.jsx`
- [ ] Implementar provider con Supabase Auth
- [ ] Agregar a `App.jsx`
- [ ] Crear hooks: `useAuth()`, `useUser()`

#### Entregables:
- ✅ Código Conekta eliminado
- ✅ Supabase configurado local y producción
- ✅ Schema DB ejecutado y funcionando
- ✅ Cliente Supabase conectado
- ✅ Types TypeScript generados
- ✅ Servicios base creados
- ✅ Context de autenticación funcionando

---

### FASE 2: Autenticación de Usuarios
**Duración estimada**: 16-20 horas
**Prioridad**: ALTA

#### Objetivos:
- Sistema de login/registro funcional
- Magic links (sin contraseña)
- Perfil de usuario
- Protección de rutas

#### Tareas:

**2.1 Componentes de Auth** (6h)
- [ ] `src/components/auth/LoginModal.jsx`
  - Magic link input
  - Mensaje de "Revisa tu email"
- [ ] `src/components/auth/ProfileDropdown.jsx`
  - Mostrar info de usuario
  - Botón de logout
- [ ] `src/components/auth/ProtectedRoute.jsx`
  - HOC para rutas protegidas
- [ ] Integrar en Header.jsx

**2.2 Flujo de Magic Link** (4h)
- [ ] Configurar email templates en Supabase
- [ ] Implementar `signInWithOtp()` en auth.service
- [ ] Crear página de confirmación: `/auth/confirm`
- [ ] Manejo de errores y timeouts

**2.3 Página de Perfil** (6h)
- [ ] Crear `src/pages/ProfilePage.jsx`
- [ ] Mostrar donaciones del usuario
- [ ] Mostrar códigos de donante
- [ ] Editar información personal
- [ ] Upload de avatar (Supabase Storage)

**2.4 Integración con Donaciones** (4h)
- [ ] Actualizar `DonationForm.jsx`:
  - Si está logueado → pre-llenar datos
  - Si no está logueado → crear cuenta automáticamente
- [ ] Asociar `user_id` a donaciones
- [ ] Enviar email de bienvenida

#### Entregables:
- ✅ Login con magic links funcional
- ✅ Perfil de usuario editable
- ✅ Donaciones asociadas a usuarios
- ✅ Email templates configurados
- ✅ Rutas protegidas implementadas

---

### FASE 3: Transparencia Funcional
**Duración estimada**: 12-16 horas
**Prioridad**: ALTA

#### Objetivos:
- Dashboard con datos reales de DB
- Actualización en tiempo real
- Gráficos de progreso dinámicos
- Área exclusiva para donantes

#### Tareas:

**3.1 Refactorizar ProgressSection** (4h)
- [ ] Eliminar `useState` con valores mock
- [ ] Implementar query a `campaign_stats` view:
  ```javascript
  const { data: stats } = await supabase
    .from('campaign_stats')
    .select('*')
    .single()
  ```
- [ ] Implementar real-time subscription:
  ```javascript
  supabase
    .channel('campaign-updates')
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'donations'
    }, refreshStats)
    .subscribe()
  ```
- [ ] Calcular porcentajes dinámicamente

**3.2 Refactorizar TransparencyDashboard** (5h)
- [ ] Query agregada para fondos:
  ```sql
  SELECT
    SUM(amount) FILTER (WHERE status = 'completed') as total,
    SUM(amount) FILTER (WHERE created_at > NOW() - INTERVAL '30 days') as this_month,
    SUM(amount) FILTER (WHERE created_at > NOW() - INTERVAL '7 days') as this_week
  FROM donations
  ```
- [ ] Query a tabla `expenses` con JOIN para desglose
- [ ] Query a `project_updates` con filtro de nivel de donante
- [ ] Implementar gráficos con datos reales

**3.3 Área Exclusiva para Donantes** (3h)
- [ ] Validar `donor_code` contra DB
- [ ] Mostrar contenido según nivel de recompensa:
  ```javascript
  const { data: donation } = await supabase
    .from('donations')
    .select('*, rewards(*)')
    .eq('donor_code', code)
    .eq('status', 'completed')
    .single()

  if (donation.rewards.level >= 4) {
    // Mostrar contenido exclusivo nivel 4+
  }
  ```
- [ ] Descargar archivos de Storage bucket
- [ ] UI para acceso a updates exclusivos

**3.4 Donantes Recientes** (2h)
- [ ] Query a view `recent_donors`
- [ ] Componente de lista con animación
- [ ] Respeto a flag `is_anonymous`

**3.5 Testing y Optimización** (2h)
- [ ] Verificar queries eficientes (usar EXPLAIN)
- [ ] Agregar loading states
- [ ] Error boundaries
- [ ] Refresh de materialized view cada hora

#### Entregables:
- ✅ Dashboard con datos 100% reales
- ✅ Real-time updates funcionando
- ✅ Área de donantes con validación de código
- ✅ Gráficos dinámicos de transparencia
- ✅ Performance optimizado (<200ms queries)

---

### FASE 4: Gestión de Recompensas
**Duración estimada**: 16-20 horas
**Prioridad**: MEDIA-ALTA

#### Objetivos:
- CRUD de recompensas desde admin
- Control de inventario
- Asignación automática
- Notificaciones de entrega

#### Tareas:

**4.1 Refactorizar RewardsSection** (3h)
- [ ] Leer de tabla `rewards` en lugar de archivo
- [ ] Query con stock disponible:
  ```javascript
  const { data: rewards } = await supabase
    .from('rewards')
    .select('*, donations(count)')
    .eq('is_active', true)
    .order('level', { ascending: true })
  ```
- [ ] Deshabilitar botón si `stock <= 0`
- [ ] Mostrar indicador de "Últimas X disponibles"

**4.2 Asociar Recompensa a Donación** (4h)
- [ ] Actualizar `DonationForm.jsx`:
  - Agregar campo `reward_id`
  - Validar stock antes de crear donación
- [ ] Implementar lógica de decremento de stock:
  ```sql
  -- En transaction
  UPDATE rewards SET stock = stock - 1 WHERE id = ? AND stock > 0;
  INSERT INTO donations (...) VALUES (...);
  ```
- [ ] Rollback si stock = 0

**4.3 Sistema de Entrega** (5h)
- [ ] Tabla adicional: `reward_shipments`
  ```sql
  CREATE TABLE reward_shipments (
    id UUID PRIMARY KEY,
    donation_id UUID REFERENCES donations(id),
    address TEXT,
    city TEXT,
    state TEXT,
    zip_code TEXT,
    country TEXT DEFAULT 'México',
    tracking_number TEXT,
    status TEXT, -- pending, shipped, delivered
    shipped_at TIMESTAMP,
    delivered_at TIMESTAMP
  );
  ```
- [ ] Formulario de dirección para recompensas físicas
- [ ] Validación de dirección

**4.4 Emails de Recompensa** (4h)
- [ ] Template: Confirmación de recompensa digital
- [ ] Template: Instrucciones de envío físico
- [ ] Template: Número de tracking
- [ ] Edge Function: `send-reward-email`
- [ ] Trigger en `donations.status = 'completed'`

#### Entregables:
- ✅ Recompensas leídas de DB
- ✅ Control de inventario funcional
- ✅ Sistema de envío para físicas
- ✅ Emails automáticos configurados
- ✅ Admin puede gestionar stock

---

### FASE 5: Panel de Administración
**Duración estimada**: 20-24 horas
**Prioridad**: MEDIA

#### Objetivos:
- Dashboard de admin completo
- Gestión de donaciones
- Gestión de gastos
- Reportes y analytics
- Control de recompensas

#### Tareas:

**5.1 Estructura de Admin** (4h)
- [ ] Crear `src/pages/admin/` folder
- [ ] Layout de admin con sidebar
- [ ] Proteger rutas con role check:
  ```javascript
  const { data: user } = await supabase.auth.getUser()
  const { data: profile } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single()

  if (!['admin', 'superadmin'].includes(profile.role)) {
    navigate('/')
  }
  ```
- [ ] Menu de navegación admin

**5.2 Dashboard de Métricas** (5h)
- [ ] `src/pages/admin/DashboardPage.jsx`
- [ ] Cards de métricas principales:
  - Total recaudado
  - Donaciones hoy/semana/mes
  - Promedio de donación
  - Conversión (visitas → donaciones)
- [ ] Gráfico de donaciones por día (últimos 30 días)
- [ ] Tabla de top donantes
- [ ] Tabla de donaciones recientes

**5.3 Gestión de Donaciones** (6h)
- [ ] `src/pages/admin/DonationsPage.jsx`
- [ ] Tabla con todas las donaciones:
  - Filtros: status, fecha, monto, reward
  - Ordenamiento por columnas
  - Paginación
- [ ] Modal de detalle de donación
- [ ] Acciones:
  - Marcar como completada manualmente
  - Marcar como fallida
  - Procesar reembolso (cambiar status)
  - Descargar recibo
  - Ver información del donante

**5.4 Gestión de Gastos** (5h)
- [ ] `src/pages/admin/ExpensesPage.jsx`
- [ ] Formulario para agregar gasto:
  - Categoría
  - Descripción
  - Monto
  - Fecha
  - Upload de recibo (Storage)
- [ ] Tabla de gastos con filtros
- [ ] Editar/eliminar gastos
- [ ] Visualización de breakdown por categoría

**5.5 Gestión de Actualizaciones** (4h)
- [ ] `src/pages/admin/UpdatesPage.jsx`
- [ ] Formulario WYSIWYG para crear update:
  - Título
  - Descripción (rich text)
  - Tipo (milestone/content/funding)
  - Nivel mínimo de donante
  - Upload de imagen
- [ ] Lista de updates publicados y borradores
- [ ] Programar publicación (scheduled_at)

#### Entregables:
- ✅ Panel admin completo y funcional
- ✅ Gestión de donaciones con acciones
- ✅ Gestión de gastos con receipts
- ✅ Creación de updates del proyecto
- ✅ Dashboard con métricas clave
- ✅ Reportes descargables (CSV/PDF)

---

### FASE 6: Emails y Notificaciones
**Duración estimada**: 12-16 horas
**Prioridad**: MEDIA

#### Objetivos:
- Sistema de emails transaccionales
- Notificaciones push (opcional)
- Templates personalizados
- Logs de envíos

#### Tareas:

**6.1 Setup Servicio de Email** (3h)
- [ ] Elegir proveedor:
  - **Opción 1**: Resend (recomendado, $20/mes para 50k emails)
  - **Opción 2**: SendGrid (free tier 100 emails/día)
- [ ] Configurar dominio y DNS
- [ ] Instalar SDK: `npm install resend`
- [ ] Crear Edge Function: `send-email`

**6.2 Templates de Email** (6h)
- [ ] Template base con branding Nuestras Voces
- [ ] Template: Confirmación de donación
  ```
  Asunto: ¡Gracias por ser parte de Nuestras Voces!

  Hola {nombre},

  Tu donación de {monto} ha sido recibida exitosamente.

  Código de donante: {donor_code}
  Recompensa: {reward_name}

  [Detalles de recompensa]
  [Botón: Ver mi perfil]
  ```
- [ ] Template: Bienvenida (nuevos usuarios)
- [ ] Template: Actualización de proyecto
- [ ] Template: Envío de recompensa física
- [ ] Template: Magic link de login

**6.3 Database Triggers para Emails** (3h)
- [ ] Trigger en `donations.status → completed`:
  ```sql
  CREATE FUNCTION send_donation_confirmation()
  RETURNS TRIGGER AS $$
  BEGIN
    PERFORM net.http_post(
      url := 'https://xxx.supabase.co/functions/v1/send-email',
      headers := '{"Authorization": "Bearer xxx"}',
      body := json_build_object(
        'template', 'donation_confirmation',
        'to', NEW.donor_email,
        'data', row_to_json(NEW)
      )::text
    );
    RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;
  ```
- [ ] Trigger en `users` insert → email de bienvenida
- [ ] Trigger en `project_updates` publish → email a donantes

**6.4 Logs y Monitoreo** (2h)
- [ ] Tabla `email_logs`:
  ```sql
  CREATE TABLE email_logs (
    id UUID PRIMARY KEY,
    recipient TEXT,
    template TEXT,
    status TEXT, -- sent, failed, bounced
    error_message TEXT,
    sent_at TIMESTAMP DEFAULT NOW()
  );
  ```
- [ ] Guardar cada envío
- [ ] Admin puede ver logs de emails
- [ ] Retry automático en fallos

**6.5 Emails de Campaña (Opcional)** (2h)
- [ ] Sistema para enviar email blast a todos los donantes
- [ ] Segmentación por nivel de recompensa
- [ ] Preview antes de enviar
- [ ] Rate limiting (evitar spam)

#### Entregables:
- ✅ Servicio de emails configurado
- ✅ 6 templates funcionando
- ✅ Triggers automáticos activos
- ✅ Logs de emails accesibles
- ✅ Emails personalizados con data real

---

### FASE 7: Mejoras de UX
**Duración estimada**: 12-16 horas
**Prioridad**: BAJA

#### Objetivos:
- Loading states elegantes
- Animaciones y transiciones
- Error handling robusto
- Responsive optimizado
- SEO mejorado

#### Tareas:

**7.1 Loading States** (3h)
- [ ] Skeleton screens para todas las páginas
- [ ] Spinners consistentes
- [ ] Progress bars para uploads
- [ ] Optimistic UI updates (donaciones aparecen inmediatamente)

**7.2 Error Handling** (4h)
- [ ] Error boundaries en React
- [ ] Toast notifications para errores
- [ ] Mensajes de error user-friendly
- [ ] Retry automático en fallos de red
- [ ] Offline detection

**7.3 Animaciones** (3h)
- [ ] Transiciones suaves entre páginas
- [ ] Animación de contador en ProgressSection
- [ ] Fade-in de donantes recientes
- [ ] Micro-interacciones en botones
- [ ] Confetti animation al completar donación

**7.4 Responsive** (2h)
- [ ] Audit completo mobile
- [ ] Mejorar UX en tablet
- [ ] Touch targets mínimo 44x44px
- [ ] Reducir texto en móvil

**7.5 SEO** (2h)
- [ ] Meta tags dinámicos con `react-helmet`
- [ ] Open Graph tags para redes sociales
- [ ] Sitemap.xml generado
- [ ] robots.txt
- [ ] Structured data (JSON-LD)

**7.6 Performance** (2h)
- [ ] Lazy loading de componentes
- [ ] Code splitting por ruta
- [ ] Optimización de imágenes (WebP)
- [ ] Prefetch de datos críticos
- [ ] Lighthouse score > 90

#### Entregables:
- ✅ UX pulido y profesional
- ✅ Error handling robusto
- ✅ Performance optimizado
- ✅ SEO completo
- ✅ Animaciones elegantes

---

### FASE 8: Testing y Deployment
**Duración estimada**: 12-16 horas
**Prioridad**: CRÍTICA

#### Objetivos:
- Testing end-to-end
- CI/CD pipeline
- Deployment a producción
- Monitoreo y analytics
- Documentación

#### Tareas:

**8.1 Testing** (6h)
- [ ] Setup Vitest: `npm install -D vitest @testing-library/react`
- [ ] Tests unitarios de servicios:
  - donations.service.js
  - auth.service.js
  - rewards.service.js
- [ ] Tests de integración:
  - Flujo completo de donación
  - Login/logout
  - Admin actions
- [ ] Tests E2E con Playwright:
  - Usuario dona y recibe confirmación
  - Admin aprueba donación
  - Transparencia actualizada

**8.2 CI/CD** (3h)
- [ ] GitHub Actions workflow:
  ```yaml
  name: CI/CD
  on: [push, pull_request]
  jobs:
    test:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v3
        - run: npm ci
        - run: npm test
        - run: npm run build
    deploy:
      needs: test
      if: github.ref == 'refs/heads/main'
      runs-on: ubuntu-latest
      steps:
        - run: npx vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
  ```
- [ ] Secrets en GitHub
- [ ] Deployment automático a Vercel

**8.3 Monitoreo** (2h)
- [ ] Sentry para error tracking:
  ```bash
  npm install @sentry/react
  ```
- [ ] Google Analytics o Plausible
- [ ] Supabase Dashboard para DB monitoring
- [ ] Uptime monitoring (UptimeRobot)

**8.4 Documentación** (3h)
- [ ] README.md completo:
  - Setup instructions
  - Environment variables
  - Arquitectura
  - Deployment
- [ ] CONTRIBUTING.md para equipo
- [ ] Docs de API (Edge Functions)
- [ ] Runbook para incidentes

**8.5 Pre-Launch Checklist** (2h)
- [ ] Audit de seguridad:
  - RLS policies activas
  - Secrets no expuestos
  - HTTPS enforced
  - CORS configurado
- [ ] Performance:
  - Lighthouse > 90
  - Core Web Vitals green
- [ ] Funcional:
  - Todas las features testeadas
  - Emails funcionando
  - Pagos de prueba OK
- [ ] Legal:
  - Términos actualizados
  - Privacidad actualizada
  - GDPR compliance

#### Entregables:
- ✅ Test coverage > 70%
- ✅ CI/CD pipeline activo
- ✅ Deployment a producción
- ✅ Monitoreo configurado
- ✅ Documentación completa
- ✅ Pre-launch checklist ✓

---

## 7. ESTIMACIONES DE TIEMPO

### 7.1 Resumen por Fase

| Fase | Descripción | Horas Min | Horas Max | Días (8h/día) |
|------|-------------|-----------|-----------|---------------|
| 1 | Limpieza y Arquitectura Base | 16 | 20 | 2-2.5 |
| 2 | Autenticación de Usuarios | 16 | 20 | 2-2.5 |
| 3 | Transparencia Funcional | 12 | 16 | 1.5-2 |
| 4 | Gestión de Recompensas | 16 | 20 | 2-2.5 |
| 5 | Panel de Administración | 20 | 24 | 2.5-3 |
| 6 | Emails y Notificaciones | 12 | 16 | 1.5-2 |
| 7 | Mejoras de UX | 12 | 16 | 1.5-2 |
| 8 | Testing y Deployment | 12 | 16 | 1.5-2 |
| **TOTAL** | | **116h** | **148h** | **14.5-18.5 días** |

### 7.2 Timeline Detallado

**Escenario Conservador** (148 horas):
- 1 desarrollador full-time (8h/día) = **18.5 días ~ 3.7 semanas**
- 2 desarrolladores full-time = **9.25 días ~ 1.85 semanas**

**Escenario Optimista** (116 horas):
- 1 desarrollador full-time = **14.5 días ~ 3 semanas**
- 2 desarrolladores full-time = **7.25 días ~ 1.5 semanas**

**Recomendación**: Planear para **4 semanas** con 1 desarrollador, incluyendo buffer para:
- Reuniones y coordinación (10%)
- Debugging inesperado (15%)
- Iteraciones de UX (10%)

### 7.3 Roadmap Visual

```
Semana 1               Semana 2               Semana 3               Semana 4
├──────────────────────┼──────────────────────┼──────────────────────┼──────────────────────┤
│ Fase 1: Setup        │ Fase 3: Transparencia│ Fase 5: Admin Panel  │ Fase 7: UX           │
│ - Limpieza Conekta   │ - Dashboard real     │ - Donaciones mgmt    │ - Polish             │
│ - Supabase config    │ - Real-time updates  │ - Gastos mgmt        │ - Animaciones        │
│ - DB Schema          │                      │ - Updates mgmt       │                      │
│                      │ Fase 4: Recompensas  │                      │ Fase 8: Deploy       │
│ Fase 2: Auth         │ - CRUD rewards       │ Fase 6: Emails       │ - Testing E2E        │
│ - Magic links        │ - Inventario         │ - Templates          │ - CI/CD              │
│ - Perfil usuario     │ - Envíos             │ - Triggers           │ - Producción         │
└──────────────────────┴──────────────────────┴──────────────────────┴──────────────────────┘
    ✅ MVP Básico           ✅ MVP Completo        ✅ Full Featured       ✅ Production Ready
```

### 7.4 Hitos Clave (Milestones)

| Milestone | Fecha Estimada | Criterio de Éxito |
|-----------|----------------|-------------------|
| **M1: Backend Setup** | Día 5 | Supabase conectado, queries básicas funcionan |
| **M2: MVP Básico** | Día 10 | Usuario puede donar y ver transparencia real |
| **M3: MVP Completo** | Día 15 | Recompensas, emails, admin básico |
| **M4: Full Featured** | Día 20 | Todo funcional, falta polish |
| **M5: Production** | Día 25 | Testing completo, deployed, monitoreado |

---

## 8. RIESGOS Y MITIGACIÓN

### 8.1 Riesgos Técnicos

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| **Integración First Data tarda más de lo esperado** | ALTA | MEDIO | Usar placeholder funcional, integrar pago en fase posterior separada |
| **Supabase free tier insuficiente** | BAJA | BAJO | Monitorear uso, migrar a Pro ($25/mes) si necesario |
| **Performance de queries lentas** | MEDIA | MEDIO | Usar materialized views, índices apropiados, cache con React Query |
| **Real-time consume mucho bandwidth** | BAJA | BAJO | Throttle de updates a 1/segundo, usar broadcast en lugar de database changes |
| **Email deliverability baja** | MEDIA | MEDIO | Configurar SPF/DKIM/DMARC correctamente, warm-up de dominio |
| **Row-level security compleja** | MEDIA | ALTO | Testear exhaustivamente, comenzar restrictivo y abrir gradualmente |

### 8.2 Riesgos de Negocio

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| **Requerimientos cambian mid-development** | ALTA | ALTO | Arquitectura modular, changelog de cambios, buffer de 20% en timeline |
| **Falta claridad sobre integración First Data** | ALTA | ALTO | **ACCIÓN INMEDIATA**: Contactar First Data para documentación de API |
| **Scope creep (agregar features no planeadas)** | MEDIA | MEDIO | Roadmap claro, marcar como "Fase 9 - Future Enhancements" |
| **Expectativas de diseño vs tiempo** | MEDIA | BAJO | Usar Tailwind UI components, iterar en Fase 7 |

### 8.3 Riesgos de Datos

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| **Pérdida de datos de donaciones** | BAJA | CRÍTICO | Backups automáticos de Supabase (Point-in-time recovery), export diario a CSV |
| **Datos de pago expuestos** | BAJA | CRÍTICO | NUNCA almacenar datos de tarjeta, solo transaction_ids de First Data |
| **Emails con data incorrecta** | MEDIA | MEDIO | Staging environment, test de templates antes de producción |
| **Inconsistencia entre donations y campaign_stats** | BAJA | MEDIO | Usar transacciones, refresh materialized view en cron job |

### 8.4 Plan de Contingencia

**Si Supabase tiene downtime**:
1. Vercel Edge Functions pueden cachear datos críticos
2. Mostrar mensaje "Estamos experimentando problemas técnicos, tus datos están seguros"
3. Queue de operaciones para procesar cuando vuelva
4. SLA de Supabase: 99.9% uptime en plan Pro

**Si First Data integration se complica**:
1. Fase 1-7 se pueden completar sin pagos reales
2. Placeholder de "Donación registrada, pendiente de pago"
3. Admin puede marcar como `completed` manualmente
4. Dedicar semana adicional exclusiva a integración de pago

**Si performance es problema**:
1. Upgrade a Supabase Pro ($25/mes) con más recursos
2. Implementar cache con Vercel Edge Middleware
3. Usar CDN para assets estáticos
4. Lazy load de componentes pesados

---

## 9. CHECKLIST DE PRE-IMPLEMENTACIÓN

Antes de comenzar Fase 1, verificar:

### 9.1 Accesos y Permisos
- [ ] Acceso a cuenta de Supabase (crear si no existe)
- [ ] Acceso a repositorio de GitHub
- [ ] Acceso a dominio y DNS (para emails)
- [ ] Acceso a First Data API (credentials y docs)
- [ ] Acceso a Vercel para deployment

### 9.2 Información Necesaria
- [ ] Logo oficial en alta resolución (ya disponible)
- [ ] Paleta de colores definitiva (definida en Tailwind)
- [ ] Copy para emails (templates base)
- [ ] Datos de cuenta bancaria para transparencia
- [ ] Lista completa de categorías de gastos
- [ ] Recompensas físicas: detalles de envío y logística

### 9.3 Decisiones de Negocio
- [ ] ¿Modelo keep-it-all o all-or-nothing? → **Keep-it-all** (confirmado)
- [ ] ¿Fecha límite de campaña? → **Sin fecha límite** (confirmado)
- [ ] ¿Aceptar donaciones anónimas? → **Sí** (confirmado)
- [ ] ¿Permitir mensajes públicos de donantes? → **Sí**
- [ ] ¿Reembolsos permitidos? → **No** (confirmado en FAQ)
- [ ] ¿Costos de envío de recompensas? → **Aplican para físicas** (confirmado)

### 9.4 Recursos de Desarrollo
- [ ] Node.js 18+ instalado
- [ ] Git configurado
- [ ] Editor con TypeScript support (VSCode recomendado)
- [ ] Docker Desktop (para Supabase local)
- [ ] Postman o similar (para testing de APIs)

---

## 10. SIGUIENTES PASOS INMEDIATOS

### Acción 1: Aprobar Roadmap
**Responsable**: Cliente
**Deadline**: ASAP
**Entregable**: Confirmación por escrito de roadmap aprobado

### Acción 2: Obtener Credenciales First Data
**Responsable**: Cliente
**Deadline**: Antes de Fase 1
**Entregable**:
- API credentials (sandbox + production)
- Documentación de API
- Webhook URLs esperadas

### Acción 3: Crear Proyecto Supabase
**Responsable**: Desarrollador
**Deadline**: Día 1 de Fase 1
**Entregable**:
- Proyecto Supabase creado
- Variables de entorno compartidas
- Acceso al dashboard para cliente

### Acción 4: Kickoff Meeting
**Responsable**: Ambos
**Deadline**: Antes de comenzar
**Agenda**:
- Review de roadmap completo
- Clarificar dudas técnicas
- Acordar proceso de comunicación diaria
- Definir criterios de aceptación por fase

---

## 11. CONCLUSIONES

### 11.1 Estado Actual
La plataforma actual es un **prototipo funcional de UI** con:
- ✅ Diseño visual completo y pulido
- ✅ Componentes React bien estructurados
- ✅ Copy y contenido legal completo
- ❌ Sin persistencia de datos
- ❌ Sin autenticación
- ❌ Sin backend funcional

### 11.2 Arquitectura Recomendada
**Supabase** es la mejor opción por:
1. Desarrollo 3-5x más rápido que backend custom
2. PostgreSQL con real-time built-in
3. Autenticación y Storage incluidos
4. Costo inicial: $0 (free tier suficiente para MVP)
5. Escalabilidad probada
6. DX (Developer Experience) excelente

### 11.3 Timeline Realista
- **Mínimo viable**: 3 semanas (116 horas)
- **Completo y pulido**: 4 semanas (148 horas)
- **Con buffer recomendado**: **5 semanas** (incluyendo contingencias)

### 11.4 Inversión Estimada

**Desarrollo** (1 dev full-time, 4 semanas):
- 148 horas × $50-150/hora = **$7,400 - $22,200 USD**

**Servicios mensuales**:
- Supabase Pro: $25/mes (opcional primer mes)
- Resend (emails): $20/mes
- Vercel: $0 (free tier suficiente)
- Sentry: $0 (free tier suficiente)
- **Total**: ~$45/mes

**Servicios anuales**:
- Dominio: $15/año
- **Total primer año**: ~$555

### 11.5 Recomendación Final

✅ **Proceder con implementación usando este roadmap**

Razones:
1. Análisis técnico completo realizado
2. Stack tecnológico validado y moderno
3. Timeline realista con buffers
4. Riesgos identificados y mitigados
5. ROI claro: plataforma funcional en 4-5 semanas

**Next Step**: Confirmar aprobación y comenzar Fase 1 inmediatamente.

---

## APÉNDICES

### Apéndice A: Glosario de Términos

- **RLS (Row Level Security)**: Sistema de Postgres para restringir acceso a filas según usuario
- **Edge Functions**: Funciones serverless que corren en el edge (cerca del usuario)
- **Magic Links**: Autenticación sin contraseña, vía link por email
- **Materialized View**: Vista de DB pre-calculada para performance
- **Keep-it-all**: Modelo de crowdfunding donde el proyecto se queda con todos los fondos sin meta mínima

### Apéndice B: Stack Tecnológico Completo

**Frontend**:
- React 19.1.1
- Vite 7.0.6
- React Router 7.7.1
- Tailwind CSS 3.4.17
- date-fns (manejo de fechas)
- Zod (validación de schemas)

**Backend**:
- Supabase (BaaS)
  - PostgreSQL 15
  - PostgREST (auto-generated API)
  - GoTrue (autenticación)
  - Storage API
  - Realtime Server

**DevOps**:
- GitHub (control de versiones)
- GitHub Actions (CI/CD)
- Vercel (hosting frontend)
- Sentry (error tracking)
- Plausible Analytics

**Comunicaciones**:
- Resend (emails transaccionales)

**Pagos**:
- First Data (por integrar)

### Apéndice C: Variables de Entorno

```bash
# .env.local (frontend)
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_SITE_URL=https://nuestrasvoces.com

# Supabase Edge Functions
RESEND_API_KEY=re_xxx
FIRST_DATA_API_KEY=xxx
FIRST_DATA_WEBHOOK_SECRET=xxx
```

### Apéndice D: Comandos Útiles

```bash
# Development
npm run dev                    # Start Vite dev server
npx supabase start            # Start Supabase local
npx supabase db reset         # Reset local DB
npx supabase gen types typescript # Generate types

# Deployment
npm run build                 # Build for production
npx vercel --prod            # Deploy to Vercel
npx supabase db push         # Push migrations to remote

# Testing
npm run test                  # Run unit tests
npm run test:e2e             # Run E2E tests
npm run lint                 # Check code quality

# Database
npx supabase db diff          # Show pending migrations
npx supabase db dump > backup.sql  # Backup database
npx supabase functions serve  # Test edge functions locally
```

---

**FIN DEL ROADMAP**

Documento generado: 30 de Septiembre, 2025
Versión: 1.0
Autor: Claude Code Assistant
Para: Proyecto Nuestras Voces - Jorge Porras Gamboa

**¿Listo para comenzar la implementación?** 🚀
