# BOOKSHELF

BOOKSHELF es una aplicación web que permite organizar y administrar una biblioteca personal de libros.

## Objetivo

Facilitar el registro y seguimiento de las lecturas mediante una interfaz sencilla e intuitiva.

## Tecnologías utilizadas

- React
- Vite
- JavaScript
- Firebase Authentication
- Cloud Firestore
- CSS

## Funcionalidades

- Agregar libros.
- Consultar la biblioteca personal.
- Modificar el estado de lectura.
- Eliminar libros.
- Guardar los datos en Firebase.
- Mantener los datos al recargar la página.

## Datos de cada libro

- Título
- Autor
- Género
- Estado de lectura: Pendiente, Leyendo o Finalizado.

## Instalación y ejecución

1. Clonar el repositorio.
2. Instalar las dependencias:

   npm install

3. Crear un archivo `.env` en la raíz del proyecto con las variables de Firebase:

   VITE_FIREBASE_API_KEY=
   VITE_FIREBASE_AUTH_DOMAIN=
   VITE_FIREBASE_PROJECT_ID=
   VITE_FIREBASE_APP_ID=

4. Iniciar la aplicación:

   npm run dev

## Base de datos

La aplicación utiliza Cloud Firestore para almacenar los libros de cada usuario.

Los datos se organizan en:

users/{userId}/books/{bookId}

## Seguridad

Se utilizan reglas de seguridad de Firestore para que cada usuario pueda acceder únicamente a sus propios libros.