import { auth } from "@/auth";
import Dashboard from "./_components/Dashboard";

const DashboardPage = async () => {
    const session = await auth();
  return (
    <div>
      <h1>Welcome back, {session?.user.name && session?.user.name+"!"}</h1>
      <Dashboard />
    </div>
  )
}

export default DashboardPage