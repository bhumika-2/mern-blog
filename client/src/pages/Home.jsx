import { useEffect, useState } from "react";
import api from "../services/api";
import BlogCard from "../components/BlogCard";

function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await api.get("/blogs");
      setBlogs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">

        <div className="max-w-6xl mx-auto px-6">

          <h1 className="text-5xl font-bold mb-4">
            Welcome to MERN Blog
          </h1>

          <p className="text-lg text-gray-200">
            Discover, Read and Share amazing stories with the world.
          </p>

        </div>

      </div>

      {/* Blog Cards */}
      <div className="max-w-6xl mx-auto py-12 px-6">

        <h2 className="text-3xl font-bold mb-8">
          Latest Blogs
        </h2>

        {blogs.length === 0 ? (
          <p>No blogs found.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        )}

      </div>

    </div>
  );
}

export default Home;