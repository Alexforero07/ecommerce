"use client";
import { useState } from "react";
import Header from "@/componentes/Header";
import Footer from "@/componentes/Footer";

export default function HomePage() {
  const [filtro, setFiltro] = useState("todos");

  const productos = [
    {
      id: 1,
      nombre: "Gorra CapDiem Negra",
      precio: "$80.000",
      categoria: "gorras",
      imagen: "/imagenes/gorranegra.png",
    },
    {
      id: 2,
      nombre: "Gorra CapDiem Blanca",
      precio: "$175.000",
      categoria: "gorras",
      imagen: "/imagenes/gorrablanca.png",
    },
    {
      id: 3,
      nombre: 'Air Jordan 1 Retro High Og "Shattered Backboard"',
      precio: "$750.000",
      categoria: "zapatos",
      imagen: "/imagenes/AirJordanRetro1.png",
    },
    {
      id: 4,
      nombre: "Air Jordan Blanca",
      precio: "$990.000",
      categoria: "zapatos",
      imagen: "/imagenes/AirJordanblancas.png",
    },
    {
      id: 5,
      nombre: "Gorra CapDiem Blue",
      precio: "$175.000",
      categoria: "gorras",
      imagen: "/imagenes/gorrablue.jpg",
    },
  ];

  const productosFiltrados =
    filtro === "todos"
      ? productos
      : productos.filter((p) => p.categoria === filtro);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Contenido principal */}
      <main className="flex-grow bg-gray-50">
        <section className="text-center py-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-black">
            Nuestros Artículos
          </h2>

          {/* Botones de filtro */}
          <div className="flex justify-center gap-3 mb-10">
            <button
              onClick={() => setFiltro("todos")}
              className={`px-4 py-2 rounded-lg text-sm sm:text-base font-semibold ${
                filtro === "todos"
                  ? "bg-black text-white"
                  : "bg-white text-black border border-gray-300 hover:bg-gray-100"
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFiltro("gorras")}
              className={`px-4 py-2 rounded-lg text-sm sm:text-base font-semibold ${
                filtro === "gorras"
                  ? "bg-black text-white"
                  : "bg-white text-black border border-gray-300 hover:bg-gray-100"
              }`}
            >
              Gorras
            </button>
            <button
              onClick={() => setFiltro("zapatos")}
              className={`px-4 py-2 rounded-lg text-sm sm:text-base font-semibold ${
                filtro === "zapatos"
                  ? "bg-black text-white"
                  : "bg-white text-black border border-gray-300 hover:bg-gray-100"
              }`}
            >
              Zapatos
            </button>
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
                  <button className="mt-3 bg-black text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg hover:bg-gray-800 text-sm sm:text-base w-full sm:w-auto">
                    Añadir al carrito
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
