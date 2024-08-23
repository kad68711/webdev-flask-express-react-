import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Function to generate a random color
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const SalesOverTimeChart = ({ salesData, timePeriod }) => {
  // Check if salesData is defined and is an array
  if (!salesData || !Array.isArray(salesData)) {
    return <p>No sales data available</p>;
  }

  // Generate a random color for this chart instance
  const chartColor = getRandomColor();

  // Transform salesData to fit the chart format based on time period
  const labels = salesData.map(item => {
    if (timePeriod === 'daily') {
      return `${item._id.day}/${item._id.month}/${item._id.year}`;
    } else if (timePeriod === 'monthly') {
      return `${item._id.month}/${item._id.year}`;
    } else if (timePeriod === 'quarterly') {
      return `Q${item._id.quarter} ${item._id.year}`;
    } else if (timePeriod === 'yearly') {
      return `${item._id.year}`;
    }
  });

  const dataValues = salesData.map(item => item.totalSales);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Total Sales Over Time',
        data: dataValues,
        fill: false,
        borderColor: chartColor, // Set the random color
        tension: 0.1,
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
        text: `Total Sales Over Time (${timePeriod.charAt(0).toUpperCase() + timePeriod.slice(1)})`,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: timePeriod === 'daily' ? 'Date' : timePeriod === 'monthly' ? 'Month' : timePeriod === 'quarterly' ? 'Quarter' : 'Year',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Total Sales ($)',
        },
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default SalesOverTimeChart;
