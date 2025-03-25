import { useRouteError, Link } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-red-600">
        Oops! Something went wrong.
      </h1>
      <p className="text-xl mt-4">
        Error: {error.status || 404} - {error.statusText || "Page Not Found"}
      </p>
      <Link to="/" className="mt-6 text-blue-500 hover:underline">
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
