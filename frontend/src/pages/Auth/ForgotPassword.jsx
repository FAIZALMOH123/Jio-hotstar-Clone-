import React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { FaEnvelope, FaArrowLeft } from "react-icons/fa";

const ForgotPassword = () => {
  return (
    <div className="auth-page bg main-div flex items-center justify-center md:justify-end min-h-screen py-10 px-4 sm:px-6">
      <div className="auth-card w-full max-w-md p-8 rounded-xl shadow-2xl md:mr-20 lg:mr-36 border border-gray-700/80">
        <h1 className="text-white text-3xl font-bold">Forgot Password</h1>
        <p className="pt-2 pb-6 text-xs text-slate-400">
          Enter your email to receive a password reset link.
        </p>

        <form onSubmit={(e) => e.preventDefault()}>
          <Input
            name="email"
            type="email"
            label="Email"
            icon={<FaEnvelope />}
            placeholder="Enter your email"
            onChange={() => {}}
            value=""
          />

          <Button type="submit">Send Reset Link</Button>
        </form>

        <Link
          to="/login"
          className="mt-5 flex items-center justify-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
        >
          <FaArrowLeft /> Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
