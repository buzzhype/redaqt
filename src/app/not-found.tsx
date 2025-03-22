export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-9xl font-bold text-gray-800">404</h1>
        <p className="text-2xl font-medium mt-4 mb-8">Page Not Found!</p>
        <a 
          href="/"
          className="inline-block py-2 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}