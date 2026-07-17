import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";


function EditBlog() {

  const { id } = useParams();
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    title: "",
    category: "",
    image: "",
    content: "",
  });


  const [loading, setLoading] = useState(false);



  useEffect(() => {

    fetchBlog();

  }, []);



  const fetchBlog = async () => {

    try {

      const res = await api.get(`/blogs/${id}`);

      const blog = res.data.blog;


      setFormData({

        title: blog.title,

        category: blog.category,

        image: blog.image || "",

        content: blog.content,

      });


    } catch (err) {

      console.log(err);

    }

  };




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


      await api.put(`/blogs/${id}`, formData);


      alert("Blog updated successfully ✨");


      navigate(`/blog/${id}`);


    } catch (err) {

      console.log(err);


      alert(
        err.response?.data?.message ||
        "Update failed"
      );

    }
    finally {

      setLoading(false);

    }

  };




  return (

    <div className="min-h-screen bg-gray-100 py-10">


      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">


        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">

          ✏️ Edit Blog

        </h1>




        <form 
          onSubmit={handleSubmit}
          className="space-y-6"
        >



          {/* Title */}

          <div>

            <label className="font-semibold">
              Blog Title
            </label>


            <input

              type="text"

              name="title"

              value={formData.title}

              onChange={handleChange}

              className="w-full border p-3 rounded-lg mt-2"

              required

            />

          </div>





          {/* Category */}

          <div>

            <label className="font-semibold">
              Category
            </label>


            <select

              name="category"

              value={formData.category}

              onChange={handleChange}

              className="w-full border p-3 rounded-lg mt-2"

            >

              <option>
                Technology
              </option>

              <option>
                Programming
              </option>

              <option>
                Artificial Intelligence
              </option>

              <option>
                Web Development
              </option>

              <option>
                Lifestyle
              </option>

              <option>
                Education
              </option>


            </select>


          </div>





          {/* Image */}

          <div>

            <label className="font-semibold">
              Cover Image URL
            </label>


            <input

              type="text"

              name="image"

              value={formData.image}

              onChange={handleChange}

              className="w-full border p-3 rounded-lg mt-2"

            />


          </div>





          {/* Content */}

          <div>

            <label className="font-semibold">
              Content
            </label>


            <textarea

              rows="10"

              name="content"

              value={formData.content}

              onChange={handleChange}

              className="w-full border p-3 rounded-lg mt-2"

              required

            />


          </div>





          <button

            disabled={loading}

            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"

          >

            {loading ? "Updating..." : "Update Blog 🚀"}

          </button>




        </form>


      </div>


    </div>

  );

}


export default EditBlog;