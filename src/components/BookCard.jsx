
import { useState } from "react";

function BookCard({
  libro,
  onEliminar,
  onCambiarEstado,
  onEditar,
}) {
  const [editando, setEditando] = useState(false);

  const [titulo, setTitulo] = useState(libro.titulo);
  const [autor, setAutor] = useState(libro.autor);
  const [genero, setGenero] = useState(libro.genero || "");

  const guardarCambios = () => {
    if (!titulo.trim() || !autor.trim()) {
      alert("El título y el autor son obligatorios.");
      return;
    }

    onEditar(libro.id, {
      titulo: titulo.trim(),
      autor: autor.trim(),
      genero: genero.trim(),
    });

    setEditando(false);
  };

  const cancelarEdicion = () => {
    setTitulo(libro.titulo);
    setAutor(libro.autor);
    setGenero(libro.genero || "");
    setEditando(false);
  };

  return (
    <article className="book-card">
      {libro.portada && (
        <img
          className="book-cover"
          src={libro.portada}
          alt={`Portada de ${libro.titulo}`}
        />
      )}

      {editando ? (
        <div className="book-info book-edit-form">
          <label>Título</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />

          <label>Autor</label>
          <input
            type="text"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
          />

          <label>Género</label>
          <input
            type="text"
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
          />
        </div>
      ) : (
        <div className="book-info">
          <span className="book-status">{libro.estado}</span>

          <h3>{libro.titulo}</h3>
          <p>Por {libro.autor}</p>

          {libro.genero && (
            <p className="book-genre">{libro.genero}</p>
          )}
        </div>
      )}

      <div className="book-actions">
        {editando ? (
          <>
            <button type="button" onClick={guardarCambios}>
              Guardar cambios
            </button>

            <button type="button" onClick={cancelarEdicion}>
              Cancelar
            </button>
          </>
        ) : (
          <>
            <label>Estado de lectura</label>

            <select
              value={libro.estado}
              onChange={(e) =>
                onCambiarEstado(libro.id, e.target.value)
              }
            >
              <option value="Pendiente">Pendiente</option>
              <option value="Leyendo">Leyendo</option>
              <option value="Finalizado">Finalizado</option>
            </select>

            <button
              type="button"
              onClick={() => setEditando(true)}
            >
              Editar libro
            </button>

            <button
              type="button"
              onClick={() => onEliminar(libro.id)}
            >
              Eliminar libro
            </button>
          </>
        )}
      </div>
    </article>
  );
}

export default BookCard;
