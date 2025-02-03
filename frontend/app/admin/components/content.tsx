import { Card } from "./card";

export function Content() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Card title="Total Users" value="1,245" />
      <Card title="Revenue" value="$12,450" />
      <Card title="New Orders" value="78" />
    </div>
  );
}
