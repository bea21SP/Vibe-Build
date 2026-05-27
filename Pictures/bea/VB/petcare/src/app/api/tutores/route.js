import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src/data/tutores.json");

export async function GET() {
  const data = await fs.readFile(filePath, "utf-8");

  return Response.json(JSON.parse(data));
}

export async function POST(request) {
  const body = await request.json();

  const data = await fs.readFile(filePath, "utf-8");

  const tutores = JSON.parse(data);

  tutores.push(body);

  await fs.writeFile(
    filePath,
    JSON.stringify(tutores, null, 2)
  );

  return Response.json({
    message: "Tutor salvo com sucesso!",
  });
}