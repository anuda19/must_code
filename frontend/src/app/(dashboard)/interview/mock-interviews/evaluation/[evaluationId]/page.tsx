import { getInterviewEvaluation } from "@/actions/interview/evaluation/evaluation-action";
import InterviewEvaluationCard from "../../../_components/InterviewEvaluation";

type Props = {
  params: Promise<{ evaluationId: string }>;
};

const InterviewEvaluationPage = async ({ params }: Props) => {
  const { evaluationId } = await params;
  const result = await getInterviewEvaluation(evaluationId);

  if (!result.success || !result.data) {
    return (
      <div className="p-6 text-sm text-red-500">
        {result.error ?? "Failed to load interview evaluation."}
      </div>
    );
  }

  return <InterviewEvaluationCard evaluation={result.data} status="completed" />;
};

export default InterviewEvaluationPage;