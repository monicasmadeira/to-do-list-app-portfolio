import { TaskList } from "@/components/task-list";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useLocation } from "wouter";

export default function Home() {
  const [_, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background p-3 sm:p-4 relative">
      <header className="fixed top-0 left-0 right-0 h-16 px-4 flex items-center bg-background/95 backdrop-blur border-b z-10">
        <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Lista de Tarefas
        </h1>
      </header>

      <main className="mt-20 mb-20">
        <TaskList />
      </main>

      <Button
        size="icon"
        className="h-14 w-14 rounded-full fixed bottom-6 right-6 shadow-lg"
        onClick={() => setLocation("/new")}
      >
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  );
}