import { useState } from "react";
import BookCard from "./BookCard";

function BookList({ libros, onEliminar, onCambiarEstado, onEditar }) {
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("Todos");

  // Buscar por título o autor y filtrar por estado
  const librosFiltrados = libros.filter((libro) => {
    const coincideBusqueda =
      libro.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      libro.autor.toLowerCase().includes(busqueda.toLowerCase());

    const coincideEstado =
      filtroEstado === "Todos" || libro.estado === filtroEstado;

    return coincideBusqueda && coincideEstado;
  });

  // Contar libros según su estado
  const pendientes = libros.filter(
    (libro) => libro.estado === "Pendiente"
  ).length;

  const leyendo = libros.filter(
    (libro) => libro.estado === "Leyendo"
  ).length;

  const finalizados = libros.filter(
    (libro) => libro.estado === "Finalizado"
  ).length;

  return (
    <section className="book-list">
      <div className="list-heading">
        <h2>Mi biblioteca</h2>
        <span>{libros.length} libros</span>
      </div>

      <div className="book-stats">
        <p>Pendientes: {pendientes}</p>
        <p>Leyendo: {leyendo}</p>
        <p>Finalizados: {finalizados}</p>
      </div>

      <div className="book-filters">
        <input
          type="text"
          placeholder="Buscar por título o autor..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <select
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
        >
          <option value="Todos">Todos los estados</option>
          <option value="Pendiente">Pendientes</option>
          <option value="Leyendo">Leyendo</option>
          <option value="Finalizado">Finalizados</option>
        </select>
      </div>

      {librosFiltrados.length === 0 ? (
        <p className="empty-message">
          No se encontraron libros.
        </p>
      ) : (
        <div className="books-grid">
          {librosFiltrados.map((libro) => (
            <BookCard
              key={libro.id}
              libro={libro}
              onEliminar={onEliminar}
              onCambiarEstado={onCambiarEstado}
              onEditar={onEditar}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default BookList;