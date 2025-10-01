import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full border-b shadow-sm bg-white">
      {/* Fila superior */}
      <div className="w-full bg-black text-white text-center py-2 text-sm font-medium">
        Descubra nuestras colecciones exclusivas en nuestra tienda oficial <span className="font-bold">CapDiem</span>
      </div>

      {/* Fila central */}
      <div className="relative h-24 flex items-center justify-between px-6">
        
        {/* Lado izquierdo */}
        <div className="flex items-center gap-4">
         <Link href="/login" className="flex items-center gap-2 hover:underline text-black font-medium">
            <img 
                src="/imagenes/login.png" 
                alt="Icono Login" 
                className="h-5 w-5 ml-5" 
             />
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
<       div className="flex items-center gap-4">
         {/* Buscar */}
        <button className="flex items-center gap-2 hover:underline text-black font-medium">
         <img
          src="/imagenes/buscar.png"
         alt="Buscar"
        className="h-5 w-5"
         />
        </button>

        {/* Carrito */}
         <Link href="/carrito" className="flex items-center gap-2 hover:underline text-black font-medium">
         <img
          src="/imagenes/carrito.png"
          alt="Carrito"
          className="h-5 w-5"
        />
        </Link>
        </div>

      </div>
    </header>
  );
}
