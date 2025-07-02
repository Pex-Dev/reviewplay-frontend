# 🎮 ReviewPlay

- [Español](#Español)

- [English](#english)

## Español

---

**ReviewPlay** es una aplicación web de reseñas de videojuegos desarrollada con **Laravel (Sanctum)** en el backend y **React** (SPA con React Router DOM) en el frontend. Su objetivo es ofrecer una plataforma moderna y funcional donde los usuarios puedan descubrir, reseñar y seguir juegos y personas con intereses similares.

## 🚀 Características principales

- 🔐 Registro de usuarios con **verificación por email**
- 🕹️ Búsqueda de videojuegos con **filtros dinámicos**
- ⭐ Calificaciones de juegos del **1 al 10**
- 📌 Guardar juegos como **favoritos**
- 🔔 **Notificaciones internas** dentro de la app
- 👥 Posibilidad de **seguir a otros usuarios** y también a juegos
- 🧑‍💼 Personalización del perfil con **biografía** e **imagen recortable**
- 🔍 Búsqueda de usuarios por nombre
- 🧠 Optimización de peticiones: los juegos se almacenan localmente solo si el usuario interactúa con ellos (reseña, seguimiento o favorito)

## 🧱 Tecnologías utilizadas

- **Frontend:** React, Tailwind CSS, React Router DOM
- **Backend:** Laravel 11, Sanctum, Laravel API Resources
- **Autenticación:** API Token con Sanctum
- **Base de datos:** MySQL
- **Otros:** React Cropper (para imágenes), Axios, React Mmodal, React Slick, Sweetalert2 React, RAWG (para los juegos)

## 📸 Capturas

| ![Imagen 1](/screenshots/1.png) | ![Imagen 2](/screenshots/2.png) |
| :-----------------------------: | :-----------------------------: |
| ![Imagen 1](/screenshots/3.png) | ![Imagen 2](/screenshots/4.png) |

## 📎 Enlaces

- [Sitio en vivo](https://reviewplay.brayandev.com/)
- [Repositorio Backend](https://github.com/Pex-Dev/reviewplay)
- [Repositorio Frontend](https://github.com/Pex-Dev/reviewplay-frontend)

## 🚀 Cómo ejecutar este proyecto localmente

Este proyecto tiene un frontend en React y un backend en Laravel, conectados mediante API con autenticación usando Laravel Sanctum.

📦 Requisitos

- Node.js

- npm (Viene con Node)

## 🔧Instalación

**Clonar el repositorio:**

```bash
git clone https://github.com/Pex-Dev/reviewplay.git
cd reviewplay
```

**Copiar archivo env**

```bash
cp .env.example .env.local
```

**Instalar dependencias**

```bash
npm install
```

**Iniciar servidor de desarrollo**

```bash
npm run dev
```

## English

---

**ReviewPlay** is a video game review web application built as a **Single Page Application (SPA)** using **React** with **React Router DOM**.  
It connects to a Laravel backend via API and allows users to explore, review, and follow games and users with shared interests.

## 🚀 Main Features

- 🔐 User registration with **email verification**
- 🕹️ Game search with **dynamic filters**
- ⭐ Rate games from **1 to 10**
- 📌 Save games as **favorites**
- 🔔 **In-app notifications**
- 👥 Follow other users and games
- 🧑‍💼 Customize profile with **bio** and **croppable profile picture**
- 🔍 Search for users by name
- 🧠 Optimized API requests: games are saved locally only when a user interacts with them

## 🧱 Technologies Used

- **Frontend:** React, Tailwind CSS, React Router DOM
- **Backend (API):** Laravel 11, Sanctum, API Resources
- **Authentication:** API Token with Sanctum
- **Others:** React Cropper, Axios, React Modal, React Slick, SweetAlert2 React, RAWG (game API)

## 📸 Screenshots

| ![Image 1](/screenshots/1.png) | ![Image 2](/screenshots/2.png) |
| :----------------------------: | :----------------------------: |
| ![Image 3](/screenshots/3.png) | ![Image 4](/screenshots/4.png) |

## 📎 Links

- [Live Site](https://reviewplay.brayandev.com/)
- [Backend Repository](https://github.com/Pex-Dev/reviewplay)
- [Frontend Repository](https://github.com/Pex-Dev/reviewplay-frontend)

## 🚀 How to run this project locally

This is the **frontend** of ReviewPlay, built with React.  
It connects to a Laravel backend and authenticates using Laravel Sanctum.

📦 Requirements

- Node.js
- npm (comes with Node)

## 🔧 Installation

**Clone the repository:**

````bash
git clone https://github.com/Pex-Dev/reviewplay-frontend.git
cd reviewplay-frontend

**Copy the environment file:**

```bash
cp .env.example .env.local
````

**Install dependencies:**

```bash
npm install
```

**Start the development server:**

```bash
npm run dev
```
