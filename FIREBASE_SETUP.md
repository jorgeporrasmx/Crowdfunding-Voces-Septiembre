# Setup de Firebase - Nuestras Voces Crowdfunding

## ✅ Completado

### Fase 1 - Migración a Firebase

- [x] Eliminados 6 archivos de Conekta (~1,200 líneas)
- [x] Desinstalado Supabase, instalado Firebase
- [x] Creado cliente Firebase (`firebaseClient.js`)
- [x] Creados 4 servicios:
  - `auth.service.js` - Autenticación de usuarios
  - `donations.service.js` - Gestión de donaciones
  - `rewards.service.js` - Gestión de recompensas
  - `transparency.service.js` - Dashboard de transparencia
- [x] Actualizado `FirstDataRedirect.jsx` para usar Firebase
- [x] Actualizado `.env.local.example` con variables Firebase

## 📋 Siguientes Pasos

### 1. Crear Proyecto en Firebase Console

1. Ve a https://console.firebase.google.com/
2. Click en "Agregar proyecto"
3. Nombre: `nuestras-voces-crowdfunding`
4. Habilita Google Analytics (opcional)
5. Crea el proyecto

### 2. Configurar Firestore Database

1. En Firebase Console, ve a "Firestore Database"
2. Click en "Crear base de datos"
3. Selecciona "Modo de producción" o "Modo de prueba" (recomendado para desarrollo)
4. Elige ubicación: `us-central` (o la más cercana a México)

### 3. Configurar Authentication

1. En Firebase Console, ve a "Authentication"
2. Click en "Comenzar"
3. Habilita los métodos de autenticación:
   - Email/Password ✓
   - Google (opcional)
   - Facebook (opcional)

### 4. Configurar Storage

1. En Firebase Console, ve a "Storage"
2. Click en "Comenzar"
3. Acepta las reglas por defecto

### 5. Obtener Credenciales

1. En Firebase Console, ve a "Configuración del proyecto" (ícono de engranaje)
2. En la pestaña "General", busca "Tus apps"
3. Click en "</>" (Web app)
4. Registra la app con nombre: `nuestras-voces-web`
5. Copia las credenciales que aparecen

### 6. Configurar Variables de Entorno Locales

Crea el archivo `.env.local` en `web-app/`:

```bash
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=nuestras-voces-crowdfunding.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=nuestras-voces-crowdfunding
VITE_FIREBASE_STORAGE_BUCKET=nuestras-voces-crowdfunding.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
VITE_SITE_URL=http://localhost:3000
```

### 7. Crear Colecciones en Firestore

Ejecuta estos comandos en la consola de Firestore o crea las colecciones manualmente:

#### Colección: `users`
```javascript
{
  email: "usuario@example.com",
  fullName: "Nombre Completo",
  role: "donor", // donor | admin | superadmin
  createdAt: timestamp,
  updatedAt: timestamp
}
```

#### Colección: `donations`
```javascript
{
  amount: 500,
  donorName: "Juan Pérez",
  donorEmail: "juan@example.com",
  donorCode: "NV-2025-ABC123",
  message: "Mensaje opcional",
  isAnonymous: false,
  rewardId: "reward_id_optional",
  userId: "user_id_optional",
  status: "pending", // pending | completed | failed
  createdAt: timestamp,
  updatedAt: timestamp,
  completedAt: timestamp_optional
}
```

#### Colección: `rewards`
```javascript
{
  level: 1,
  name: "Voz Solidaria",
  amount: 200,
  color: "yellow",
  icon: "🟡",
  benefits: ["Beneficio 1", "Beneficio 2"],
  isActive: true,
  popular: false,
  stock: null, // null = ilimitado
  createdAt: timestamp
}
```

#### Colección: `expenses`
```javascript
{
  category: "production", // production | equipment | marketing | platform | other
  description: "Descripción del gasto",
  amount: 1000,
  date: timestamp,
  receiptUrl: "url_opcional",
  approvedBy: "user_id_opcional",
  createdAt: timestamp
}
```

