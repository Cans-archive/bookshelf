function BookCard({ libro, onEliminar, onCambiarEstado }) {
  return (
    <article className="book-card">
      <div className="book-info">
        <span className="book-status">{libro.estado}</span>

        <h3>{libro.titulo}</h3>
        <p>Por {libro.autor}</p>

        {libro.genero && (
          <p className="book-genre">{libro.genero}</p>
        )}
      </div>

      <div className="book-actions">
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
          onClick={() => onEliminar(libro.id)}
        >
          Eliminar libro
        </button>
      </div>
    </article>
  );
}

export default BookCard;