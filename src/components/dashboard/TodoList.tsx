
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CheckCircle, Circle, List } from "lucide-react";

const todos = [
  {
    task: "Update resume with latest project",
    priority: "high",
    completed: false,
  },
  {
    task: "Practice system design questions",
    priority: "medium",
    completed: true,
  },
  {
    task: "Research TechCorp culture",
    priority: "low",
    completed: false,
  },
];

const priorityColors = {
  high: "text-red-500",
  medium: "text-yellow-500",
  low: "text-green-500",
};

export const TodoList = () => {
  return (
    <Card className="animate-scaleIn">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-navy text-sm font-medium">
          To-Do List
        </CardTitle>
        <List className="h-4 w-4 text-navy" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {todos.map((todo, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b border-gray-100 pb-2 last:border-0 last:pb-0"
            >
              <div className="flex items-center space-x-2">
                {todo.completed ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <Circle className={`h-4 w-4 ${priorityColors[todo.priority]}`} />
                )}
                <span className={todo.completed ? "text-gray-500 line-through" : ""}>
                  {todo.task}
                </span>
              </div>
              <span className={`text-xs ${priorityColors[todo.priority]}`}>
                {todo.priority}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
