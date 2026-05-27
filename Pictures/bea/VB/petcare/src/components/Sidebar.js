"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Sidebar() {
    const router = useRouter();

    function logout() {

    localStorage.removeItem("adminLogado");

    router.push("/login");
  }

  return (

    <aside className="w-64 bg-white shadow-xl min-h-screen p-6">

      <h1 className="text-3xl font-bold text-orange-600 mb-10">
        PetCare
      </h1>

      <nav className="flex flex-col gap-4">

        <Link href="/">
          <button className="w-full text-left bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-xl transition">
            Home
          </button>
        </Link>

        <Link href="/dashboard">
          <button className="w-full text-left bg-purple-500 hover:bg-purple-600 text-white px-4 py-3 rounded-xl transition">
            Dashboard
          </button>
        </Link>

        <Link href="/cadastro-tutor">
          <button className="w-full text-left bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-xl transition">
            Cadastro Tutor
          </button>
        </Link>

        <Link href="/cadastro-pet">
          <button className="w-full text-left bg-pink-500 hover:bg-pink-600 text-white px-4 py-3 rounded-xl transition">
            Cadastro Pet
          </button>
        </Link>

        <Link href="/agendamento">
          <button className="w-full text-left bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-xl transition">
            Agendamento
          </button>
        </Link>

        <Link href="/acompanhar">
          <button className="w-full text-left bg-gray-700 hover:bg-gray-800 text-white px-4 py-3 rounded-xl transition">
            Acompanhar
          </button>
        </Link>

        <button
            onClick={logout}
            className="w-full text-left bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-xl transition mt-6"
            >
            Sair
        </button>

      </nav>

    </aside>

  );
}