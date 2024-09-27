import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './EmployeeEdit.css';

const EmployeeEdit = () => {
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: 'Male',
    courses: [],
    img: null,
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const employeeId = window.location.pathname.split('/').pop(); // Get the employee ID from the URL
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/employees/${employeeId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include the token
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch employee data');
        }
        const data = await response.json();
        setEmployee(data);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployee();
  }, [employeeId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      setEmployee((prev) => ({ ...prev, img: file }));
      setImagePreview(URL.createObjectURL(file));
    } else {
      setErrorMessage('Please upload a valid image file (jpg/png).');
    }
  };

  const validateForm = () => {
    if (!employee.name || !employee.email || !employee.mobile || !employee.designation) {
      setErrorMessage('All fields are required.');
      return false;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(employee.email)) {
      setErrorMessage('Please enter a valid email.');
      return false;
    }

    if (!/^\d+$/.test(employee.mobile)) {
      setErrorMessage('Please enter a valid numeric mobile number.');
      return false;
    }

    setErrorMessage('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const formData = new FormData();
        formData.append('name', employee.name);
        formData.append('email', employee.email);
        formData.append('mobile', employee.mobile);
        formData.append('designation', employee.designation);
        formData.append('gender', employee.gender);
        
        // Append courses as a comma-separated string or as individual items
        employee.courses.forEach((course) => {
          formData.append('courses', course); // Append each course
        });

        // Append the image file if it exists
        if (employee.img) {
          formData.append('img', employee.img);
        }

        const response = await fetch(`http://localhost:5000/api/employees/${employeeId}`, {
          method: 'PUT', // Assuming you're updating the employee
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include the token
          },
          body: formData, // Use FormData for file upload
        });

        if (!response.ok) {
          throw new Error('Failed to update employee');
        }

        // Redirect to EmployeeList page on success
        navigate('/employee-list');
      } catch (error) {
        console.error('Error updating employee data:', error);
        setErrorMessage('Failed to update employee data.');
      }
    }
  };

  return (
    <div className="employee-edit-container">
      <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit} className="employee-edit-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={employee.name}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={employee.email}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="mobile">Mobile No</label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            value={employee.mobile}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="designation">Designation</label>
          <select
            id="designation"
            name="designation"
            value={employee.designation}
            onChange={handleInputChange}
          >
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>

        <div className="form-group">
          <label>Gender</label>
          <input
            type="radio"
            id="male"
            name="gender"
            value="Male"
            checked={employee.gender === 'Male'}
            onChange={handleInputChange}
          />
          <label htmlFor="male">Male</label>
          <input
            type="radio"
            id="female"
            name="gender"
            value="Female"
            checked={employee.gender === 'Female'}
            onChange={handleInputChange}
          />
          <label htmlFor="female">Female</label>
        </div>

        <div className="form-group">
          <label>Course</label>
          <input
            type="checkbox"
            name="courses"
            value="MCA"
            checked={employee.courses.includes('MCA')}
            onChange={() =>
              setEmployee((prev) => ({
                ...prev,
                courses: prev.courses.includes('MCA')
                  ? prev.courses.filter((course) => course !== 'MCA')
                  : [...prev.courses, 'MCA'],
              }))
            }
          />
          MCA
          <input
            type="checkbox"
            name="courses"
            value="BCA"
            checked={employee.courses.includes('BCA')}
            onChange={() =>
              setEmployee((prev) => ({
                ...prev,
                courses: prev.courses.includes('BCA')
                  ? prev.courses.filter((course) => course !== 'BCA')
                  : [...prev.courses, 'BCA'],
              }))
            }
          />
          BCA
          <input
            type="checkbox"
            name="courses"
            value="BSC"
            checked={employee.courses.includes('BSC')}
            onChange={() =>
              setEmployee((prev) => ({
                ...prev,
                courses: prev.courses.includes('BSC')
                  ? prev.courses.filter((course) => course !== 'BSC')
                  : [...prev.courses, 'BSC'],
              }))
            }
          />
          BSC
        </div>

        <div className="form-group">
          <label htmlFor="img">Img Upload</label>
          <input
            type="file"
            id="img"
            name="img"
            accept="image/jpeg, image/png"
            onChange={handleFileChange}
          />
          {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EmployeeEdit;
