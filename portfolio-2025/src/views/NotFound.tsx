import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 text-center">
      <p className="text-pink-400 text-sm tracking-widest uppercase mb-3">404</p>
      <h1 className="text-4xl font-bold mb-4">This page does not exist</h1>
      <p className="text-gray-400 mb-8 max-w-md">
        The link may be out of date. The work samples are still on the projects section.
      </p>
      <Link
        to="/#projects"
        className="px-6 py-3 bg-pink-500 rounded-lg font-medium hover:bg-pink-600 transition-colors"
      >
        View projects
      </Link>
    </main>
  );
};

export default NotFound;
