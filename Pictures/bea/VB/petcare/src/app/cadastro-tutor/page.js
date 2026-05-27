"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CadastroTutor() {

  const router = useRouter();

  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    telefone: "",
    email: "",
    cep: "",
    estado: "",
    bairro: "",
    numero: "",
    complemento: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await fetch("/api/tutores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    router.push("/cadastro-pet");
  }

  return (
    <main className="min-h-screen bg-orange-50 p-6 flex justify-center items-center">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl">

        <h1 className="text-3xl font-bold text-orange-600 mb-6 text-center">
          Cadastro do Tutor
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >

          <input
            type="text"
            name="nome"
            placeholder="Nome do Tutor"
            onChange={handleChange}
            className="border p-3 rounded-xl"
          />

          <input
            type="text"
            name="cpf"
            placeholder="CPF"
            onChange={handleChange}
            className="border p-3 rounded-xl"
          />

          <input
            type="text"
            name="telefone"
            placeholder="Telefone"
            onChange={handleChange}
            className="border p-3 rounded-xl"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="border p-3 rounded-xl"
          />

          <input
            type="text"
            name="cep"
            placeholder="CEP"
            onChange={handleChange}
            className="border p-3 rounded-xl"
          />

          <input
            type="text"
            name="estado"
            placeholder="Estado"
            onChange={handleChange}
            className="border p-3 rounded-xl"
          />

          <input
            type="text"
            name="bairro"
            placeholder="Bairro"
            onChange={handleChange}
            className="border p-3 rounded-xl"
          />

          <input
            type="text"
            name="numero"
            placeholder="Número"
            onChange={handleChange}
            className="border p-3 rounded-xl"
          />

          <input
            type="text"
            name="complemento"
            placeholder="Complemento"
            onChange={handleChange}
            className="border p-3 rounded-xl md:col-span-2"
          />

          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition md:col-span-2"
          >
            Próximo
          </button>

        </form>

      </div>

    </main>
  );
}