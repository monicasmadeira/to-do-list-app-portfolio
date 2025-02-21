import { useQuery } from "@tanstack/react-query";
import { type Task } from "@shared/schema";
import { TaskItem } from "./task-item";
import { Skeleton } from "@/components/ui/skeleton";

export function TaskList() {
  const { data: tasks, isLoading } = useQuery<Task[]>({
    queryKey: ["/api/tasks"],
  });

  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }

  if (!tasks?.length) {
    return (
      <div className="text-center py-6 text-muted-foreground">
        No tasks yet. Add one above!
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}
