// src/pages/InterviewPrep.tsx
import { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

const InterviewPrep = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("simulator");
  const [isRecording, setIsRecording] = useState(false);
  const [selectedType, setSelectedType] = useState("technical");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [recordingTime, setRecordingTime] = useState(0);
  const [hasPermission, setHasPermission] = useState(null);
  const [isViewingSample, setIsViewingSample] = useState(false);
  const [sampleVideoUrl, setSampleVideoUrl] = useState(null);
  const [savedQuestions, setSavedQuestions] = useState(new Set());
  const [isPracticing, setIsPracticing] = useState(false);
  const [practiceQuestion, setPracticeQuestion] = useState(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Mock data
  const interviewTypes = [
    { id: "technical", name: "Technical Interview" },
    { id: "behavioral", name: "Behavioral Interview" },
    { id: "hr", name: "HR Interview" },
  ];

  const [questions, setQuestions] = useState({
    technical: [
      "Explain the difference between a stack and a queue and when you would use each.",
      "What is the time complexity of binary search and how would you implement it?",
      "Describe how you would design a database schema for a social media platform.",
      "Explain the concept of REST and RESTful APIs with examples.",
      "What is a closure in JavaScript and why are they useful?",
    ],
    behavioral: [
      "Tell me about a time you faced a challenge in a team project and how you resolved it.",
      "Describe a situation where you had to meet a tight deadline. What was your approach?",
      "Give an example of when you had to adapt to significant changes at work or school.",
      "Tell me about a time when you had a conflict with a team member. How did you handle it?",
      "Describe your most successful project and what made it successful.",
    ],
    hr: [
      "Why do you want to work for our company specifically?",
      "Where do you see yourself professionally in 5 years?",
      "What are your salary expectations and why do you think that's appropriate?",
      "What motivates you to do your best work?",
      "Describe your ideal work environment.",
    ],
  });

  const companies = [
    { id: "techcorp", name: "TechCorp" },
    { id: "innosoft", name: "InnoSoft" },
    { id: "datadream", name: "DataDream" },
    { id: "cloudwave", name: "CloudWave" },
    { id: "innovatetech", name: "InnovateTech" },
  ];

  const categories = [
    { id: "technical", name: "Technical" },
    { id: "behavioral", name: "Behavioral" },
    { id: "hr", name: "HR" },
    { id: "rolespecific", name: "Role-Specific" },
  ];

  const questionBank = [
    {
      id: 1,
      text: "Explain your approach to troubleshooting a complex system issue.",
      company: "techcorp",
      category: "technical",
      difficulty: "medium",
      frequency: "high",
      saved: false,
    },
    {
      id: 2,
      text: "Describe a situation where you had to prioritize multiple important tasks.",
      company: "innosoft",
      category: "behavioral",
      difficulty: "easy",
      frequency: "high",
      saved: true,
    },
    {
      id: 3,
      text: "How would you design a scalable notification system for a social media platform?",
      company: "cloudwave",
      category: "technical",
      difficulty: "hard",
      frequency: "medium",
      saved: false,
    },
    {
      id: 4,
      text: "What experience do you have with data visualization and making complex data understandable?",
      company: "datadream",
      category: "rolespecific",
      difficulty: "medium",
      frequency: "medium",
      saved: false,
    },
    {
      id: 5,
      text: "Where do you see yourself in 5 years and how does this role help you get there?",
      company: "techcorp",
      category: "hr",
      difficulty: "easy",
      frequency: "high",
      saved: false,
    },
  ];

  // Initialize saved questions from question bank
  useEffect(() => {
    const initialSaved = new Set(
      questionBank
        .filter(q => q.saved)
        .map(q => q.id)
    );
    setSavedQuestions(initialSaved);
  }, []);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, []);

  // Setup and handle media stream for camera/mic
  const setupMediaStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      setHasPermission(true);
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      return true;
    } catch (err) {
      console.error("Error accessing media devices:", err);
      setHasPermission(false);
      return false;
    }
  };

  // Clean up media stream
  const stopMediaStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
      
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  };

  // Request permissions on component mount
  useEffect(() => {
    const checkPermissions = async () => {
      try {
        // Just check permissions without keeping the stream active
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setHasPermission(true);
        
        // Stop all tracks immediately
        stream.getTracks().forEach(track => track.stop());
      } catch (err) {
        setHasPermission(false);
        console.error("Error checking media permissions:", err);
      }
    };
    
    checkPermissions();
    
    // Clean up on unmount
    return () => {
      stopMediaStream();
    };
  }, []);

  // Simulate recording timer
  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      setRecordingTime(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleStartRecording = async () => {
    setIsViewingSample(false);
    const ready = await setupMediaStream();
    if (ready) {
      setIsRecording(true);
    }
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    stopMediaStream();
    setIsPracticing(false);
    setPracticeQuestion(null);
  };

  const handleViewSample = () => {
    setIsViewingSample(true);
    // In a real application, you would load a video from your CDN or API
    // For this demo, we'll use a placeholder video URL
    setSampleVideoUrl("https://samplelib.com/lib/preview/mp4/sample-5s.mp4");
  };

  const handleNextQuestion = () => {
    if (isPracticing) {
      // When practicing, we've completed the practice
      setIsPracticing(false);
      setPracticeQuestion(null);
      handleStopRecording();
      return;
    }
    
    const questionsArray = questions[selectedType];
    if (currentQuestion < questionsArray.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Loop back to first question
      setCurrentQuestion(0);
    }
  };

  const handlePracticeQuestion = (question) => {
    setPracticeQuestion(question);
    setIsPracticing(true);
    setActiveTab("simulator");
    
    // Auto-select the appropriate interview type based on question category
    const typeMapping = {
      "technical": "technical",
      "behavioral": "behavioral",
      "hr": "hr",
      "rolespecific": "technical" // Default to technical for role-specific
    };
    
    setSelectedType(typeMapping[question.category] || "technical");
    
    // To ensure a smooth transition to the simulator tab
    setTimeout(() => {
      handleStartRecording();
    }, 500);
  };

  const toggleSaveQuestion = (id) => {
    setSavedQuestions(prev => {
      const newSaved = new Set(prev);
      if (newSaved.has(id)) {
        newSaved.delete(id);
      } else {
        newSaved.add(id);
      }
      return newSaved;
    });
  };

  const filteredQuestions = questionBank.filter((question) => {
    const matchesSearch = question.text.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCompany = selectedCompany === "all" || question.company === selectedCompany;
    const matchesCategory = selectedCategory === "all" || question.category === selectedCategory;
    return matchesSearch && matchesCompany && matchesCategory;
  });

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getFrequencyColor = (frequency) => {
    switch (frequency) {
      case "high":
        return "bg-blue-100 text-blue-800";
      case "medium":
        return "bg-purple-100 text-purple-800";
      case "low":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 animate-fadeIn">
            <h1 className="text-3xl md:text-4xl font-bold text-navy mb-2">Interview Preparation</h1>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Master your interview skills with AI-powered mock interviews, access a comprehensive
              library of company-specific questions, and get real-time feedback to improve your performance.
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full max-w-md mx-auto grid grid-cols-2 mb-8">
              <TabsTrigger value="simulator" className="text-base py-3">
                Interview Simulator
              </TabsTrigger>
              <TabsTrigger value="questions" className="text-base py-3">
                Question Bank
              </TabsTrigger>
            </TabsList>

            {isLoading ? (
              <div className="w-full h-[500px] bg-white rounded-lg shadow-sm animate-pulse p-6">
                <div className="h-8 bg-gray-200 rounded-md w-1/3 mb-6"></div>
                <div className="h-40 bg-gray-100 rounded-md mb-6"></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-8 bg-gray-200 rounded-md"></div>
                  <div className="h-8 bg-gray-200 rounded-md"></div>
                </div>
              </div>
            ) : (
              <>
                <TabsContent value="simulator" className="mt-4 animate-fadeIn animation-delay-100">
                  <Card className="shadow-card border-navy/10">
                    <CardHeader className="bg-gradient-to-r from-navy/5 to-transparent">
                      <CardTitle className="text-navy">AI Mock Interview Simulator</CardTitle>
                      <CardDescription>
                        Practice interviews with real-time AI feedback to improve your performance
                      </CardDescription>
                      <div className="mt-4">
                        <Select
                          value={selectedType}
                          onValueChange={(value) => {
                            setSelectedType(value);
                            setCurrentQuestion(0);
                            if (isRecording) handleStopRecording();
                          }}
                        >
                          <SelectTrigger className="w-full md:w-[240px] border-navy/20">
                            <SelectValue placeholder="Select interview type" />
                          </SelectTrigger>
                          <SelectContent>
                            {interviewTypes.map((type) => (
                              <SelectItem key={type.id} value={type.id}>
                                {type.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-6 p-6 bg-slate-50 rounded-md border border-navy/10 min-h-[200px] flex items-center justify-center">
                        {hasPermission === false && (
                          <div className="text-center text-red-600">
                            <p className="mb-2 font-medium">Camera/Microphone access denied</p>
                            <p className="text-sm mb-4">
                              Please allow access to your camera and microphone to use the interview simulator
                            </p>
                            <Button onClick={setupMediaStream} className="bg-navy hover:bg-navy-dark">
                              Request Access
                            </Button>
                          </div>
                        )}
                        {hasPermission !== false && (
                          <>
                            {isRecording ? (
                              <div className="flex flex-col items-center w-full">
                                <div className="w-full mb-6 text-center font-medium text-xl text-navy">
                                  {isPracticing && practiceQuestion 
                                    ? practiceQuestion.text 
                                    : questions[selectedType][currentQuestion]}
                                </div>
                                <div className="w-full flex justify-between items-center mb-4">
                                  <div className="animate-pulse flex items-center">
                                    <div className="w-3 h-3 bg-red-600 rounded-full mr-2"></div>
                                    <span className="text-red-600 font-medium">Recording...</span>
                                  </div>
                                  <div className="px-3 py-1 bg-navy/10 rounded-full text-navy font-medium">
                                    {formatTime(recordingTime)}
                                  </div>
                                </div>
                                {/* Real webcam view */}
                                <div className="w-full aspect-video bg-slate-800 rounded-lg mb-4 overflow-hidden flex items-center justify-center">
                                  <video 
                                    ref={videoRef} 
                                    autoPlay 
                                    muted 
                                    playsInline
                                    className="w-full h-full object-cover"
                                  ></video>
                                </div>
                              </div>
                            ) : isViewingSample ? (
                              <div className="flex flex-col items-center w-full">
                                <div className="w-full mb-6 text-center font-medium text-xl text-navy">
                                  Sample Interview: Technical Question
                                </div>
                                <div className="w-full aspect-video bg-slate-800 rounded-lg mb-4 overflow-hidden flex items-center justify-center">
                                  {sampleVideoUrl ? (
                                    <video 
                                      autoPlay 
                                      controls
                                      className="w-full h-full object-cover"
                                      src={sampleVideoUrl}
                                    ></video>
                                  ) : (
                                    <div className="text-white text-center p-4">
                                      <p className="mb-2">Loading sample interview...</p>
                                      <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
                                    </div>
                                  )}
                                </div>
                                <div className="w-full flex justify-end">
                                  <Button 
                                    variant="outline" 
                                    className="border-navy/20 text-navy" 
                                    onClick={() => setIsViewingSample(false)}
                                  >
                                    Close Sample
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <div className="text-center">
                                <p className="text-navy mb-4 font-medium">
                                  {isPracticing ? `Ready to practice this question` : `Click "Start Interview" to begin your mock interview session`}
                                </p>
                                <p className="text-slate-500 text-sm">
                                  Make sure your camera and microphone are working
                                </p>
                              </div>
                            )}
                          </>
                        )}
                      </div>

                      <Tabs defaultValue="tips" className="w-full">
                        <TabsList className="w-full grid grid-cols-3 bg-slate-100">
                          <TabsTrigger 
                            value="tips" 
                            className="data-[state=active]:bg-white data-[state=active]:text-navy">
                            Interview Tips
                          </TabsTrigger>
                          <TabsTrigger 
                            value="feedback" 
                            className="data-[state=active]:bg-white data-[state=active]:text-navy">
                            AI Feedback
                          </TabsTrigger>
                          <TabsTrigger 
                            value="history" 
                            className="data-[state=active]:bg-white data-[state=active]:text-navy">
                            History
                          </TabsTrigger>
                        </TabsList>
                        <TabsContent value="tips" className="p-4 border border-slate-100 mt-2 rounded-md">
                          <ul className="list-disc pl-5 space-y-2 text-slate-700">
                            <li>Maintain good eye contact with the camera</li>
                            <li>Speak clearly and at a moderate pace</li>
                            <li>Structure your answers using the STAR method (Situation, Task, Action, Result)</li>
                            <li>Prepare examples that highlight your skills</li>
                            <li>Research the company before your interview</li>
                          </ul>
                        </TabsContent>
                        <TabsContent value="feedback" className="p-4 border border-slate-100 mt-2 rounded-md">
                          {isRecording ? (
                            <div className="text-center py-4">
                              <div className="animate-pulse">
                                <p className="text-navy">Analyzing your response in real-time...</p>
                                <Progress 
                                  value={45} 
                                  className="mt-2 w-1/2 mx-auto h-2" 
                                  indicatorClassName="bg-gradient-to-r from-navy to-gold"
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-3">
                              <p className="text-center text-slate-600">
                                No recent interview feedback available
                              </p>
                              <p className="text-sm text-center text-slate-500">
                                Start a new interview to receive AI feedback
                              </p>
                            </div>
                          )}
                        </TabsContent>
                        <TabsContent value="history" className="p-4 border border-slate-100 mt-2 rounded-md">
                          <div className="text-center py-4">
                            <p className="text-slate-600">Your past interview sessions will appear here</p>
                            <p className="text-sm text-slate-500 mt-2">
                              You haven't completed any interviews yet
                            </p>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                    <CardFooter className="flex justify-between bg-slate-50/50 border-t border-navy/5">
                      {isRecording ? (
                        <>
                          <Button 
                            variant="outline" 
                            className="border-navy/20 text-navy" 
                            onClick={handleNextQuestion}
                          >
                            {isPracticing ? "Finish Practice" : "Next Question"}
                          </Button>
                          <Button
                            variant="destructive"
                            className="bg-red-600 hover:bg-red-700"
                            onClick={handleStopRecording}
                          >
                            End Interview
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button 
                            variant="outline" 
                            className="border-navy/20 text-navy"
                            onClick={handleViewSample}
                            disabled={isPracticing}
                          >
                            View Sample
                          </Button>
                          <Button
                            className="bg-navy hover:bg-navy-dark"
                            onClick={handleStartRecording}
                          >
                            {isPracticing ? "Start Practice" : "Start Interview"}
                          </Button>
                        </>
                      )}
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="questions" className="mt-4 animate-fadeIn animation-delay-100">
                  <Card className="shadow-card border-navy/10">
                    <CardHeader className="bg-gradient-to-r from-navy/5 to-transparent">
                      <CardTitle className="text-navy">Interview Question Bank</CardTitle>
                      <CardDescription>
                        Browse and practice common interview questions filtered by company and category
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <Input
                          placeholder="Search questions..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="flex-1 border-navy/20"
                        />
                        <div className="flex gap-2 flex-col sm:flex-row">
                          <Select value={selectedCompany} onValueChange={setSelectedCompany}>
                            <SelectTrigger className="w-full sm:w-[150px] border-navy/20">
                              <SelectValue placeholder="Company" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Companies</SelectItem>
                              {companies.map((company) => (
                                <SelectItem key={company.id} value={company.id}>
                                  {company.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                            <SelectTrigger className="w-full sm:w-[150px] border-navy/20">
                              <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Categories</SelectItem>
                              {categories.map((category) => (
                                <SelectItem key={category.id} value={category.id}>
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {filteredQuestions.length === 0 ? (
                          <div className="text-center py-12 text-gray-500">
                            No questions match your search criteria
                          </div>
                        ) : (
                          filteredQuestions.map((question) => {
                            const company = companies.find((c) => c.id === question.company);
                            const category = categories.find((c) => c.id === question.category);
                            const isSaved = savedQuestions.has(question.id) || question.saved;

                            return (
                              <div
                                key={question.id}
                                className="p-4 border border-navy/10 rounded-lg hover:bg-slate-50 transition-colors"
                              >
                                <div className="flex justify-between items-start mb-2">
                                  <p className="font-medium text-lg text-navy/90">{question.text}</p>
                                  <div className="flex flex-col gap-2 items-end">
                                    <Badge className={getDifficultyColor(question.difficulty)}>
                                      {question.difficulty.charAt(0).toUpperCase() +
                                        question.difficulty.slice(1)}
                                    </Badge>
                                    <Badge className={getFrequencyColor(question.frequency)}>
                                      {question.frequency.charAt(0).toUpperCase() +
                                        question.frequency.slice(1)} Frequency
                                    </Badge>
                                  </div>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-3">
                                  <Badge variant="outline" className="border-navy/20">{company?.name}</Badge>
                                  <Badge variant="outline" className="border-navy/20">{category?.name}</Badge>
                                </div>
                                <div className="mt-4 flex justify-end">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className={isSaved ? "bg-gold/10 border-gold text-gold-dark" : "border-navy/20 text-navy"}
                                    onClick={() => toggleSaveQuestion(question.id)}
                                  >
                                    {isSaved ? "Saved" : "Save"}
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    className="ml-2 bg-navy hover:bg-navy-dark"
                                    onClick={() => handlePracticeQuestion(question)}
                                  >
                                    Practice
                                  </Button>
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </>
            )}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default InterviewPrep;