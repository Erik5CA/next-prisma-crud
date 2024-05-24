import TaksCard from "@/components/TaksCard";
import { prisma } from "@/lib/prisma";
import { unstable_noStore as noStore } from "next/cache";
// import { useRouter } from "next/navigation";

async function loadTasks() {
  // Getting the tasks with request to api
  // const res = await fetch('http://localhost/api/tasks')
  // const data = await res.json()
  // console.log(data)
  noStore();
  const data = await prisma.task.findMany();
  return data;
}
//coment--
// export const dynamic = "force-dynamic";

async function HomePage() {
  // const router = useRouter();
  // router.refresh();
  const tasks = await loadTasks();
  return (
    <div className="container mx-auto my-5">
      <h1 className="text-3xl font-bold mb-2">Tareas</h1>
      <div className="grid md:grid-cols-3 gap-3 grid-cols-1">
        {tasks.map((task) => (
          <TaksCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
