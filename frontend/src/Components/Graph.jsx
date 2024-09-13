import React, { useState, useEffect } from "react";
import { Bar, Pie, Line, Scatter } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
} from "chart.js";
import "tailwindcss/tailwind.css";

// Register the necessary chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement
);

const Graph = () => {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [graphType, setGraphType] = useState({
    departmentGraph: "bar",
    salaryGraph: "bar",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3002/api/v1/getForm"
        );
        console.log("Form data retrieved successfully:", response.data.data);
        setFormData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching form data:", error);
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  // Extract data for the graph
  const departments = [...new Set(formData.map((data) => data.department))];
  const employeeCountByDepartment = departments.map(
    (dept) => formData.filter((data) => data.department === dept).length
  );
  const salaries = formData.map((data) => data.salary);
  const employeeNames = formData.map(
    (data) => `${data.firstName} ${data.lastName}`
  );

  // Calculate total number of employees
  const totalEmployees = formData.length;

  // Graph data for department chart
  const departmentData = {
    labels: departments,
    datasets: [
      {
        label: "Number of Employees",
        data: employeeCountByDepartment,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Graph data for salary chart
  const salaryData = {
    labels: employeeNames,
    datasets: [
      {
        label: "Salary",
        data: salaries,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Options for the chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Employee Data",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return tooltipItem.raw.toLocaleString(); // Add number formatting
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return value.toLocaleString(); // Format y-axis numbers
          },
        },
      },
    },
    maintainAspectRatio: false, // Adjust for smaller size
  };

  const renderGraph = (data, type) => {
    switch (type) {
      case "bar":
        return <Bar data={data} options={options} />;
      case "pie":
        return <Pie data={data} options={options} />;
      case "line":
        return <Line data={data} options={options} />;
      case "scatter":
        return <Scatter data={data} options={options} />;
      default:
        return <Bar data={data} options={options} />;
    }
  };

  return (
    <div className="mt-32 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
        Employee Data Visualizations
      </h2>
      {/* Total Number of Employees */}
      <div className="bg-red-100 w-1/3 p-4 rounded-lg shadow-lg mb-8">
        <h3 className="text-lg font-semibold text-gray-800">
          Total Number of Employees
        </h3>
        <p className="text-2xl font-bold text-gray-800">{totalEmployees}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Department Graph */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Department vs Employees
            </h3>
            <select
              className="block appearance-none w-28 bg-white border border-gray-300 hover:border-gray-500 px-2 py-1 rounded shadow focus:outline-none focus:shadow-outline"
              value={graphType.departmentGraph}
              onChange={(e) =>
                setGraphType({ ...graphType, departmentGraph: e.target.value })
              }
            >
              <option value="bar">Bar</option>
              <option value="pie">Pie</option>
              <option value="line">Line</option>
              <option value="scatter">Scatter</option>
            </select>
          </div>
          <div className="h-48">
            {" "}
            {/* Smaller height */}
            {renderGraph(departmentData, graphType.departmentGraph)}
          </div>
        </div>

        {/* Salary Graph */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Salary Distribution
            </h3>
            <select
              className="block appearance-none w-28 bg-white border border-gray-300 hover:border-gray-500 px-2 py-1 rounded shadow focus:outline-none focus:shadow-outline"
              value={graphType.salaryGraph}
              onChange={(e) =>
                setGraphType({ ...graphType, salaryGraph: e.target.value })
              }
            >
              <option value="bar">Bar</option>
              <option value="pie">Pie</option>
              <option value="line">Line</option>
              <option value="scatter">Scatter</option>
            </select>
          </div>
          <div className="h-48">
            {" "}
            {/* Smaller height */}
            {renderGraph(salaryData, graphType.salaryGraph)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Graph;
