import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './CreateEmployee.css';
import Navbar from './Navbar';

const CreateEmployee = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    courses: [],
    image: null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      const updatedCourses = checked
        ? [...formData.courses, value]
        : formData.courses.filter((course) => course !== value);
      setFormData({ ...formData, courses: updatedCourses });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  // Validation logic
  const validateForm = () => {
    let formErrors = {};
    if (!formData.name) formErrors.name = 'Name is required';
    if (!formData.email) formErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) formErrors.email = 'Invalid email format';
    if (!formData.mobile) formErrors.mobile = 'Mobile number is required';
    else if (!/^\d+$/.test(formData.mobile)) formErrors.mobile = 'Mobile number must be numeric';
    if (!formData.designation) formErrors.designation = 'Designation is required';
    if (!formData.gender) formErrors.gender = 'Gender is required';
    if (!formData.courses.length) formErrors.courses = 'Select at least one course';
    if (!formData.image) formErrors.image = 'Image is required';
    else if (!['image/jpeg', 'image/png'].includes(formData.image.type)) formErrors.image = 'Only jpg/png files are allowed';
    
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);

      // Create FormData object
      const formDataObj = new FormData();
      formDataObj.append('name', formData.name);
      formDataObj.append('email', formData.email);
      formDataObj.append('mobile', formData.mobile);
      formDataObj.append('designation', formData.designation);
      formDataObj.append('gender', formData.gender);
      formDataObj.append('courses', formData.courses.join(','));
      formDataObj.append('img', formData.image);

      try {
        // Make the API call using fetch
        const response = await fetch('http://localhost:5000/api/employees', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: formDataObj, // Pass the FormData object
        });

        // Check if response is ok
        if (response.ok) {
          const result = await response.json();
          console.log('Employee created successfully:', result);

          // Redirect to employee list page
          navigate('/employee-list'); // Adjust the path as needed
          
          // Optionally reset form after submission
          setFormData({
            name: '',
            email: '',
            mobile: '',
            designation: '',
            gender: '',
            courses: [],
            image: null,
          });

          setErrors({}); // Clear any existing errors
        } else {
          // Check if the response is HTML, log it for debugging
          const errorText = await response.text();
          console.error('Response error:', errorText);
          setErrors({ general: 'An error occurred. Please try again.' });
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        setErrors({ general: 'An error occurred. Please try again.' });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="create-employee-container">
      {/* Navigation Bar */}
      <Navbar />

      {/* Form Section */}
      <div className="form-container">
        <h2>Create Employee</h2>
        <form onSubmit={handleSubmit} noValidate>
          {/* Name */}
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          {/* Mobile No */}
          <div className="form-group">
            <label>Mobile No:</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              required
            />
            {errors.mobile && <p className="error">{errors.mobile}</p>}
          </div>

          {/* Designation */}
          <div className="form-group">
            <label>Designation:</label>
            <select
              name="designation"
              value={formData.designation}
              onChange={handleInputChange}
              required
            >
              <option value="">--Select--</option>
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </select>
            {errors.designation && <p className="error">{errors.designation}</p>}
          </div>

          {/* Gender */}
          <div className="form-group">
            <label>Gender:</label>
            <div>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  onChange={handleInputChange}
                  checked={formData.gender === 'Male'}
                  required
                /> Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  onChange={handleInputChange}
                  checked={formData.gender === 'Female'}
                  required
                /> Female
              </label>
            </div>
            {errors.gender && <p className="error">{errors.gender}</p>}
          </div>

          {/* Course */}
          <div className="form-group">
            <label>Course:</label>
            <div>
              <label>
                <input
                  type="checkbox"
                  name="course"
                  value="MCA"
                  onChange={handleInputChange}
                  checked={formData.courses.includes('MCA')}
                /> MCA
              </label>
              <label>
                <input
                  type="checkbox"
                  name="course"
                  value="BCA"
                  onChange={handleInputChange}
                  checked={formData.courses.includes('BCA')}
                /> BCA
              </label>
              <label>
                <input
                  type="checkbox"
                  name="course"
                  value="BSC"
                  onChange={handleInputChange}
                  checked={formData.courses.includes('BSC')}
                /> BSC
              </label>
            </div>
            {errors.courses && <p className="error">{errors.courses}</p>}
          </div>

          {/* Image Upload */}
          <div className="form-group">
            <label>Image Upload:</label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              required
            />
            {errors.image && <p className="error">{errors.image}</p>}
          </div>

          {/* Submit Button */}
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEmployee;
