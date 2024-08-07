import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

interface FormData {
  email: string;
  username: string;
  password: string;
  confirmPass: string;
}
export default function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const [passMatch, setPassMatch] = useState<string | undefined>(undefined);
  const [password, confirmPass] = watch(["password", "confirmPass"]);

  function handleChange() {
    if (password !== confirmPass) {
      setPassMatch("confirm password does not match with password");
    } else {
      setPassMatch(undefined);
    }
  }

  function handleUpdatePass(data: FormData) {
    if (password !== confirmPass) {
      setPassMatch("confirm password does not match with password");
    } else {
      setPassMatch(undefined);
      console.log(data);
    }
  }
  return (
    <div className="mt-7 max-w-[28rem] m-auto bg-white border border-gray-200 rounded-xl shadow-sm">
      <div className="p-4 sm:p-7">
        <div className="text-center">
          <h1 className="block text-2xl font-bold text-gray-800">Sign up</h1>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?
            <Link
              to={"/login"}
              className="text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium"
            >
              Sign in here
            </Link>
          </p>
        </div>

        <div className="mt-5">
          <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6">
            Or
          </div>

          <form onSubmit={handleSubmit(handleUpdatePass)} noValidate>
            <div className="grid gap-y-4">
              <div>
                <label htmlFor="email" className="block text-sm mb-2">
                  Email address
                </label>
                <div className="relative">
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message:
                          "Please include a valid email address so we can get back to you",
                      },
                    })}
                    type="email"
                    id="email"
                    name="email"
                    className="py-3 px-4 block w-full shadow-md border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    required
                    aria-describedby="email-error"
                  />
                  {errors.email?.message !== undefined && (
                    <div className="absolute mt-3 inset-y-0 end-0 pointer-events-none pe-3">
                      <svg
                        className="size-5 text-red-500"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        aria-hidden="true"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                      </svg>
                    </div>
                  )}
                </div>
                {errors.email?.message !== undefined && (
                  <p className="text-xs text-red-600 mt-2" id="email-error">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="username" className="block text-sm mb-2">
                  username
                </label>
                <div className="relative">
                  <input
                    {...register("username", {
                      required: "username is required",
                    })}
                    type="text"
                    id="username"
                    name="username"
                    className="py-3 px-4 block w-full shadow-md border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    required
                  />
                  {errors.username?.message !== undefined && (
                    <div className="absolute mt-3 inset-y-0 end-0 pointer-events-none pe-3">
                      <svg
                        className="size-5 text-red-500"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        aria-hidden="true"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                      </svg>
                    </div>
                  )}
                </div>
                {errors.username?.message !== undefined && (
                  <p className="text-xs text-red-600 mt-2" id="email-error">
                    {errors.username.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="password" className="block text-sm mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters long",
                      },
                      validate: {
                        hasUpperCase: (value) =>
                          /[A-Z]/.test(value) ||
                          "Password must contain at least one uppercase letter",
                        hasLowerCase: (value) =>
                          /[a-z]/.test(value) ||
                          "Password must contain at least one lowercase letter",
                        hasNumber: (value) =>
                          /[0-9]/.test(value) ||
                          "Password must contain at least one number",
                        hasSpecialChar: (value) =>
                          /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                          "Password must contain at least one special character",
                      },
                    })}
                    onChange={handleChange}
                    type="password"
                    id="password"
                    name="password"
                    className="py-3 px-4 shadow-md block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    required
                    aria-describedby="password-error"
                  />
                  {errors.password?.message !== undefined && (
                    <div className="mt-3 absolute inset-y-0 end-0 pointer-events-none pe-3">
                      <svg
                        className="size-5 text-red-500"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        aria-hidden="true"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                      </svg>
                    </div>
                  )}
                </div>
                {errors.password?.message !== undefined && (
                  <p className="text-xs text-red-600 mt-2" id="password-error">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm mb-2"
                >
                  Confirm password
                </label>
                <div className="relative">
                  <input
                    {...register("confirmPass", {
                      required: "Confirm password is required",
                    })}
                    onChange={handleChange}
                    type="password"
                    id="confirm-password"
                    name="confirmPass"
                    className="py-3 px-4 block w-full shadow-md border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    required
                  />
                  {errors.confirmPass?.message !== undefined && (
                    <div className="absolute mt-3 inset-y-0 end-0 pointer-events-none pe-3">
                      <svg
                        className="size-5 text-red-500"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        aria-hidden="true"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                      </svg>
                    </div>
                  )}
                </div>
                {errors.confirmPass?.message !== undefined ? (
                  <p className="text-xs text-red-600 mt-2" id="email-error">
                    {errors.confirmPass.message}
                  </p>
                ) : passMatch !== undefined ? (
                  <p className="text-xs text-red-600 mt-2" id="email-error">
                    {passMatch}
                  </p>
                ) : (
                  ""
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
