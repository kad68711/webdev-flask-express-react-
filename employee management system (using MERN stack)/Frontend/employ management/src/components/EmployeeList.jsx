import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './EmployeeList.css';
import Navbar from './Navbar';

const EmployeeList = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/edit-employee/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/employees/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete employee');
        }

        // Update state by filtering out the deleted employee
        setEmployees(employees.filter((employee) => employee._id !== id));
      } catch (error) {
        console.error('Error deleting employee:', error);
        alert('Error deleting employee. Please try again.');
      }
    }
  };

  useEffect(() => {
    const fetchEmployees = async () => {
     

      
      try {
          const response = await fetch('http://localhost:5000/api/employees', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch employees');
        }
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error('Error fetching employees:', error);
        alert('Error fetching employees. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div className="employee-list-container">
      {/* Navigation Bar */}
      <Navbar/>

      {/* Employee List Header */}
      <div className="employee-list-header">
        <h2>Employee List</h2>
        <div className="header-actions">
          <span>Total Count: {filteredEmployees.length}</span>
          <a href="/create-employee" className="create-button">Create Employee</a>
        </div>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <label>Search: </label>
        <input
          type="text"
          placeholder="Enter Search Keyword"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
      </div>

      {/* Employee Table */}
      <table className="employee-table">
        <thead>
          <tr>
            <th>Unique Id</th>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile No</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            <th>Create Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="10" className="loading">Loading...</td>
            </tr>
          ) : filteredEmployees.length > 0 ? (
            filteredEmployees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee._id}</td>
                <td>
                  <img 
                    src={employee.img ? `http://localhost:5000/${employee.img}` : `https://via.placeholder.com/50`} 
                    alt={employee.name} 
                    style={{ maxWidth: '50px', maxHeight: '50px', objectFit: 'cover' }} 
                  />
                </td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.mobile}</td>
                <td>{employee.designation}</td>
                <td>{employee.gender}</td>
                <td>{employee.courses.join(', ')}</td>
                <td>{new Date(employee.createDate).toLocaleDateString()}</td>
                <td>
                  <button className="edit-button" onClick={() => handleEdit(employee._id)}>Edit</button>
                  <button className="delete-button" onClick={() => handleDelete(employee._id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="no-data">No employees found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
