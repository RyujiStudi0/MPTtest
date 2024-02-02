import React, { useState, useEffect } from "react";

function EmployeeComponent() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await fetch("http://localhost:8080/employee/getAll")
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.employeeNo && formData.firstName && formData.lastName && formData.position && formData.phoneNumber && formData.email) {
      await fetch("http://localhost:8080/employee/create", {
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
          setFormData({ 
            employeeNo: "",
            firstName: "",
            lastName: "",
            position: "",
            phoneNumber: "",
            email: "",
            departmentId: "",
          })
        })
        .catch((error) => {
        //   console.error("Error saving data:", error);
        });
    } else {
      console.warn("Employee data cannot be null or empty.");
    }
  };

  const handleDelete = async (a) => {
    if (a) {
      await fetch(`http://localhost:8080/employee/delete/${a}`, {
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
        fetchData();
    } else {
      console.warn("EmployeeNo cannot be null or empty.");
    }
  };

  const handleUpdate = async (a) => {
    if (a) {
      await fetch(`http://localhost:8080/employee/getById/${a}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Data Getby:", data);
          setFormData({ 
            employeeNo: data.employeeNo,
            firstName: data.firstName,
            lastName: data.lastName,
            position: data.position,
            phoneNumber: data.phoneNumber,
            email: data.email,
            departmentId: data.departmentId, 
          })
          // fetchData();
        })
        .catch((error) => {
          // console.error("Error deleting data:", error);
        });
        // fetchData();
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
            <select value={formData.departmentId} onChange={handleChange} name="departmentId">
              <option value="">select</option>
              <option value="1">Development</option>
              <option value="2">Sales</option>
            </select>
            </label>
            <button style={{ marginRight: '1000px' }} type="submit ">Save</button>
        </form>
        </div>
        <br/>
        <div>
          <h1>Employee Data</h1>
          <table className="table table-striped table-bordered p-2"> 
            <thead>
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
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>จัดการข้อมูล</th>
              </tr>
            </thead>
            <tbody>
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
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  <button type="button" style={{ marginRight: '10px' }} onClick={() => handleUpdate(val.employeeNo)} className="btn btn-warning">
                    Edit
                  </button>
                  <button type="button" onClick={() => handleDelete(val.employeeNo)} className="btn btn-danger">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
        
    </div>
  );
}

export default EmployeeComponent;
