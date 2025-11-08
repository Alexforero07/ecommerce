"use client";
import { useCarrito } from "@/context/CarritoContext";
import Link from "next/link";

export default function CarritoPage() {
  const { carrito, eliminarDelCarrito } = useCarrito();

  const total = carrito.reduce((acc, item) => {
    const precioNum = parseInt(item.precio.replace(/\D/g, ""));
    return acc + precioNum * item.cantidad;
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold text-black mb-6">Tu Carrito</h1>

      {carrito.length === 0 ? (
        <p className="text-gray-600">
          No hay productos en el carrito.{" "}
          <Link href="/" className="text-blue-600 hover:underline">
            Volver a la tienda
          </Link>
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
                  <p className="text-gray-600 text-sm">{item.precio}</p>
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
              Total: ${total.toLocaleString()}
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
