// src/components/interviewPrep/QuestionBank.tsx
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

const QuestionBank = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Mock data
  const companies = [
    { id: 'techcorp', name: 'TechCorp' },
    { id: 'innosoft', name: 'InnoSoft' },
    { id: 'datadream', name: 'DataDream' },
    { id: 'cloudwave', name: 'CloudWave' },
  ];
  
  const categories = [
    { id: 'technical', name: 'Technical' },
    { id: 'behavioral', name: 'Behavioral' },
    { id: 'hr', name: 'HR' },
    { id: 'rolespecific', name: 'Role-Specific' },
  ];
  
  const questions = [
    { 
      id: 1, 
      text: "Explain your approach to troubleshooting a complex system.",
      company: "techcorp",
      category: "technical",
      difficulty: "medium"
    },
    { 
      id: 2, 
      text: "Describe a situation where you had to prioritize multiple important tasks.",
      company: "innosoft", 
      category: "behavioral",
      difficulty: "easy"
    },
    { 
      id: 3, 
      text: "How would you design a scalable notification system?",
      company: "cloudwave", 
      category: "technical",
      difficulty: "hard"
    },
    { 
      id: 4, 
      text: "What experience do you have with data visualization?",
      company: "datadream", 
      category: "rolespecific",
      difficulty: "medium"
    },
    { 
      id: 5, 
      text: "Where do you see yourself in 5 years?",
      company: "techcorp", 
      category: "hr",
      difficulty: "easy"
    },
  ];
  
  const filteredQuestions = questions.filter(question => {
    const matchesSearch = question.text.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCompany = selectedCompany === 'all' || question.company === selectedCompany;
    const matchesCategory = selectedCategory === 'all' || question.category === selectedCategory;
    
    return matchesSearch && matchesCompany && matchesCategory;
  });
  
  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle>Interview Question Bank</CardTitle>
        <CardDescription>Browse and practice common interview questions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <Input
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <div className="flex gap-2">
            <Select value={selectedCompany} onValueChange={setSelectedCompany}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Company" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Companies</SelectItem>
                {companies.map((company) => (
                  <SelectItem key={company.id} value={company.id}>{company.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-4">
          {filteredQuestions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No questions match your search criteria
            </div>
          ) : (
            filteredQuestions.map((question) => {
              const company = companies.find(c => c.id === question.company);
              const category = categories.find(c => c.id === question.category);
              
              return (
                <div 
                  key={question.id} 
                  className="p-4 border rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-medium text-lg">{question.text}</p>
                    <Badge className={getDifficultyColor(question.difficulty)}>
                      {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Badge variant="outline">{company?.name}</Badge>
                    <Badge variant="outline">{category?.name}</Badge>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button variant="outline" size="sm">Save</Button>
                    <Button size="sm" className="ml-2">Practice</Button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionBank;