// src/pages/InterviewPrep.tsx
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import MockInterviewSimulator from '../components/interviewPrep/MockInterviewSimulator';
import QuestionBank from '../components/interviewPrep/QuestionBank';

const InterviewPrep = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Interview Preparation</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Practice with AI-powered mock interviews, access a library of company-specific questions, 
          and get real-time feedback to improve your interview skills.
        </p>
      </div>
      
      <Tabs defaultValue="simulator" className="w-full">
        <TabsList className="w-full max-w-md mx-auto grid grid-cols-2 mb-8">
          <TabsTrigger value="simulator">Interview Simulator</TabsTrigger>
          <TabsTrigger value="questions">Question Bank</TabsTrigger>
        </TabsList>
        
        <TabsContent value="simulator" className="mt-4">
          <MockInterviewSimulator />
        </TabsContent>
        
        <TabsContent value="questions" className="mt-4">
          <QuestionBank />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InterviewPrep;