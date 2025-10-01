import Header from "@/componentes/Header";
import Footer from "@/componentes/Footer";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Contenido principal */}
      <main className="flex-grow bg-gray-50">
        <section className="text-center py-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-black">Nuestros Artículos</h2>

          {/* Grid de productos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4 sm:px-6">

            {/* Producto 1 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
              <img
                src="/imagenes/gorranegra.png"
                alt="Gorra CapDiem Negra"
                className="w-full h-40 sm:h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xs sm:text-sm font-semibold text-black">Gorra CapDiem Negra</h3>
                <p className="text-gray-600">$80.000</p>
                <button className="mt-3 bg-black text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg hover:bg-gray-800 text-sm sm:text-base w-full sm:w-auto">
                  Añadir al carrito
                </button>
              </div>
            </div>

            {/* Producto 2 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
              <img
                src="/imagenes/gorrablanca.png"
                alt="Gorra CapDiem Blanca"
                className="w-full h-40 sm:h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xs sm:text-sm font-semibold text-black">Gorra CapDiem Blanca</h3>
                <p className="text-gray-600">$175.000</p>
                <button className="mt-3 bg-black text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg hover:bg-gray-800 text-sm sm:text-base w-full sm:w-auto">
                  Añadir al carrito
                </button>
              </div>
            </div>

            {/* Producto 3 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
              <img
                src="/imagenes/AirJordanRetro1.png"
                alt='Air Jordan 1 Retro High Og "Shattered Backboard"'
                className="w-full h-40 sm:h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xs sm:text-sm font-semibold text-black">Air Jordan 1 Retro High Og "Shattered Backboard"</h3>
                <p className="text-gray-600">$750.000</p>
                <button className="mt-3 bg-black text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg hover:bg-gray-800 text-sm sm:text-base w-full sm:w-auto">
                  Añadir al carrito
                </button>
              </div>
            </div>

            {/* Producto 4 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
              <img
                src="/imagenes/AirJordanblancas.png"
                alt="Air Jordan Blanca"
                className="w-full h-40 sm:h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xs sm:text-sm font-semibold text-black">Air Jordan Blanca</h3>
                <p className="text-gray-600">$990.000</p>
                <button className="mt-3 bg-black text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg hover:bg-gray-800 text-sm sm:text-base w-full sm:w-auto">
                  Añadir al carrito
                </button>
              </div>
            </div>

            {/* Producto 5 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
              <img
                src="/imagenes/gorrablue.jpg"
                alt="Gorra CapDiem Blue"
                className="w-full h-40 sm:h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xs sm:text-sm font-semibold text-black">Gorra CapDiem Blue</h3>
                <p className="text-gray-600">$175.000</p>
                <button className="mt-3 bg-black text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg hover:bg-gray-800 text-sm sm:text-base w-full sm:w-auto">
                  Añadir al carrito
                </button>
              </div>
            </div>

          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
