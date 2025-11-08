"use client";
import Link from "next/link";
import { ShoppingCart, Search, X, User } from "lucide-react";
import { useCarrito } from "@/context/CarritoContext";
import { useState } from "react";

export default function Header({ setBusqueda }) {
  const { carrito } = useCarrito();
  const [mostrarBusqueda, setMostrarBusqueda] = useState(false);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  const totalProductos = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  const manejarBusqueda = (e) => {
    const valor = e.target.value;
    setTextoBusqueda(valor);
    setBusqueda(valor); // Enviar al Home para filtrar en tiempo real
  };

  const cerrarBusqueda = () => {
    setTextoBusqueda("");
    setBusqueda(""); // Esto hace que vuelvan a aparecer todos los productos
    setMostrarBusqueda(false);
  };

  return (
    <header className="w-full border-b shadow-sm bg-white relative z-50">
      {/* Fila superior */}
      <div className="w-full bg-black text-white text-center py-2 text-sm font-medium">
        Descubra nuestras colecciones exclusivas en nuestra tienda oficial{" "}
        <span className="font-bold">CapDiem</span>
      </div>

      {/* Fila central */}
      <div className="relative h-24 flex items-center justify-between px-6">
        {/* Lado izquierdo */}
        <div className="flex items-center gap-4">
          <Link href="/login" className="flex items-center gap-2 text-black font-medium">
            <User size={22} className="ml-5" />
          </Link>
        </div>

        {/* Logo centrado */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <img
            src="/imagenes/headerwhite.png"
            alt="Logo"
            className="h-16 w-auto"
          />
        </div>

        {/* Lado derecho */}
        <div className="flex items-center gap-4">
          {/* Buscar */}
          {!mostrarBusqueda ? (
            <button
              onClick={() => setMostrarBusqueda(true)}
              className="flex items-center gap-2 text-black font-medium"
            >
              <Search size={22} />
            </button>
          ) : (
            <div className="flex items-center bg-gray-100 rounded-full px-3 py-1 transition-all duration-300">
              <input
                type="text"
                placeholder="Buscar producto..."
                value={textoBusqueda}
                onChange={manejarBusqueda}
                className="bg-transparent outline-none px-2 text-sm w-40 sm:w-64 text-black placeholder-black"
              />
              <button onClick={cerrarBusqueda}>
                <X size={20} className="text-gray-600 hover:text-black" />
              </button>
            </div>
          )}

          {/* Carrito */}
          <Link href="/carrito" className="relative flex items-center text-black font-medium">
            <ShoppingCart
              size={24}
              className={`transition-transform duration-200 ${
                totalProductos > 0 ? "text-green-600 scale-110" : "text-black"
              }`}
            />
            {totalProductos > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-500 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalProductos}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
