
import { Navbar } from "@/components/Navbar";
import { Greeting } from "@/components/dashboard/Greeting";
import { PlacementPulse } from "@/components/dashboard/PlacementPulse";
import { SkillStrength } from "@/components/dashboard/SkillStrength";
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
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <PlacementPulse />
              <SkillStrength />
            </div>
            
            {/* Additional sections can be added here */}
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
