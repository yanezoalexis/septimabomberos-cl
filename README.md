# 🚒 BomberOS - Portal de Administración 7ma Compañía de Bomberos Viña del Mar

<div align="center">

![Static Badge](https://img.shields.io/badge/7ma%20C%C3%ADa-Bomberos%20Vi%C3%B1a%20del%20Mar-%23C41E3A?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-7-green?style=flat-square&logo=prisma)
![Vercel](https://img.shields.io/badge/Vercel-Deploy-black?style=flat-square&logo=vercel)

**Lema:** *Abnegación, Servicio y Disciplina*  
**Dirección:** Logroño 1298, Viña del Mar, Chile

</div>

---

## 📋 Descripción

Portal de administración web premium para la gestión integral de la Séptima Compañía de Bomberos de Viña del Mar. Incluye módulos de inventario, asistencia, bitácora, calendario, vehículos y reportes.

## ✨ Características

### Módulos del Sistema

| Módulo | Descripción |
|--------|-------------|
| 📊 **Dashboard** | Métricas generales, gráficos de asistencia y estadísticas |
| 📦 **Inventario** | CRUD completo de materiales y equipos |
| 🔧 **Material Menor** | Gestión de herramientas menores y asignaciones |
| ✅ **Asistencia** | Control de asistencia con estadísticas |
| 📖 **Bitácora** | Registro de salidas de emergencia y prácticas |
| 📅 **Calendario** | Eventos, capacitaciones y reuniones |
| 🚒 **Vehículos** | Estado y mantenimiento de unidades |
| 📈 **Reportes** | Análisis y exportación de datos (PDF/Excel) |
| 👥 **Usuarios** | Gestión de administradores y bomberos |

### Funcionalidades

- 🔐 **Autenticación segura** con NextAuth.js
- 🎨 **Diseño premium** dark mode con paleta bomberil
- 📱 **Responsive** optimizado para móvil, tablet y desktop
- 📊 **Gráficos interactivos** con Recharts
- 📥 **Exportación** a PDF y Excel
- 🔄 **Tiempo real** con Server Actions

## 🛠️ Stack Tecnológico

```
Frontend:    Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4
UI:          shadcn/ui components
Backend:     Next.js API Routes, Server Actions
Base Datos:  PostgreSQL (Vercel Postgres)
ORM:         Prisma 7
Auth:        NextAuth.js v5 (Beta)
Gráficos:   Recharts
Validación:  Zod
Estado:      Zustand
Exportación: @react-pdf/renderer, xlsx
```

## 🚀 Instalación Local

### Prerrequisitos

- Node.js 18+
- PostgreSQL (o cuenta de Vercel Postgres)
- Git

### Pasos

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/septimabomberos-cl.git
cd septimabomberos-cl
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env
```

Edita `.env` con tus credenciales:
```env
DATABASE_URL="postgresql://usuario:password@host:5432/bomberos7ma?sslmode=require"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="tu-secret-generado-con-openssl"
```

4. **Generar Cliente Prisma**
```bash
npx prisma generate
```

5. **Ejecutar migraciones**
```bash
npx prisma migrate dev --name init
```

6. **Iniciar servidor de desarrollo**
```bash
npm run dev
```

7. **Abrir en navegador**
```
http://localhost:3000/admin
```

### Credenciales de Prueba

Después de ejecutar las migraciones, crea un usuario admin:

```bash
npx prisma studio
```

O usa el endpoint de registro desde la interfaz.

## 🌐 Deploy en Vercel

### 1. Conectar con GitHub

1. Ve a [vercel.com](https://vercel.com)
2. Importa el repositorio desde GitHub
3. Selecciona el proyecto

### 2. Configurar Variables de Entorno

En Vercel Dashboard, ve a **Settings > Environment Variables**:

```env
DATABASE_URL=postgresql://... (tu Vercel Postgres)
NEXTAUTH_URL=https://tu-proyecto.vercel.app
NEXTAUTH_SECRET=generado-con-openssl
```

### 3. Crear Base de Datos

1. Ve a **Storage > Create Database**
2. Selecciona **Postgres**
3. Copia la URL de conexión a `DATABASE_URL`

### 4. Deploy

```bash
git push origin main
```

Vercel automáticamente detectará Next.js y deployará.

## 📁 Estructura del Proyecto

```
septimabomberos-cl/
├── src/
│   ├── app/
│   │   ├── (admin)/           # Rutas protegidas del dashboard
│   │   │   ├── inventario/
│   │   │   ├── material-menor/
│   │   │   ├── asistencia/
│   │   │   ├── bitacora/
│   │   │   ├── calendario/
│   │   │   ├── vehiculos/
│   │   │   ├── reportes/
│   │   │   └── usuarios/
│   │   ├── (auth)/            # Rutas de autenticación
│   │   │   └── login/
│   │   └── api/
│   │       └── auth/          # API de NextAuth
│   ├── actions/               # Server Actions
│   ├── components/
│   │   └── admin/             # Componentes del dashboard
│   └── lib/                   # Utilidades y configuración
├── prisma/
│   └── schema.prisma          # Schema de la base de datos
└── public/                    # Archivos estáticos
```

## 🔐 Roles y Permisos

| Permiso | Admin | Bombero |
|---------|:-----:|:-------:|
| Dashboard completo | ✅ | ✅ |
| CRUD Inventario | ✅ | ❌ |
| CRUD Usuarios | ✅ | ❌ |
| Registrar Asistencia | ✅ | ✅ |
| CRUD Bitácora | ✅ | ❌ |
| Ver Reportes | ✅ | ❌ |

## 🎨 Paleta de Colores

| Color | Hex | Uso |
|-------|-----|-----|
| Rojo Bomberil | `#C41E3A` | Primario, acciones |
| Rojo Oscuro | `#8B0000` | Acentos |
| Negro | `#0F0F0F` | Fondos dark |
| Dorado | `#D4AF37` | Highlights, admin |
| Blanco | `#FFFFFF` | Textos claros |

## 📝 Licencia

Este proyecto es propiedad de la Séptima Compañía de Bomberos de Viña del Mar.

---

<div align="center">

**7ma Compañía de Bomberos de Viña del Mar**

*Abnegación, Servicio y Disciplina*

Logroño 1298, Viña del Mar, Chile

</div>
