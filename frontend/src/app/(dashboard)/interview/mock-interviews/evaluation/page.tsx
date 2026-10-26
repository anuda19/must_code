
import { getInterviewEvaluations } from "@/actions/interview/evaluation/evaluation-action";
import InterviewEvaluationList from "../../_components/InterviewEvaluationList";

const InterviewEvaluationPage = async () => {
  const result = await getInterviewEvaluations(1, 10);

  if (!result.success) {
    return (
      <main className="mx-auto w-full max-w-6xl p-6">
        <h1 className="text-2xl font-semibold">
          Interview evaluations
        </h1>
        <p className="mt-4 text-sm text-red-500">
          {Array.isArray(result.error)
            ? result.error.join(", ")
            : result.error}
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-6xl space-y-6 p-4 sm:p-6">
      <div>
        <p className="text-xs font-medium text-indigo-400">
          YOUR PROGRESS
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          Interview evaluations
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Review your interview performance, scores, and detailed feedback.
        </p>
      </div>

      <InterviewEvaluationList
        initialItems={result.data?.items ?? []}
        initialPagination={result.data?.pagination}
      />
    </main>
  );
};

export default InterviewEvaluationPage;