### 8. Configurar Reglas de Seguridad de Firestore

Ve a "Firestore Database" → "Reglas" y reemplaza con:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isAdmin() {
      return isAuthenticated() && 
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'superadmin'];
    }
    
    // Users collection
    match /users/{userId} {
      allow read: if isAuthenticated();
      allow create: if isAuthenticated();
      allow update: if isAuthenticated() && request.auth.uid == userId;
      allow delete: if isAdmin();
    }
    
    // Donations collection
    match /donations/{donationId} {
      allow read: if true; // Público para transparencia
      allow create: if true; // Cualquiera puede donar
      allow update: if isAdmin();
      allow delete: if isAdmin();
    }
    
    // Rewards collection
    match /rewards/{rewardId} {
      allow read: if true; // Público
      allow write: if isAdmin();
    }
    
    // Expenses collection
    match /expenses/{expenseId} {
      allow read: if true; // Transparencia pública
      allow write: if isAdmin();
    }
  }
}
```

### 9. Seedear Datos de Recompensas

Puedes usar la consola de Firestore o crear un script. Las 11 recompensas están definidas en `src/data/rewards.js`. Aquí un ejemplo para importar:

```javascript
import { collection, addDoc } from 'firebase/firestore'
import { db } from './services/firebaseClient'
import { rewards } from './data/rewards'

async function seedRewards() {
  for (const reward of rewards) {
    await addDoc(collection(db, 'rewards'), {
      ...reward,
      isActive: true,
      createdAt: new Date()
    })
  }
  console.log('✓ Recompensas importadas')
}
```

### 10. Probar la Aplicación

```bash
npm run dev
```

Deberías poder:
- Ver la página principal
- Intentar hacer una donación (se guardará en Firestore con status "pending")
- Ver el código de donante generado

## 📁 Estructura de Archivos Creados

```
web-app/
├── src/
│   ├── services/
│   │   ├── firebaseClient.js      ✓ Cliente Firebase
│   │   ├── auth.service.js        ✓ Autenticación
│   │   ├── donations.service.js   ✓ Donaciones
│   │   ├── rewards.service.js     ✓ Recompensas
│   │   └── transparency.service.js ✓ Transparencia
│   └── components/
│       └── FirstDataRedirect.jsx  ✓ Actualizado para Firebase
├── .env.local.example             ✓ Template de variables
└── FIREBASE_SETUP.md              ✓ Este archivo
```

## 🔄 Diferencias vs Supabase

| Característica | Supabase (Anterior) | Firebase (Actual) |
|----------------|---------------------|-------------------|
| Base de datos | PostgreSQL (SQL) | Firestore (NoSQL) |
| Queries | SQL directo | SDK de Firestore |
| Autenticación | GoTrue | Firebase Auth |
| Storage | S3-compatible | Firebase Storage |
| Real-time | Postgres Changes | Firestore Snapshots |
| Edge Functions | Deno | Cloud Functions |
| Pricing | Free: 500MB | Free: 1GB + 50K reads/day |

## 📊 Estado del Proyecto

- ✅ **Backend**: Configurado con Firebase
- ✅ **Servicios**: 4 servicios principales creados
- ✅ **Donaciones**: Se guardan en Firestore
- ⚠️ **Autenticación**: Servicio listo, falta UI
- ⚠️ **Transparencia**: Servicio listo, falta conectar a dashboard
- ⚠️ **Recompensas**: Servicio listo, falta conectar a UI
- ❌ **First Data**: Por implementar
- ❌ **Admin Panel**: Por crear

## 🚀 Próximos Pasos de Implementación

1. Crear proyecto Firebase y configurar credenciales
2. Seedear datos de recompensas
3. Crear Context de autenticación
4. Conectar ProgressSection a Firebase
5. Conectar TransparencyDashboard a Firebase
6. Conectar RewardsSection a Firebase
7. Crear componentes de autenticación (Login/Register)
8. Integrar First Data para pagos
9. Crear Admin Panel

Ver `IMPLEMENTATION_ROADMAP.md` para plan detallado completo.
