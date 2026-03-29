import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Charts({ buyers, nonBuyers }) {
  const data = {
    labels: ["Buyers", "Non-Buyers"],
    datasets: [
      {
        data: [buyers, nonBuyers]
      }
    ]
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow w-80">
      <Pie data={data} />
    </div>
  );
}