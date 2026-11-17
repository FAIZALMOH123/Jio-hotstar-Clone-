export const errorMiddleware = (error, req, res, _next) => {
  const statusCode = Number.isInteger(error.status) && error.status >= 400 && error.status < 600
    ? error.status
    : 500;
  console.error("Unhandled API error:", error.code || `HTTP ${statusCode}`);
  const isAuthenticationRequest = req.originalUrl?.startsWith("/api/auth/");
  const message = statusCode === 400
    ? "Request body is invalid"
    : isAuthenticationRequest
      ? "Unable to complete authentication request"
      : "Internal server error";
  return res.status(statusCode).json({
    success: false,
    message,
  });
};
