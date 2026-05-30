# Generador de Tickets — Documentación Técnica

> Proyecto Final · Ingeniería de Software · 6° Semestre
> Instituto Tecnológico de Celaya — Tecnológico Nacional de México

Aplicación web para generar tickets digitales de una conferencia de desarrollo de software. Incluye sistema de autenticación, panel de administrador con CRUD completo, descarga de tickets en imagen y un módulo informativo sobre la sede y el evento.

---

## Tabla de contenidos

1. [Descripción general](#1-descripción-general)
2. [Tecnologías utilizadas](#2-tecnologías-utilizadas)
3. [Arquitectura del proyecto](#3-arquitectura-del-proyecto)
4. [Estructura de carpetas](#4-estructura-de-carpetas)
5. [Base de datos](#5-base-de-datos)
6. [API — Endpoints del backend](#6-api--endpoints-del-backend)
7. [Funcionalidades principales](#7-funcionalidades-principales)
8. [Flujo de la aplicación](#8-flujo-de-la-aplicación)
9. [Manejo de estado en el frontend](#9-manejo-de-estado-en-el-frontend)
10. [Cómo ejecutar el proyecto](#10-cómo-ejecutar-el-proyecto)
11. [Usuarios de prueba](#11-usuarios-de-prueba)
12. [Equipo de desarrollo](#12-equipo-de-desarrollo)

---

## 1. Descripción general

El **Generador de Tickets** es una aplicación full-stack que permite a los asistentes de la conferencia *Coding Conf 2026* registrarse, generar un ticket digital personalizado, descargarlo como imagen y consultar toda la información del evento (horario, actividades, sede).

Tiene dos perfiles claramente diferenciados:

- **Usuario regular**: se registra, genera tickets, los descarga, consulta su cuenta y la información de la conferencia.
- **Administrador**: tiene un panel completo con estadísticas en vivo y operaciones CRUD sobre usuarios y tickets.

---

## 2. Tecnologías utilizadas

### Frontend

| Tecnología | Versión | Propósito |
|---|---|---|
| **React** | 19 | Librería principal para construir la interfaz |
| **TypeScript** | 5.9 | Tipado estático para todo el código de la UI |
| **Vite** | 8 | Bundler y servidor de desarrollo con hot-reload |
| **Tailwind CSS** | 4 | Estilos utilitarios para todo el diseño |
| **Zustand** | 5 | Manejo de estado global ligero (auth, usuario, vista) |
| **React Hook Form** | 7 | Gestión y validación de formularios |
| **html2canvas** | 1.4 | Conversión del ticket a imagen PNG descargable |

### Backend

| Tecnología | Versión | Propósito |
|---|---|---|
| **Node.js** | — | Runtime de JavaScript del lado servidor |
| **Express** | 5 | Framework web para construir la API REST |
| **Sequelize** | 6 | ORM para mapear modelos a tablas PostgreSQL |
| **PostgreSQL** | 18 | Sistema de base de datos relacional |
| **Morgan** | 1.10 | Middleware de logging de peticiones HTTP |
| **CORS** | 2.8 | Permitir peticiones cross-origin frontend ↔ backend |
| **dotenv** | 17 | Carga de variables de entorno desde archivo `.env` |
| **pg / pg-hstore** | 8 / 2.3 | Drivers de PostgreSQL para Sequelize |

### Herramientas adicionales

- **Git / GitHub**: control de versiones
- **npm**: gestor de paquetes para frontend y backend
- **ESLint**: linter de código para mantener consistencia

---

## 3. Arquitectura del proyecto

```
┌─────────────────┐       HTTP/JSON        ┌──────────────────┐       SQL        ┌──────────────┐
│                 │ ────────────────────►  │                  │ ──────────────►  │              │
│  React Frontend │                        │  Express API     │                  │  PostgreSQL  │
│  (Vite, 5173)   │ ◄────────────────────  │  (Node, 3000)    │ ◄──────────────  │   Database   │
│                 │                        │                  │                  │              │
└─────────────────┘                        └──────────────────┘                  └──────────────┘
       │                                            │
       │ Zustand (estado)                           │ Sequelize (ORM)
       │ React Hook Form (forms)                    │ Morgan (logs)
       │ html2canvas (descarga)                     │ CORS (seguridad)
```

**Separación clara de responsabilidades:**

- El **frontend** se encarga únicamente de la presentación y la interacción.
- El **backend** expone endpoints REST con la lógica de negocio.
- La **base de datos** persiste usuarios y tickets.

---

## 4. Estructura de carpetas

```
GeneradorTickets/
├── backend/
│   ├── models/
│   │   ├── usuario.js          # Modelo Sequelize de Usuario
│   │   └── ticket.js           # Modelo Sequelize de Ticket
│   ├── routes/
│   │   ├── usuarios.routes.js  # Endpoints públicos de usuarios
│   │   ├── tickets.routes.js   # Endpoints públicos de tickets
│   │   └── admin.routes.js     # Endpoints exclusivos del admin
│   ├── db.js                   # Configuración de Sequelize
│   ├── server.js               # Punto de entrada del backend
│   ├── .env                    # Variables de entorno (BD)
│   └── package.json
│
├── public/
│   └── assets/
│       └── images/             # Logos, fondos, imagen del Tec
│
├── src/
│   ├── components/
│   │   ├── admin-page/         # Panel del administrador
│   │   │   ├── admin-page.tsx
│   │   │   ├── stat-card.tsx
│   │   │   ├── tickets-table.tsx
│   │   │   ├── users-table.tsx
│   │   │   ├── user-form.tsx
│   │   │   ├── modal.tsx
│   │   │   └── icons.tsx
│   │   ├── login-page/         # Login + Registro
│   │   │   ├── login-page.tsx
│   │   │   ├── login-form.tsx
│   │   │   └── register-form.tsx
│   │   ├── conference-page/    # Información de la conferencia
│   │   ├── venue-page/         # Información de la sede
│   │   ├── account-page/       # Perfil + tickets del usuario
│   │   ├── ticket-form-page/   # Formulario de generación
│   │   ├── confirmation-page/  # Pantalla con ticket + descarga
│   │   ├── user-nav/           # Navegación tabs del usuario
│   │   ├── layouts/            # Layout principal
│   │   └── icons/              # Iconos SVG reutilizables
│   ├── store/
│   │   ├── auth.ts             # Estado de autenticación
│   │   ├── user.ts             # Datos del usuario actual
│   │   └── user-view.ts        # Vista activa (home/conf/sede/cuenta)
│   ├── contexts/
│   │   ├── show-ticket.ts
│   │   └── show-ticket-provider.tsx
│   ├── hooks/
│   │   └── use-show-ticket.ts
│   ├── data/
│   │   └── conference.ts       # Datos estáticos (horario, sede)
│   ├── App.tsx                 # Enrutamiento principal
│   └── main.tsx                # Punto de entrada de React
│
├── package.json                # Dependencias frontend
├── vite.config.ts              # Configuración de Vite
├── tsconfig.json               # Configuración TypeScript
└── documentacion.md            # Este archivo
```

---

## 5. Base de datos

La base de datos `generador_tickets` está en PostgreSQL y tiene dos tablas:

### Tabla `users`

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | SERIAL PK | Identificador único |
| `name` | VARCHAR | Nombre completo |
| `email` | VARCHAR UNIQUE | Correo electrónico (login) |
| `github` | VARCHAR | Usuario de GitHub |
| `avatar_url` | TEXT | URL del avatar (opcional) |
| `password` | VARCHAR | Contraseña |
| `role` | VARCHAR | `'user'` o `'admin'` |
| `date` | TIMESTAMP | Fecha de registro |

### Tabla `tickets`

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | SERIAL PK | Identificador único |
| `num_ticket` | INTEGER UNIQUE | Número visible del ticket (10000-99999) |
| `user_id` | INTEGER FK | Referencia a `users.id` |
| `date` | TIMESTAMP | Fecha de emisión |

**Relación:** `Usuario hasMany Tickets` · `Ticket belongsTo Usuario`

### Sincronización automática

Al iniciar el servidor, Sequelize ejecuta `sync({ alter: true })`, que crea o ajusta las tablas según los modelos definidos. Si no existe el usuario administrador (`admin@test.com`), lo crea automáticamente.

---

## 6. API — Endpoints del backend

Base URL: `http://localhost:3000`

### Autenticación

| Método | Ruta | Descripción |
|---|---|---|
| `POST` | `/api/login` | Inicia sesión con email + password. Devuelve datos del usuario (incluyendo `role`). |
| `POST` | `/api/register` | Registra un usuario nuevo + crea un ticket. |

### Usuarios

| Método | Ruta | Descripción |
|---|---|---|
| `GET`  | `/api/usuarios` | Lista todos los usuarios. |
| `POST` | `/api/usuarios` | Crea un usuario. |
| `GET`  | `/api/usuarios/:id/tickets` | Devuelve un usuario + todos sus tickets. |
| `DELETE` | `/api/usuarios/:id` | Elimina un usuario. |

### Tickets

| Método | Ruta | Descripción |
|---|---|---|
| `GET`  | `/api/tickets` | Lista todos los tickets. |
| `POST` | `/api/tickets` | Crea un ticket para un `user_id`. |
| `DELETE` | `/api/tickets/:id` | Elimina un ticket. |

### Administrador

| Método | Ruta | Descripción |
|---|---|---|
| `GET`  | `/api/admin/stats` | Totales: usuarios, tickets, tickets de hoy, último registro. |
| `GET`  | `/api/admin/tickets` | Tickets con información de usuario embebida. |
| `GET`  | `/api/admin/usuarios` | Todos los usuarios sin contraseña. |
| `POST` | `/api/admin/usuarios` | Crear usuario desde admin. |
| `PUT`  | `/api/admin/usuarios/:id` | Editar usuario. |
| `DELETE` | `/api/admin/usuarios/:id` | Eliminar usuario + tickets en cascada. |
| `POST` | `/api/admin/tickets` | Crear ticket asignado a un usuario. |
| `PUT`  | `/api/admin/tickets/:id` | Reasignar ticket a otro usuario. |
| `DELETE` | `/api/admin/tickets/:id` | Eliminar ticket. |

---

## 7. Funcionalidades principales

### A. Sistema de autenticación

- **Login** y **registro** con validación de campos (React Hook Form).
- Comprobación de correos duplicados.
- Diferenciación por rol (`user` / `admin`) controlada en el backend.
- **Cerrar sesión** desde cualquier vista (botón en la barra superior).
- Al recargar la página, la sesión se cierra (no hay persistencia).

### B. Generación de tickets (usuario regular)

- Formulario con: nombre completo, correo, usuario de GitHub.
- Subida de imagen para el avatar (con preview en tiempo real).
- Validación inline de campos obligatorios y formato de correo.
- Al enviar, se genera un **ticket visual** con los datos.

### C. Descarga del ticket

- Botón **Descargar ticket** que usa `html2canvas` para convertir el elemento DOM a una imagen PNG.
- El archivo se descarga con el nombre `ticket_<nombre>.png`.
- Disponible tanto en la pantalla de confirmación como en la sección *Mi cuenta*.

### D. Vista informativa (4 pestañas para el usuario)

| Pestaña | Contenido |
|---|---|
| **Inicio** | Formulario para generar el ticket o pantalla de confirmación. |
| **Conferencia** | Nombre, fecha (hoy), ciudad, 4 actividades destacadas y horario completo del evento con tipos diferenciados (keynote, workshop, panel, descanso). |
| **Sede** | Información completa del Instituto Tecnológico de Celaya: foto, descripción, dirección, contacto y mapa de Google Maps embebido. |
| **Mi cuenta** | Perfil del usuario (nombre, email, GitHub, fecha de registro, tickets generados) y lista de **todos los tickets** generados por ese usuario, cada uno descargable. |

### E. Panel de administrador

#### Dashboard de estadísticas
4 tarjetas KPI con iconos SVG vectoriales que se actualizan automáticamente cada 10 segundos:
- Total de usuarios
- Total de tickets
- Tickets de hoy
- Último usuario registrado

#### CRUD de Usuarios
- **Crear** usuarios (con rol asignado).
- **Editar** datos (nombre, correo, GitHub, contraseña, rol).
- **Eliminar** un usuario y todos sus tickets en cascada.
- **Buscar** por nombre, correo o GitHub.

#### CRUD de Tickets
- **Crear** un ticket asignándolo a cualquier usuario (número generado automáticamente).
- **Reasignar** un ticket a otro usuario.
- **Eliminar** un ticket.
- **Buscar** por número de ticket, usuario o correo.

#### Logging del servidor
Morgan registra en consola todas las peticiones HTTP en formato `dev`:
```
POST /api/login 200 12.345 ms - 87
GET /api/admin/stats 200 5.210 ms - 145
```

---

## 8. Flujo de la aplicación

### Flujo del usuario regular

```
1. Entrar a la app
   ↓
2. LoginPage (no autenticado)
   ↓
3. Iniciar sesión o registrarse
   ↓
4. UserNav aparece arriba (4 pestañas)
   ↓
5. Inicio → llenar formulario → generar ticket
   ↓
6. ConfirmationPage con ticket + botón Descargar
   ↓
7. Puede navegar libremente entre tabs
   ↓
8. Cerrar sesión → vuelve al LoginPage
```

### Flujo del administrador

```
1. Iniciar sesión con admin@test.com / 123
   ↓
2. AdminPage de pantalla completa
   ↓
3. Ver KPIs (auto-refresh cada 10s)
   ↓
4. Tabs: Tickets / Usuarios
   ↓
5. Crear / Editar / Eliminar / Buscar
   ↓
6. Cerrar sesión → vuelve al LoginPage
```

---

## 9. Manejo de estado en el frontend

El estado global se maneja con **Zustand**, dividido en 3 stores:

### `store/auth.ts`
```ts
{
  isAuthenticated: boolean,
  userId: number | null,
  userName: string,
  userEmail: string,
  role: 'user' | 'admin' | null,
  setAuthenticated(...),
  logout()  // limpia este store + user + user-view
}
```

### `store/user.ts`
```ts
{
  fullName, email, githubUser, url,  // datos del formulario
  setUser(...),
  reset()
}
```

### `store/user-view.ts`
```ts
{
  view: 'home' | 'conference' | 'venue' | 'account',
  setView(view)
}
```

### Context `ShowTicket`
Controla si en la pestaña "Inicio" se muestra el formulario o el ticket generado.

**El `logout()` resetea los 3 stores y el contexto** para garantizar que al volver a iniciar sesión todo arranca limpio.

---

## 10. Cómo ejecutar el proyecto

### Requisitos

- Node.js 20 o superior
- PostgreSQL 18 corriendo localmente
- Base de datos `generador_tickets` creada

### 1) Crear la base de datos

```bash
createdb generador_tickets
```

### 2) Configurar `backend/.env`

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=tu_usuario_postgres
DB_PASSWORD=tu_password
DB_NAME=generador_tickets
```

### 3) Instalar dependencias

```bash
# Backend
cd backend
npm install

# Frontend (en otra terminal, desde la raíz)
cd ..
npm install
```

### 4) Iniciar el backend

```bash
cd backend
node server.js
```

Salida esperada:
```
Conectado a PostgreSQL con Sequelize
Tablas sincronizadas
Usuario admin creado: admin@test.com / 123
Servidor en http://localhost:3000
```

### 5) Iniciar el frontend

```bash
npm run dev
```

Abrir el navegador en `http://localhost:5173`.

---

## 11. Usuarios de prueba

Todas las contraseñas son **`123`**.

| Rol | Email |
|---|---|
| **Admin** | `admin@test.com` |
| Usuario | `test@test.com` |
| Usuario | `sofia.ramirez@test.com` |
| Usuario | `diego.h@test.com` |
| Usuario | `valen.lopez@test.com` |
| Usuario | `mateo.g@test.com` |
| Usuario | `camila.t@test.com` |
| Usuario | `sebas.cruz@test.com` |
| Usuario | `renata.v@test.com` |
| Usuario | `joaquin.r@test.com` |
| Usuario | `isa.mendoza@test.com` |
| Usuario | `andres.p@test.com` |

---

## 12. Equipo de desarrollo

| Integrante | Aportación principal |
|---|---|
| **Emilio Zúñiga** | Estructura inicial del proyecto, configuración de Tailwind CSS, layout principal, componentes base del formulario (hero, input, botón, upload). |
| **Victor** | Validación del formulario con React Hook Form, página de confirmación completa (mensaje de éxito + ticket visual). |
| **DoroteoScientist** | Estado global con Zustand, Context y hook personalizado para navegación, preview de imagen en el upload. |
| **CodinGitHub** | Apoyo en la integración del estado global, navegación y revisión de la estructura de componentes. |
| **Mariana Arriaga Vázquez** | Backend completo: Express, conexión PostgreSQL con Sequelize, modelos Usuario y Ticket, endpoints iniciales de la API. |
| **Marianne** | Sistema de autenticación (login + registro), integración de Morgan, panel de administrador con CRUD completo, KPIs con iconos vectoriales, página de conferencia, página de sede con foto del Tec de Celaya, página de cuenta del usuario, descarga del ticket con html2canvas. |

---

## Anexo: información del evento

**Coding Conf 2026**
- 📅 Fecha: día de hoy (dinámica)
- 📍 Sede: Instituto Tecnológico de Celaya — Tecnológico Nacional de México
- 🏛️ Dirección: Av. Tecnológico y A. García Cubas S/N, Col. Alfredo V. Bonfil, Celaya, Gto.
- 🌐 Web: https://www.celaya.tecnm.mx

**Programa:**
- Keynotes con líderes de la industria
- Workshops prácticos (React 19, Node.js + PostgreSQL)
- Paneles sobre IA en el desarrollo de software
- Comidas, networking y entrega de reconocimientos
