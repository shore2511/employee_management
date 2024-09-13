import React, { useState, useEffect } from "react";
import axios from "axios";

const FindForm = () => {
  const [searchParams, setSearchParams] = useState({
    employeeId: "",
    name: "",
    department: "",
    startDate: "",
    endDate: "",
  }); // State to store search parameters
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchData = async () => {
      if (
        !searchParams.employeeId &&
        !searchParams.name &&
        !searchParams.department &&
        !searchParams.startDate &&
        !searchParams.endDate
      )
        return; // No search yet
      setLoading(true);
      try {
        const queryString = Object.keys(searchParams)
          .map((key) => {
            if (searchParams[key]) return `${key}=${searchParams[key]}`;
            return "";
          })
          .filter((param) => param !== "")
          .join("&");

        const response = await axios.get(
          `http://localhost:3002/api/v1/search?${queryString}`
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
  }, [searchParams]);

  return (
    <div className="mt-32 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-semibold text-center mb-6">
        Search Form Data
      </h2>

      {/* Search Form */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            name="employeeId"
            placeholder="Enter Employee ID"
            value={searchParams.employeeId}
            onChange={handleInputChange}
            className="w-full border-gray-300 rounded-lg shadow-sm p-2"
          />
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={searchParams.name}
            onChange={handleInputChange}
            className="w-full border-gray-300 rounded-lg shadow-sm p-2"
          />
          <select
            name="department"
            value={searchParams.department}
            onChange={handleInputChange}
            className="w-full border-gray-300 rounded-lg shadow-sm p-2"
          >
            <option value="">Select Department</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
          </select>
          <input
            type="date"
            name="startDate"
            placeholder="Start Date of Joining"
            value={searchParams.startDate}
            onChange={handleInputChange}
            className="w-full border-gray-300 rounded-lg shadow-sm p-2"
          />
          <input
            type="date"
            name="endDate"
            placeholder="End Date of Joining"
            value={searchParams.endDate}
            onChange={handleInputChange}
            className="w-full border-gray-300 rounded-lg shadow-sm p-2"
          />

          <button
            onClick={() => {
              setSearchParams({
                employeeId: "",
                name: "",
                department: "",
                startDate: "",
                endDate: "",
              });
              setFormData([]); // Clear the form data
            }}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-red-600 transition"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Loading, Error, or Data Display */}
      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && (
        <p className="text-center text-red-500">Error: {error.message}</p>
      )}

      {formData.length > 0 ? (
        <div className="bg-white shadow-lg rounded-lg overflow-x-auto">
          <table className="min-w-full max-w-7xl table-auto border-collapse">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="p-3 text-left border border-blue-800">
                  Employee ID
                </th>
                <th className="p-3 text-left border border-blue-400">Name</th>
                <th className="p-3 text-left border border-blue-400">Email</th>
                <th className="p-3 text-left border border-blue-400">
                  Phone Number
                </th>
                <th className="p-3 text-left border border-blue-400">
                  Department
                </th>
                <th className="p-3 text-left border border-blue-400">
                  Date of Joining
                </th>
              </tr>
            </thead>
            <tbody>
              {formData.map((data) => (
                <tr
                  key={data._id}
                  className="bg-gray-50 border-b border-gray-200"
                >
                  <td className="p-3 border border-blue-600">
                    {data.employeeId}
                  </td>
                  <td className="p-3 border border-blue-600">{`${data.firstName} ${data.lastName}`}</td>
                  <td className="p-3 border border-blue-600">{data.email}</td>
                  <td className="p-3 border border-blue-600">
                    {data.phoneNumber}
                  </td>
                  <td className="p-3 border border-blue-600">
                    {data.department}
                  </td>
                  <td className="p-3 border border-blue-600">
                    {new Date(data.dateOfJoining).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">No form data found</p>
      )}
    </div>
  );
};

export default FindForm;
