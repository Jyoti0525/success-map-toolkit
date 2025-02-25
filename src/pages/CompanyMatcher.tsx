// src/pages/CompanyMatcher.tsx
import React, { useState } from 'react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import CompanyCard from '../components/companyMatcher/CompanyCard';
import MatchingFilters from '../components/companyMatcher/MatchingFilters';

const CompanyMatcher = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data
  const companies = [
    {
      id: 'techcorp',
      name: 'TechCorp',
      matchPercentage: 95,
      role: 'Software Engineer',
      location: 'Remote',
      skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
      deadline: '3/25/2025'
    },
    {
      id: 'innosoft',
      name: 'InnoSoft',
      matchPercentage: 88,
      role: 'Full Stack Developer',
      location: 'Hybrid',
      skills: ['JavaScript', 'React', 'MongoDB', 'Express'],
      deadline: '3/28/2025'
    },
    {
      id: 'datadream',
      name: 'DataDream',
      matchPercentage: 82,
      role: 'Frontend Engineer',
      location: 'On-site',
      skills: ['React', 'CSS', 'HTML', 'UX Design'],
      deadline: '4/1/2025'
    },
    {
      id: 'cloudwave',
      name: 'CloudWave',
      matchPercentage: 78,
      role: 'Cloud Developer',
      location: 'Remote',
      skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
      deadline: '3/30/2025'
    },
    {
      id: 'innovatetech',
      name: 'InnovateTech',
      matchPercentage: 75,
      role: 'Product Manager',
      location: 'Hybrid',
      skills: ['Product Strategy', 'Agile', 'User Research', 'Roadmapping'],
      deadline: '4/5/2025'
    },
  ];
  
  const filteredCompanies = companies.filter(company => {
    return company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           company.role.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Company Matcher</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Find your perfect company match based on your skills, preferences, and career goals.
          Get personalized recommendations tailored to your profile.
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/4">
          <MatchingFilters />
        </div>
        
        <div className="md:w-3/4">
          <div className="mb-6">
            <Input
              placeholder="Search companies or roles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          
          <Tabs defaultValue="best-matches" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="best-matches">Best Matches</TabsTrigger>
              <TabsTrigger value="recently-added">Recently Added</TabsTrigger>
              <TabsTrigger value="saved">Saved</TabsTrigger>
            </TabsList>
            
            <TabsContent value="best-matches" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredCompanies.map(company => (
                  <CompanyCard key={company.id} company={company} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="recently-added" className="mt-0">
              <div className="text-center py-12 text-slate-500">
                No recently added companies to display
              </div>
            </TabsContent>
            
            <TabsContent value="saved" className="mt-0">
              <div className="text-center py-12 text-slate-500">
                You haven't saved any companies yet
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CompanyMatcher;