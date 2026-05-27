"use client";

import { useState } from "react";

export default function Acompanhar() {

  const [codigo, setCodigo] = useState("");
  const [agendamento, setAgendamento] = useState(null);

  async function buscarAgendamento() {

    const response = await fetch("/api/agendamentos");

    const dados = await response.json();

    const encontrado = dados.find(
      (item) => item.codigo.toString() === codigo
    );

    if (encontrado) {
      setAgendamento(encontrado);
    } else {
      alert("Agendamento não encontrado");
    }
  }

  const corStatus = {
    "Aguardando": "bg-yellow-400",
    "No Banho": "bg-blue-500",
    "Finalizado": "bg-green-500",
    "Entregue": "bg-gray-500",
  };

  return (
    <main className="min-h-screen bg-orange-50 flex justify-center items-center p-6">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl">

        <h1 className="text-3xl font-bold text-orange-600 mb-8 text-center">
          Acompanhamento do Agendamento
        </h1>

        <div className="flex gap-4 mb-8">

          <input
            type="text"
            placeholder="Digite o código do agendamento"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            className="border p-3 rounded-xl flex-1"
          />

          <button
            onClick={buscarAgendamento}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 rounded-xl font-semibold"
          >
            Buscar
          </button>

        </div>

        {agendamento && (

          <div className="space-y-5 text-gray-700">

            <div className="flex justify-between border-b pb-3">
              <span className="font-semibold">Código:</span>
              <span>{agendamento.codigo}</span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="font-semibold">Serviço:</span>
              <span>{agendamento.servico}</span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="font-semibold">Data:</span>
              <span>{agendamento.data}</span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="font-semibold">Hora:</span>
              <span>{agendamento.hora}</span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="font-semibold">Profissional:</span>
              <span>{agendamento.profissional}</span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="font-semibold">Duração:</span>
              <span>{agendamento.duracao} min</span>
            </div>

            <div className="flex justify-between items-center pt-3">

              <span className="font-semibold">Status:</span>

              <span
                className={`${corStatus[agendamento.status]} text-white px-4 py-2 rounded-xl font-semibold`}
              >
                {agendamento.status}
              </span>

            </div>

          </div>

        )}

      </div>

    </main>
  );
}