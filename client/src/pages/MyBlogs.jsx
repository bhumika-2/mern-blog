import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function MyBlogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await api.get("/blogs/myblogs");
      setBlogs(res.data.blogs);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteBlog = async (id) => {
    if (!window.confirm("Delete this blog?")) return;

    try {
      await api.delete(`/blogs/${id}`);

      alert("Blog deleted successfully!");

      fetchBlogs();
    } catch (err) {
      console.error(err);

      alert(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10">

      <h1 className="text-4xl font-bold mb-8 text-center">
        📚 My Blogs
      </h1>

      {blogs.length === 0 ? (
        <p className="text-center text-gray-500">
          You haven't created any blogs yet.
        </p>
      ) : (
        blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white rounded-xl shadow-lg p-6 mb-6"
          >
            <h2 className="text-2xl font-bold">
              {blog.title}
            </h2>

            <p className="text-gray-600 mt-2">
              {blog.content.substring(0, 150)}...
            </p>

            <div className="flex justify-between items-center mt-5">

              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                {blog.category}
              </span>

              <div className="flex gap-3">

                <Link
                  to={`/edit/${blog._id}`}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
                >
                  ✏️ Edit
                </Link>

                <button
                  onClick={() => deleteBlog(blog._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  🗑 Delete
                </button>

              </div>

            </div>
          </div>
        ))
      )}

    </div>
  );
}

export default MyBlogs;