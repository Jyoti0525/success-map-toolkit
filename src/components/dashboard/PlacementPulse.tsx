
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { date: "Jan", activity: 4, performance: 3 },
  { date: "Feb", activity: 3, performance: 4 },
  { date: "Mar", activity: 6, performance: 5 },
  { date: "Apr", activity: 8, performance: 7 },
  { date: "May", activity: 7, performance: 6 },
];

export const PlacementPulse = () => {
  return (
    <Card className="col-span-3 animate-scaleIn">
      <CardHeader>
        <CardTitle className="text-navy">Placement Pulse</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="date" stroke="#1A365D" />
              <YAxis stroke="#1A365D" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="activity"
                stroke="#1A365D"
                strokeWidth={2}
                dot={{ fill: "#1A365D" }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="performance"
                stroke="#FFD700"
                strokeWidth={2}
                dot={{ fill: "#FFD700" }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
