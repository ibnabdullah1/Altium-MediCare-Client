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
  const [createUser] = useCreateUserMutation();
  const navigate = useNavigate();
  const [fileName, setFileName] = useState<string | null>(null);

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
        setLoading(false);
        toast.success(res.message);
      }
    } catch (error: any) {
      setLoading(false);
      toast.error(
        error.data.message || error?.message || "Something went wrong!"
      );
    }
  };
  return (
    <>
      {" "}
      <LinkBanner activeLocation={"Sign Up"} group={"Account"} />
      <div className="flex justify-center items-center py-20">
        <div className="flex flex-col md:min-w-[500px] max-w-xl p-6 rounded-md sm:p-10 bg-white text-gray-900">
          <div className="mb-8 space-y-4 text-center">
            <h1 className="heading">
              Register <br /> Your Account
            </h1>
            <p className=" text-gray-600">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit
              aliquid, Non distinctio vel iste.
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
                  <p
                    style={{
                      color: "red",
                      fontSize: "0.8rem",
                      marginTop: "0.5rem",
                    }}
                  >
                    {emailError}
                  </p>
                )}
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
                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </span>
                </div>
                {passwordError && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "0.8rem",
                      marginTop: "0.5rem",
                    }}
                  >
                    {passwordError}
                  </p>
                )}
              </div>

              <div className="w-full border border-dashed border-primary p-4 text-center">
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  required
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
                    "Click to upload a profile"
                  )}
                </label>
                <p className="text-sm text-gray-500 mt-2">
                  Supports PNG, JPG, JPEG files.
                </p>
              </div>
            </div>

            {/* Marketing Consent */}
            <div className="flex items-start gap-2">
              <input
                className="relative top-1"
                type="checkbox"
                id="marketingConsent"
              />
              <label htmlFor="marketingConsent">
                I consent to Herboil processing my personal data in order to
                send personalized marketing material in accordance with the
                consent form and the privacy policy.
              </label>
            </div>

            {/* Privacy Policy Consent */}
            <div className="flex items-start gap-2">
              <input
                className="relative top-1"
                type="checkbox"
                id="privacyConsent"
              />
              <label htmlFor="privacyConsent">
                By clicking "create account", I consent to the privacy policy.
              </label>
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
                  "Create Account"
                )}
              </button>
            </div>

            <p className="mt-3 text-gray-600">
              ALREADY HAVE AN ACCOUNT ?{" "}
              <Link
                to="/sign-in"
                className="hover:underline font-semibold hover:text-primary text-primary uppercase"
              >
                Sign In
              </Link>
              .
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
