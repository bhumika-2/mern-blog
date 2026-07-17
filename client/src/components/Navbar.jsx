import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));


  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logged out successfully!");

    navigate("/login");

  };


  return (

    <nav className="bg-gray-900 text-white px-8 py-4 flex justify-between items-center shadow-lg">


      {/* Logo */}

      <Link 
        to="/"
        className="text-2xl font-bold hover:text-blue-400 transition"
      >
        🚀 MERN Blog
      </Link>



      <div className="flex items-center gap-6">


        <Link 
          to="/"
          className="hover:text-blue-400 transition"
        >
          Home
        </Link>



        {user && (

          <>

            <Link
              to="/create"
              className="hover:text-blue-400 transition"
            >
              Create Blog
            </Link>


            <Link
              to="/myblogs"
              className="hover:text-blue-400 transition"
            >
              My Blogs
            </Link>


          </>

        )}



        {user ? (

          <>

            <span className="font-semibold text-green-400">
              👋 {user.name}
            </span>


            <button

              onClick={logout}

              className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"

            >
              Logout
            </button>


          </>


        ) : (

          <>

            <Link
              to="/login"
              className="hover:text-blue-400 transition"
            >
              Login
            </Link>


            <Link

              to="/register"

              className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition"

            >
              Register
            </Link>


          </>

        )}


      </div>


    </nav>

  );
}

export default Navbar;