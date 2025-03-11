import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [filter, setFilter] = useState("all");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/books")
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "--";
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(new Date(dateString));
  };

  const filteredBooks = books.filter((book) => {
    if (filter === "all") return true;
    return filter === "active" ? book.status === "Active" : book.status === "Deactivated";
  });

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Book List</h1>
        <Link to="/add" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Add a Book
        </Link>
      </div>

      {/* Filter */}
      <div className="mb-4">
        <select
          className="border p-2 rounded-lg w-full sm:w-auto"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">Show All</option>
          <option value="active">Show Active</option>
          <option value="deactivated">Show Deactivated</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Title</th>
              <th className="border p-2 hidden sm:table-cell">Author</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Created At</th>
              <th className="border p-2">Edited At</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((book) => (
              <tr key={book.id}>
                <td className="border p-2">{book.title}</td>
                <td className="border p-2 hidden sm:table-cell">{book.author}</td>
                <td className="border p-2">{book.status}</td>
                <td className="border p-2">{formatDate(book.createdAt)}</td>
                <td className="border p-2">{formatDate(book.editedAt)}</td>
                <td className="border p-2">
                  <button className="bg-yellow-500 text-white px-2 py-1 rounded-lg mr-2">Edit</button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded-lg">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Book Count */}
      <div className="mt-4 text-gray-700">
        Showing {filteredBooks.length} of {books.length} books
      </div>
    </div>
  );
};

export default Dashboard;
