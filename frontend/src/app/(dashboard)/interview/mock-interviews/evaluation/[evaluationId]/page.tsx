import { getInterviewEvaluation } from "@/actions/interview/evaluation/evaluation-action";
import InterviewEvaluationCard from "../../../_components/InterviewEvaluation";
import BackButton from "@/app/components/ui/BackButton";

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

  // return <InterviewEvaluationCard evaluation={result.data} status="completed" />;
  return (
    <main className="mx-auto w-full space-y-6 p-2 sm:p-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            Interview evaluation
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Review your interview performance, scores, and detailed feedback.
          </p>
        </div>
        <BackButton />
      </div>

      <InterviewEvaluationCard evaluation={result.data} status="COMPLETED" />
    </main>
  );
};

export default InterviewEvaluationPage;
