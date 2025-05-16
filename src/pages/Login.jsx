import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { isLoggedIn, login } from "../functions/auth";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const onLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      login(email, password).then((response) => {
        navigate("/admin");
      }).catch((error) => {
        console.error("Login failed:", error);
        alert("Login failed. Please check your credentials.");
      });
    } else {
      alert("Please enter email and password.");
    }
  };

  const checkLoggedIn = () => {
    isLoggedIn().then((isLoggedIn) => {
      if (isLoggedIn) {
        navigate("/admin");
      }
    }).catch((error) => {
      console.error("Error checking login status:", error);
    });
  }

  // Check if the user is already logged in when the component mounts
  // and redirect to the admin page if they are
  useEffect(() => {
    checkLoggedIn();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md sm:max-w-sm md:max-w-md lg:max-w-lg">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-red-700 text-center mb-6">
          Admin Login
        </h2>
        <form onSubmit={onLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium text-sm sm:text-base">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm sm:text-base"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium text-sm sm:text-base">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm sm:text-base"
                placeholder="Enter your password"
                required
              />
              <button type="button" onClick={togglePassword} className="absolute right-3 top-3 text-gray-600 hover:text-red-700">
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.01 10.01 0 0112 20c-5.52 0-10-4-10-8s4.48-8 10-8a9.91 9.91 0 015.94 2.06" />
                    <path d="M2 2l20 20" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button type="submit" className="w-full bg-red-700 text-white font-semibold p-3 rounded-lg hover:bg-red-800 transition duration-300 text-sm sm:text-base">
            Login
          </button>

          <div className="text-center">
            <a className="text-red-700 text-sm hover:underline" href="#">
              Forgot password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
