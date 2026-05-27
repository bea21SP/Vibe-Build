"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CadastroPet() {

  const router = useRouter();

  const [formData, setFormData] = useState({
    nome: "",
    especie: "",
    raca: "",
    sexo: "",
    idade: "",
    porte: "",
    pelagem: "",
    peso: "",
    avatar: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await fetch("/api/pets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    router.push("/agendamento");
  }

  return (
    <main className="min-h-screen bg-orange-50 p-6 flex justify-center items-center">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl">

        <h1 className="text-3xl font-bold text-orange-600 mb-6 text-center">
          Cadastro do Pet
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >

          <input
            type="text"
            name="nome"
            placeholder="Nome do Pet"
            onChange={handleChange}
            className="border p-3 rounded-xl"
          />

          <input
            type="text"
            name="especie"
            placeholder="Espécie"
            onChange={handleChange}
            className="border p-3 rounded-xl"
          />

          <input
            type="text"
            name="raca"
            placeholder="Raça"
            onChange={handleChange}
            className="border p-3 rounded-xl"
          />

          <select
            name="sexo"
            onChange={handleChange}
            className="border p-3 rounded-xl"
          >
            <option value="">Sexo</option>
            <option>Macho</option>
            <option>Fêmea</option>
          </select>

          <input
            type="text"
            name="idade"
            placeholder="Idade Aproximada"
            onChange={handleChange}
            className="border p-3 rounded-xl"
          />

          <select
            name="porte"
            onChange={handleChange}
            className="border p-3 rounded-xl"
          >
            <option value="">Porte</option>
            <option>Pequeno</option>
            <option>Médio</option>
            <option>Grande</option>
          </select>

          <input
            type="text"
            name="pelagem"
            placeholder="Pelagem"
            onChange={handleChange}
            className="border p-3 rounded-xl"
          />

          <input
            type="number"
            name="peso"
            placeholder="Peso"
            onChange={handleChange}
            className="border p-3 rounded-xl"
          />
          <div className="md:col-span-2">

  <p className="font-semibold text-gray-700 mb-3">
    Escolha um Avatar
  </p>

  <div className="flex gap-4 text-5xl">

    <button
      type="button"
      onClick={() =>
        setFormData({
          ...formData,
          avatar: "🐶",
        })
      }
      className={`p-3 rounded-2xl border-4 ${
        formData.avatar === "🐶"
          ? "border-orange-500"
          : "border-transparent"
      }`}
    >
      🐶
    </button>

    <button
      type="button"
      onClick={() =>
        setFormData({
          ...formData,
          avatar: "🐱",
        })
      }
      className={`p-3 rounded-2xl border-4 ${
        formData.avatar === "🐱"
          ? "border-orange-500"
          : "border-transparent"
      }`}
    >
      🐱
    </button>

    <button
      type="button"
      onClick={() =>
        setFormData({
          ...formData,
          avatar: "🐹",
        })
      }
      className={`p-3 rounded-2xl border-4 ${
        formData.avatar === "🐹"
          ? "border-orange-500"
          : "border-transparent"
      }`}
    >
      🐹
    </button>

    <button
      type="button"
      onClick={() =>
        setFormData({
          ...formData,
          avatar: "🐰",
        })
      }
      className={`p-3 rounded-2xl border-4 ${
        formData.avatar === "🐰"
          ? "border-orange-500"
          : "border-transparent"
      }`}
    >
      🐰
    </button>

  </div>

</div>
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition md:col-span-2"
          >
            Continuar para Agendamento
          </button>

        </form>

      </div>

    </main>
  );
}