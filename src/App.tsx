import { useNavigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pageComponents/Login';
import Register from './pageComponents/Register';
import Home from './pageComponents/Home';
import ProtectedRoute from './components/ProtectedRoute';
import { useEffect } from 'react';
import useAuth from './hooks/useAuth';
import Dashboard from './pageComponents/Dashboard';

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('dashboard');
  }, [isAuthenticated, navigate]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
