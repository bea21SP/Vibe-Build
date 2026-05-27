"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Agendamento() {

  const router = useRouter();

  const [formData, setFormData] = useState({
    servico: "",
    data: "",
    hora: "",
    profissional: "",
    duracao: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await fetch("/api/agendamentos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    localStorage.setItem(
      "agendamentoAtual",
      JSON.stringify(data.agendamento)
    );

    router.push("/confirmacao");
  }

  return (
    <main className="min-h-screen bg-orange-50 p-6 flex justify-center items-center">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl">

        <h1 className="text-3xl font-bold text-orange-600 mb-6 text-center">
          Agendamento de Serviço
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >

          <select
            name="servico"
            onChange={handleChange}
            className="border p-3 rounded-xl"
          >
            <option value="">Selecione o Serviço</option>
            <option>Banho</option>
            <option>Tosa</option>
            <option>Banho + Tosa</option>
            <option>Consulta</option>
          </select>

          <input
            type="date"
            name="data"
            onChange={handleChange}
            className="border p-3 rounded-xl"
          />

          <input
            type="time"
            name="hora"
            onChange={handleChange}
            className="border p-3 rounded-xl"
          />

          <select
            name="profissional"
            onChange={handleChange}
            className="border p-3 rounded-xl"
          >
            <option value="">Profissional</option>
            <option>Carlos</option>
            <option>Fernanda</option>
            <option>Juliana</option>
          </select>

          <input
            type="number"
            name="duracao"
            placeholder="Duração Estimada"
            onChange={handleChange}
            className="border p-3 rounded-xl md:col-span-2"
          />

          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition md:col-span-2"
          >
            Confirmar Agendamento
          </button>

        </form>

      </div>

    </main>
  );
}