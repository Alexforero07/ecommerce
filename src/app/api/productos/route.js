import pool from "@/lib/db";

export async function GET() {
  try {
    const { rows } = await pool.query(`
      SELECT id, nombre, precio, categoria, descripcion, imagen
      FROM productos
      ORDER BY id ASC
    `);

    return Response.json(rows);
  } catch (error) {
    console.error("Error en /api/productos:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
