import { Button } from "../ui/button";

export function Navbar() {
  return (
    <nav className="flex justify-between items-center bg-white shadow p-4">
      <div className="text-xl font-semibold">Admin Panel</div>

      <Button variant="destructive">Logout</Button>
    </nav>
  );
}
