import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-orange-50 flex flex-col items-center justify-center p-6">
      <h1 className="text-5xl font-bold text-orange-600 mb-4">
        PetCare
      </h1>

      <p className="text-gray-700 text-center max-w-md mb-10">
        Sistema de gerenciamento para pet shop com cadastro de pets,
        tutores e agendamentos de banho e tosa.
      </p>

      <div className="flex flex-col gap-4 w-full max-w-sm">
        <Link href="/cadastro-tutor">
          <button className="bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition w-full">
            Cadastrar e Agendar Pet
          </button>
        </Link>

        <Link href="/acompanhar">
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-semibold transition w-full">
            Acompanhar Agendamento
          </button>
        </Link>

        <button className="bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold transition">
          Sobre o Pet Shop
        </button>

        <button className="bg-gray-700 hover:bg-gray-800 text-white py-3 rounded-xl font-semibold transition">
          Contato / Endereço
        </button>

        <Link href="/dashboard">
          <button className="bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold transition w-full">
            Dashboard Administrativo
          </button>
        </Link>

        <Link href="/login">
          <button className="bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition w-full">
            Área Administrativa
          </button>
        </Link>
      </div>
    </main>
  );
}