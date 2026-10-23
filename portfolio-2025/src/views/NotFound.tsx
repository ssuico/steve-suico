import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-5 text-center text-white">
      <p className="eyebrow mb-3 text-pink-400">{'// 404'}</p>
      <h1 className="mb-4 text-4xl font-bold sm:text-5xl">This page does not exist</h1>
      <p className="mb-8 max-w-md text-muted">
        The link may be out of date. The work samples are still on the projects section.
      </p>
      <Link to="/projects" className="btn btn-primary">
        View projects
      </Link>
    </main>
  );
};

export default NotFound;
