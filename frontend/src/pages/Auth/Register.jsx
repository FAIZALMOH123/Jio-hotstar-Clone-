import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa";
import { signup } from "../../services/authService";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");
    if (!formData.confirmPassword) {
      setError("Confirm password is required.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setIsSubmitting(true);
    const result = await signup({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    });
    setIsSubmitting(false);
    if (result.success) setMessage(result.message);
    else setError(Object.values(result.errors || {}).join(". ") || result.message || "Could not create your account.");
  };

  return (
    <div className="auth-page bg main-div flex items-center justify-center md:justify-end min-h-screen py-10 px-4 sm:px-6">
      <div className="auth-card w-full max-w-md p-8 rounded-xl shadow-2xl md:mr-20 lg:mr-36 border border-gray-700/80">
        <h1 className="text-white text-3xl font-bold">Create User</h1>
        <p className="pt-2 pb-6 text-xs text-slate-400">
          Join JioHotstar and start watching.
        </p>

        {message && <p role="status" className="mb-4 rounded-lg bg-emerald-500/10 p-3 text-sm text-emerald-300">{message}</p>}
        {error && <p role="alert" className="mb-4 rounded-lg bg-red-500/10 p-3 text-sm text-red-300">{error}</p>}

        <form onSubmit={handleSubmit} noValidate>
          <Input
            name="name"
            onChange={handleChange}
            value={formData.name}
            type="text"
            label="Name"
            icon={<FaUser />}
            placeholder={"Enter Your Name"}
            required
          />

          <Input
            name="email"
            onChange={handleChange}
            value={formData.email}
            type="email"
            label="Email"
            icon={<FaEnvelope />}
            placeholder={"Enter your Email"}
            required
          />
          <Input
            name="password"
            onChange={handleChange}
            value={formData.password}
            type="password"
            label="Password"
            icon={<FaLock />}
            placeholder={"Enter your Password"}
            required
          />

          <Input
            name="confirmPassword"
            onChange={handleChange}
            value={formData.confirmPassword}
            type="password"
            icon={<FaLock />}
            label="Confirm Password"
            placeholder={"Confirm The Password"}
            required
          />
          <label className="flex items-center gap-3 cursor-pointer text-gray-300 text-sm mb-4">
            <input type="checkbox" className="rounded w-4 h-4 accent-blue-600" />
            <span>
              I agree to the{" "}
              <a href="#" className="text-blue-400 hover:text-blue-300 underline">
                Terms of use
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-400 hover:text-blue-300 underline">
                Privacy Policy
              </a>
            </span>
          </label>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating account..." : "Sign Up"}{" "}
            <span className="ml-2">
              <FaArrowRight />
            </span>
          </Button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium ml-1 transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
