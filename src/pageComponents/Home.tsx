import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1 className="bg-slate-600 text-yellow-200">HOME</h1>
      <div className="flex items-center gap-x-4">
        <Link to={'/login'}>
          <button>Login</button>
        </Link>
        <p>or</p>
        <Link to={'/register'}>
          <button>Register</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
