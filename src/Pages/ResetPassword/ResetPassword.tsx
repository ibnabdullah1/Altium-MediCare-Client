import React, { useState } from "react";
import { TbFidgetSpinner } from "react-icons/tb";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useResetPasswordMutation } from "../../Redux/features/auth/authApi";
import LinkBanner from "../../Shared/LinkBanner";

const ResetPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [resetPassword] = useResetPasswordMutation();
  const [params] = useSearchParams();
  const userId = params.get("userId");
  const token = params.get("token");
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const password = form.password.value;
    const userInfo = {
      id: userId,
      password: password,
    };

    // Validation schema

    try {
      // Validate input

      // API call with Authorization Header
      const res = await resetPassword({ userInfo, token }).unwrap();

      if (res.success) {
        toast.success(res.message);
        form.reset();
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to reset password. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LinkBanner activeLocation={"Reset Password"} group={"Account"} />
      <div className="flex justify-center items-center py-20">
        <div className="flex flex-col md:min-w-[400px] max-w-xl p-6 rounded-md sm:p-10 bg-white text-gray-900">
          <div className="mb-8 space-y-4 text-center">
            <h1 className="heading">Reset Password</h1>
            <p className="text-gray-600">
              Enter your new password below to reset your account password.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="mb-4">
              <input
                type="password"
                name="password"
                placeholder="New Password"
                required
                className="form_input"
              />
            </div>

            <div>
              <button
                type="submit"
                className="bg-primary px-8 transform font-semibold duration-100 hover:bg-[rgb(10,154,115,0.8)] py-3 text-white uppercase"
                disabled={loading}
              >
                {loading ? (
                  <TbFidgetSpinner className="animate-spin m-auto" />
                ) : (
                  "Reset Password"
                )}
              </button>
            </div>
            <div className="mt-4">
              <Link
                to={"/sign-in"}
                className="text-sm hover:underline hover:text-primary text-gray-400 mt-3"
              >
                Go to Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>{" "}
    </>
  );
};

export default ResetPassword;
