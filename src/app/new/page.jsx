"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function NewPage({ params }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (params.id) {
      const getTask = async () => {
        const res = await fetch(`/api/tasks/${params.id}`);
        const data = await res.json();
        setTitle(data.title);
        setDescription(data.description);
      };
      getTask();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (params.id) {
      const res = await fetch(`/api/tasks/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });
      const data = await res.json();
    } else {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });
      const data = await res.json();
    }
    router.refresh();
    router.push("/");
  };

  const handleDelete = async () => {
    const res = await fetch(`/api/tasks/${params.id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    // console.log(data);
    router.refresh();
    router.push("/");
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <form
        className="bg-slate-800 p-10 w-1/4 rounded-md"
        onSubmit={handleSubmit}
      >
        <label htmlFor="title" className="font-bold text-sm ">
          Titulo de la Tarea
        </label>
        <input
          id="title"
          type="text"
          className="border border-gray-400 p-2 mb-4 w-full text-black"
          placeholder="Titulo"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        <label htmlFor="description" className="font-bold text-sm">
          Descripcion de la tarea
        </label>
        <textarea
          id="description"
          rows={3}
          className="border border-gray-400 p-2 mb-4 w-full text-black"
          placeholder="Describe tu tarea..."
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        ></textarea>

        <button
          type="submit"
          className="bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
        >
          {params.id ? "Actualizar" : "Crear"}
        </button>

        {params.id && (
          <button
            type="button"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md ml-4"
            onClick={handleDelete}
          >
            Eliminar
          </button>
        )}
      </form>
    </div>
  );
}

export default NewPage;
