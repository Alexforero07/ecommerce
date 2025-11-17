import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Usuario y contraseña obligatorios" },
        { status: 400 }
      );
    }

    const query =
      "INSERT INTO usuarios (username, password) VALUES (LOWER($1), $2) RETURNING id";

    await pool.query(query, [username, password]);

    return NextResponse.json({ message: "Usuario registrado correctamente" });
  } catch (error) {
    console.error(error);

    if (error.code === "23505") {
      return NextResponse.json(
        { error: "El usuario ya existe" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Error en el servidor" },
      { status: 500 }
    );
  }
}
