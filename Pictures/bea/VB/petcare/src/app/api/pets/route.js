import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src/data/pets.json");

export async function GET() {
  const data = await fs.readFile(filePath, "utf-8");

  return Response.json(JSON.parse(data));
}

export async function POST(request) {

  const body = await request.json();

  const data = await fs.readFile(filePath, "utf-8");

  const pets = JSON.parse(data);

  const novoPet = {
    id: Date.now(),
    ...body,
  };

  pets.push(novoPet);

  await fs.writeFile(
    filePath,
    JSON.stringify(pets, null, 2)
  );

  return Response.json({
    message: "Pet cadastrado com sucesso!",
  });
}