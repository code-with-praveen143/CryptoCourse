export function Card({ title, value }: { title: string; value: string }) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-2xl font-bold mt-2">{value}</p>
      </div>
    );
  }
  