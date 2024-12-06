import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { TbFidgetSpinner } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCreateUserMutation } from "../../Redux/features/user/userApi";
import LinkBanner from "../../Shared/LinkBanner";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("CUSTOMER"); // Default role
  const [fileName, setFileName] = useState<string | null>(null);
  const [createUser] = useCreateUserMutation();
  const navigate = useNavigate();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
    }
  };

  const handleRegister = async (e: any) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const password = form.password.value;
    const image = form.image.files[0];

    // Clear previous errors
    setPasswordError("");
    setEmailError("");

    // Password validation
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const userInfo = {
        password,
        user: {
          name,
          email,
          role, // Include the selected role
        },
      };

      const formData = new FormData();
      // Append data
      formData.append("data", JSON.stringify(userInfo));

      // Append image if selected
      if (image) {
        formData.append("file", image);
      }

      const res = await createUser(formData).unwrap();
      if (res.success) {
        navigate("/sign-in");
        toast.success(res.message);
      }
    } catch (error: any) {
      toast.error(
        error.data?.message || error?.message || "Something went wrong!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LinkBanner activeLocation={"Sign Up"} group={"Account"} />
      <div className="flex justify-center items-center py-20">
        <div className="flex flex-col md:min-w-[500px] max-w-xl p-6 rounded-md sm:p-10 bg-white text-gray-900">
          <div className="mb-8 space-y-4 text-center">
            <h1 className="heading">
              Register <br /> Your Account
            </h1>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
              aliquid, non distinctio vel iste.
            </p>
          </div>
          <form
            onSubmit={handleRegister}
            className="space-y-6 ng-untouched ng-pristine ng-valid"
          >
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  placeholder="Your name"
                  className="form_input"
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="form_input"
                />
                {emailError && (
                  <p className="text-red-500 text-sm mt-2">{emailError}</p>
                )}
              </div>

              {/* Role Selection */}
              <div>
                <select
                  name="role"
                  id="role"
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="form_input"
                >
                  <option value="CUSTOMER">Customer</option>
                  <option value="VENDOR">Vendor</option>
                </select>
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
                    className="form_input relative"
                  />
                  <span
                    className="absolute top-[40%] right-4 cursor-pointer opacity-50"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </span>
                </div>
                {passwordError && (
                  <p className="text-red-500 text-sm mt-2">{passwordError}</p>
                )}
              </div>

              <div className="w-full border border-dashed border-primary p-4 text-center">
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="image"
                  className="cursor-pointer text-primary hover:underline"
                >
                  {fileName ? (
                    <span className="font-medium">{fileName}</span>
                  ) : (
                    "Click to upload a profile picture"
                  )}
                </label>
                <p className="text-sm text-gray-500 mt-2">
                  Supports PNG, JPG, JPEG files.
                </p>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="bg-primary px-8 py-3 text-white font-semibold uppercase"
                disabled={loading}
              >
                {loading ? (
                  <TbFidgetSpinner className="animate-spin m-auto" />
                ) : (
                  "Create Account"
                )}
              </button>
            </div>

            <p className="mt-3 text-gray-600">
              Already have an account?{" "}
              <Link
                to="/sign-in"
                className="hover:underline font-semibold text-primary"
              >
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
