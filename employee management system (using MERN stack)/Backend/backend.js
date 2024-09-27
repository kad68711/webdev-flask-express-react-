import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken'; // Import JWT

const app = express();
const port = 5000;

// Middleware
const corsOptions = {
  origin: 'http://localhost:5173',  // Allow only from localhost:5173
  optionsSuccessStatus: 200,  // Some legacy browsers choke on 204
};

// Apply CORS middleware to all routes
app.use(cors(corsOptions));
app.use(bodyParser.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/employeeDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the Employee Schema
const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  designation: { type: String, required: true },
  gender: { type: String, required: true },
  courses: { type: [String], required: true },
  img: { type: String },
  createDate: { type: Date, default: Date.now },
});

const Employee = mongoose.model('Employee', employeeSchema);

// File Upload Config with Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Only .jpg and .png files are allowed'), false);
    }
  },
});

// Middleware for checking JWT
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header
  if (!token) return res.sendStatus(401); // No token, unauthorized

  jwt.verify(token, 'your_jwt_secret', (err, user) => { // Replace 'your_jwt_secret' with your actual secret
    if (err) return res.sendStatus(403); // Invalid token, forbidden
    req.user = user; // Store user information in request
    next(); // Proceed to the next middleware/route handler
  });
};

// API Routes

// Login route to generate a token
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Dummy user validation - replace this with your actual validation logic
  if (email === 'admin@gmail.com' && password === 'admin') {
    const user = { email }; // You can include more user info here if needed
    const token = jwt.sign(user, 'your_jwt_secret', { expiresIn: '1h' }); // Generate token
    return res.json({ token });
  }

  return res.sendStatus(403); // Forbidden
});

// Create an employee
app.post('/api/employees', upload.single('img'), async (req, res) => {
  try {
    const { name, email, mobile, designation, gender, courses } = req.body;

    // Validate required fields
    if (!name || !email || !mobile || !designation || !gender || !courses) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check for email uniqueness
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const employee = new Employee({
      name,
      email,
      mobile,
      designation,
      gender,
      courses: courses.split(','), // Assuming courses are comma-separated
      img: req.file ? req.file.path : '',
    });

    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Error creating employee', error });
  }
});

// Get all employees
app.get('/api/employees', authenticateToken, async (req, res) => {
  try {
    const employees = await Employee.find();
    
    // Map through the employees to ensure the image path uses forward slashes
    const formattedEmployees = employees.map(employee => ({
      ...employee.toObject(),
      img: employee.img.replace(/\\/g, '/'), // Replace backslashes with forward slashes
    }));

    res.status(200).json(formattedEmployees);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employees', error });
  }
});

// Get an employee by ID
app.get('/api/employees/:id', authenticateToken, async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employee', error });
  }
});

// Update an employee
app.put('/api/employees/:id', authenticateToken, upload.single('img'), async (req, res) => {
  try {
    const { name, email, mobile, designation, gender, courses } = req.body;

    // Validate required fields
    if (!name || !email || !mobile || !designation || !gender || !courses) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const updatedData = {
      name,
      email,
      mobile,
      designation,
      gender,
      courses: courses.split(','), // Assuming courses are comma-separated
    };

    if (req.file) {
      updatedData.img = req.file.path;
    }

    const employee = await Employee.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Error updating employee', error });
  }
});

// Delete an employee
app.delete('/api/employees/:id', authenticateToken, async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting employee', error });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
