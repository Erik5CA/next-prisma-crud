"use client";

import { useRouter } from "next/navigation";

function TaksCard({ task }) {
  const router = useRouter();
  return (
    <div
      className="bg-slate-700 p-3 hover:bg-slate-500 cursor-pointer rounded-md"
      onClick={() => router.push(`/tasks/edit/${task.id}`)}
    >
      <h3 className="font-bold text-2xl mb-2 capitalize">{task.title}</h3>
      <p>{task.description}</p>
      <p>{new Date(task.createdAt).toLocaleDateString()}</p>
    </div>
  );
}

export default TaksCard;
