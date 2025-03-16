import EmailForm from "./components/EmailForm";

export default function Home() {
  return (
    <section className="bg-gray-900 text-white min-h-screen flex flex-col justify-between">
      <nav className="h-24 bg-gray-800 flex justify-between items-center px-8 text-white">
        <span className="font-bold uppercase text-2xl">Emailify</span>

        <div className="flex gap-x-3"></div>
      </nav>
      <main className="flex flex-col gap-10 my-8">
        <EmailForm />
      </main>
    </section>
  );
}
