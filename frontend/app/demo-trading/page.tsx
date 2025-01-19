import Dashboard from "./dashboard/page";
import Header from "./header/page";
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Dashboard />
    </div>
  );
}
