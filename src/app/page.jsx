"use client";
import { useState, useEffect } from "react";
import Header from "@/componentes/Header";
import Footer from "@/componentes/Footer";
import { useCarrito } from "@/context/CarritoContext";

export default function HomePage() {
  const { agregarAlCarrito } = useCarrito();
  const [filtro, setFiltro] = useState("todos");
  const [busqueda, setBusqueda] = useState("");
  const [productos, setProductos] = useState([]);

  // Cargar productos desde PostgreSQL
  useEffect(() => {
    async function cargarProductos() {
      try {
        const res = await fetch("/api/productos");
        const data = await res.json();

        const productosFormateados = data.map((p) => ({
          ...p,
          precio: `$${p.precio.toLocaleString("es-CO")}`,
        }));

        setProductos(productosFormateados);
      } catch (error) {
        console.error("Error cargando productos:", error);
      }
    }

    cargarProductos();
  }, []);

  // Filtrado dinámico
  const productosFiltrados = productos.filter((p) => {
    const coincideCategoria = filtro === "todos" || p.categoria === filtro;

    const coincideBusqueda = p.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());

    return coincideCategoria && coincideBusqueda;
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header setBusqueda={setBusqueda} />

      <main className="flex-grow">
        <section className="text-center py-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-black">
            Nuestros Artículos
          </h2>

          {/* Filtros */}
          <div className="flex justify-center gap-3 mb-10">
            {["todos", "gorras", "zapatos"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFiltro(cat)}
                className={`px-4 py-2 rounded-lg text-sm sm:text-base font-semibold ${
                  filtro === cat
                    ? "bg-black text-white"
                    : "bg-white text-black border border-gray-300 hover:bg-gray-100"
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          {/* Grid de productos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4 sm:px-6">
            {productosFiltrados.map((producto) => (
              <div
                key={producto.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
              >
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="w-full h-40 sm:h-48 object-cover"
                />

                <div className="p-4">
                  <h3 className="text-xs sm:text-sm font-semibold text-black">
                    {producto.nombre}
                  </h3>
                  <p className="text-gray-600">{producto.precio}</p>

                  <div className="flex flex-col gap-2 mt-3">
                    <button
                      onClick={() => agregarAlCarrito(producto)}
                      className="bg-black text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg hover:bg-gray-800 text-sm sm:text-base w-full sm:w-auto"
                    >
                      Añadir al carrito
                    </button>

                    {/* Ahora abre la página independiente */}
                    <a
                      href={`/producto/${producto.id}`}
                      className="border border-black text-black px-3 py-2 rounded-lg hover:bg-gray-100 text-sm sm:text-base w-full sm:w-auto text-center"
                    >
                      Ver detalles
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sin resultados */}
          {productosFiltrados.length === 0 && (
            <p className="text-gray-500 mt-10">
              No se encontraron productos que coincidan con tu búsqueda.
            </p>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
