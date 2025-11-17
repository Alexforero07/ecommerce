"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/componentes/Header";
import Footer from "@/componentes/Footer";
import { useCarrito } from "@/context/CarritoContext";
import { ArrowLeft } from "lucide-react";

export default function ProductoDetalle({ params }) {
  const [id, setId] = useState(null);
  const [producto, setProducto] = useState(null);
  const [productosRelacionados, setProductosRelacionados] = useState([]);
  const { agregarAlCarrito } = useCarrito();
  const router = useRouter();

  // Obtener el id del producto desde params
  useEffect(() => {
    async function obtenerId() {
      const p = await params;
      setId(p.id);
    }
    obtenerId();
  }, [params]);

  // Cargar producto y productos relacionados
  useEffect(() => {
    if (!id) return;

    async function cargarProducto() {
      try {
        const res = await fetch(`/api/productos/${id}`);
        const data = await res.json();
        setProducto({
          ...data,
          precio: `$${data.precio.toLocaleString("es-CO")}`,
        });

        const resRelacionados = await fetch(
          `/api/productos?categoria=${data.categoria}&limit=3`
        );
        const dataRelacionados = await resRelacionados.json();
        setProductosRelacionados(
          dataRelacionados.filter((p) => p.id !== data.id)
        );
      } catch (err) {
        console.error("Error:", err);
      }
    }

    cargarProducto();
  }, [id]);

  if (!producto) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-600">
        Cargando...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <main className="flex-grow max-w-6xl mx-auto px-6 py-10">
        {/* Botón volver con Lucide */}
        <button
          onClick={() => router.back()}
          className="mb-4 text-black flex items-center gap-2"
        >
          <ArrowLeft size={20} /> Volver
        </button>

        {/* Información principal del producto */}
        <div className="grid md:grid-cols-2 gap-10 bg-white p-6 rounded-xl shadow">
          <div className="overflow-hidden rounded-lg">
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="w-full h-96 object-cover transition-transform duration-300 hover:scale-110"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-black">{producto.nombre}</h1>
            <p className="text-green-600 font-semibold text-xl mt-2">
              {producto.precio}
            </p>
            <p className="text-gray-600 mt-4">{producto.descripcion}</p>

            {/* Reviews */}
            <div className="flex items-center mt-4">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${
                    i < producto.calificacion
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.955c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.286-3.955a1 1 0 00-.364-1.118L2.037 9.382c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.955z" />
                </svg>
              ))}
              <span className="ml-2 text-gray-500 text-sm">
                ({producto.reviews} reviews)
              </span>
            </div>

            <button
              onClick={() => agregarAlCarrito(producto)}
              className="mt-6 w-full bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 text-lg"
            >
              Comprar Ahora
            </button>
          </div>
        </div>

        {/* Productos relacionados */}
        {productosRelacionados.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-black mb-4">
              Productos relacionados
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {productosRelacionados.map((p) => (
                <div
                  key={p.id}
                  className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition flex flex-col"
                >
                  {/* Imagen clickeable */}
                  <Link href={`/producto/${p.id}`} className="cursor-pointer">
                    <img
                      src={p.imagen}
                      alt={p.nombre}
                      className="w-full h-48 object-cover rounded"
                    />
                  </Link>

                  {/* Nombre del producto sin enlace */}
                  <h3 className="mt-2 font-semibold text-black">{p.nombre}</h3>

                  {/* Precio */}
                  <p className="text-green-600 font-bold">
                    {`$${p.precio.toLocaleString("es-CO")}`}
                  </p>

                  {/* Botones */}
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => agregarAlCarrito(p)}
                      className="bg-black text-white px-3 py-2 rounded-lg hover:bg-gray-800 text-sm flex-1"
                    >
                      Añadir al carrito
                    </button>
                    <Link
                      href={`/producto/${p.id}`}
                      className="border border-black px-3 py-2 rounded-lg text-black hover:bg-gray-100 text-sm flex-1 text-center"
                    >
                      Ver detalles
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
