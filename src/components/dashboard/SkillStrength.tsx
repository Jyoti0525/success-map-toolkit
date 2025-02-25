
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";

const data = [
  { subject: "Technical", student: 80, benchmark: 90 },
  { subject: "Communication", student: 85, benchmark: 85 },
  { subject: "Leadership", student: 70, benchmark: 80 },
  { subject: "Problem Solving", student: 90, benchmark: 85 },
  { subject: "Teamwork", student: 85, benchmark: 90 },
];

export const SkillStrength = () => {
  return (
    <Card className="col-span-2 animate-scaleIn">
      <CardHeader>
        <CardTitle className="text-navy">Skill Strength</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={data}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="subject" stroke="#1A365D" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar
                name="Your Skills"
                dataKey="student"
                stroke="#1A365D"
                fill="#1A365D"
                fillOpacity={0.2}
              />
              <Radar
                name="Benchmark"
                dataKey="benchmark"
                stroke="#FFD700"
                fill="#FFD700"
                fillOpacity={0.2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
