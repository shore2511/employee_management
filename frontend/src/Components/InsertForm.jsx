import React, { useState } from "react";
import axios from "axios";

const InsertForm = () => {
  const [formData, setFormData] = useState({
    employeeId: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    department: "",
    position: "",
    dateOfJoining: "",
    salary: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState(""); // 'success' or 'error'

  const validateForm = () => {
    const newErrors = {};
    if (!formData.employeeId) newErrors.employeeId = "Employee ID is required";
    if (!formData.firstName) newErrors.firstName = "First Name is required";
    if (!formData.lastName) newErrors.lastName = "Last Name is required";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Valid email is required";
    if (formData.phoneNumber && isNaN(formData.phoneNumber))
      newErrors.phoneNumber = "Phone Number should be numeric";
    if (!formData.dateOfJoining)
      newErrors.dateOfJoining = "Date of Joining is required";
    if (!formData.salary || isNaN(formData.salary))
      newErrors.salary = "Valid Salary is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch(
          "http://localhost:3002/api/v1/createForm",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        if (response.ok) {
          setStatus("Form submitted successfully!");
          setStatusType("success");
          setFormData({
            employeeId: "",
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            dateOfBirth: "",
            department: "",
            position: "",
            dateOfJoining: "",
            salary: "",
          });
        } else {
          setStatus("Failed to submit form.");
          setStatusType("error");
        }
      } catch (error) {
        setStatus("Error submitting form.");
        setStatusType("error");
      }
    }
  };

  return (
    <form
      className="max-w-lg mx-auto p-6 mt-32 bg-white shadow-md rounded"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-semibold mb-4">Employee Registration</h2>

      {Object.keys(errors).map((key) => (
        <div key={key} className="text-red-500 mb-2">
          {errors[key]}
        </div>
      ))}

      {status && (
        <div
          className={`mb-4 p-2 rounded ${
            statusType === "success"
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-800"
          }`}
        >
          {status}
        </div>
      )}

      <div className="mb-4">
        <label className="block text-gray-700">Employee ID</label>
        <input
          type="text"
          value={formData.employeeId}
          onChange={(e) =>
            setFormData({ ...formData, employeeId: e.target.value })
          }
          className="w-full border rounded p-2"
        />
      </div>
      <div className="flex justify-between">
        <div className="mb-4">
          <label className="block text-gray-700">First Name</label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            className="w-full border rounded p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Last Name</label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            className="w-full border rounded p-2"
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full border rounded p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Phone Number</label>
        <input
          type="text"
          value={formData.phoneNumber}
          onChange={(e) =>
            setFormData({ ...formData, phoneNumber: e.target.value })
          }
          className="w-full border rounded p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Date of Birth</label>
        <input
          type="date"
          value={formData.dateOfBirth}
          onChange={(e) =>
            setFormData({ ...formData, dateOfBirth: e.target.value })
          }
          className="w-full border rounded p-2"
        />
      </div>
      <div className="flex justify-between">
        <div className="mb-4">
          <label className="block text-gray-700">Department</label>
          <select
            value={formData.department}
            onChange={(e) =>
              setFormData({ ...formData, department: e.target.value })
            }
            className="w-full border rounded p-2"
          >
            <option value="">Select Department</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            {/* Add more departments as needed */}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Position</label>
          <input
            type="text"
            value={formData.position}
            onChange={(e) =>
              setFormData({ ...formData, position: e.target.value })
            }
            className="w-full border rounded p-2"
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Date of Joining</label>
        <input
          type="date"
          value={formData.dateOfJoining}
          onChange={(e) =>
            setFormData({ ...formData, dateOfJoining: e.target.value })
          }
          className="w-full border rounded p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Salary</label>
        <input
          type="text"
          value={formData.salary}
          onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
          className="w-full border rounded p-2"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default InsertForm;
