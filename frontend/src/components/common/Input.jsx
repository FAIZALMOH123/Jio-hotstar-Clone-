import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Input = ({
  label,
  type = "text",
  name,
  value,
  placeholder,
  onChange,
  icon,
  required = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-5">
      {label && (
        <label htmlFor={name} className="block text-gray-200 mb-2">
          {label}
        </label>
      )}

      <div className="relative">
        {/* Left Icon */}
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </span>
        )}

        {/* Input */}
        <input
          id={name}
          type={
            type === "password"
              ? showPassword
                ? "text"
                : "password"
              : type
          }
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          required={required}
          className="w-full pl-10 pr-10 py-3 rounded-lg bg-[#1E1E2F] border border-gray-700 text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500 transition"
        />

        {/* Show / Hide Password */}
        {type === "password" && (
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-white"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;