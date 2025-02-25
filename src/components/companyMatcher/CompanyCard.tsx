// src/components/companyMatcher/CompanyCard.tsx
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';

type CompanyCardProps = {
  company: {
    id: string;
    name: string;
    logo?: string;
    matchPercentage: number;
    role: string;
    location: string;
    skills: string[];
    deadline: string;
  };
};

const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
  const getMatchColor = (percentage: number) => {
    if (percentage >= 85) return 'text-green-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-orange-600';
  };
  
  const getProgressColor = (percentage: number) => {
    if (percentage >= 85) return 'bg-green-600';
    if (percentage >= 70) return 'bg-yellow-600';
    return 'bg-orange-600';
  };
  
  return (
    <Card className="w-full overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{company.name}</CardTitle>
            <CardDescription>{company.role}</CardDescription>
          </div>
          <div className={`text-lg font-bold ${getMatchColor(company.matchPercentage)}`}>
            {company.matchPercentage}% Match
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Match Score</span>
            <span>{company.matchPercentage}%</span>
          </div>
          <Progress 
            value={company.matchPercentage} 
            className="h-2"
            indicatorClassName={getProgressColor(company.matchPercentage)}
          />
        </div>
        
        <div className="mb-4">
          <div className="text-sm text-slate-500 mb-2">Required Skills</div>
          <div className="flex flex-wrap gap-2">
            {company.skills.map((skill, index) => (
              <Badge key={index} variant="outline">{skill}</Badge>
            ))}
          </div>
        </div>
        
        <div className="flex justify-between text-sm text-slate-500 mt-4">
          <div>{company.location}</div>
          <div>Apply by: {company.deadline}</div>
        </div>
      </CardContent>
      <CardFooter className="bg-slate-50 border-t flex justify-between">
        <Button variant="outline">View Details</Button>
        <Button>Apply Now</Button>
      </CardFooter>
    </Card>
  );
};

export default CompanyCard;