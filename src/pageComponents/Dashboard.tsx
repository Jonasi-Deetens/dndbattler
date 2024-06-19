import useAuth from '../hooks/useAuth';

const Dashboard = () => {
  const { logout } = useAuth();

  return (
    <div>
      <h1>WELCOME</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
