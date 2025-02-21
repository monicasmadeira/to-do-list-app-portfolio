import { type Task } from "@shared/schema";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash2, Pencil } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task }: TaskItemProps) {
  const { toast } = useToast();
  const [_, setLocation] = useLocation();

  const updateMutation = useMutation({
    mutationFn: async (completed: boolean) => {
      await apiRequest("PATCH", `/api/tasks/${task.id}/complete`, { completed });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível atualizar a tarefa",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("DELETE", `/api/tasks/${task.id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
      toast({
        title: "Tarefa excluída",
        description: "A tarefa foi removida",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível excluir a tarefa",
      });
    },
  });

  return (
    <div className="flex items-start justify-between p-4 border rounded-lg bg-card hover:bg-accent/10 transition-colors">
      <div className="flex items-start gap-4">
        <Checkbox
          className="h-5 w-5 mt-1"
          checked={task.completed}
          disabled={updateMutation.isPending}
          onCheckedChange={(checked) => {
            updateMutation.mutate(checked as boolean);
          }}
        />
        <div className="space-y-1">
          <h3 className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}>
            {task.title}
          </h3>
          <p className={`text-sm text-muted-foreground ${task.completed ? "line-through" : ""}`}>
            {task.description}
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9"
          onClick={() => setLocation(`/edit/${task.id}`)}
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9"
          disabled={deleteMutation.isPending}
          onClick={() => deleteMutation.mutate()}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}