"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function handleLogin(e) {

    e.preventDefault();

    if (
      email === "admin@petcare.com" &&
      senha === "123456"
    ) {

      localStorage.setItem("adminLogado", "true");

      router.push("/dashboard");

    } else {

      alert("Email ou senha inválidos");

    }
  }

  return (

    <main className="min-h-screen bg-orange-50 flex justify-center items-center p-6">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

        <h1 className="text-4xl font-bold text-orange-600 text-center mb-8">
          Login Administrativo
        </h1>

        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-4"
        >

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-3 rounded-xl"
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="border p-3 rounded-xl"
          />

          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition"
          >
            Entrar
          </button>

        </form>

      </div>

    </main>

  );
}