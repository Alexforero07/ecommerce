import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white py-8 mt-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Sección redes sociales */}
        <div className="flex flex-col sm:flex-row justify-center items-center sm:gap-6 gap-4 mb-6 text-lg">
          <a href="https://facebook.com" target="_blank" className="flex items-center gap-2 hover:text-gray-400">
            <img src="/imagenes/facebook.png" alt="Facebook" className="h-5 w-5 invert" />
            Facebook
          </a>

          <a href="https://instagram.com" target="_blank" className="flex items-center gap-2 hover:text-gray-400">
            <img src="/imagenes/instagram.png" alt="Instagram" className="h-5 w-5 invert" />
            Instagram
          </a>

          <a href="https://tiktok.com" target="_blank" className="flex items-center gap-2 hover:text-gray-400">
            <img src="/imagenes/tik-tok.png" alt="Tiktok" className="h-5 w-5 invert" />
            Tiktok
          </a>
        </div>

        {/* Links legales */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center text-sm font-medium">
          <Link href="#" className="hover:underline">COLOMBIA</Link>
          <Link href="#" className="hover:underline">Privacidad</Link>
          <Link href="#" className="hover:underline">Términos y Condiciones</Link>
          <Link href="#" className="hover:underline">Preguntas Frecuentes</Link>
          <Link href="#" className="hover:underline">Garantías</Link>
          <Link href="#" className="hover:underline">Promociones</Link>
        </div>

        {/* Línea separadora */}
        <div className="border-t border-gray-700 mt-6 pt-4 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} CapDiem. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
