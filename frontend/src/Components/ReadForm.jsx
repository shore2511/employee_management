// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const ReadForm = () => {
//   const [formData, setFormData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:3002/api/v1/getForm"
//         );
//         console.log("Form data retrieved successfully:", response.data.data);
//         setFormData(response.data.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching form data:", error);
//         setError(error);
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>Error: {error.message}</p>;
//   }

//   return (
//     <div className="mt-32 px-4 sm:px-6 lg:px-8">
//       <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
//         Form Data
//       </h2>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-300">
//           <thead>
//             <tr className="bg-gray-100 border-b border-gray-300">
//               <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">
//                 ID
//               </th>
//               <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">
//                 Employee ID
//               </th>
//               <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">
//                 First Name
//               </th>
//               <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">
//                 Last Name
//               </th>
//               <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">
//                 Email
//               </th>
//               <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">
//                 Phone Number
//               </th>
//               <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">
//                 Date of Birth
//               </th>
//               <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">
//                 Department
//               </th>
//               <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">
//                 Position
//               </th>
//               <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">
//                 Date of Joining
//               </th>
//               <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">
//                 Salary
//               </th>
//               <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">
//                 Created At
//               </th>
//               <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">
//                 Updated At
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {formData.map((data) => (
//               <tr key={data._id} className="hover:bg-gray-50">
//                 <td className="px-4 py-2 border-t border-gray-300 text-sm text-gray-700">
//                   {data._id}
//                 </td>
//                 <td className="px-4 py-2 border-t border-gray-300 text-sm text-gray-700">
//                   {data.employeeId}
//                 </td>
//                 <td className="px-4 py-2 border-t border-gray-300 text-sm text-gray-700">
//                   {data.firstName}
//                 </td>
//                 <td className="px-4 py-2 border-t border-gray-300 text-sm text-gray-700">
//                   {data.lastName}
//                 </td>
//                 <td className="px-4 py-2 border-t border-gray-300 text-sm text-gray-700">
//                   {data.email}
//                 </td>
//                 <td className="px-4 py-2 border-t border-gray-300 text-sm text-gray-700">
//                   {data.phoneNumber}
//                 </td>
//                 <td className="px-4 py-2 border-t border-gray-300 text-sm text-gray-700">
//                   {data.dateOfBirth}
//                 </td>
//                 <td className="px-4 py-2 border-t border-gray-300 text-sm text-gray-700">
//                   {data.department}
//                 </td>
//                 <td className="px-4 py-2 border-t border-gray-300 text-sm text-gray-700">
//                   {data.position}
//                 </td>
//                 <td className="px-4 py-2 border-t border-gray-300 text-sm text-gray-700">
//                   {data.dateOfJoining}
//                 </td>
//                 <td className="px-4 py-2 border-t border-gray-300 text-sm text-gray-700">
//                   {data.salary}
//                 </td>
//                 <td className="px-4 py-2 border-t border-gray-300 text-sm text-gray-700">
//                   {data.CreatedAt}
//                 </td>
//                 <td className="px-4 py-2 border-t border-gray-300 text-sm text-gray-700">
//                   {data.updatedAt}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ReadForm;

import React, { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";

const ReadForm = () => {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const downloadExcel = () => {
    // Create a worksheet from the JSON data
    const ws = XLSX.utils.json_to_sheet(formData);

    // Create a new workbook and append the worksheet to it
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Employee Data");

    // Write the workbook to a file
    XLSX.writeFile(wb, "employee_data.xlsx");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="mt-32 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Form Data
        </h2>
        <button
          onClick={downloadExcel}
          className="mb-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded"
        >
          Download as Excel
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300">
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">
                ID
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">
                Employee ID
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">
                First Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">
                Last Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">
                Email
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">
                Phone Number
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">
                Date of Birth
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">
                Department
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">
                Position
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">
                Date of Joining
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">
                Salary
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">
                Created At
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">
                Updated At
              </th>
            </tr>
          </thead>
          <tbody>
            {formData.map((data) => (
              <tr key={data._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-t border-gray-300 text-sm text-gray-700">
                  {data._id}
                </td>
                <td className="px-4 py-2 border-t border-gray-300 text-sm text-gray-700">
                  {data.employeeId}
                </td>
                <td className="px-4 py-2 border-t border-gray-300 text-sm text-gray-700">
                  {data.firstName}
                </td>
                <td className="px-4 py-2 border-t border-gray-300 text-sm text-gray-700">
                  {data.lastName}
                </td>
                <td className="px-4 py-2 border-t border-gray-300 text-sm text-gray-700">
                  {data.email}
                </td>
                <td className="px-4 py-2 border-t border-gray-300 text-sm text-gray-700">
                  {data.phoneNumber}
                </td>
                <td className="px-4 py-2 border-t border-gray-300 text-sm text-gray-700">
                  {data.dateOfBirth}
                </td>
                <td className="px-4 py-2 border-t border-gray-300 text-sm text-gray-700">
                  {data.department}
                </td>
                <td className="px-4 py-2 border-t border-gray-300 text-sm text-gray-700">
                  {data.position}
                </td>
                <td className="px-4 py-2 border-t border-gray-300 text-sm text-gray-700">
                  {data.dateOfJoining}
                </td>
                <td className="px-4 py-2 border-t border-gray-300 text-sm text-gray-700">
                  {data.salary}
                </td>
                <td className="px-4 py-2 border-t border-gray-300 text-sm text-gray-700">
                  {data.CreatedAt}
                </td>
                <td className="px-4 py-2 border-t border-gray-300 text-sm text-gray-700">
                  {data.updatedAt}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReadForm;
