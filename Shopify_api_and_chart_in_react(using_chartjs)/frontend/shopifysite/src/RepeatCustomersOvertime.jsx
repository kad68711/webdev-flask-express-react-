import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const RepeatCustomersOverTimeChart = ({ salesData, timePeriod }) => {
  // Check if salesData is defined and is an array
  if (!salesData || !Array.isArray(salesData)) {
    return <p>No repeat customers data available</p>;
  }

  // Transform salesData to fit the chart format
  const labels = salesData.map(item => {
    const { day, month, year } = item._id;
    return timePeriod === 'daily' ? `${day}/${month}/${year}` : timePeriod === 'monthly' ? `${month}/${year}` : timePeriod === 'quarterly' ? `Q${item._id.quarter} ${year}` : `${year}`;
  });
  const dataValues = salesData.map(item => item.repeatCustomers);

  // Generate a random color for each chart instance
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Repeat Customers Over Time',
        data: dataValues,
        fill: false,
        borderColor: getRandomColor(), // Set a random color
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
        text: `Repeat Customers Over Time(${timePeriod.charAt(0).toUpperCase() + timePeriod.slice(1)})`,
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
          text: 'Repeat Customers',
        },
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default RepeatCustomersOverTimeChart;
