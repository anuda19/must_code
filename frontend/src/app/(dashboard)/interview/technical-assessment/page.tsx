import { ComingSoon } from "@/app/components/ui/ComingSoon";

const TechnicalAssessmentPage = () => {
  return (
    <div>
      <ComingSoon
        badgeText="Technical Assessments"
        title="Automated Coding & System Design Assessments"
        description="We are building an interactive coding sandbox and real-time algorithmic evaluation engine. Get ready to test your problem-solving skills under realistic technical interview conditions."
        showWaitlist={true}
      />
    </div>
  );
};

export default TechnicalAssessmentPage;
