"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Confirmacao() {

  const [agendamento, setAgendamento] = useState(null);

  useEffect(() => {

    const dados = localStorage.getItem("agendamentoAtual");

    if (dados) {
      setAgendamento(JSON.parse(dados));
    }

  }, []);

  if (!agendamento) {
    return (
      <main className="min-h-screen flex justify-center items-center">
        <p>Carregando...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-orange-50 flex justify-center items-center p-6">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl text-center">

        <h1 className="text-4xl font-bold text-green-600 mb-6">
          Agendamento Confirmado!
        </h1>

        <div className="space-y-4 text-lg text-gray-700">

          <p>
            <strong>Serviço:</strong> {agendamento.servico}
          </p>

          <p>
            <strong>Data:</strong> {agendamento.data}
          </p>

          <p>
            <strong>Horário:</strong> {agendamento.hora}
          </p>

          <p>
            <strong>Profissional:</strong> {agendamento.profissional}
          </p>

          <p>
            <strong>Duração:</strong> {agendamento.duracao} min
          </p>

          <p className="text-2xl font-bold text-orange-600 mt-6">
            Nº {agendamento.codigo}
          </p>

        </div>

        <div className="flex flex-col gap-4 mt-8">

          <Link href="/">
            <button className="bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition w-full">
              Voltar ao Início
            </button>
          </Link>

          <Link href="/acompanhar">
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-semibold transition w-full">
              Acompanhar Agendamento
            </button>
          </Link>

        </div>

      </div>

    </main>
  );
}