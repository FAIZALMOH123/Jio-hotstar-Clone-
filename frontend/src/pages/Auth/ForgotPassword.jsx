import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { FaEnvelope, FaArrowLeft } from "react-icons/fa";
import { requestPasswordReset } from "../../services/authService";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");
    setIsSubmitting(true);
    const result = await requestPasswordReset(email);
    setIsSubmitting(false);
    if (result.success) setMessage(result.message);
    else setError(result.message || "Could not send the reset email.");
  };

  return (
    <div className="auth-page bg main-div flex items-center justify-center md:justify-end min-h-screen py-10 px-4 sm:px-6">
      <div className="auth-card w-full max-w-md p-8 rounded-xl shadow-2xl md:mr-20 lg:mr-36 border border-gray-700/80">
        <h1 className="text-white text-3xl font-bold">Forgot Password</h1>
        <p className="pt-2 pb-6 text-xs text-slate-400">
          Enter your email to receive a password reset link.
        </p>

        {message && <p role="status" className="mb-4 rounded-lg bg-emerald-500/10 p-3 text-sm text-emerald-300">{message}</p>}
        {error && <p role="alert" className="mb-4 rounded-lg bg-red-500/10 p-3 text-sm text-red-300">{error}</p>}

        <form onSubmit={handleSubmit}>
          <Input
            name="email"
            type="email"
            label="Email"
            icon={<FaEnvelope />}
            placeholder="Enter your email"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
            required
          />

          <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Sending..." : "Send Reset Link"}</Button>
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
