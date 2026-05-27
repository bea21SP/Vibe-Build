"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/navigation";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {

  const [agendamentos, setAgendamentos] = useState([]);

  const [editando, setEditando] = useState(null);

  const [formEditar, setFormEditar] = useState({
    servico: "",
    data: "",
    hora: "",
    profissional: "",
  });
  const router = useRouter();

  useEffect(() => {

  const admin = localStorage.getItem("adminLogado");

  if (!admin) {
    router.push("/login");
    return;
  }

  carregarAgendamentos();

}, []);

  async function carregarAgendamentos() {

    const response = await fetch("/api/agendamentos");

    const data = await response.json();

    setAgendamentos(data);
  }

  async function atualizarStatus(codigo, status) {

    await fetch("/api/agendamentos", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        codigo,
        status,
      }),
    });

    carregarAgendamentos();
  }

  async function excluirAgendamento(codigo) {

  const confirmar = confirm(
    "Deseja excluir este agendamento?"
  );

  if (!confirmar) return;

  await fetch("/api/agendamentos", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      codigo,
    }),
  });

  carregarAgendamentos();
}
function abrirEdicao(item) {

  setEditando(item.codigo);

  setFormEditar({
    servico: item.servico,
    data: item.data,
    hora: item.hora,
    profissional: item.profissional,
  });
}
  async function salvarEdicao(codigo) {

  const atualizado = agendamentos.map((item) => {

    if (item.codigo === codigo) {

      return {
        ...item,
        ...formEditar,
      };
    }

    return item;
  });

  await fetch("/api/agendamentos-editar", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(atualizado),
  });

  setEditando(null);

  carregarAgendamentos();
}

  const total = agendamentos.length;

  const aguardando = agendamentos.filter(
    (item) => item.status === "Aguardando"
  ).length;

  const finalizados = agendamentos.filter(
    (item) => item.status === "Finalizado"
  ).length;

  // Dados do gráfico
  const servicos = agendamentos.reduce((acc, item) => {

    acc[item.servico] = (acc[item.servico] || 0) + 1;

    return acc;

  }, {});

  const dadosGrafico = Object.keys(servicos).map((key) => ({
    name: key,
    value: servicos[key],
  }));

  const COLORS = [
    "#f97316",
    "#3b82f6",
    "#22c55e",
    "#a855f7",
  ];

  return (

    <div className="flex bg-orange-50 min-h-screen">

      <Sidebar />

      <main className="flex-1 p-6">

        <h1 className="text-4xl font-bold text-orange-600 mb-8">
          Dashboard PetCare
        </h1>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-gray-500 mb-2">
              Total de Agendamentos
            </h2>

            <p className="text-4xl font-bold text-orange-500">
              {total}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-gray-500 mb-2">
              Em Andamento
            </h2>

            <p className="text-4xl font-bold text-blue-500">
              {aguardando}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-gray-500 mb-2">
              Finalizados
            </h2>

            <p className="text-4xl font-bold text-green-500">
              {finalizados}
            </p>
          </div>

        </div>

        {/* Gráfico */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-10">

          <h2 className="text-2xl font-bold text-gray-700 mb-6">
            Serviços Mais Agendados
          </h2>

          <div className="w-full h-80">

            <ResponsiveContainer width="100%" height={300}>

              <PieChart>

                <Pie
                  data={dadosGrafico}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={120}
                  label
                >

                  {dadosGrafico.map((_, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* Tabela */}
        <div className="bg-white rounded-2xl shadow-lg p-6 overflow-auto">

          <h2 className="text-2xl font-bold text-gray-700 mb-6">
            Agenda do Dia
          </h2>

          <table className="w-full">

            <thead>

              <tr className="border-b text-left">

                <th className="pb-3">Código</th>
                <th className="pb-3">Pet</th>
                <th className="pb-3">Serviço</th>
                <th className="pb-3">Data</th>
                <th className="pb-3">Hora</th>
                <th className="pb-3">Profissional</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Ações</th>

              </tr>

            </thead>

            <tbody>

              {agendamentos.map((item) => (

                <tr
                  key={item.codigo}
                  className="border-b hover:bg-orange-50"
                >

                  <td className="py-4">{item.codigo}</td>

                  <td className="text-3xl">🐶</td>

                  <td>

                    {editando === item.codigo ? (

                      <input
                        value={formEditar.servico}
                        onChange={(e) =>
                          setFormEditar({
                            ...formEditar,
                            servico: e.target.value,
                          })
                        }
                        className="border rounded-xl px-3 py-2"
                      />

                    ) : (
                      item.servico
                    )}

                  </td>

                  <td>

                    {editando === item.codigo ? (

                      <input
                        type="date"
                        value={formEditar.data}
                        onChange={(e) =>
                          setFormEditar({
                            ...formEditar,
                            data: e.target.value,
                          })
                        }
                        className="border rounded-xl px-3 py-2"
                      />

                    ) : (
                      item.data
                    )}

                  </td>

                  <td>

                    {editando === item.codigo ? (

                      <input
                        type="time"
                        value={formEditar.hora}
                        onChange={(e) =>
                          setFormEditar({
                            ...formEditar,
                            hora: e.target.value,
                          })
                        }
                        className="border rounded-xl px-3 py-2"
                      />

                    ) : (
                      item.hora
                    )}

                  </td>

                  <td>

                    {editando === item.codigo ? (

                      <input
                        value={formEditar.profissional}
                        onChange={(e) =>
                          setFormEditar({
                            ...formEditar,
                            profissional: e.target.value,
                          })
                        }
                        className="border rounded-xl px-3 py-2"
                      />

                    ) : (
                      item.profissional
                    )}

                  </td>

                  <td>

                    <select
                      value={item.status}
                      onChange={(e) =>
                        atualizarStatus(
                          item.codigo,
                          e.target.value
                        )
                      }
                      className="border rounded-xl px-3 py-2"
                    >

                      <option>Aguardando</option>
                      <option>No Banho</option>
                      <option>Finalizado</option>
                      <option>Entregue</option>

                    </select>

                  </td>
                  <td className="flex gap-2 py-3">

                    {editando === item.codigo ? (

                      <button
                        onClick={() =>
                          salvarEdicao(item.codigo)
                        }
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl"
                      >
                        Salvar
                      </button>

                    ) : (

                      <button
                        onClick={() =>
                          abrirEdicao(item)
                        }
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl"
                      >
                        Editar
                      </button>

                    )}

                    <button
                      onClick={() =>
                        excluirAgendamento(item.codigo)
                      }
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
                    >
                      Excluir
                    </button>

                  </td>
                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </main>

    </div>
  );
}