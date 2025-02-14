// "use client";

// import React from 'react';
// import { Line } from 'react-chartjs-2';

// const UserGrowthChart = ({ userGrowthData }) => {
//   const data = {
//     labels: userGrowthData.map(item => item.month), // Assuming userGrowthData has a month property
//     datasets: [
//       {
//         label: 'New Users',
//         data: userGrowthData.map(item => item.count), // Assuming userGrowthData has a count property
//         fill: false,
//         backgroundColor: 'rgba(75, 192, 192, 0.6)',
//         borderColor: 'rgba(75, 192, 192, 1)',
//         tension: 0.1,
//       },
//     ],
//   };

//   const options = {
//     scales: {
//       y: {
//         beginAtZero: true,
//       },
//     },
//   };

//   return (
//     <div className="user-growth-chart">
//       <h2>User Growth Over Time</h2>
//       <Line data={data} options={options} />
//       <style jsx>{`
//         .user-growth-chart {
//           margin-bottom: 20px;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default UserGrowthChart; 