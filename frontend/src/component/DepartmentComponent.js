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
  
    const fetchData = async () => {
      await fetch("http://localhost:8080/department/getAll")
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
  
    const handleSubmit = async (e) => {
      // console.log(e);
      e.preventDefault();
        if(formData.departmentId){ 
          await handleUpdate(formData.departmentId);
        } else {
          await handleCreate();
        }
        setFormData({ 
          departmentName: "",
          headOfDepartment: "",
          departmentId: "",
        })
      };
  
    const handleDelete = async (a) => {
      await fetch(`http://localhost:8080/department/delete/${a}`, {
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
        fetchData();
    };

    const handleGetById = async (a) => {
      if (a) {
        await fetch(`http://localhost:8080/department/getById/${a}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Data Getby:", data);
            setFormData({ 
              departmentName: data.departmentName,
              headOfDepartment: data.headOfDepartment,
              departmentId: data.departmentId,
            })
            // fetchData();
          })
          .catch((error) => {
            // console.error("Error deleting data:", error);
          });
          // fetchData();
      } else {
        console.warn("DepartmentId cannot be null or empty.");
      }
    };

    const handleUpdate = async (a) => {
      if (a) {
        await fetch(`http://localhost:8080/department/update/${a}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Data Getby:", data);
            setFormData({ 
              departmentName: data.departmentName,
              headOfDepartment: data.headOfDepartment,
              departmentId: data.departmentId,
            })
            // fetchData();
          })
          .catch((error) => {
            // console.error("Error deleting data:", error);
          });
          fetchData();
      } else {
        console.warn("DepartmentId cannot be null or empty.");
      }
    };

    const handleCreate = async () => {
      if (formData) {
        // e.preventDefault();
        if (formData.departmentName && formData.headOfDepartment) {
          await fetch("http://localhost:8080/department/create", {
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
  }

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
    
        <h1>Department Data</h1>
        <table style={{ borderCollapse: 'collapse', width: '100%', border: '1px solid #ddd', fontSize: '16px' }}> 
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>departmentId</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>departmentName</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>headOfDepartment</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>createdDate</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>createdBy</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>updatedDate</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>updatedBy</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>จัดการข้อมูล</th>
            </tr>
          </thead>
          <tbody>
          {data.map((val, key) => (
            <tr key={val.departmentId}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{val.departmentId}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{val.departmentName}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{val.headOfDepartment}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{val.createdDate}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{val.createdBy}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{val.updatedDate}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{val.updatedBy}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                <button type="button" style={{ marginRight: '10px' }} onClick={() => handleGetById(val.departmentId)} className="btn btn-warning">
                  Edit
                </button>
                <button type="button" onClick={() => handleDelete(val.departmentId)} className="btn btn-danger">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        </table>
    </div>
  );
}

export default DepartmentComponent;
