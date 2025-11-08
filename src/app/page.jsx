"use client";
import { useState } from "react";
import Header from "@/componentes/Header";
import Footer from "@/componentes/Footer";
import { useCarrito } from "@/context/CarritoContext";

export default function HomePage() {
  const { agregarAlCarrito } = useCarrito();
  const [filtro, setFiltro] = useState("todos");
  const [busqueda, setBusqueda] = useState("");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const productos = [
    {
      id: 1,
      nombre: "Gorra CapDiem Negra",
      precio: "$80.000",
      categoria: "gorras",
      descripcion: "Gorra negra clásica con logo bordado CapDiem.",
      imagen: "/imagenes/gorranegra.png",
    },
    {
      id: 2,
      nombre: "Gorra CapDiem Blanca",
      precio: "$175.000",
      categoria: "gorras",
      descripcion: "Gorra blanca con diseño minimalista premium.",
      imagen: "/imagenes/gorrablanca.png",
    },
    {
      id: 3,
      nombre: 'Air Jordan 1 Retro High Og "Shattered Backboard"',
      precio: "$750.000",
      categoria: "zapatos",
      descripcion:
        "Zapatillas exclusivas con acabados en cuero y tonos naranjas.",
      imagen: "/imagenes/AirJordanRetro1.png",
    },
    {
      id: 4,
      nombre: "Air Jordan Blanca",
      precio: "$990.000",
      categoria: "zapatos",
      descripcion: "Modelo clásico blanco de Air Jordan con suela reforzada.",
      imagen: "/imagenes/AirJordanblancas.png",
    },
    {
      id: 5,
      nombre: "Gorra CapDiem Blue",
      precio: "$175.000",
      categoria: "gorras",
      descripcion: "Gorra azul vibrante para estilo urbano.",
      imagen: "/imagenes/gorrablue.jpg",
    },
  ];

  // Filtrado dinamico: por categoría o búsqueda (insensible a mayúsculas)
  const productosFiltrados = productos.filter((p) => {
    const coincideCategoria = filtro === "todos" || p.categoria === filtro;
    if (!busqueda.trim()) return coincideCategoria;
    const coincideBusqueda = p.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());
    return coincideCategoria && coincideBusqueda;
  });

  // Productos relacionados para el detalle
  const obtenerRelacionados = (categoria, id) =>
    productos.filter((p) => p.categoria === categoria && p.id !== id);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header setBusqueda={setBusqueda} />

      <main className="flex-grow">
        <section className="text-center py-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-black">
            Nuestros Artículos
          </h2>

          {/*  Filtros */}
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
                    <button
                      onClick={() => setProductoSeleccionado(producto)}
                      className="border border-black text-black px-3 py-2 rounded-lg hover:bg-gray-100 text-sm sm:text-base w-full sm:w-auto"
                    >
                      Ver detalles
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/*  Si no hay resultados */}
          {productosFiltrados.length === 0 && (
            <p className="text-gray-500 mt-10">
              No se encontraron productos que coincidan con tu búsqueda.
            </p>
          )}
        </section>
      </main>

      {/* vista de Detalle */}
      {productoSeleccionado && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 px-4 py-8 overflow-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 shadow-lg relative">
            <button
              onClick={() => setProductoSeleccionado(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-2xl"
            >
              ×
            </button>

            <div className="grid md:grid-cols-2 gap-6 items-center">
              {/* Imagen principal */}
              <img
                src={productoSeleccionado.imagen}
                alt={productoSeleccionado.nombre}
                className="w-full h-64 md:h-80 object-cover rounded-xl shadow-md"
              />

              {/* Información del producto */}
              <div>
                <h3 className="text-2xl font-bold text-black mb-2">
                  {productoSeleccionado.nombre}
                </h3>
                <p className="text-lg text-green-600 font-semibold mb-2">
                  {productoSeleccionado.precio}
                </p>
                <p className="text-sm text-gray-500 mb-4">Disponible </p>
                <p className="text-gray-700 mb-6">
                  {productoSeleccionado.descripcion}
                </p>
                <button
                  onClick={() => {
                    agregarAlCarrito(productoSeleccionado);
                    setProductoSeleccionado(null);
                  }}
                  className="bg-black text-white px-5 py-3 rounded-lg hover:bg-gray-800 w-full sm:w-auto"
                >
                  Añadir al carrito
                </button>
              </div>
            </div>

            {/* Productos relacionados */}
            <div className="mt-10 border-t pt-6">
              <h4 className="text-lg font-semibold text-black mb-4">
                Productos relacionados
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {obtenerRelacionados(
                  productoSeleccionado.categoria,
                  productoSeleccionado.id
                ).map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => setProductoSeleccionado(rel)}
                    className="cursor-pointer bg-gray-100 rounded-lg p-3 hover:shadow-md transition"
                  >
                    <img
                      src={rel.imagen}
                      alt={rel.nombre}
                      className="w-full h-32 object-cover rounded-md mb-2"
                    />
                    <p className="text-sm font-medium text-black truncate">
                      {rel.nombre}
                    </p>
                    <p className="text-green-600 text-xs">{rel.precio}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
