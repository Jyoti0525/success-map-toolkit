// src/pages/CompanyMatcher.tsx
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";

const CompanyMatcher = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("best-matches");
  const [searchQuery, setSearchQuery] = useState("");
  const [minMatchPercentage, setMinMatchPercentage] = useState([75]);
  const [workLocations, setWorkLocations] = useState({
    remote: false,
    hybrid: false,
    onsite: false,
  });
  const [companySizes, setCompanySizes] = useState({
    startup: false,
    midsize: false,
    enterprise: false,
  });
  const [industries, setIndustries] = useState({
    technology: false,
    finance: false,
    healthcare: false,
    education: false,
  });
  const [savedCompanies, setSavedCompanies] = useState(new Set());
  const [appliedCompanies, setAppliedCompanies] = useState(new Set());
  const [viewingCompany, setViewingCompany] = useState(null);
  
  // Mock data for companies
  const companies = [
    {
      id: "techcorp",
      name: "TechCorp",
      role: "Software Engineer",
      matchPercentage: 95,
      location: "Remote",
      skills: ["React", "TypeScript", "Node.js", "AWS"],
      description: "TechCorp is a leading technology company specializing in cloud-based solutions for enterprise clients. We're looking for talented software engineers to join our growing team.",
      deadline: "3/25/2025",
      saved: false,
      recentlyAdded: false
    },
    {
      id: "innosoft",
      name: "InnoSoft",
      role: "Full Stack Developer",
      matchPercentage: 88,
      location: "Hybrid",
      skills: ["JavaScript", "React", "MongoDB", "Express"],
      description: "InnoSoft creates innovative software solutions for businesses of all sizes. Our Full Stack Developers work on cutting-edge web applications using modern technologies.",
      deadline: "3/28/2025",
      saved: true,
      recentlyAdded: true
    },
    {
      id: "datadream",
      name: "DataDream",
      role: "Frontend Engineer",
      matchPercentage: 82,
      location: "On-site",
      skills: ["React", "CSS", "HTML", "UX Design"],
      description: "DataDream specializes in data visualization and analytics platforms. We're seeking creative Frontend Engineers to build beautiful, intuitive interfaces for complex data.",
      deadline: "4/1/2025",
      saved: false,
      recentlyAdded: true
    },
    {
      id: "cloudwave",
      name: "CloudWave",
      role: "Cloud Developer",
      matchPercentage: 78,
      location: "Remote",
      skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
      description: "CloudWave helps companies migrate and optimize their infrastructure in the cloud. Join us to work on challenging cloud architecture and deployment projects.",
      deadline: "3/30/2025",
      saved: false,
      recentlyAdded: false
    },
    {
      id: "innovatetech",
      name: "InnovateTech",
      role: "Product Manager",
      matchPercentage: 75,
      location: "Hybrid",
      skills: ["Product Strategy", "Agile", "User Research", "Roadmapping"],
      description: "InnovateTech builds next-generation productivity tools for remote teams. Our Product Managers guide the development of features that delight our customers.",
      deadline: "4/5/2025",
      saved: false,
      recentlyAdded: false
    },
  ];

  // Initialize saved companies from company data
  useEffect(() => {
    const initialSaved = new Set(
      companies
        .filter(c => c.saved)
        .map(c => c.id)
    );
    setSavedCompanies(initialSaved);
    
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, []);

  // Filter companies based on search and filters
  const filteredCompanies = companies.filter(company => {
    // Filter by search query
    const matchesSearch = 
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.role.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by match percentage
    const matchesPercentage = company.matchPercentage >= minMatchPercentage[0];
    
    // Filter by work location
    const matchesLocation = 
      (!workLocations.remote && !workLocations.hybrid && !workLocations.onsite) || // No filters selected
      (workLocations.remote && company.location === "Remote") ||
      (workLocations.hybrid && company.location === "Hybrid") ||
      (workLocations.onsite && company.location === "On-site");
    
    // Company size and industry would need actual data - for now, return true
    const matchesSize = true;
    const matchesIndustry = true;
    
    return matchesSearch && matchesPercentage && matchesLocation && matchesSize && matchesIndustry;
  });

  // Get companies for the active tab
  const getTabCompanies = () => {
    switch (activeTab) {
      case "best-matches":
        return [...filteredCompanies].sort((a, b) => b.matchPercentage - a.matchPercentage);
      case "recently-added":
        return filteredCompanies.filter(company => company.recentlyAdded);
      case "saved":
        return filteredCompanies.filter(company => savedCompanies.has(company.id));
      default:
        return filteredCompanies;
    }
  };

  const toggleSaveCompany = (id) => {
    setSavedCompanies(prev => {
      const newSaved = new Set(prev);
      if (newSaved.has(id)) {
        newSaved.delete(id);
      } else {
        newSaved.add(id);
      }
      return newSaved;
    });
  };

  const handleApply = (id) => {
    setAppliedCompanies(prev => {
      const newApplied = new Set(prev);
      newApplied.add(id);
      return newApplied;
    });
  };

  const applyFilters = () => {
    // In a real application, you would update the filter state and potentially fetch new data
    // For this demo, we'll just close the loading state briefly to simulate a refresh
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const getMatchColor = (percentage) => {
    if (percentage >= 90) return "text-green-600";
    if (percentage >= 80) return "text-emerald-600";
    if (percentage >= 70) return "text-blue-600";
    return "text-amber-600";
  };
  
  const getProgressColor = (percentage) => {
    if (percentage >= 90) return "bg-green-600";
    if (percentage >= 80) return "bg-emerald-600";
    if (percentage >= 70) return "bg-blue-600";
    return "bg-amber-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="text-center mb-10 animate-fadeIn">
          <h1 className="text-3xl md:text-4xl font-bold text-navy mb-2">Company Matcher</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Find your perfect company match based on your skills, preferences, and career goals.
            Get personalized recommendations tailored to your profile.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <Card className="shadow-md border-navy/10">
              <CardHeader className="bg-gradient-to-r from-navy/5 to-transparent">
                <CardTitle className="text-navy">Refine Your Matches</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <h3 className="font-medium text-navy">Minimum Match Percentage</h3>
                  <div className="px-1">
                    <Slider 
                      value={minMatchPercentage} 
                      onValueChange={setMinMatchPercentage} 
                      max={100} 
                      step={5}
                      className="py-4"
                    />
                    <div className="flex justify-between text-sm text-slate-500 mt-1">
                      <span>50%</span>
                      <span>{minMatchPercentage}%</span>
                      <span>100%</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-medium text-navy">Work Location</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="remote" 
                        checked={workLocations.remote}
                        onCheckedChange={(checked) => 
                          setWorkLocations(prev => ({ ...prev, remote: !!checked }))
                        }
                      />
                      <Label htmlFor="remote">Remote</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="hybrid" 
                        checked={workLocations.hybrid}
                        onCheckedChange={(checked) => 
                          setWorkLocations(prev => ({ ...prev, hybrid: !!checked }))
                        }
                      />
                      <Label htmlFor="hybrid">Hybrid</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="onsite"
                        checked={workLocations.onsite}
                        onCheckedChange={(checked) => 
                          setWorkLocations(prev => ({ ...prev, onsite: !!checked }))
                        } 
                      />
                      <Label htmlFor="onsite">On-site</Label>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-medium text-navy">Company Size</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="startup"
                        checked={companySizes.startup}
                        onCheckedChange={(checked) => 
                          setCompanySizes(prev => ({ ...prev, startup: !!checked }))
                        }
                      />
                      <Label htmlFor="startup">Startup (&lt;50 employees)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="midsize"
                        checked={companySizes.midsize}
                        onCheckedChange={(checked) => 
                          setCompanySizes(prev => ({ ...prev, midsize: !!checked }))
                        }
                      />
                      <Label htmlFor="midsize">Mid-size (50-500 employees)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="enterprise"
                        checked={companySizes.enterprise}
                        onCheckedChange={(checked) => 
                          setCompanySizes(prev => ({ ...prev, enterprise: !!checked }))
                        }
                      />
                      <Label htmlFor="enterprise">Enterprise (&gt;500 employees)</Label>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-medium text-navy">Industry</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="technology"
                        checked={industries.technology}
                        onCheckedChange={(checked) => 
                          setIndustries(prev => ({ ...prev, technology: !!checked }))
                        }
                      />
                      <Label htmlFor="technology">Technology</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="finance"
                        checked={industries.finance}
                        onCheckedChange={(checked) => 
                          setIndustries(prev => ({ ...prev, finance: !!checked }))
                        }
                      />
                      <Label htmlFor="finance">Finance</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="healthcare"
                        checked={industries.healthcare}
                        onCheckedChange={(checked) => 
                          setIndustries(prev => ({ ...prev, healthcare: !!checked }))
                        }
                      />
                      <Label htmlFor="healthcare">Healthcare</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="education"
                        checked={industries.education}
                        onCheckedChange={(checked) => 
                          setIndustries(prev => ({ ...prev, education: !!checked }))
                        }
                      />
                      <Label htmlFor="education">Education</Label>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full bg-navy hover:bg-navy-dark" onClick={applyFilters}>
                  Apply Filters
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="mb-6">
              <Input
                placeholder="Search companies or roles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border-navy/20"
              />
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-6 bg-slate-100">
                <TabsTrigger 
                  value="best-matches"
                  className="data-[state=active]:bg-white data-[state=active]:text-navy"
                >
                  Best Matches
                </TabsTrigger>
                <TabsTrigger 
                  value="recently-added"
                  className="data-[state=active]:bg-white data-[state=active]:text-navy"
                >
                  Recently Added
                </TabsTrigger>
                <TabsTrigger 
                  value="saved"
                  className="data-[state=active]:bg-white data-[state=active]:text-navy"
                >
                  Saved
                </TabsTrigger>
              </TabsList>
              
              {isLoading ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {[...Array(4)].map((_, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-sm p-6 h-72 animate-pulse">
                      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                      <div className="h-4 bg-gray-100 rounded w-1/3 mb-6"></div>
                      <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                      <div className="flex gap-2 mb-6">
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className="h-6 w-16 bg-gray-100 rounded"></div>
                        ))}
                      </div>
                      <div className="flex justify-between items-end mt-auto">
                        <div className="h-8 w-24 bg-gray-100 rounded"></div>
                        <div className="h-8 w-24 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <TabsContent value="best-matches" className="mt-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {getTabCompanies().length > 0 ? (
                        getTabCompanies().map(company => (
                          <Card key={company.id} className="shadow-md hover:shadow-lg transition-shadow border-navy/10 overflow-hidden">
                            <CardHeader className="pb-2">
                              <div className="flex justify-between items-start">
                                <div>
                                  <CardTitle className="text-navy">{company.name}</CardTitle>
                                  <p className="text-slate-600">{company.role}</p>
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
                                    <Badge key={index} variant="outline" className="border-navy/20">{skill}</Badge>
                                  ))}
                                </div>
                              </div>
                              
                              <div className="flex justify-between text-sm text-slate-500 mt-4">
                                <div>{company.location}</div>
                                <div>Apply by: {company.deadline}</div>
                              </div>
                            </CardContent>
                            <CardFooter className="bg-slate-50/50 border-t border-navy/5 flex justify-between">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button 
                                    variant="outline" 
                                    className="border-navy/20 text-navy"
                                    onClick={() => setViewingCompany(company)}
                                  >
                                    View Details
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[500px]">
                                  <DialogHeader>
                                    <DialogTitle className="text-navy">{company?.name} - {company?.role}</DialogTitle>
                                    <DialogDescription>
                                      <span className={`font-bold ${getMatchColor(company?.matchPercentage)}`}>
                                        {company?.matchPercentage}% Match
                                      </span>
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="py-4">
                                    <p className="mb-4">{company?.description}</p>
                                    <div className="mb-4">
                                      <h4 className="text-sm font-semibold mb-2">Required Skills</h4>
                                      <div className="flex flex-wrap gap-2">
                                        {company?.skills.map((skill, index) => (
                                          <Badge key={index} variant="outline">{skill}</Badge>
                                        ))}
                                      </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                      <div>
                                        <span className="font-semibold">Location:</span> {company?.location}
                                      </div>
                                      <div>
                                        <span className="font-semibold">Apply by:</span> {company?.deadline}
                                      </div>
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <Button 
                                      variant="outline"
                                      className={savedCompanies.has(company?.id) ? "bg-gold/10 border-gold text-gold-dark" : ""}
                                      onClick={() => company && toggleSaveCompany(company.id)}
                                    >
                                      {savedCompanies.has(company?.id) ? "Saved" : "Save"}
                                    </Button>
                                    <Button 
                                      className="bg-navy hover:bg-navy-dark"
                                      disabled={appliedCompanies.has(company?.id)}
                                      onClick={() => company && handleApply(company.id)}
                                    >
                                      {appliedCompanies.has(company?.id) ? "Applied" : "Apply Now"}
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                              <Button 
                                className={appliedCompanies.has(company.id) ? "bg-green-600 hover:bg-green-700" : "bg-navy hover:bg-navy-dark"}
                                disabled={appliedCompanies.has(company.id)}
                                onClick={() => handleApply(company.id)}
                              >
                                {appliedCompanies.has(company.id) ? "Applied" : "Apply Now"}
                              </Button>
                            </CardFooter>
                          </Card>
                        ))
                      ) : (
                        <div className="col-span-1 lg:col-span-2 text-center py-12 text-slate-500">
                          No companies match your criteria. Try adjusting your filters.
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="recently-added" className="mt-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {getTabCompanies().length > 0 ? (
                        getTabCompanies().map(company => (
                          // Same card as above, just in a different tab
                          <Card key={company.id} className="shadow-md hover:shadow-lg transition-shadow border-navy/10 overflow-hidden">
                            {/* Card content same as above */}
                            <CardHeader className="pb-2">
                              <div className="flex justify-between items-start">
                                <div>
                                  <CardTitle className="text-navy">{company.name}</CardTitle>
                                  <p className="text-slate-600">{company.role}</p>
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
                                    <Badge key={index} variant="outline" className="border-navy/20">{skill}</Badge>
                                  ))}
                                </div>
                              </div>
                              
                              <div className="flex justify-between text-sm text-slate-500 mt-4">
                                <div>{company.location}</div>
                                <div>Apply by: {company.deadline}</div>
                              </div>
                            </CardContent>
                            <CardFooter className="bg-slate-50/50 border-t border-navy/5 flex justify-between">
                              <Button 
                                variant="outline" 
                                className="border-navy/20 text-navy"
                                onClick={() => setViewingCompany(company)}
                              >
                                View Details
                              </Button>
                              <Button 
                                className={appliedCompanies.has(company.id) ? "bg-green-600 hover:bg-green-700" : "bg-navy hover:bg-navy-dark"}
                                disabled={appliedCompanies.has(company.id)}
                                onClick={() => handleApply(company.id)}
                              >
                                {appliedCompanies.has(company.id) ? "Applied" : "Apply Now"}
                              </Button>
                            </CardFooter>
                          </Card>
                        ))
                      ) : (
                        <div className="col-span-1 lg:col-span-2 text-center py-12 text-slate-500">
                          No recently added companies match your criteria.
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="saved" className="mt-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {getTabCompanies().length > 0 ? (
                        getTabCompanies().map(company => (
                          // Same card as above, just in a different tab
                          <Card key={company.id} className="shadow-md hover:shadow-lg transition-shadow border-navy/10 overflow-hidden">
                            {/* Card content same as above */}
                            <CardHeader className="pb-2">
                              <div className="flex justify-between items-start">
                                <div>
                                  <CardTitle className="text-navy">{company.name}</CardTitle>
                                  <p className="text-slate-600">{company.role}</p>
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
                                    <Badge key={index} variant="outline" className="border-navy/20">{skill}</Badge>
                                  ))}
                                </div>
                              </div>
                              
                              <div className="flex justify-between text-sm text-slate-500 mt-4">
                                <div>{company.location}</div>
                                <div>Apply by: {company.deadline}</div>
                              </div>
                            </CardContent>
                            <CardFooter className="bg-slate-50/50 border-t border-navy/5 flex justify-between">
                              <Button 
                                variant="outline" 
                                className="border-navy/20 text-navy"
                                onClick={() => toggleSaveCompany(company.id)}
                              >
                                Unsave
                              </Button>
                              <Button 
                                className={appliedCompanies.has(company.id) ? "bg-green-600 hover:bg-green-700" : "bg-navy hover:bg-navy-dark"}
                                disabled={appliedCompanies.has(company.id)}
                                onClick={() => handleApply(company.id)}
                              >
                                {appliedCompanies.has(company.id) ? "Applied" : "Apply Now"}
                              </Button>
                            </CardFooter>
                          </Card>
                        ))
                      ) : (
                        <div className="col-span-1 lg:col-span-2 text-center py-12 text-slate-500">
                          You haven't saved any companies yet.
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </>
              )}
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyMatcher;