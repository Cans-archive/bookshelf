import { useEffect, useState } from "react";

function BookSearch({ onSeleccionarLibro }) {
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  // Buscar automáticamente mientras se escribe
  useEffect(() => {
    if (!busqueda.trim()) {
      setResultados([]);
      setError("");
      setCargando(false);
      return;
    }

    let cancelado = false;

    const temporizador = setTimeout(async () => {
      try {
        setCargando(true);
        setError("");

        const consulta = encodeURIComponent(busqueda.trim());

        const respuesta = await fetch(
          `https://openlibrary.org/search.json?q=${consulta}&fields=key,title,author_name,cover_i,subject&limit=8`
        );

        if (!respuesta.ok) {
          throw new Error("Error en la búsqueda");
        }

        const datos = await respuesta.json();

        if (!cancelado) {
          setResultados(datos.docs || []);

          if (!datos.docs || datos.docs.length === 0) {
            setError("No encontramos libros con esa búsqueda.");
          }
        }
      } catch (error) {
        if (!cancelado) {
          console.error(error);
          setError("Ocurrió un error al buscar libros.");
        }
      } finally {
        if (!cancelado) {
          setCargando(false);
        }
      }
    }, 400);

    return () => {
      cancelado = true;
      clearTimeout(temporizador);
    };
  }, [busqueda]);

  return (
    <section className="book-search">
      <h2>Descubrí nuevos libros</h2>
      <p>Buscá por título o autor y agregá libros a tu biblioteca.</p>

      <input
        type="text"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="Escribí un título o autor..."
      />

      {cargando && <p>Buscando libros...</p>}

      {error && <p className="error-message">{error}</p>}

      <div className="search-results">
        {resultados.map((libro) => (
          <article className="search-book-card" key={libro.key}>
            {libro.cover_i ? (
              <img
                src={`https://covers.openlibrary.org/b/id/${libro.cover_i}-M.jpg`}
                alt={`Portada de ${libro.title}`}
              />
            ) : (
              <div className="no-cover">Sin portada</div>
            )}

            <h3>{libro.title}</h3>

            <p>
              {libro.author_name?.join(", ") || "Autor desconocido"}
            </p>

            <button
              type="button"
              onClick={() =>
                onSeleccionarLibro({
                  titulo: libro.title,
                  autor: libro.author_name?.[0] || "Autor desconocido",
                  genero: libro.subject?.[0] || "",
                  portada: libro.cover_i
                    ? `https://covers.openlibrary.org/b/id/${libro.cover_i}-M.jpg`
                    : "",
                  estado: "Pendiente",
                })
              }
            >
              Agregar a mi biblioteca
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default BookSearch;
