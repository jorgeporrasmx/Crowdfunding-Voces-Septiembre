# 🔧 MEJORES PRÁCTICAS GIT - NUESTRAS VOCES

## ✅ PROBLEMA RESUELTO
Se eliminó un repositorio Git que estaba en el directorio HOME (`/Users/jorgeporras/.git`) 
que causaba que GitHub Desktop intentara trackear 300,000+ archivos.

---

## 📍 UBICACIÓN CORRECTA DEL REPOSITORIO

### ✅ REPOSITORIO CORRECTO (USAR SOLO ESTE):
```
/Users/jorgeporras/Documents/CODIGO/Plataforma de Crowdfunding/nuestras-voces-crowdfunding/web-app/
```

### ❌ NUNCA crear repositorios en:
- `/Users/jorgeporras/` (HOME)
- `/Users/jorgeporras/Documents/` 
- `/Users/jorgeporras/Desktop/`
- Cualquier directorio del sistema

---

## 🎯 CÓMO HACER COMMITS CORRECTAMENTE

### 1️⃣ **DESDE TERMINAL:**
```bash
# SIEMPRE navegar primero al directorio correcto
cd ~/Documents/CODIGO/Plataforma\ de\ Crowdfunding/nuestras-voces-crowdfunding/web-app/

# Verificar que estás en el lugar correcto
pwd  # Debe mostrar: .../web-app

# Hacer commit
git add .
git commit -m "feat: descripción del cambio"
git push origin main
```

### 2️⃣ **DESDE GITHUB DESKTOP:**
1. Abrir GitHub Desktop
2. **Current Repository** debe mostrar: `Crowdfunding-Voces-Septiembre`
3. **NO** debe mostrar miles de archivos
4. Si muestra muchos archivos, NO HACER COMMIT y verificar la ubicación

### 3️⃣ **DESDE VS CODE / CURSOR:**
1. Abrir SOLO la carpeta `/web-app/`
2. Usar el panel de Source Control
3. Verificar que solo muestra archivos del proyecto

---

## ⚠️ SEÑALES DE ALERTA

### 🚨 **Si ves esto, DETENTE:**
- GitHub Desktop muestra más de 100 archivos no relacionados
- Aparecen carpetas como Desktop, Documents, Library
- El commit incluye archivos personales (.ssh, .bash_history, etc.)
- Git status muestra archivos fuera del proyecto

### 🔍 **Cómo verificar que todo está bien:**
```bash
# Ejecutar desde el directorio del proyecto
git status

# Debe mostrar SOLO archivos del proyecto como:
# - src/
# - public/
# - package.json
# - etc.

# NO debe mostrar:
# - Desktop/
# - Documents/
# - Downloads/
# - Archivos del sistema
```

---

## 🛡️ REGLAS DE ORO

1. **UN PROYECTO = UN REPOSITORIO** en su propia carpeta
2. **NUNCA** hacer `git init` en directorios de sistema
3. **SIEMPRE** verificar la ubicación antes de commits
4. **USAR** el repositorio `Crowdfunding-Voces-Septiembre` para este proyecto
5. **IGNORAR** el repositorio backup `Crowdfunding-Nuestras-Voces`

---

## 🆘 SI ALGO SALE MAL

### Si accidentalmente creas un repo en el lugar equivocado:
```bash
# 1. NO hacer commit
# 2. Eliminar el .git del lugar incorrecto
rm -rf .git

# 3. Verificar que se eliminó
git status  # Debe decir "not a git repository"
```

### Si GitHub Desktop muestra miles de archivos:
1. Cerrar GitHub Desktop
2. Verificar ubicación del repositorio
3. Remover el repositorio problemático
4. Agregar solo `/web-app/` como repositorio

---

## 📝 RESUMEN RÁPIDO

✅ **BIEN:**
```bash
cd ~/Documents/CODIGO/.../web-app/
git add .
git commit -m "mensaje"
git push
```

❌ **MAL:**
```bash
cd ~  # HOME
git init  # NUNCA en HOME
git add .  # Agregaría TODO tu sistema
```

---

**Fecha de creación:** Septiembre 2025
**Problema resuelto:** Repositorio Git en HOME trackea 300,000+ archivos
**Solución aplicada:** Eliminado `.git` del HOME, usando solo `/web-app/`