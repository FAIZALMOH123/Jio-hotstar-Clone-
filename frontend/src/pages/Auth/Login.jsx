import React from "react";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { useState } from "react";
import { Link } from "react-router-dom";

import { FaUser, FaLock, FaArrowRight } from "react-icons/fa";

const Login = () => {
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

  return (
    <div className="auth-page bg main-div flex items-center justify-center md:justify-end min-h-screen py-10 px-4 sm:px-6">
      <div className="auth-card w-full max-w-md p-8 rounded-xl shadow-2xl md:mr-20 lg:mr-36 border border-gray-700/80">
        <h1 className="text-white text-3xl font-bold">Login</h1>
        <p className="pt-2 pb-6 text-xs text-slate-400">
          Join JioHotstar and start watching.
        </p>

        <form onSubmit={(e) => e.preventDefault()}>
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

          <Button type="submit">
            Login
            <span className="ml-2">
              <FaArrowRight />
            </span>
          </Button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-5">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-400 hover:text-blue-300 font-medium ml-1 transition-colors">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
