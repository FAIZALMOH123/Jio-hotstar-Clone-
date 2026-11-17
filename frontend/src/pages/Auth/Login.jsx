import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { FaUser, FaLock, FaArrowRight } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setIsSubmitting(true);
    const result = await signIn(formData);
    setIsSubmitting(false);
    if (result.success) navigate("/home", { replace: true });
    else setMessage(result.message || "Could not sign in.");
  };

  return (
    <div className="auth-page bg main-div flex items-center justify-center md:justify-end min-h-screen py-10 px-4 sm:px-6">
      <div className="auth-card w-full max-w-md p-8 rounded-xl shadow-2xl md:mr-20 lg:mr-36 border border-gray-700/80">
        <h1 className="text-white text-3xl font-bold">Login</h1>
        <p className="pt-2 pb-6 text-xs text-slate-400">
          Join JioHotstar and start watching.
        </p>

        {message && <p role="alert" className="mb-4 rounded-lg bg-red-500/10 p-3 text-sm text-red-300">{message}</p>}

        <form onSubmit={handleSubmit}>
          <Input
            name="email"
            onChange={handleChange}
            value={formData.email}
            type="email"
            label="Email"
            icon={<FaUser />}
            placeholder={"Enter Your Email"}
          />

          <Input
            name="password"
            onChange={handleChange}
            value={formData.password}
            type="password"
            label="Password"
            icon={<FaLock />}
            placeholder={"Enter your Password"}
          />
          <Link
            to="/forgot-password"
            className="text-blue-400 hover:text-blue-300 text-sm text-right block mb-4 transition-colors"
          >
            Forgot Password?
          </Link>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Login"}
            <span className="ml-2">
              <FaArrowRight />
            </span>
          </Button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-5">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-400 hover:text-blue-300 font-medium ml-1 transition-colors">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
