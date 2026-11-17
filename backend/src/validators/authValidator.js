const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateSignup = (body = {}) => {
  body = body && typeof body === "object" ? body : {};
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";
  const confirmPassword = typeof body.confirmPassword === "string" ? body.confirmPassword : "";
  const errors = {};

  if (!name) errors.name = "Name is required";
  if (!email || !emailPattern.test(email)) errors.email = "Enter a valid email address";
  if (password.length < 8) errors.password = "Password must contain at least 8 characters";
  if (!confirmPassword) errors.confirmPassword = "Confirm password is required";
  else if (password !== confirmPassword) errors.confirmPassword = "Passwords do not match";

  return errors;
};

export const validateCredentials = (body = {}) => {
  body = body && typeof body === "object" ? body : {};
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";
  const errors = {};

  if (!email || !emailPattern.test(email)) errors.email = "Enter a valid email address";
  if (!password) errors.password = "Password is required";
  return errors;
};

export const validateEmail = (body = {}) => {
  body = body && typeof body === "object" ? body : {};
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  return emailPattern.test(email) ? { email } : { error: "Enter a valid email address" };
};
