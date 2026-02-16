#!/bin/bash

# Script para subir el Sistema Contable RD a GitHub
# Uso: ./upload-to-github.sh

echo "🚀 Script de Subida a GitHub - Sistema Contable RD"
echo "=================================================="
echo ""

# Verificar que estamos en el directorio correcto
if [ ! -f "README.md" ]; then
    echo "❌ Error: Ejecuta este script desde el directorio raíz del proyecto"
    exit 1
fi

# Solicitar información del repositorio
echo "Por favor ingresa la información de tu repositorio GitHub:"
echo ""
read -p "Nombre de usuario de GitHub: " GITHUB_USER
read -p "Nombre del repositorio (ej: sistema-contable-rd): " REPO_NAME

# Confirmar
echo ""
echo "📝 Confirma los datos:"
echo "   Usuario: $GITHUB_USER"
echo "   Repositorio: $REPO_NAME"
echo "   URL: https://github.com/$GITHUB_USER/$REPO_NAME"
echo ""
read -p "¿Es correcto? (s/n): " CONFIRM

if [ "$CONFIRM" != "s" ] && [ "$CONFIRM" != "S" ]; then
    echo "❌ Cancelado"
    exit 0
fi

# Inicializar Git si no existe
if [ ! -d ".git" ]; then
    echo ""
    echo "📦 Inicializando repositorio Git..."
    git init
    git branch -M main
fi

# Agregar archivos
echo ""
echo "📁 Agregando archivos..."
git add .

# Commit inicial
echo ""
echo "💾 Creando commit..."
git commit -m "Initial commit: Sistema Contable RD v1.0

- Backend completo con Node.js + Express + TypeScript
- Frontend con React + Vite + Tailwind CSS
- Base de datos PostgreSQL con 30+ tablas
- Autenticación JWT completa
- Sistema de roles y permisos
- Facturación con NCF (DGII RD)
- Módulos: Contabilidad, Inventario, CxC, CxP, Bancos
- Seguridad de nivel empresarial
- Documentación completa"

# Agregar remote
echo ""
echo "🔗 Conectando con GitHub..."
git remote remove origin 2>/dev/null
git remote add origin "https://github.com/$GITHUB_USER/$REPO_NAME.git"

# Push
echo ""
echo "⬆️  Subiendo a GitHub..."
echo ""
echo "NOTA: Se te pedirá tu usuario y token de GitHub"
echo "Si no tienes token, créalo en: https://github.com/settings/tokens"
echo ""

git push -u origin main

# Resultado
if [ $? -eq 0 ]; then
    echo ""
    echo "✅ ¡ÉXITO! Proyecto subido a GitHub"
    echo ""
    echo "🌐 Tu repositorio está disponible en:"
    echo "   https://github.com/$GITHUB_USER/$REPO_NAME"
    echo ""
    echo "📝 Próximos pasos:"
    echo "   1. Ve a tu repositorio en GitHub"
    echo "   2. Agrega una descripción"
    echo "   3. Configura GitHub Pages si deseas (opcional)"
    echo "   4. Invita colaboradores si es necesario"
    echo ""
else
    echo ""
    echo "❌ Error al subir. Verifica:"
    echo "   1. Que el repositorio exista en GitHub"
    echo "   2. Que tengas permisos de escritura"
    echo "   3. Que tu token de GitHub sea válido"
    echo ""
    echo "Para crear el repositorio:"
    echo "   https://github.com/new"
fi
