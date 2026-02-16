# 🚀 Guía Completa: Subir a GitHub en 5 Minutos

## Requisitos Previos

- ✅ Cuenta de GitHub (crear en https://github.com/signup si no tienes)
- ✅ Git instalado en tu computadora
- ✅ Archivos del proyecto descargados

## 📋 Paso a Paso

### 1️⃣ Crear Repositorio en GitHub

1. Ve a https://github.com/new
2. Llena el formulario:
   ```
   Repository name: sistema-contable-rd
   Description: Sistema de contabilidad completo para República Dominicana
   Visibility: Public (o Private si prefieres)
   ⚠️ NO marques: "Add a README file"
   ⚠️ NO marques: "Add .gitignore"
   ⚠️ NO marques: "Choose a license"
   ```
3. Click en **"Create repository"**
4. **IMPORTANTE**: Copia la URL que aparece, será algo como:
   ```
   https://github.com/TU-USUARIO/sistema-contable-rd.git
   ```

### 2️⃣ Crear Token de Acceso Personal (Si no tienes)

GitHub ya no acepta contraseñas para comandos git. Necesitas un token:

1. Ve a https://github.com/settings/tokens
2. Click en **"Generate new token"** → **"Generate new token (classic)"**
3. Configuración:
   ```
   Note: Token para Sistema Contable RD
   Expiration: 90 days (o lo que prefieras)
   Scopes: Marca SOLO "repo" (todas las opciones de repo)
   ```
4. Click en **"Generate token"**
5. **⚠️ COPIA EL TOKEN AHORA** (solo se muestra una vez)
   - Se ve así: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
   - Guárdalo en un lugar seguro

### 3️⃣ Opción A: Usar el Script Automático (Recomendado)

Si descargaste el archivo comprimido:

```bash
# Descomprimir
tar -xzf sistema-contable-rd.tar.gz
cd sistema-contable-rd

# Ejecutar script
./upload-to-github.sh

# El script te pedirá:
# - Nombre de usuario de GitHub: tu-usuario
# - Nombre del repositorio: sistema-contable-rd
# - Confirmar: s

# Cuando te pida credenciales:
# Username: tu-usuario
# Password: [PEGA TU TOKEN AQUÍ, no tu contraseña]
```

### 3️⃣ Opción B: Comandos Manuales

Si prefieres hacerlo manualmente o el script no funciona:

```bash
# 1. Ir al directorio del proyecto
cd sistema-contable-rd

# 2. Inicializar Git
git init
git branch -M main

# 3. Agregar todos los archivos
git add .

# 4. Crear commit inicial
git commit -m "Initial commit: Sistema Contable RD v1.0

- Backend completo con Node.js + Express + TypeScript
- Frontend con React + Vite + Tailwind CSS
- Base de datos PostgreSQL con 30+ tablas
- Autenticación JWT completa
- Sistema de roles y permisos (5 roles)
- Facturación con NCF (DGII República Dominicana)
- Módulos: Contabilidad, Inventario, CxC, CxP, Bancos
- Seguridad de nivel empresarial (10 capas)
- 3 usuarios predefinidos: admin, contador, vendedor
- Documentación completa de seguridad
- Production-ready"

# 5. Conectar con GitHub (reemplaza TU-USUARIO)
git remote add origin https://github.com/TU-USUARIO/sistema-contable-rd.git

# 6. Subir a GitHub
git push -u origin main

# Cuando te pida credenciales:
# Username: tu-usuario
# Password: [PEGA TU TOKEN, no tu contraseña]
```

### 4️⃣ Verificar que Todo Subió Correctamente

1. Ve a tu repositorio: `https://github.com/TU-USUARIO/sistema-contable-rd`
2. Deberías ver:
   ```
   ✅ README.md con la documentación principal
   ✅ Carpetas: backend/, frontend/, docs/
   ✅ 60+ archivos en total
   ✅ Último commit: "Initial commit: Sistema Contable RD v1.0"
   ```

### 5️⃣ Configurar el Repositorio (Opcional pero Recomendado)

1. **Agregar Topics (Etiquetas)**:
   - Haz clic en el ⚙️ (Settings) junto a "About"
   - Agrega topics: `contabilidad`, `dominican-republic`, `accounting`, `react`, `nodejs`, `typescript`, `dgii`, `ncf`
   - Haz clic en "Save changes"

2. **Configurar Descripción**:
   ```
   Sistema de contabilidad completo para República Dominicana con cumplimiento 100% normativas DGII
   ```

3. **Habilitar Issues** (para bugs y features):
   - Ve a Settings → Features → Issues → ✅

4. **Crear README Preview**:
   - GitHub automáticamente mostrará tu README.md en la página principal

### 6️⃣ Clonar en Otra Computadora

Ahora que está en GitHub, cualquiera (o tú en otra PC) puede clonar:

```bash
git clone https://github.com/TU-USUARIO/sistema-contable-rd.git
cd sistema-contable-rd

# Seguir instrucciones de QUICK_START.md
```

## 🎉 ¡Listo! Tu Proyecto Ya Está en GitHub

Tu código está:
- ✅ Versionado con Git
- ✅ Respaldado en la nube
- ✅ Accesible desde cualquier lugar
- ✅ Compartible con colaboradores
- ✅ Con historial completo de cambios

## 📝 Comandos Git Útiles para el Futuro

```bash
# Ver estado de archivos
git status

# Ver historial de commits
git log --oneline

# Crear nueva rama para features
git checkout -b feature/nueva-funcionalidad

# Volver a main
git checkout main

# Actualizar desde GitHub
git pull origin main

# Subir cambios
git add .
git commit -m "Descripción del cambio"
git push origin main

# Ver ramas
git branch

# Clonar en otra PC
git clone https://github.com/TU-USUARIO/sistema-contable-rd.git
```

## 🆘 Solución de Problemas

### Error: "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/TU-USUARIO/sistema-contable-rd.git
```

### Error: "Permission denied"
- Verifica que estés usando el TOKEN, no la contraseña
- El token debe tener permisos de "repo"

### Error: "Repository not found"
- Verifica que el repositorio exista en GitHub
- Verifica que la URL sea correcta
- Si es privado, verifica que tu cuenta tenga acceso

### Error: "Updates were rejected"
```bash
git pull origin main --allow-unrelated-histories
git push origin main
```

### Olvidé mi Token
- Ve a https://github.com/settings/tokens
- Genera uno nuevo
- Guárdalo en un lugar seguro (1Password, LastPass, etc.)

## 💡 Configurar Git (Primera Vez)

Si es la primera vez que usas Git:

```bash
# Configurar nombre
git config --global user.name "Tu Nombre"

# Configurar email (mismo de GitHub)
git config --global user.email "tu-email@ejemplo.com"

# Verificar configuración
git config --list
```

## 🔒 Guardar Credenciales (Opcional)

Para no escribir token cada vez:

```bash
# Guardar credenciales en caché por 1 hora
git config --global credential.helper cache

# O guardar permanentemente (menos seguro)
git config --global credential.helper store
```

## 📚 Recursos Adicionales

- [GitHub Docs](https://docs.github.com/es)
- [Git Book](https://git-scm.com/book/es/v2)
- [GitHub Desktop](https://desktop.github.com/) - GUI para Git
- [GitKraken](https://www.gitkraken.com/) - Otra GUI popular

## 🎓 Próximos Pasos

Una vez en GitHub, puedes:

1. **Configurar GitHub Actions** para CI/CD
2. **Habilitar GitHub Pages** para documentación
3. **Crear Issues** para bugs y features
4. **Invitar colaboradores**
5. **Crear Pull Requests** para cambios
6. **Usar GitHub Projects** para gestión

---

**¡Felicidades! Tu proyecto profesional ya está en GitHub** 🎉

URL de tu repo: `https://github.com/TU-USUARIO/sistema-contable-rd`
