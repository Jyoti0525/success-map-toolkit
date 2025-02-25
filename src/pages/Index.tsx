// src/pages/Index.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AuthModal } from "@/components/auth/AuthModal";
import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";

const Index = () => {
  const navigate = useNavigate();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [stats, setStats] = useState({ 
    placementRate: 0,
    salaryIncrease: 0,
    companiesNumber: 0,
    successStories: 0
  });

  // Check authentication on mount
  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(authStatus);
  }, []);

  // Animate stats
  useEffect(() => {
    const animateStats = () => {
      const interval = setInterval(() => {
        setStats(prev => ({
          placementRate: Math.min(prev.placementRate + 1, 92),
          salaryIncrease: Math.min(prev.salaryIncrease + 0.5, 45),
          companiesNumber: Math.min(prev.companiesNumber + 5, 500),
          successStories: Math.min(prev.successStories + 10, 1000)
        }));
      }, 30);

      return () => clearInterval(interval);
    };

    const timer = setTimeout(animateStats, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      setIsAuthModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <svg className="absolute top-0 left-0 w-full h-full text-navy/5" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
          
          <div className="absolute top-1/4 -left-10 w-40 h-40 rounded-full bg-navy/5 blur-3xl"></div>
          <div className="absolute bottom-1/3 right-10 w-60 h-60 rounded-full bg-gold/10 blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32 relative z-10">
          {/* Announcement Bar */}
          <div className="flex justify-center mb-12">
            <motion.div 
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-navy/10 inline-flex items-center"
            >
              <span className="text-navy/80 mr-2">Announcing our new AI Interview Coach</span>
              <svg className="h-5 w-5 text-navy" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
              </svg>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column: Text Content */}
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="flex flex-col items-center lg:items-start text-center lg:text-left"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy leading-tight">
                Your Path to <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy to-navy-light">Career Success</span> Starts Here
              </h1>
              
              <p className="mt-6 text-lg text-slate-600 max-w-lg">
                Navigate your placement journey with confidence. Get personalized interview preparation, resume guidance, and company matching to land your dream job.
              </p>
              
              <div className="mt-10 flex flex-wrap gap-4 justify-center lg:justify-start">
                <Button 
                  onClick={handleGetStarted}
                  className="bg-navy hover:bg-navy-dark text-white px-8 py-6 text-lg rounded-lg font-medium shadow-lg hover:shadow-xl transition-all"
                >
                  Get Started
                </Button>
                
                <Button 
                  onClick={() => navigate("/demo")}
                  variant="outline" 
                  className="border-navy/20 text-navy px-8 py-6 text-lg rounded-lg font-medium hover:bg-navy/5"
                >
                  Watch Demo
                </Button>
              </div>
            </motion.div>
            
            {/* Right Column: UI Visual */}
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-navy/20 to-gold/20 rounded-2xl blur-lg"></div>
                <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="p-1 bg-gradient-to-b from-navy/10 to-transparent">
                    <div className="flex items-center gap-1 px-3 py-2">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                      <div className="ml-2 text-xs text-slate-500">PlacementPath Dashboard</div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <img 
                      src="/dashboard-preview.png" 
                      alt="Dashboard Preview" 
                      className="w-full rounded shadow-sm"
                      onError={(e) => {
                        // Fallback if image doesn't exist
                        e.currentTarget.src = 'https://via.placeholder.com/600x400?text=PlacementPath+Dashboard';
                      }}
                    />
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div className="bg-slate-50 p-4 rounded-lg">
                        <div className="text-sm text-slate-500">Readiness Score</div>
                        <div className="text-2xl font-bold text-navy">92%</div>
                        <div className="mt-2 w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: '92%' }}></div>
                        </div>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-lg">
                        <div className="text-sm text-slate-500">Interviews</div>
                        <div className="text-2xl font-bold text-navy">8 / 10</div>
                        <div className="mt-2 w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: '80%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="bg-navy text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="text-3xl md:text-4xl font-bold text-gold mb-2">{stats.placementRate}%</div>
              <div className="text-sm md:text-base text-white/80">Placement Rate</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl md:text-4xl font-bold text-gold mb-2">{stats.salaryIncrease}%</div>
              <div className="text-sm md:text-base text-white/80">Average Salary Increase</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl md:text-4xl font-bold text-gold mb-2">{stats.companiesNumber}+</div>
              <div className="text-sm md:text-base text-white/80">Partner Companies</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl md:text-4xl font-bold text-gold mb-2">{stats.successStories}+</div>
              <div className="text-sm md:text-base text-white/80">Success Stories</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-navy text-center mb-16"
          >
            Everything You Need for Success
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-12 h-12 bg-navy/10 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-navy mb-2">Interview Preparation</h3>
              <p className="text-slate-600">
                Practice with AI-powered mock interviews, get real-time feedback, and access a library of company-specific questions.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-12 h-12 bg-navy/10 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-navy mb-2">Resume Builder</h3>
              <p className="text-slate-600">
                Create a professional resume with our intelligent builder. Get suggestions based on your target role and industry.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-12 h-12 bg-navy/10 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-navy mb-2">Company Matcher</h3>
              <p className="text-slate-600">
                Find your perfect company match based on your skills, preferences, and career goals. Get personalized recommendations.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-navy text-center mb-16"
          >
            Success Stories
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Emily Chen",
                role: "Software Engineer at TechCorp",
                image: "https://randomuser.me/api/portraits/women/32.jpg",
                quote: "PlacementPath's interview prep helped me ace my technical interviews. The AI feedback was spot-on, and I received an offer with a 30% higher salary than expected.",
              },
              {
                name: "Marcus Johnson",
                role: "Data Analyst at DataDream",
                image: "https://randomuser.me/api/portraits/men/45.jpg",
                quote: "The Company Matcher found me positions I wouldn't have discovered on my own. The skills assessment accurately identified my strengths and areas to improve.",
              },
              {
                name: "Sarah Williams",
                role: "Product Manager at InnovateTech",
                image: "https://randomuser.me/api/portraits/women/68.jpg",
                quote: "I was struggling with creating an impactful resume. The Resume Builder transformed my application, helping me stand out and secure interviews at top companies.",
              },
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow flex flex-col"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy">{testimonial.name}</h3>
                    <p className="text-sm text-slate-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-slate-600 italic flex-grow">{testimonial.quote}</p>
                <div className="mt-4 flex text-gold">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-navy via-navy-light to-navy">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-6"
          >
            Ready to Start Your Career Journey?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-white/80 max-w-xl mx-auto mb-10"
          >
            Join thousands of students who have successfully landed their dream jobs with PlacementPath.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Button 
              onClick={handleGetStarted}
              className="bg-white text-navy hover:bg-gold hover:text-navy-dark px-8 py-6 text-lg rounded-lg font-medium shadow-lg transition-all"
            >
              Get Started Today
            </Button>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">PlacementPath</h3>
              <p className="text-slate-400">Your path to career success starts here.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Features</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Dashboard</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Interview Prep</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Resume Builder</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Company Matcher</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Testimonials</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-800 text-center text-slate-500">
            <p>© 2025 PlacementPath. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        initialView="signup"
      />
    </div>
  );
};

export default Index;