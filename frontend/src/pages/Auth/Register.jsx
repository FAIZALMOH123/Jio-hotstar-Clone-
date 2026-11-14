import React from "react";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { useState } from "react";
import { Link } from "react-router-dom";

import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaCheck,
  FaArrowRight,
} from "react-icons/fa";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    conformPassword: "",
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
        <h1 className="text-white text-3xl font-bold">Create User</h1>
        <p className="pt-2 pb-6 text-xs text-slate-400">
          Join JioHotstar and start watching.
        </p>

        <form onSubmit={(e) => e.preventDefault()}>
          <Input
            name="name"
            onChange={handleChange}
            value={formData.name}
            type="text"
            label="Name"
            icon={<FaUser />}
            placeholder={"Enter Your Name"}
          />

          <Input
            name="email"
            onChange={handleChange}
            value={formData.email}
            type="email"
            label="Email"
            icon={<FaEnvelope />}
            placeholder={"Enter your Email"}
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

          <Input
            name="conformPassword"
            onChange={handleChange}
            value={formData.conformPassword}
            type="password"
            icon={<FaLock />}
            label="Confirm Password"
            placeholder={"Confirm The Password"}
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

          <Button type="submit">
            Sign Up{" "}
            <span className="ml-2">
              <FaArrowRight />
            </span>
          </Button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium ml-1 transition-colors">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
