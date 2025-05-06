import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 dark:from-[#1c1c1e] dark:to-[#2c2c2e] transition-colors duration-500">
      <div className="bg-white/70 dark:bg-white/5 backdrop-blur-xl p-8 rounded-2xl shadow-lg max-w-sm w-full text-center">
        <h1 className="text-7xl font-semibold text-gray-800 dark:text-white tracking-wide">404</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">Page Not Found</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          The page you're looking for doesn’t exist.
        </p>
        <button
          onClick={() => navigate('/')}
          className="mt-6 px-5 py-2.5 text-sm font-medium rounded-full text-white bg-blue-500 hover:bg-blue-600 transition-colors shadow-sm"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
