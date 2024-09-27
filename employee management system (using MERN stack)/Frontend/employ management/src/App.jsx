import { createBrowserRouter, RouterProvider, Route, Navigate, redirect } from 'react-router-dom';
import Login from './components/LoginPage';
import DashBoard from './components/DashBoard';
import CreateEmployee from './components/CreateEmployee';
import EmployeeList from './components/EmployeeList';
import EmployeeEdit from './components/EmployeeEdit';

// Loader function to check authentication
const authLoader = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    // If no token, redirect to login
    return redirect("/");
  }
  return null;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: <DashBoard />,
    loader: authLoader,
  },
  {
    path: '/create-employee',
    element: <CreateEmployee />,
    loader: authLoader,
  },
  {
    path: '/employee-list',
    element: <EmployeeList />,
    loader: authLoader,
  },
  {
    path: '/edit-employee/:id',
    element: <EmployeeEdit />,
    loader: authLoader,
  },
  {
    path: '*',
    element: <Navigate to="/" />, // Redirect for any unmatched routes
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
