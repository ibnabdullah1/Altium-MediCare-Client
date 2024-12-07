import { useState } from "react";
import { TbFidgetSpinner } from "react-icons/tb";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import * as z from "zod";
import { useForgotPasswordMutation } from "../../Redux/features/auth/authApi";
import LinkBanner from "../../Shared/LinkBanner";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [forgotPassword] = useForgotPasswordMutation();

  // Form submission handler
  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const userInfo = {
      email: form.email.value,
    };

    // Validation schema
    const validationSchema = z.object({
      email: z.string().email("Please enter a valid email address!"),
    });

    try {
      // Validate input
      validationSchema.parse(userInfo);

      // Make API call
      const res = await forgotPassword(userInfo).unwrap();
      if (res.success) {
        toast.success(res.message || "Password reset link sent to your email.");
        form.reset(); // Reset the form after successful submission
      }
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        // Handle validation errors
        const errors = err.errors.map((e) => e.message).join(", ");
        toast.error(errors);
      } else {
        // Handle API errors
        toast.error(
          err?.data?.message || "Failed to send reset link. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LinkBanner activeLocation={"Forget Password"} group={"Account"} />
      <div className="flex justify-center items-center py-20">
        <div className="flex flex-col md:min-w-[400px] max-w-xl p-6 rounded-md sm:p-10 bg-white text-gray-900">
          <div className="mb-8 space-y-4 text-center">
            <h1 className="heading">Forgot Password</h1>
            <p className="text-gray-600">
              Enter your email address to receive a password reset link.
            </p>
          </div>

          <form onSubmit={handleForgotPassword} className="space-y-6">
            <div className="mb-4 relative">
              <input
                type="email"
                name="email"
                autoComplete="email"
                id="email"
                required
                placeholder="Your email"
                className="form_input"
              />
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
                  "Send Reset Link"
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

export default ForgotPassword;
