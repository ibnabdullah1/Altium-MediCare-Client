import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { TbFidgetSpinner } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLoginMutation } from "../../Redux/features/auth/authApi";
import { setUser } from "../../Redux/features/auth/authSlice";
import { useAppDispatch } from "../../Redux/features/hooks";
import LinkBanner from "../../Shared/LinkBanner";
import { verifyToken } from "../../utils/verifyToken";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const userInfo = {
      email: form.email.value,
      password: form.password.value,
    };

    try {
      const res = await login(userInfo).unwrap();
      setLoading(true);
      if (res.success) {
        const user: any = verifyToken(res?.data?.accessToken);
        dispatch(setUser({ user, token: res.data.accessToken }));
        toast.success("Successfully logged in");
        navigate("/");
        setLoading(true);
      }
    } catch (err: any) {
      toast.error(
        err?.data?.message ||
          "Login failed. Please check your credentials and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LinkBanner activeLocation={"Sign In"} group={"Account"} />
      <div className="flex justify-center items-center py-20">
        <div className="flex flex-col md:min-w-[400px] max-w-xl p-6 rounded-md sm:p-10 bg-white text-gray-900">
          <div className="mb-8 space-y-4 text-center">
            <h1 className="heading">
              Sign In <br /> To Your Account
            </h1>

            <p className=" text-gray-600">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit
              aliquid, Non distinctio vel iste.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="Email"
                  className="form_input"
                />
              </div>
              <div>
                <div className="mb-4 relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    autoComplete="new-password"
                    id="password"
                    required
                    placeholder="Password"
                    className="form_input relative "
                  />
                  <span
                    className="absolute top-[40%] right-4 bottom-[45%] cursor-pointer opacity-50"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="bg-primary px-8 transform font-semibold duration-100 hover:bg-[rgb(10,154,115,0.8)] py-3 text-white font-raleway uppercase"
                disabled={loading}
              >
                {loading ? (
                  <TbFidgetSpinner className="animate-spin m-auto" />
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
          </form>

          <div className="mt-4">
            <Link
              to={"/forget-password"}
              className="text-sm hover:underline hover:text-primary text-gray-400 mt-3"
            >
              FORGOTTEN YOUR PASSWORD?
            </Link>
          </div>

          <div className="space-y-2 mt-5">
            <p className="text-center text-secondary/80 font-bold">
              DON'T HAVE AN ACCOUNT?
            </p>
            <p className="text-sm text-center text-gray-400">
              Add items to your wishlistget personalised recommendations check
              out more quickly track your orders register
            </p>
            <div className="pt-3 flex justify-center items-center">
              <Link
                to="/sign-up"
                className="bg-primary w-fit px-8 transform font-semibold duration-100 hover:bg-[rgb(10,154,115,0.8)] py-3 text-white font-raleway uppercase"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
