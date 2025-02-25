// src/components/interviewPrep/MockInterviewSimulator.tsx
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

const MockInterviewSimulator = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState('technical');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  
  const interviewTypes = [
    { id: 'technical', name: 'Technical Interview' },
    { id: 'behavioral', name: 'Behavioral Interview' },
    { id: 'hr', name: 'HR Interview' }
  ];
  
  const questions = {
    technical: [
      "Explain the difference between a stack and a queue.",
      "What is the time complexity of binary search?", 
      "How would you implement a hash table from scratch?"
    ],
    behavioral: [
      "Tell me about a time you faced a challenge in a team project.",
      "How do you handle criticism?",
      "Describe a situation where you had to meet a tight deadline."
    ],
    hr: [
      "Why do you want to work for our company?",
      "Where do you see yourself in 5 years?",
      "What are your salary expectations?"
    ]
  };
  
  const handleStartRecording = () => {
    setIsRecording(true);
    // In a real app, you would start camera/mic access here
  };
  
  const handleStopRecording = () => {
    setIsRecording(false);
    // In a real app, you would stop recording and process the video/audio
  };
  
  const handleNextQuestion = () => {
    if (currentQuestion < questions[selectedInterview].length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCurrentQuestion(0); // Loop back to first question
    }
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle>AI Mock Interview Simulator</CardTitle>
        <CardDescription>Practice interviews with real-time AI feedback</CardDescription>
        <div className="mt-4">
          <Select
            value={selectedInterview}
            onValueChange={(value) => {
              setSelectedInterview(value);
              setCurrentQuestion(0);
            }}
          >
            <SelectTrigger className="w-[240px]">
              <SelectValue placeholder="Select interview type" />
            </SelectTrigger>
            <SelectContent>
              {interviewTypes.map((type) => (
                <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6 p-6 bg-slate-50 rounded-md border border-slate-200 min-h-[150px] flex items-center justify-center">
          {isRecording ? (
            <div className="flex flex-col items-center">
              <div className="w-full mb-6 text-center font-medium text-xl">
                {questions[selectedInterview][currentQuestion]}
              </div>
              <div className="animate-pulse flex items-center">
                <div className="w-3 h-3 bg-red-600 rounded-full mr-2"></div>
                <span className="text-red-600 font-medium">Recording...</span>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-slate-500 mb-4">
                Click "Start Interview" to begin your mock interview session
              </p>
              <p className="text-slate-400 text-sm">
                Make sure your camera and microphone are working
              </p>
            </div>
          )}
        </div>
        
        <Tabs defaultValue="tips" className="w-full">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="tips">Interview Tips</TabsTrigger>
            <TabsTrigger value="feedback">AI Feedback</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          <TabsContent value="tips" className="p-4">
            <ul className="list-disc pl-5 space-y-2">
              <li>Maintain good eye contact with the camera</li>
              <li>Speak clearly and at a moderate pace</li>
              <li>Structure your answers using the STAR method</li>
              <li>Prepare examples that highlight your skills</li>
            </ul>
          </TabsContent>
          <TabsContent value="feedback" className="p-4">
            {isRecording ? (
              <p className="text-center text-slate-500">Feedback will appear here after your interview</p>
            ) : (
              <div className="space-y-3">
                <p>No recent interview feedback available</p>
                <p className="text-sm text-slate-500">Start a new interview to receive AI feedback</p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="history" className="p-4">
            <p className="text-center text-slate-500">Your past interview sessions will appear here</p>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        {isRecording ? (
          <>
            <Button variant="outline" onClick={handleNextQuestion}>Next Question</Button>
            <Button variant="destructive" onClick={handleStopRecording}>End Interview</Button>
          </>
        ) : (
          <>
            <Button variant="outline">View Sample</Button>
            <Button onClick={handleStartRecording}>Start Interview</Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default MockInterviewSimulator;