
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      <div className="container mx-auto px-4 py-32 relative">
        <div className="text-center max-w-4xl mx-auto space-y-8 animate-fadeIn">
          <div className="inline-block">
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm leading-6 text-navy ring-1 ring-navy/20 hover:ring-navy/40">
              Announcing our new AI Interview Coach
              <ArrowRight className="ml-1 h-4 w-4" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-navy tracking-tight">
            Your Path to Career Success Starts Here
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Navigate your placement journey with confidence. Get personalized interview preparation,
            resume guidance, and company matching to land your dream job.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button
              size="lg"
              className="bg-navy hover:bg-navy-light text-white px-8 py-6 text-lg transition-all duration-300 transform hover:scale-105"
            >
              Get Started
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-navy text-navy hover:bg-navy/5 px-8 py-6 text-lg"
            >
              Watch Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
