import { Link } from "react-router-dom";

const EmailVerified = () => (
  <div className="auth-page flex min-h-screen items-center justify-center px-4 py-10">
    <div className="auth-card w-full max-w-md rounded-xl p-8 text-center">
      <h1 className="text-2xl font-bold text-white">Email verification</h1>
      <p className="mt-3 text-sm leading-6 text-gray-300">
        After Firebase confirms the verification link, sign in to continue.
      </p>
      <Link to="/login" className="glass-button-primary mt-6 inline-flex rounded-xl px-6 py-3 text-sm font-semibold text-white">
        Go to sign in
      </Link>
    </div>
  </div>
);

export default EmailVerified;
