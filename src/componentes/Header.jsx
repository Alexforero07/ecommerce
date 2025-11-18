"use client";
import Link from "next/link";
import { ShoppingCart, Search, X, User, LogOut, Crown } from "lucide-react";
import { useCarrito } from "@/context/CarritoContext";
import { useEffect, useState } from "react";

export default function Header({ setBusqueda }) {
  const { carrito } = useCarrito();
  const [mostrarBusqueda, setMostrarBusqueda] = useState(false);
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("usuario");
    if (user) setUsuario(JSON.parse(user));
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    setUsuario(null);
    window.location.reload();
  };

  const totalProductos = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  const manejarBusqueda = (e) => {
    const v = e.target.value;
    setTextoBusqueda(v);
    setBusqueda(v);
  };

  const cerrarBusqueda = () => {
    setTextoBusqueda("");
    setBusqueda("");
    setMostrarBusqueda(false);
  };

  return (
    <header className="w-full border-b shadow-sm bg-white relative z-50">

      {/* Fila superior */}
    <div className="w-full bg-black text-white text-center py-2 text-sm font-medium overflow-hidden relative">
    <div className="marquee">
       Descubra nuestras colecciones exclusivas en nuestra tienda oficial{" "}
      <span className="font-bold">CapDiem</span>
    </div>
    </div>



      {/* Fila central */}
      <div className="relative h-24 flex items-center justify-between px-6">

        {/* Lado izquierdo */}
        <div className="flex items-center gap-4">
          {!usuario ? (
            <Link href="/login" className="flex items-center gap-2 text-black font-medium">
              <User size={22} className="ml-3" />
            </Link>
          ) : (
            <div className="flex items-center gap-2 ml-3">

              {/* ICONO CORONA — tamaño móvil/desktop */}
              <Crown
                className="
                  text-black-600 
                  w-4 h-4
                  sm:w-5 sm:h-5
                "
              />

              {/* NOMBRE DEL USUARIO — gótico + responsive */}
              <span
                className="
                  text-black font-bold tracking-wider 
                  text-xs sm:text-lg 
                "
                style={{ fontFamily: "'Old English Text MT', 'Gothic', serif" }}
              >
                {usuario.username}
              </span>

              {/* BOTÓN SALIR */}
              <button
                onClick={cerrarSesion}
                className="
                  flex items-center gap-1 
                  text-red-600 font-medium 
                  text-[10px] sm:text-sm
                  hover:text-red-800 
                  transition
                "
              >
                <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

            </div>
          )}
        </div>

        {/* Logo centrado */}
        {!mostrarBusqueda && (
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <img
              src="/imagenes/headerwhite.png"
              alt="Logo"
              className="h-10 sm:h-16 w-auto transition-all duration-300"
            />
          </div>
        )}

        {/* Lado derecho */}
        <div className="flex items-center gap-4">

          {/* Buscador */}
          {!mostrarBusqueda ? (
            <button
              onClick={() => setMostrarBusqueda(true)}
              className="flex items-center gap-2 text-black font-medium"
            >
              <Search size={22} />
            </button>
          ) : (
            <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
              <input
                type="text"
                placeholder="Buscar..."
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
          <Link href="/carrito" className="relative flex items-center">
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
