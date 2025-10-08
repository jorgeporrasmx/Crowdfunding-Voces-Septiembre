# 🚀 WORKFLOW - NUESTRAS VOCES CROWDFUNDING

## 📍 UBICACIONES IMPORTANTES

### 🎯 PRODUCCIÓN (USAR SOLO ESTE)
```bash
📁 Local: /web-app/ (ESTE DIRECTORIO)
🐙 GitHub: jorgeporrasmx/Crowdfunding-Voces-Septiembre  
☁️ Vercel: nuestras-voces-production
🌐 cPanel: Configurado con .cpanel.yml
```

### 📦 BACKUP (NO TOCAR)
```bash  
📁 Local: /web-app-backup/ (SOLO REFERENCIA)
🐙 GitHub: jorgeporrasmx/Crowdfunding-Nuestras-Voces (HISTÓRICO)
☁️ Vercel: nuestras-voces-backup (PAUSADO)
```

---

## ✅ COMANDOS SEGUROS PARA DESARROLLO

### 🔧 Desarrollo diario:
```bash
# SIEMPRE trabajar desde web-app/
cd web-app/

# Crear nueva feature
git checkout -b feature/nombre-funcionalidad
git add .
git commit -m "feat: descripción clara"
git push origin feature/nombre-funcionalidad

# Crear PR en GitHub, NO hacer push directo a main
```

### 🚢 Deploy a producción:
```bash
# Solo después de merge de PR
git checkout main
git pull origin main
npm run build
git add .
git commit -m "deploy: v1.X.X - descripción"
git push origin main
# Vercel deploya automáticamente
```

---

## ❌ COMANDOS PROHIBIDOS

```bash
# ❌ NUNCA hacer esto:
cd web-app-backup/  # NO TOCAR
git push origin main  # Sin PR primero  
rm -rf node_modules/  # Sin backup
git reset --hard HEAD~10  # Pérdida de historial
```

---

## 🔄 BRANCHES ESTRUCTURA

- **`main`** → Producción (protegida)
- **`develop`** → Integración y testing
- **`feature/*`** → Nuevas funcionalidades
- **`hotfix/*`** → Arreglos urgentes
- **`release/*`** → Preparación de releases

---

## 🚨 EN CASO DE EMERGENCIA

### Si algo se rompe:
1. **Vercel**: Usar instant rollback ✅ (Ya lo usaste)
2. **Local**: `git checkout main && git pull`
3. **GitHub**: Crear hotfix branch
4. **cPanel**: Los archivos se actualizan automáticamente

### Si hay conflicto entre repos:
1. **USAR SOLO**: `Crowdfunding-Voces-Septiembre`
2. **IGNORAR**: `Crowdfunding-Nuestras-Voces`  
3. **CONSULTAR**: Este documento

---

## 📞 CONTACTOS ÚTILES
- **GitHub Repo**: https://github.com/jorgeporrasmx/Crowdfunding-Voces-Septiembre
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Documentación**: /PROYECTO-STRUCTURE.md

**⚡ Última actualización: Sept 2025**