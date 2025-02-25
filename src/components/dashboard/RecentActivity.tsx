
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, CheckCircle, Send, FileEdit } from "lucide-react";

const activities = [
  {
    type: "interview",
    title: "Mock Interview Completed",
    company: "TechCorp",
    time: "2 hours ago",
    icon: CheckCircle,
    color: "text-green-500",
  },
  {
    type: "application",
    title: "Application Submitted",
    company: "InnoSoft",
    time: "5 hours ago",
    icon: Send,
    color: "text-blue-500",
  },
  {
    type: "resume",
    title: "Resume Updated",
    company: null,
    time: "1 day ago",
    icon: FileEdit,
    color: "text-purple-500",
  },
];

export const RecentActivity = () => {
  return (
    <Card className="col-span-2 animate-scaleIn">
      <CardHeader>
        <CardTitle className="text-navy">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 border-b border-gray-100 pb-3 last:border-0 last:pb-0"
            >
              <div className={`${activity.color}`}>
                <activity.icon size={20} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{activity.title}</p>
                {activity.company && (
                  <p className="text-xs text-gray-500">{activity.company}</p>
                )}
              </div>
              <div className="flex items-center text-xs text-gray-500">
                <Clock size={12} className="mr-1" />
                {activity.time}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
