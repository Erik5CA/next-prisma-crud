import Link from "next/link";

function NotFound() {
  return (
    <section className="flex h-[calc(100vh-7rem)] justify-center items-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Pagina no encontrada.</h1>
        <Link href="/" className="text-blue-500">
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}

export default NotFound;
