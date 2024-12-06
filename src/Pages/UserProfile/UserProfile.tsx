import { IoCameraOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  selectCurrentUser,
  setProfile,
} from "../../Redux/features/auth/authSlice";
import { useAppDispatch } from "../../Redux/features/hooks";
import { useProfileUpdateMutation } from "../../Redux/features/user/userApi";

const Profile = () => {
  const user = useSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const [profileUpdate] = useProfileUpdateMutation();
  const userPosts = [];

  // Fetch user data (you need to define `userData`)
  const userData: any = {};

  const followers = userData?.data?.follower.length || 0;
  const followings = userData?.data?.following.length || 0;
  const totalPost = userPosts?.length || 0;

  const handleChangeProfile = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) {
      toast.error("No file selected");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res: any = await profileUpdate(formData).unwrap();
      if (res.success) {
        toast.success(res.message);
        dispatch(setProfile(res.data.profilePhoto));
      }
    } catch (error) {
      toast.error("An error occurred while updating your profile");
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto relative">
        <div className="rounded-t-lg h-[200px] overflow-hidden">
          <img
            className="object-cover object-bottom w-full"
            src={
              user?.role === "ADMIN"
                ? "https://img.freepik.com/premium-vector/interface-structure-data-calculation-systems_49459-481.jpg"
                : "https://img.freepik.com/premium-photo/misty-mountain-landscape-grey-background_1008702-135.jpg"
            }
            alt="Mountain"
          />
        </div>
        <div className="absolute top-28 md:top-20 lg:top-10 left-0 right-0 mx-auto bg-[#575757] w-[110px] h-[110px] md:w-[150px] md:h-[150px] lg:w-[200px] lg:h-[200px] rounded-full flex items-center justify-center">
          <div className="relative w-[100px] h-[100px] md:w-[140px] md:h-[140px] lg:w-[190px] lg:h-[190px] overflow-hidden">
            <img
              className="w-full h-full object-cover object-center overflow-hidden rounded-full"
              src={user?.profilePhoto || "defaultProfileImageUrl"}
              alt="profile"
            />
            <form className="absolute bottom-4 -right-2 z-[3]">
              <label
                htmlFor="profile"
                className="flex cursor-pointer items-center justify-center gap-1 rounded py-1 px-2 text-sm font-medium text-white hover:bg-opacity-80 xsm:px-4"
              >
                <input
                  type="file"
                  name="profile"
                  id="profile"
                  accept="image/*"
                  className="sr-only"
                  onChange={handleChangeProfile}
                />
                <span className="bg-primary h-6 w-6 md:h-8 md:w-8 flex text-white justify-center items-center rounded-full p-1">
                  <IoCameraOutline className="text-base" />
                </span>
              </label>
            </form>
          </div>
        </div>
        <div className="mt-14">
          <h3 className="mb-1.5 text-xl text-center font-semibold text-blue-500 ">
            {user?.role}
          </h3>
          <div className="flex justify-center items-center">
            <div className="mb-1.5 text-2xl text-center font-semibold text-secondary flex items-center gap-2">
              <h2> {user?.name}</h2>
            </div>
          </div>

          <div className="mx-auto mt-4.5 mb-5.5 grid max-w-94 grid-cols-3 rounded-md border border-stroke py-2.5 shadow-1">
            <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 xsm:flex-row">
              <span className="font-semibold text-secondary ">{totalPost}</span>
              <span className="text-sm">Posts</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 xsm:flex-row">
              <span className="font-semibold text-secondary ">{followers}</span>
              <span className="text-sm">Followers</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row">
              <span className="font-semibold text-secondary ">
                {followings}
              </span>
              <span className="text-sm">Following</span>
            </div>
          </div>

          <div className="mx-auto max-w-180 mt-3">
            <h4 className="font-semibold text-secondary text-center ">
              About Me
            </h4>
            <p className="mt-4.5 text-center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque posuere fermentum urna, eu condimentum mauris tempus
              ut. Donec fermentum blandit aliquet. Etiam dictum dapibus
              ultricies. Sed vel aliquet libero. Nunc a augue fermentum,
              pharetra ligula sed, aliquam lacus.
            </p>
          </div>

          <div className="mt-6">
            <h4 className="mb-3.5 font-semibold text-secondary text-center">
              Follow me on
            </h4>
            <div className="flex items-center justify-center gap-3.5">
              <a
                href="#"
                className="hover:text-primary"
                aria-label="social-icon"
              >
                <svg
                  className="fill-current"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Social SVG icon */}
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
