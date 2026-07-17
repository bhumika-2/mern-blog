import { Link } from "react-router-dom";

function BlogCard({ blog }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

      {/* Image */}
      <img
        src={`https://picsum.photos/seed/${blog._id}/600/350`}
        alt={blog.title}
        className="w-full h-52 object-cover"
      />

      {/* Content */}
      <div className="p-6">

        {/* Category */}
        <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
          {blog.category}
        </span>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          {blog.title}
        </h2>

        {/* Description */}
        <p className="text-gray-600 leading-7 line-clamp-3">
          {blog.content}
        </p>

        {/* Footer */}
        <div className="flex justify-between items-center mt-6 border-t pt-4">

          <div>
            <p className="font-semibold text-gray-800">
              👤 {blog.author?.name || "Unknown"}
            </p>

            <p className="text-sm text-gray-500">
              {new Date(blog.createdAt).toLocaleDateString()}
            </p>
          </div>

          <Link
            to={`/blog/${blog._id}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl font-semibold transition"
          >
            Read →
          </Link>

        </div>

      </div>
    </div>
  );
}

export default BlogCard;