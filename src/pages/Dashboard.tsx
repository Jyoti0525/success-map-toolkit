// src/pages/Dashboard.tsx
import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Greeting } from "@/components/dashboard/Greeting";
import { PlacementPulse } from "@/components/dashboard/PlacementPulse";
import { SkillStrength } from "@/components/dashboard/SkillStrength";
import { ReadinessScore } from "@/components/dashboard/ReadinessScore";
import { WeeklyGoals } from "@/components/dashboard/WeeklyGoals";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { CompanyRecommendations } from "@/components/dashboard/CompanyRecommendations";
import { Deadlines } from "@/components/dashboard/Deadlines";
import { TodoList } from "@/components/dashboard/TodoList";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-16 md:py-20">
        {/* Header Section with animation */}
        <div className="animate-fadeIn">
          <Greeting />
        </div>

        {isLoading ? (
          // Skeleton loading state
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            <div className="col-span-1 md:col-span-3 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg shadow-sm p-4 h-64 animate-pulse">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-40 bg-gray-100 rounded"></div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg shadow-sm p-4 h-48 animate-pulse">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-32 bg-gray-100 rounded"></div>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-lg shadow-sm p-4 h-72 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-56 bg-gray-100 rounded"></div>
              </div>
            </div>
            <div className="col-span-1 space-y-6">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm p-4 h-64 animate-pulse">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-48 bg-gray-100 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Main Grid Layout with staggered animations */
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            {/* Main Content Area */}
            <div className="col-span-1 md:col-span-3 space-y-6">
              {/* Top Row - Analytics */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                <div className="animate-fadeIn animation-delay-100 col-span-1 md:col-span-1 transition-all hover:shadow-md">
                  <ReadinessScore />
                </div>
                <div className="animate-fadeIn animation-delay-200 col-span-1 md:col-span-2 transition-all hover:shadow-md">
                  <PlacementPulse />
                </div>
                <div className="animate-fadeIn animation-delay-300 col-span-1 md:col-span-2 transition-all hover:shadow-md">
                  <SkillStrength />
                </div>
              </div>

              {/* Middle Row - Goals and Activity */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="animate-fadeIn animation-delay-400 col-span-1 md:col-span-2 transition-all hover:shadow-md">
                  <WeeklyGoals />
                </div>
                <div className="animate-fadeIn animation-delay-500 col-span-1 md:col-span-2 transition-all hover:shadow-md">
                  <RecentActivity />
                </div>
              </div>

              {/* Bottom Row - Recommendations */}
              <div className="animate-fadeIn animation-delay-600 transition-all hover:shadow-md">
                <CompanyRecommendations />
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-span-1 space-y-6">
              <div className="animate-fadeIn animation-delay-700 transition-all hover:shadow-md">
                <Deadlines />
              </div>
              <div className="animate-fadeIn animation-delay-800 transition-all hover:shadow-md">
                <TodoList />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;