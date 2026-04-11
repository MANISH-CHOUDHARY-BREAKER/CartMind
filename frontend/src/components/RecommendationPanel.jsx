export default function RecommendationPanel({ products }) {
return (
<div className="bg-white rounded-2xl shadow-xl p-6 mt-6">
<h2 className="text-xl font-bold mb-4">🧠 Recommended For You</h2>
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
{products.map((item, index) => (
<div key={index} className="border rounded-xl p-4 shadow">
{item}
</div>
))}
</div>
</div>
);
}