import Link from "next/link";

export default function NotAuthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">403</h1>
        <h2 className="text-2xl font-semibold mb-4">Not Authorized</h2>
        <p className="text-gray-600 mb-8">
          You do not have permission to access the admin panel.
        </p>
        <Link 
          href="/"
          className="inline-block bg-french-blue text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
