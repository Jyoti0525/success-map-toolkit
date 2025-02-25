
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Percent } from "lucide-react";

const recommendations = [
  {
    company: "TechCorp",
    match: 95,
    position: "Software Engineer",
    deadline: "2024-03-25",
  },
  {
    company: "InnoSoft",
    match: 88,
    position: "Full Stack Developer",
    deadline: "2024-03-28",
  },
  {
    company: "DataDream",
    match: 82,
    position: "Frontend Engineer",
    deadline: "2024-04-01",
  },
];

export const CompanyRecommendations = () => {
  return (
    <Card className="col-span-3 animate-scaleIn">
      <CardHeader>
        <CardTitle className="text-navy">Recommended Companies</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendations.map((rec, index) => (
            <div
              key={index}
              className="p-4 rounded-lg border border-gray-100 hover:border-navy/20 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Building className="h-5 w-5 text-navy" />
                  <span className="font-medium">{rec.company}</span>
                </div>
                <div className="flex items-center text-green-500">
                  <Percent className="h-4 w-4 mr-1" />
                  <span className="font-medium">{rec.match}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600">{rec.position}</p>
              <p className="text-xs text-gray-500 mt-2">
                Apply by: {new Date(rec.deadline).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
