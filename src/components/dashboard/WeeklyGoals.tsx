
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const goals = [
  { name: "Mock Interviews", completed: 3, total: 5, color: "bg-blue-500" },
  { name: "Applications", completed: 8, total: 10, color: "bg-green-500" },
  { name: "Skills Practice", completed: 2, total: 4, color: "bg-purple-500" },
];

export const WeeklyGoals = () => {
  return (
    <Card className="col-span-2 animate-scaleIn">
      <CardHeader>
        <CardTitle className="text-navy">Weekly Goals</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {goals.map((goal, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{goal.name}</span>
              <span className="text-gray-500">
                {goal.completed}/{goal.total}
              </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full ${goal.color} transition-all duration-1000 ease-out`}
                style={{
                  width: `${(goal.completed / goal.total) * 100}%`,
                }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
