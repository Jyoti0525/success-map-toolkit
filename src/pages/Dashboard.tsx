
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
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        {/* Header Section */}
        <Greeting />

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          {/* Main Content Area */}
          <div className="col-span-1 md:col-span-3 space-y-6">
            {/* Top Row - Analytics */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <ReadinessScore />
              <PlacementPulse />
              <SkillStrength />
            </div>

            {/* Middle Row - Goals and Activity */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <WeeklyGoals />
              <RecentActivity />
            </div>

            {/* Bottom Row - Recommendations */}
            <CompanyRecommendations />
          </div>

          {/* Sidebar */}
          <div className="col-span-1 space-y-6">
            <Deadlines />
            <TodoList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
