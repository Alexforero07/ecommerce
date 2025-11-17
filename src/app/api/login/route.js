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

    const query = "SELECT * FROM usuarios WHERE username = LOWER($1) LIMIT 1";
    const result = await pool.query(query, [username.toLowerCase()]);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    const user = result.rows[0];

    if (user.password !== password) {
      return NextResponse.json(
        { error: "Contraseña incorrecta" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      message: "Login exitoso",
      user: {
        id: user.id,
        username: user.username,
      },
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error en el servidor" },
      { status: 500 }
    );
  }
}
