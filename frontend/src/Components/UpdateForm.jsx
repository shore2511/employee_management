import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateForm = () => {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [currentIdToUpdate, setCurrentIdToUpdate] = useState(null); // Current ID to update

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

  const handleInputChange = (e, id) => {
    const { name, value } = e.target;
    setEditingId(id); // Set the current editing row
    setUpdatedData((prevData) => ({
      ...prevData,
      [id]: {
        ...prevData[id],
        [name]: value,
      },
    }));
  };

  const handleEditClick = (id) => {
    setEditingId(id); // Set the current editing row
    setUpdatedData({ [id]: { ...formData.find((item) => item._id === id) } }); // Set the current row's data in `updatedData`
  };

  const handleOpenModal = (id) => {
    setIsModalOpen(true); // Open the modal
    setCurrentIdToUpdate(id); // Set the ID to be updated in the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
    setCurrentIdToUpdate(null); // Reset the ID to update
    setEditingId(null); // Reset the editing row
    setUpdatedData({});
  };

  const handleUpdateForm = async () => {
    try {
      const id = currentIdToUpdate;
      const changes = updatedData[id];

      await axios.put(`http://localhost:3002/api/v1/updateForm/${id}`, changes);
      // After successful update, fetch the updated form data
      const response = await axios.get("http://localhost:3002/api/v1/getForm");
      setFormData(response.data.data);
      setEditingId(null); // Reset editing row
      setUpdatedData({}); // Reset updated data
      handleCloseModal(); // Close modal after update
    } catch (error) {
      console.error("Error updating form:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="container mx-auto mt-36">
      <h2 className="text-3xl font-semibold text-center mb-8">
        Update Employee Form
      </h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-slate-100">
            <th className="py-2 px-4">Employee ID</th>
            <th className="py-2 px-4">First Name</th>
            <th className="py-2 px-4">Last Name</th>
            <th className="py-2 px-4">Date of Birth</th>
            <th className="py-2 px-4">Department</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Phone Number</th>
            <th className="py-2 px-4">Position</th>
            <th className="py-2 px-4">Date of Joining</th>
            <th className="py-2 px-4">Salary</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {formData.map((data) => (
            <tr key={data._id} className="border-b">
              <td className="py-2 px-4">
                {editingId === data._id ? (
                  <input
                    type="text"
                    name="employeeId"
                    value={updatedData[data._id]?.employeeId || data.employeeId}
                    onChange={(e) => handleInputChange(e, data._id)}
                    className="w-full"
                  />
                ) : (
                  data.employeeId
                )}
              </td>
              <td className="py-2 px-4">
                {editingId === data._id ? (
                  <input
                    type="text"
                    name="firstName"
                    value={updatedData[data._id]?.firstName || data.firstName}
                    onChange={(e) => handleInputChange(e, data._id)}
                    className="w-full"
                  />
                ) : (
                  data.firstName
                )}
              </td>
              <td className="py-2 px-4">
                {editingId === data._id ? (
                  <input
                    type="text"
                    name="lastName"
                    value={updatedData[data._id]?.lastName || data.lastName}
                    onChange={(e) => handleInputChange(e, data._id)}
                    className="w-full"
                  />
                ) : (
                  data.lastName
                )}
              </td>
              <td className="py-2 px-4">
                {editingId === data._id ? (
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={
                      updatedData[data._id]?.dateOfBirth || data.dateOfBirth
                    }
                    onChange={(e) => handleInputChange(e, data._id)}
                    className="w-full"
                  />
                ) : (
                  data.dateOfBirth
                )}
              </td>
              <td className="py-2 px-4">
                {editingId === data._id ? (
                  <input
                    type="text"
                    name="department"
                    value={updatedData[data._id]?.department || data.department}
                    onChange={(e) => handleInputChange(e, data._id)}
                    className="w-full"
                  />
                ) : (
                  data.department
                )}
              </td>
              <td className="py-2 px-4">
                {editingId === data._id ? (
                  <input
                    type="email"
                    name="email"
                    value={updatedData[data._id]?.email || data.email}
                    onChange={(e) => handleInputChange(e, data._id)}
                    className="w-full"
                  />
                ) : (
                  data.email
                )}
              </td>
              <td className="py-2 px-4">
                {editingId === data._id ? (
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={
                      updatedData[data._id]?.phoneNumber || data.phoneNumber
                    }
                    onChange={(e) => handleInputChange(e, data._id)}
                    className="w-full"
                  />
                ) : (
                  data.phoneNumber
                )}
              </td>
              <td className="py-2 px-4">
                {editingId === data._id ? (
                  <input
                    type="text"
                    name="position"
                    value={updatedData[data._id]?.position || data.position}
                    onChange={(e) => handleInputChange(e, data._id)}
                    className="w-full"
                  />
                ) : (
                  data.position
                )}
              </td>
              <td className="py-2 px-4">
                {editingId === data._id ? (
                  <input
                    type="date"
                    name="dateOfJoining"
                    value={
                      updatedData[data._id]?.dateOfJoining || data.dateOfJoining
                    }
                    onChange={(e) => handleInputChange(e, data._id)}
                    className="w-full"
                  />
                ) : (
                  data.dateOfJoining
                )}
              </td>
              <td className="py-2 px-4">
                {editingId === data._id ? (
                  <input
                    type="number"
                    name="salary"
                    value={updatedData[data._id]?.salary || data.salary}
                    onChange={(e) => handleInputChange(e, data._id)}
                    className="w-full"
                  />
                ) : (
                  data.salary
                )}
              </td>
              <td className="py-2 px-4">
                {editingId === data._id ? (
                  <button
                    onClick={() => handleOpenModal(data._id)}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Update
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditClick(data._id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Update Confirmation */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Confirm Update</h3>
            <p>Are you sure you want to update this employee's data?</p>
            <div className="flex justify-end mt-6">
              <button
                onClick={handleCloseModal}
                className="bg-gray-300 px-4 py-2 rounded mr-4"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateForm}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Confirm Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateForm;
