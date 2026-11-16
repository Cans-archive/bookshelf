import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "./firebase/config";
import { iniciarSesionAnonima } from "./firebase/auth";

import {
  agregarLibro,
  obtenerLibros,
  actualizarLibro,
  eliminarLibro,
} from "./firebase/books";

import BookForm from "./components/BookForm";
import BookList from "./components/BookList";

import "./App.css";

function App() {
  const [usuario, setUsuario] = useState(null);
  const [libros, setLibros] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  // Controlar la autenticación
  useEffect(() => {
    const cancelarObservacion = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUsuario(user);
      } else {
        try {
          await iniciarSesionAnonima();
        } catch (error) {
          console.error(error);
          setError("No se pudo iniciar sesión.");
          setCargando(false);
        }
      }
    });

    return () => cancelarObservacion();
  }, []);

  // Cargar los libros de Firebase
  useEffect(() => {
    if (!usuario) return;

    const cargarLibros = async () => {
      try {
        setCargando(true);
        const datos = await obtenerLibros(usuario.uid);
        setLibros(datos);
        setError("");
      } catch (error) {
        console.error(error);
        setError("No se pudieron cargar los libros.");
      } finally {
        setCargando(false);
      }
    };

    cargarLibros();
  }, [usuario]);

  // Agregar un libro
  const manejarAgregarLibro = async (nuevoLibro) => {
    try {
      await agregarLibro(usuario.uid, nuevoLibro);
      const datos = await obtenerLibros(usuario.uid);
      setLibros(datos);
      setMensaje("¡Libro agregado correctamente!");
      setError("");
    } catch (error) {
      console.error(error);
      setError("No se pudo guardar el libro.");
      setMensaje("");
    }
  };

  // Eliminar un libro
  const manejarEliminarLibro = async (id) => {
    try {
      await eliminarLibro(usuario.uid, id);
      const datos = await obtenerLibros(usuario.uid);
      setLibros(datos);
      setMensaje("Libro eliminado correctamente.");
      setError("");
    } catch (error) {
      console.error(error);
      setError("No se pudo eliminar el libro.");
      setMensaje("");
    }
  };

  // Cambiar el estado de lectura
  const manejarCambiarEstado = async (id, nuevoEstado) => {
    try {
      await actualizarLibro(usuario.uid, id, {
        estado: nuevoEstado,
      });

      const datos = await obtenerLibros(usuario.uid);
      setLibros(datos);
      setMensaje("Estado actualizado correctamente.");
      setError("");
    } catch (error) {
      console.error(error);
      setError("No se pudo actualizar el estado.");
      setMensaje("");
    }
  };

  if (cargando) {
    return <p>Cargando tu biblioteca...</p>;
  }

  if (error && !usuario) {
    return <p>{error}</p>;
  }

  return (
    <main className="app">
      <header className="header">
        <h1>BOOKSHELF</h1>
        <p>Tu biblioteca personal</p>
      </header>

      <section className="welcome">
        <h2>Un espacio para tus historias.</h2>
        <p>Organizá tus lecturas y llevá el registro de cada libro.</p>
      </section>

      {error && <p className="error-message">{error}</p>}
      {mensaje && <p className="success-message">{mensaje}</p>}

      <BookForm onAgregarLibro={manejarAgregarLibro} />

      <BookList
        libros={libros}
        onEliminar={manejarEliminarLibro}
        onCambiarEstado={manejarCambiarEstado}
      />
    </main>
  );
}

export default App;
