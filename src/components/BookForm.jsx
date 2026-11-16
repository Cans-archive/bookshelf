import { useState } from "react";

function BookForm({ onAgregarLibro }) {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [genero, setGenero] = useState("");
  const [estado, setEstado] = useState("Pendiente");

  const manejarEnvio = (e) => {
    e.preventDefault();

    if (!titulo.trim() || !autor.trim()) {
      return;
    }

    onAgregarLibro({
      titulo: titulo.trim(),
      autor: autor.trim(),
      genero,
      estado,
    });

    setTitulo("");
    setAutor("");
    setGenero("");
    setEstado("Pendiente");
  };

  return (
    <form onSubmit={manejarEnvio} className="book-form">
      <h2>Agregar un libro</h2>

      <label>Título</label>
      <input
        type="text"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="Nombre del libro"
        required
      />

      <label>Autor</label>
      <input
        type="text"
        value={autor}
        onChange={(e) => setAutor(e.target.value)}
        placeholder="Nombre del autor"
        required
      />

      <label>Género</label>
      <input
        type="text"
        value={genero}
        onChange={(e) => setGenero(e.target.value)}
        placeholder="Ej. Fantasía, romance..."
      />

      <label>Estado de lectura</label>
      <select
        value={estado}
        onChange={(e) => setEstado(e.target.value)}
      >
        <option value="Pendiente">Pendiente</option>
        <option value="Leyendo">Leyendo</option>
        <option value="Finalizado">Finalizado</option>
      </select>

      <button type="submit">Agregar a mi biblioteca</button>
    </form>
  );
}

export default BookForm;
