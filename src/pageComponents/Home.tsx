import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-home h-screen w-full flex flex-col justify-center">
      <div className="m-auto w-11/12 md:w-1/2 bg-slate-700 p-10 rounded-lg shadow-lg">
        <h1 className="title m-5 p-0">DndBattler</h1>
        <i>'Will you be able to save this town from destruction ?'</i>
        <hr className="m-8" />
        <div className="flex items-center justify-center gap-x-4">
          <Link to={'/login'}>
            <button>Login</button>
          </Link>
          <p>or</p>
          <Link to={'/register'}>
            <button>Register</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
