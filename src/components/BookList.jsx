import BookCard from "./BookCard";

function BookList({ libros, onEliminar, onCambiarEstado }) {
  return (
    <section className="book-list">
      <div className="list-heading">
        <h2>Mi biblioteca</h2>
        <span>{libros.length} libros</span>
      </div>

      {libros.length === 0 ? (
        <p className="empty-message">
          Todavía no agregaste libros. ¡Comenzá tu colección!
        </p>
      ) : (
        <div className="books-grid">
          {libros.map((libro) => (
            <BookCard
              key={libro.id}
              libro={libro}
              onEliminar={onEliminar}
              onCambiarEstado={onCambiarEstado}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default BookList;
