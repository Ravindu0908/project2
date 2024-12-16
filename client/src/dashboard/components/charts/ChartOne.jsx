// src/components/MyChart.js
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartOne = ({ months, appointments }) => {
  const data = {
    labels: months,
    datasets: [
      {
        label: "Total Appointments",
        data: appointments,
        fill: false,
        backgroundColor: "#831843", // Pink-900 background color
        borderColor: "#831843", // Pink-900 border color
        tension: 0.4, // This makes the line a bit curved
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Appointments Overview",
        font: {
          size: 48, // Customize the font size
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default ChartOne;
