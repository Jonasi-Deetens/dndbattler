import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pageComponents/Login';
import Register from './pageComponents/Register';
import Home from './pageComponents/Home';

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default App;
