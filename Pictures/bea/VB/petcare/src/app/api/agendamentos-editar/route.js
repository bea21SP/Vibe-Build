import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(
  process.cwd(),
  "src/data/agendamentos.json"
);

export async function PUT(request) {

  const body = await request.json();

  await fs.writeFile(
    filePath,
    JSON.stringify(body, null, 2)
  );

  return Response.json({
    message: "Atualizado!",
  });
}