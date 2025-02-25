
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";

const deadlines = [
  {
    company: "TechCorp",
    deadline: "2024-03-20",
    type: "Application",
  },
  {
    company: "InnoSoft",
    deadline: "2024-03-22",
    type: "Interview",
  },
  {
    company: "DataDream",
    deadline: "2024-03-25",
    type: "Assessment",
  },
];

export const Deadlines = () => {
  return (
    <Card className="animate-scaleIn">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-navy text-sm font-medium">
          Upcoming Deadlines
        </CardTitle>
        <CalendarDays className="h-4 w-4 text-navy" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {deadlines.map((deadline, index) => (
            <div
              key={index}
              className="flex items-center border-b border-gray-100 pb-2 last:border-0 last:pb-0"
            >
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none text-navy">
                  {deadline.company}
                </p>
                <p className="text-xs text-gray-500">
                  {deadline.type} • {new Date(deadline.deadline).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
