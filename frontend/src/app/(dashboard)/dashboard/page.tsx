import { Activity } from "lucide-react";
import StartButton from "./_components/Core/StartButton";
import Dashboard from "./_components/Dashboard";

const DashboardPage = async () => {
  return (
    <div>
      <header
        className="flex flex-col justify-between gap-4
        sm:flex-row sm:items-end px-6"
      >
        <div>
          <div
            className="mb-2 flex items-center gap-2
            text-xs font-semibold uppercase tracking-[0.18em]
            text-indigo-300"
          >
            <Activity className="size-4" />
            Your workspace
          </div>
          <h1
            className="text-2xl font-semibold tracking-tight
            text-white sm:text-3xl"
          >
            Performance overview
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Understand your progress and prepare for your next interview.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <StartButton />
        </div>
      </header>
      <Dashboard />
    </div>
  );
};

export default DashboardPage;
