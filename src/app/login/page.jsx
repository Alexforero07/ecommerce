"use client";
import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      setMessage(data.message);
    } catch (error) {
      setMessage("Error al conectar con el servidor");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      {/* Contenedor del cuadro */}
      <div className="flex w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Lado izquierdo - Imagen */}
        <div className="hidden md:flex w-1/2 bg-gray-200">
          <img
            src="/imagenes/logo.png"
            alt="Imagen login"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Lado derecho - Formulario */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-2 text-black">Inicia sesión</h2>
          <p className="text-gray-600 mb-6">Accede a tu cuenta para continuar.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border w-full p-2 rounded text-gray-700 placeholder-gray-500"
              required
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} // ← Funciona ahora
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border w-full p-2 rounded text-gray-700 placeholder-gray-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)} // ← Alterna showPassword
                className="absolute right-2 top-2 text-sm text-gray-600 hover:underline"
              >
                {showPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>

            <div className="flex justify-end">
              <a href="#" className="text-sm text-blue-600 hover:underline">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
            >
              Ingresar
            </button>

            <button
              type="button"
              className="border w-full p-2 rounded text-gray-700 placeholder-gray-500"
              onClick={() => setMessage("Login con Google (falso)")}
            >
              Ingresar con Google
            </button>
          </form>

          {message && (
            <p className="mt-4 text-center text-sm font-medium text-black">{message}</p>
          )}

          <p className="mt-6 text-center text-sm text-black">
            ¿No tienes cuenta?{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Regístrate
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
