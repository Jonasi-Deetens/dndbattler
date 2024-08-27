import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-gray-900 h-screen w-full flex items-center justify-center">
      <div className="w-full max-w-xl bg-gray-800 text-neutral-100 p-10 rounded-xl shadow-xl">
        <h1 className="text-4xl font-bold text-yellow-500 text-center mb-6">
          DndBattler
        </h1>
        <p className="text-center italic text-neutral-300 mb-8">
          'Will you be able to save this town from destruction?'
        </p>
        <hr className="border-yellow-500 mb-8" />
        <div className="flex flex-col items-center gap-y-4">
          <Link to={'/login'} className="w-full">
            <button className="primary w-full">Login</button>
          </Link>
          <p className="text-neutral-300">or</p>
          <Link to={'/register'} className="w-full">
            <button className="primary w-full">Register</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
