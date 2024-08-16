import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { login } from "../features/Auth/AuthSlice";
import Spinner from "../components/Spinner";
import { useEffect } from "react";
import { toast } from "react-toastify";

interface FormData {
  email: string;
  password: string;
}
export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const { user, token, loading, error } = useAppSelector(
    (state) => state.login
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (user) {
      toast.success("Login successful");
      navigate("/books");
    }
  }, [navigate, user]);

  async function handleLogin(data: FormData) {
    const result = await dispatch(login(data)).unwrap();
    console.log({ result });
  }

  console.log({ user, token, loading, error });

  return (
    <div className="mt-7 max-w-[28rem] mx-auto my-auto bg-white border border-gray-200 rounded-xl shadow-sm">
      <div className="p-4 sm:p-7">
        <div className="text-center">
          <h1 className="block text-2xl font-bold text-gray-800">Sign in</h1>
          <p className="mt-2 text-sm text-gray-600">
            Don't have an account yet?
            <Link
              to={"/"}
              className="text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium"
            >
              Sign up here
            </Link>
          </p>
        </div>

        <div className="mt-5">
          <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6">
            Or
          </div>
          <p className="text-center font-medium  text-red-500 my-4">
            {error !== null && typeof error !== "object" && (error as string)}
          </p>
          <form onSubmit={handleSubmit(handleLogin)} noValidate>
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
                    className="py-3 shadow-md px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    required
                    aria-describedby="email-error"
                  />
                  {errors.email?.message !== undefined && (
                    <div className="absolute  mt-3 inset-y-0 end-0 pointer-events-none pe-3">
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
                {errors.email !== undefined && (
                  <p className="text-xs text-red-600 mt-2" id="email-error">
                    {errors.email.message as string}
                  </p>
                )}
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <label htmlFor="password" className="block text-sm mb-2">
                    Password
                  </label>
                  <Link
                    to={"/reset-password"}
                    className="inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>
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
                    type="password"
                    id="password"
                    name="password"
                    className="py-3 shadow-md px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    required
                    aria-describedby="password-error"
                  />
                  {errors.password?.message !== undefined && (
                    <div className=" absolute mt-3 inset-y-0 end-0 pointer-events-none pe-3">
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
                    {errors.password.message as string}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
      {loading && <Spinner />}
    </div>
  );
}
