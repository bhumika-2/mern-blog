import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function CreateBlog() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "Technology",
    image: "",
    content: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post("/blogs", formData);

      alert("Blog published successfully 🎉");

      navigate("/");
    } catch (err) {
      console.error(err);

      alert(err.response?.data?.message || "Failed to create blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8">

        <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">
          ✍️ Create New Blog
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Title */}
          <div>
            <label className="block font-semibold mb-2">
              Blog Title
            </label>

            <input
              type="text"
              name="title"
              placeholder="Enter blog title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block font-semibold mb-2">
              Category
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Technology</option>
              <option>Programming</option>
              <option>Artificial Intelligence</option>
              <option>Web Development</option>
              <option>Lifestyle</option>
              <option>Education</option>
            </select>
          </div>

          {/* Image URL */}
          <div>
            <label className="block font-semibold mb-2">
              Cover Image URL
            </label>

            <input
              type="text"
              name="image"
              placeholder="https://example.com/image.jpg"
              value={formData.image}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {formData.image && (
  <div className="mt-4">
    <p className="font-semibold mb-2">
      Preview:
    </p>

    <img
      src={formData.image}
      alt="Preview"
      className="w-full h-60 object-cover rounded-xl shadow-md"
    />
  </div>
)}

          {/* Content */}
          <div>
            <label className="block font-semibold mb-2">
              Blog Content
            </label>

            <textarea
              rows="10"
              name="content"
              placeholder="Write your blog here..."
              value={formData.content}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <p className="text-sm text-gray-500 mt-2">
  {formData.content.length}/5000 characters
</p>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold transition"
          >
            {loading ? "Publishing..." : "🚀 Publish Blog"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default CreateBlog;