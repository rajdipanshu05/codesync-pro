import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useAuthStore } from "../../store/authStore";

const LoginForm = () => {
  const navigate = useNavigate();

  const { login, isLoggingIn } = useAuthStore();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validate();

    if (!isValid) return;

    await login(formData, navigate);
  };

  return (
    <div
      className="
      min-h-screen
      bg-zinc-950
      flex
      items-center
      justify-center
      p-6
    "
    >
      <form
        onSubmit={handleSubmit}
        noValidate
        className="
          w-full
          max-w-md
          bg-zinc-900
          border
          border-zinc-800
          rounded-3xl
          p-8
          space-y-5
        "
      >
        <div className="mb-4">
          <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>

          <p className="text-zinc-400">Login to continue coding</p>
        </div>

        {/* EMAIL */}
        <div>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            className="
              w-full
              px-4
              py-3
              rounded-xl
              bg-zinc-950
              border
              caret-white
              border-zinc-800
              outline-none
              text-white
              placeholder:text-zinc-500
              focus:border-blue-500
            "
          />

          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* PASSWORD */}
        <div>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            className="
            text-white
            placeholder:text-zinc-500
              w-full
              px-4
              py-3
              caret-white
              rounded-xl
              bg-zinc-950
              border
              border-zinc-800
              outline-none
              focus:border-blue-500
            "
          />

          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={isLoggingIn}
          className="
  w-full
  py-3
  rounded-xl
  bg-blue-500
  hover:bg-blue-600
  
  transition-all 
  duration-200
  font-semibold
  text-white
  disabled:opacity-50
  cursor-pointer
"
        >
          {isLoggingIn ? "Logging In..." : "Login"}
        </button>

        <p className="text-center text-zinc-400">
          Don't have an account?
          <Link
            to="/signup"
            className="
              text-blue-500
              ml-2
              hover:underline
            "
          >
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
