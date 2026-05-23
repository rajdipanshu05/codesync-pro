import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useAuthStore,
} from "../../store/authStore";

const SignupForm = () => {

  const navigate = useNavigate();

  const {
    signup,
    isSigningUp,
  } = useAuthStore();

  const [formData, setFormData] =
    useState({
      username: "",
      email: "",
      password: "",
    });

  const [errors, setErrors] =
    useState({});


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const validate = () => {

    const newErrors = {};

    // username
    if (!formData.username.trim()) {

      newErrors.username =
        "Username is required";

    } else if (
      formData.username.length < 3
    ) {

      newErrors.username =
        "Username must be at least 3 characters";
    }


    // email
    if (!formData.email.trim()) {

      newErrors.email =
        "Email is required";

    } else {

      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (
        !emailRegex.test(formData.email)
      ) {

        newErrors.email =
          "Invalid email format";
      }
    }


    // password
    if (!formData.password.trim()) {

      newErrors.password =
        "Password is required";

    } else if (
      formData.password.length < 6
    ) {

      newErrors.password =
        "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    const isValid = validate();

    if (!isValid) return;

    await signup(formData, navigate);
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

        {/* HEADER */}
        <div className="mb-4">

          <h2 className="text-3xl font-bold mb-2">
            Create Account
          </h2>

          <p className="text-zinc-400">
            Start collaborating today
          </p>

        </div>


        {/* USERNAME */}
        <div>

          <input
            type="text"
            name="username"
            placeholder="Enter username"
            value={formData.username}
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

          {
            errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username}
              </p>
            )
          }

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
  caret-white
  border
  border-zinc-800
  outline-none
  text-white
  placeholder:text-zinc-500
  focus:border-blue-500
"
          />

          {
            errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email}
              </p>
            )
          }

        </div>


        {/* PASSWORD */}
        <div>

          <input
            type="password"
            name="password"
            placeholder="Create password"
            value={formData.password}
            onChange={handleChange}
            className="
              w-full
              px-4
              caret-white
              py-3
              rounded-xl
              bg-zinc-950
              text-white
            placeholder:text-zinc-500
              border
              border-zinc-800
              outline-none
              focus:border-blue-500
            "
          />

          {
            errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password}
              </p>
            )
          }

        </div>


        {/* BUTTON */}
        <button
          type="submit"
          disabled={isSigningUp}
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
          {
            isSigningUp
              ? "Creating Account..."
              : "Create Account"
          }
        </button>


        {/* FOOTER */}
        <p className="text-center text-zinc-400">

          Already have an account?

          <Link
            to="/login"
            className="
              text-blue-500
              ml-2
              hover:underline
            "
          >
            Login
          </Link>

        </p>

      </form>

    </div>
  );
};

export default SignupForm;