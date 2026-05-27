import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(
  process.cwd(),
  "src/data/agendamentos.json"
);

export async function GET() {

  const data = await fs.readFile(filePath, "utf-8");

  return Response.json(JSON.parse(data));
}

export async function POST(request) {

  const body = await request.json();

  const data = await fs.readFile(filePath, "utf-8");

  const agendamentos = JSON.parse(data);

  const novoAgendamento = {
    codigo: Date.now(),
    status: "Aguardando",
    ...body,
  };

  agendamentos.push(novoAgendamento);

  await fs.writeFile(
    filePath,
    JSON.stringify(agendamentos, null, 2)
  );

  return Response.json({
    message: "Agendamento realizado!",
    agendamento: novoAgendamento,
  });
}

export async function PUT(request) {

  const body = await request.json();

  const data = await fs.readFile(filePath, "utf-8");

  const agendamentos = JSON.parse(data);

  const atualizado = agendamentos.map((item) => {

    if (item.codigo === body.codigo) {
      return {
        ...item,
        status: body.status,
      };
    }

    return item;
  });

  await fs.writeFile(
    filePath,
    JSON.stringify(atualizado, null, 2)
  );

  return Response.json({
    message: "Status atualizado!",
  });
}

export async function DELETE(request) {

  const body = await request.json();

  const data = await fs.readFile(filePath, "utf-8");

  const agendamentos = JSON.parse(data);

  const filtrados = agendamentos.filter(
    (item) => item.codigo !== body.codigo
  );

  await fs.writeFile(
    filePath,
    JSON.stringify(filtrados, null, 2)
  );

  return Response.json({
    message: "Agendamento removido!",
  });
}