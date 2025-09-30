# 📋 ESTRUCTURA DEL PROYECTO - NUESTRAS VOCES

## 🎯 REPOSITORIO PRINCIPAL (PRODUCCIÓN)
- **GitHub**: `jorgeporrasmx/Crowdfunding-Voces-Septiembre`
- **Local**: `/web-app/` 
- **Vercel**: nuestras-voces-production (URL principal)
- **Estado**: ✅ ACTIVO - Solo este para producción

## 📦 REPOSITORIO BACKUP (HISTÓRICO)
- **GitHub**: `jorgeporrasmx/Crowdfunding-Nuestras-Voces`
- **Local**: `/web-app-backup/`
- **Vercel**: nuestras-voces-backup (URL de respaldo)
- **Estado**: 🔒 SOLO LECTURA - Para referencia histórica

---

## 🚫 REGLAS PARA EVITAR CONFLICTOS

### ✅ HACER (DO):
1. **Trabajar SOLO en `/web-app/`** para desarrollo activo
2. **Commits SOLO a `Crowdfunding-Voces-Septiembre`**
3. **Deploy SOLO desde el repo principal**
4. **Usar branches para experimentos** (develop, feature/*)

### ❌ NO HACER (DON'T):
1. **NO editar `/web-app-backup/`** (solo referencia)
2. **NO hacer push a `Crowdfunding-Nuestras-Voces`** 
3. **NO mezclar archivos** entre directorios
4. **NO trabajar en directorio padre**

---

## 🔄 FLUJO DE TRABAJO RECOMENDADO

### Para desarrollo diario:
```bash
cd web-app/
git checkout -b feature/nueva-funcionalidad
# hacer cambios
git add .
git commit -m "feat: descripción"
git push origin feature/nueva-funcionalidad
# crear PR en GitHub
# merge a main
```

### Para deploy:
```bash
cd web-app/
git checkout main
git pull origin main
npm run build
git add .
git commit -m "deploy: versión X.X.X"
git push origin main
# Vercel deploya automáticamente
```

---

## 📞 CONTACTOS DE EMERGENCIA
- **Repo Principal**: github.com/jorgeporrasmx/Crowdfunding-Voces-Septiembre
- **Vercel Dashboard**: vercel.com/dashboard
- **cPanel**: (configurado con .cpanel.yml)

---

## 📅 CREADO: Septiembre 2025
## ✍️ MANTENIDO POR: Jorge Porras + Claude Code