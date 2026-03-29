export default function StatCard({ title, value }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow text-center w-40">
      <h2 className="text-gray-500">{title}</h2>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}