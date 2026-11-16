import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "./config";

// Obtener la colección de libros de un usuario
const obtenerColeccion = (userId) =>
  collection(db, "users", userId, "books");

// Agregar un libro
export const agregarLibro = async (userId, libro) => {
  return await addDoc(obtenerColeccion(userId), {
    ...libro,
    fechaCreacion: serverTimestamp(),
  });
};

// Obtener todos los libros
export const obtenerLibros = async (userId) => {
  const consulta = await getDocs(obtenerColeccion(userId));

  return consulta.docs.map((documento) => ({
    id: documento.id,
    ...documento.data(),
  }));
};

// Actualizar un libro
export const actualizarLibro = async (userId, bookId, datos) => {
  const referencia = doc(db, "users", userId, "books", bookId);
  return await updateDoc(referencia, datos);
};

// Eliminar un libro
export const eliminarLibro = async (userId, bookId) => {
  const referencia = doc(db, "users", userId, "books", bookId);
  return await deleteDoc(referencia);
};
