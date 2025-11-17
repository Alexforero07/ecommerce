"use client";
import { useCarrito } from "@/context/CarritoContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react"; // Importamos icono

export default function CarritoPage() {
  const { carrito, eliminarDelCarrito } = useCarrito();
  const router = useRouter();
  const [usuario, setUsuario] = useState(null);

  // Detectar si el usuario está logueado
  useEffect(() => {
    const user = localStorage.getItem("usuario");

    if (!user || user === "undefined") {
      setUsuario(null);
      return;
    }

    try {
      setUsuario(JSON.parse(user)); // convierte a objeto
    } catch (error) {
      console.error("Error leyendo usuario:", error);
      localStorage.removeItem("usuario");
      setUsuario(null);
    }
  }, []);

  // Si NO hay usuario → mensaje de login obligatorio
  if (!usuario) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-black p-6">
        <h1 className="text-2xl font-bold mb-3">⚠ Necesitas iniciar sesión</h1>
        <p className="mb-6 text-gray-700 text-center max-w-sm">
          Para acceder a tu carrito debes iniciar sesión en CapDiem.
        </p>

        <button
          onClick={() => router.push("/login")}
          className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-900"
        >
          Iniciar sesión
        </button>

        <Link href="/" className="mt-4 text-blue-600 hover:underline">
          Volver a la tienda
        </Link>
      </div>
    );
  }

  // Calcular total de forma segura
  const total = carrito.reduce((acc, item) => {
    const precioNum =
      typeof item.precio === "number"
        ? item.precio
        : Number(item.precio.replace(/\$/g, "").replace(/\./g, ""));
    return acc + precioNum * item.cantidad;
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Botón volver al inicio */}
      <button
        onClick={() => router.push("/")}
        className="mb-4 text-black flex items-center gap-2"
      >
        <ArrowLeft size={20} /> Volver a la tienda
      </button>

      <h1 className="text-2xl font-bold text-black mb-6">Tu Carrito</h1>

      {carrito.length === 0 ? (
        <p className="text-gray-600">
          No hay productos en el carrito.{" "}
        </p>
      ) : (
        <div className="bg-white rounded-xl shadow p-6 max-w-3xl mx-auto">
          {carrito.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b py-3"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.imagen}
                  alt={item.nombre}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="text-black font-semibold text-sm">
                    {item.nombre}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    ${typeof item.precio === "number"
                      ? item.precio.toLocaleString("es-CO")
                      : item.precio}
                  </p>
                  <p className="text-gray-500 text-xs">
                    Cantidad: {item.cantidad}
                  </p>
                </div>
              </div>
              <button
                onClick={() => eliminarDelCarrito(item.id)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Eliminar
              </button>
            </div>
          ))}

          <div className="mt-6 flex justify-between items-center">
            <p className="text-lg font-bold text-black">
              Total: ${total.toLocaleString("es-CO")}
            </p>
            <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800">
              Finalizar compra
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
