import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";


function BlogDetails() {

  const { id } = useParams();
  const navigate = useNavigate();


  const [blog, setBlog] = useState(null);


  const user = JSON.parse(localStorage.getItem("user"));



  useEffect(() => {

    fetchBlog();

  }, []);



  const fetchBlog = async () => {

    try {

      const res = await api.get(`/blogs/${id}`);

      setBlog(res.data.blog);

    } catch (err) {

      console.log(err);

    }

  };



  const deleteBlog = async () => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );


    if (!confirmDelete) return;



    try {

      await api.delete(`/blogs/${id}`);


      alert("Blog deleted successfully 🗑️");


      navigate("/");


    } catch (err) {

      alert(
        err.response?.data?.message ||
        "Delete failed"
      );

    }

  };



  if (!blog) {

    return (

      <h1 className="text-center text-3xl mt-10">
        Loading...
      </h1>

    );

  }



  const isOwner =
    user && user._id === blog.author._id;



  return (

    <div className="min-h-screen bg-gray-100 py-10">


      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8">


        {/* Image */}

        {blog.image && (

          <img

            src={blog.image}

            alt={blog.title}

            className="w-full h-96 object-cover rounded-xl"

          />

        )}



        {/* Category */}

        <span className="inline-block mt-6 bg-blue-100 text-blue-700 px-4 py-2 rounded-full">

          {blog.category}

        </span>



        {/* Title */}

        <h1 className="text-5xl font-bold mt-5 text-gray-800">

          {blog.title}

        </h1>



        {/* Author */}

        <div className="mt-5 text-gray-600">

          ✍️ {blog.author?.name || "Unknown"}

          <p className="text-sm mt-1">

            📅 {new Date(blog.createdAt).toLocaleDateString()}

          </p>

        </div>




        {/* Content */}

        <p className="mt-8 text-lg leading-8 whitespace-pre-wrap text-gray-700">

          {blog.content}

        </p>



        {/* Stats */}

        <div className="flex gap-8 mt-8 text-xl">

          <p>
            ❤️ {blog.likes?.length || 0}
          </p>

          <p>
            💬 {blog.comments?.length || 0}
          </p>

        </div>




        {/* Owner Actions */}

        {isOwner && (

          <div className="flex gap-4 mt-10">


            <button

              onClick={() => navigate(`/edit/${blog._id}`)}

              className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600"

            >

              ✏️ Edit

            </button>



            <button

              onClick={deleteBlog}

              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"

            >

              🗑️ Delete

            </button>


          </div>

        )}



      </div>


    </div>

  );

}


export default BlogDetails;