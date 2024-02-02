import React, { useState, useEffect } from "react";

function EmployeeComponent() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("http://localhost:8080/employee/getAll")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error));
  };

  const [formData, setFormData] = useState({
    employeeNo: "",
    firstName: "",
    lastName: "",
    position: "",
    phoneNumber: "",
    email: "",
    departmentId: "",
  });

  function handleChange(e) {
      const { name, value } = e.target;
      setFormData({
          ...formData,
          [name]: value,
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.employeeNo && formData.firstName && formData.lastName && formData.position && formData.phoneNumber && formData.email) {
      fetch("http://localhost:8080/employee/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
        //   console.log("Data Saved:", data);
          fetchData();
        })
        .catch((error) => {
        //   console.error("Error saving data:", error);
        });
    } else {
      console.warn("Employee data cannot be null or empty.");
    }
  };

  const handleDelete = () => {
    if (formData.employeeNo) {
      fetch(`http://localhost:8080/employee/delete/${formData.employeeNo}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log("Data Deleted:", data);
          fetchData();
        })
        .catch((error) => {
          // console.error("Error deleting data:", error);
        });
    } else {
      console.warn("EmployeeNo cannot be null or empty.");
    }
  };


  return (
    <div>
      <div>
        <h1>Employee Save</h1>
        <form onSubmit={handleSubmit}>
            <label style={{ marginRight: '100px' }}>
            EmployeeNo:
            <input
                type="text"
                name="employeeNo"
                value={formData.employeeNo}
                onChange={handleChange}
            />
            </label>
            <label style={{ marginRight: '100px' }}>
            First Name:
            <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
            />
            </label>
            <label style={{ marginRight: '100px' }}>
            Last Name:
            <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
            />
            </label>
            <label style={{ marginRight: '100px' }}>
            Position:
            <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
            />
            </label>
            <br/>
            <label style={{ marginRight: '100px' }}>
            PhoneNumber:
            <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
            />
            </label>
            <label style={{ marginRight: '100px' }}>
            Email:
            <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
            />
            </label>
            <label style={{ marginRight: '100px' }}>
            Department Id:
            <input
                type="text"
                name="departmentId"
                value={formData.departmentId}
                onChange={handleChange}
            />
            </label>
            <button style={{ marginRight: '100px' }} type="submit ">Save</button>
        </form>
        </div>
        <br/>

        <div>
        <h1>Delete Employee</h1>
        <form>
            <label style={{ marginRight: '100px' }}>
            EmployeeNo:
            <input
                type="text"
                name="employeeNo"
                value={formData.employeeNo}
                onChange={handleChange}
            />
            </label>
            <button style={{ marginRight: '10px' }} type="button" onClick={handleDelete}>Delete</button>
        </form>
        </div>
        <br/>

        <h1>Employee Data</h1>
        <table style={{ borderCollapse: 'collapse', width: '100%', border: '1px solid #ddd', fontSize: '16px' }}> 
            <tr>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>employeeNo</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>firstName</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>lastName</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>position</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>phoneNumber</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>email</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>departmentId</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>createdDate</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>createdBy</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>updatedDate</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>updatedBy</th>
            </tr>
        {data.map((val, key) => (
            <tr key={key}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{val.employeeNo}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{val.firstName}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{val.lastName}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{val.position}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{val.phoneNumber}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{val.email}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{val.departmentId}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{val.createdDate}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{val.createdBy}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{val.updatedDate}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{val.updatedBy}</td>
            </tr>
        ))}
        </table>
    </div>
  );
}

export default EmployeeComponent;
