import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { TbFidgetSpinner } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as z from "zod";
import { useChangePasswordMutation } from "../../Redux/features/auth/authApi";
import LinkBanner from "../../Shared/LinkBanner";

const ChangePassword = () => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [changePassword] = useChangePasswordMutation();
  const navigate = useNavigate();

  // Form submission handler
  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const userInfo = {
      oldPassword: form.oldPassword.value,
      newPassword: form.newPassword.value,
    };

    // Validation schema
    const validationSchema = z.object({
      oldPassword: z
        .string()
        .min(6, "Old password must be at least 6 characters long"),
      newPassword: z
        .string()
        .min(6, "New password must be at least 6 characters long"),
    });

    try {
      // Validate input
      validationSchema.parse(userInfo);

      // Make API call
      const res = await changePassword(userInfo).unwrap();
      if (res.success) {
        toast.success("Password changed successfully!");
        navigate("/sign-in");
      }
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        // Handle validation errors
        const errors = err.errors.map((e) => e.message).join(", ");
        toast.error(errors);
      } else {
        // Handle API errors
        toast.error(
          err?.data?.message || "Failed to change password. Try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LinkBanner activeLocation={"Change Password"} group={"Account"} />
      <div className="flex justify-center items-center py-20">
        <div className="flex flex-col md:min-w-[400px] max-w-xl p-6 rounded-md sm:p-10 bg-white text-gray-900">
          <div className="mb-8 space-y-4 text-center">
            <h1 className="heading">Change Your Password</h1>
            <p className="text-gray-600">
              Ensure your account is secure by regularly updating your password.
            </p>
          </div>

          <form onSubmit={handleChangePassword} className="space-y-6">
            <div className="space-y-4">
              {/* Old Password */}
              <div className="mb-4 relative">
                <input
                  type={showOldPassword ? "text" : "password"}
                  name="oldPassword"
                  autoComplete="current-password"
                  id="oldPassword"
                  required
                  placeholder="Old Password"
                  className="form_input relative font-roboto text-gray-500"
                />
                <span
                  className="absolute top-[40%] right-4 bottom-[45%] cursor-pointer opacity-50"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                >
                  {showOldPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              {/* New Password */}
              <div className="mb-4 relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  autoComplete="new-password"
                  id="newPassword"
                  required
                  placeholder="New Password"
                  className="form_input relative font-roboto text-gray-500"
                />
                <span
                  className="absolute top-[40%] right-4 bottom-[45%] cursor-pointer opacity-50"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
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
                  "Change Password"
                )}
              </button>
            </div>
          </form>

          <div className="mt-4">
            <Link
              to={"/sign-in"}
              className="text-sm hover:underline hover:text-primary text-gray-400 mt-3"
            >
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
