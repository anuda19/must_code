import ComingSoonFeatureCard from "@/app/components/ui/ComingSoon";
import { Bot } from "lucide-react";

const TechnicalAssessmentPage = () => {
  return (
    <div>
      <ComingSoonFeatureCard
        title="AI Technical Assistant & Debugger"
        description="Your dedicated AI pair programmer capable of analyzing stack traces, debugging complex state logic, and explaining architectural patterns in real-time."
        icon={Bot}
        badgeText="In Development"
        expectedDate="Q2 2026"
        bulletPoints={[
          "Instant context-aware code refactoring",
          "Deep integration with your project workspace",
          "Real-time terminal error resolution",
        ]}
        // onNotifyMe={async (email) => {
        //   // Call your backend API to save email subscriber
        //   console.log("Subscribed email:", email);
        // }}
      />
    </div>
  );
};

export default TechnicalAssessmentPage;
