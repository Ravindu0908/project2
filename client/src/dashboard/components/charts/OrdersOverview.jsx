/* eslint-disable react/prop-types */
// src/components/OrdersOverview.js
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const OrdersOverview = ({months , orders}) => {
  const data = {
    labels: months,
    datasets: [
      {
        label: 'Orders',
        data: orders,
        backgroundColor: '#831843', // Pink-900 background color
        borderColor: '#831843', // Pink-900 border color
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Orders Overview',
        font: {
            size: 48, // Customize the font size
          },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default OrdersOverview;
