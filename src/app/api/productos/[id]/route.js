import { NextResponse } from "next/server";
import  pool  from "@/lib/db";

export async function GET(req, { params }) {
  const { id } = await params;

  try {
    const result = await pool.query(
      "SELECT * FROM productos WHERE id = $1",
      [id]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
