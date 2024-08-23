import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GeoDistributionChart = ({ geoData }) => {
  // Check if geoData is defined and is an array
  if (!geoData || !Array.isArray(geoData)) {
    return <p>No geographic distribution data available</p>;
  }

  // Transform geoData to fit the chart format
  const labels = geoData.map(item => item._id);
  const dataValues = geoData.map(item => item.customerCount);

  // Generate a random color for the bar chart
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
        label: 'Customer Count by City',
        data: dataValues,
        backgroundColor: getRandomColor(), // Set a random color
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
        text: 'Geographic Distribution of Customers',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'City',
        },
        ticks: {
          autoSkip: false, // Show all city names on the x-axis
        },
      },
      y: {
        title: {
          display: true,
          text: 'Customer Count',
        },
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default GeoDistributionChart;
