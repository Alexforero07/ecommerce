"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  // Estado para login o registro
  const [modoRegistro, setModoRegistro] = useState(false);

  // Inputs generales
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(""); // para registro
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

// --- LOGIN ---
const enviarLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    setMessage(data.message || data.error);

    if (res.ok) {
      // Guardar usuario en localStorage correctamente
      localStorage.setItem("usuario", JSON.stringify(data.user));

      // Redirigir al home
      router.push("/");
    }

  } catch (error) {
    setMessage("Error al conectar con el servidor");
  }
};



  //--- REGISTRO ---
  const enviarRegistro = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();
      setMessage(data.message || data.error);

      if (res.ok) {
        // cambia automáticamente a login
        setModoRegistro(false);
      }
    } catch (error) {
      setMessage("Error al conectar con el servidor");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 relative">

      {/* Botón volver */}
      <button
        onClick={() => router.push("/")}
        className="absolute top-4 left-4 bg-white/80 rounded-full p-2 shadow hover:bg-gray-200 transition"
      >
        <img
          src="/imagenes/back.png"
          alt="Volver al comercio"
          className="w-5 h-5 sm:w-6 sm:h-6"
        />
      </button>

      <div className="flex w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">

        {/* Imagen izquierda */}
        <div className="hidden md:flex w-1/2 bg-gray-200">
          <img
            src="/imagenes/logo.png"
            alt="Imagen login"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Formulario */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-2 text-black">
            {modoRegistro ? "Crea tu cuenta" : "Inicia sesión"}
          </h2>

          <p className="text-gray-600 mb-6">
            {modoRegistro
              ? "Regístrate para continuar."
              : "Accede a tu cuenta para continuar."}
          </p>

          <form
            onSubmit={modoRegistro ? enviarRegistro : enviarLogin}
            className="space-y-4"
          >
            {/* Username (en login y registro) */}
            <input
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border w-full p-2 rounded text-gray-700 placeholder-gray-500"
              required
            />

            {/* Email solo si está registrándose */}
            {modoRegistro && (
              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border w-full p-2 rounded text-gray-700 placeholder-gray-500"
                required
              />
            )}

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border w-full p-2 rounded text-gray-700 placeholder-gray-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2 text-sm text-gray-600 hover:underline"
              >
                {showPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>

            {!modoRegistro && (
              <div className="flex justify-end">
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            )}

            {/* Botón principal */}
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
            >
              {modoRegistro ? "Registrarme" : "Ingresar"}
            </button>

            {!modoRegistro && (
              <button
                type="button"
                className="border w-full p-2 rounded text-gray-700"
                onClick={() => setMessage("Login con Google (falso)")}
              >
                Ingresar con Google
              </button>
            )}
          </form>

          {/* Mensajes */}
          {message && (
            <p className="mt-4 text-center text-sm font-medium text-black">
              {message}
            </p>
          )}

          {/* Cambiar entre login y registro */}
          <p className="mt-6 text-center text-sm text-black">
            {modoRegistro ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}{" "}
            <span
              className="text-blue-600 hover:underline cursor-pointer"
              onClick={() => setModoRegistro(!modoRegistro)}
            >
              {modoRegistro ? "Inicia sesión" : "Regístrate"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
