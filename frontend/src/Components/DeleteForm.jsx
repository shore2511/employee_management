import React, { useState, useEffect } from "react";
import axios from "axios";

const DeleteForm = () => {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteId, setDeleteId] = useState(null); // Store the ID of the form to delete
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

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

  const openModal = (id) => {
    setDeleteId(id); // Store the ID to delete
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setDeleteId(null); // Reset the delete ID
  };

  const handleDeleteForm = async () => {
    try {
      await axios.delete(`http://localhost:3002/api/v1/deleteForm/${deleteId}`);
      // After successful deletion, fetch the updated form data
      const response = await axios.get("http://localhost:3002/api/v1/getForm");
      setFormData(response.data.data);
      closeModal(); // Close modal after deletion
    } catch (error) {
      console.error("Error deleting form:", error);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error.message}</p>;
  }

  return (
    <div className="mt-32 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-semibold text-center mb-6">Form Data</h2>

      <div className="bg-white shadow-lg rounded-lg overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="p-3 text-left border border-blue-500">
                employeeId
              </th>
              <th className="p-3 text-left border border-blue-500">Name</th>
              <th className="p-3 text-left border border-blue-500">Email</th>
              <th className="p-3 text-left border border-blue-500">
                Phone Number
              </th>
              <th className="p-3 text-left border border-blue-500">
                department
              </th>
              <th className="p-3 text-left border border-blue-500">position</th>
              <th className="p-3 text-left border border-blue-500">
                date Of Joining
              </th>
              <th className="p-3 text-left border border-blue-500">Action</th>
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
                <td className="p-3 border border-blue-600">{data.firstName}</td>
                <td className="p-3 border border-blue-600">{data.email}</td>
                <td className="p-3 border border-blue-600">
                  {data.phoneNumber}
                </td>
                <td className="p-3 border border-blue-600">
                  {data.department}
                </td>
                <td className="p-3 border border-blue-600">{data.position}</td>
                <td className="p-3 border border-blue-600">
                  {new Date(data.dateOfJoining).toLocaleDateString()}
                </td>
                <td className="p-3 border border-blue-600">
                  <button
                    onClick={() => openModal(data._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p className="mb-6">
              Are you sure you want to delete this record? This action cannot be
              undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="bg-gray-300 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteForm}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteForm;
