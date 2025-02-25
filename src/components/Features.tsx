
import { Card } from "@/components/ui/card";
import { BookOpen, Users, FileEdit } from "lucide-react";

const features = [
  {
    title: "Interview Preparation",
    description:
      "Practice with AI-powered mock interviews, get real-time feedback, and access a library of company-specific questions.",
    icon: BookOpen,
  },
  {
    title: "Resume Builder",
    description:
      "Create a professional resume with our intelligent builder. Get suggestions based on your target role and industry.",
    icon: FileEdit,
  },
  {
    title: "Company Matcher",
    description:
      "Find your perfect company match based on your skills, preferences, and career goals. Get personalized recommendations.",
    icon: Users,
  },
];

export const Features = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-navy mb-4">
            Everything You Need for Success
          </h2>
          <p className="text-gray-600 text-lg">
            Our comprehensive tools and resources help you prepare, practice, and succeed in your
            placement journey.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-8 hover:shadow-lg transition-all duration-300 animate-scaleIn border-0 bg-gradient-to-br from-white to-gray-50"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="h-12 w-12 rounded-lg bg-navy/5 flex items-center justify-center mb-6">
                <feature.icon className="h-6 w-6 text-navy" />
              </div>
              <h3 className="text-xl font-semibold text-navy mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
