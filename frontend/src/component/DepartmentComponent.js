import React, { useState, useEffect } from "react";

function DepartmentComponent() {
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({
      departmentName: "",
      headOfDepartment: "",
      departmentId: "",
    });
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = () => {
      fetch("http://localhost:8080/department/getAll")
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => console.error(error));
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.departmentName && formData.headOfDepartment) {
          fetch("http://localhost:8080/department/create", {
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
          console.warn("DepartmentName and HeadOfDepartment cannot be null or empty.");
        }
      };
  
    const handleDelete = () => {
      fetch(`http://localhost:8080/department/delete/${formData.departmentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
        //   console.log("Data Deleted:", data);
          fetchData();
        })
        .catch((error) => {
        //   console.error("Error deleting data:", error);
        });
    };

  return (
    <div>
      <div>
        <h1>Department Save</h1>
        <form onSubmit={handleSubmit}>
          <label style={{ marginRight: '100px' }}>
            Department Name:
            <input
              type="text"
              name="departmentName"
              value={formData.departmentName}
              onChange={handleChange}
            />
          </label>
          <label style={{ marginRight: '100px' }}>
            Head of Department:
            <input
              type="text"
              name="headOfDepartment"
              value={formData.headOfDepartment}
              onChange={handleChange}
            />
          </label>
          <button style={{ marginRight: '100px' }} type="submit">Save</button>
        </form>
      </div>
      <br />

      <div>
        <h1>Delete Department</h1>
        <form onSubmit={handleDelete}>
          <label style={{ marginRight: '100px' }}>
            Department ID:
            <input
              type="text"
              name="departmentId"
              value={formData.departmentId}
              onChange={handleChange}
            />
          </label>
          <button style={{ marginRight: '100px' }} type="submit">Delete</button>
        </form>
      </div>
      <br />
    
        <h1>Department Data</h1>
        <table style={{ borderCollapse: 'collapse', width: '100%', border: '1px solid #ddd', fontSize: '16px' }}> 
            <tr>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>departmentId</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>departmentName</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>headOfDepartment</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>createdDate</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>createdBy</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>updatedDate</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>updatedBy</th>
            </tr>
        {data.map((val, key) => (
            <tr key={key}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{val.departmentId}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{val.departmentName}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{val.headOfDepartment}</td>
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

export default DepartmentComponent;
