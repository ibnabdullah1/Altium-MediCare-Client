import { useState } from "react";
import { TbFidgetSpinner } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCreateShopMutation } from "../../Redux/features/shop/shopApi";

const CreateShop = () => {
  const [loading, setLoading] = useState(false);
  const [createShop] = useCreateShopMutation();
  const navigate = useNavigate();
  const [fileName, setFileName] = useState<string | null>(null);

  // State for form data
  const [shopInfo, setShopInfo] = useState({
    name: "",
    description: "",
    image: null as File | null,
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setFileName(selectedFile.name);
      setShopInfo((prevInfo) => ({
        ...prevInfo,
        image: selectedFile,
      }));
    }
  };

  const handleCreateShop = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as any;
    const name = form.name.value;
    const description = form.description.value;

    // Update shopInfo with form data
    setShopInfo((prevInfo) => ({
      ...prevInfo,
      name,
      description,
    }));

    const { image } = shopInfo;

    // Clear previous errors and start loading
    setLoading(true);

    try {
      const formData = new FormData();
      // Append form data
      const shopInfo = {
        name,
        description,
      };
      // Append data
      formData.append("data", JSON.stringify(shopInfo));
      formData.append("name", name);
      formData.append("description", description);

      if (image) {
        formData.append("file", image);
      }

      // Make the API call to create the shop
      const res = await createShop(formData).unwrap();
      if (res.status) {
        toast.success(res.message);
        navigate("/dashboard");
        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false);
      toast.error(
        error.data.message || error?.message || "Something went wrong!"
      );
    }
  };
  const inputClasses =
    "appearance-none block w-full px-3 text-[12px] py-2 border rounded placeholder-secondary focus:outline-none focus:border-primary transition duration-150 ease-in-out";
  return (
    <div className="flex justify-center bg-white items-center py-20">
      <div className="flex flex-col md:min-w-[500px] max-w-xl p-6 rounded-md sm:p-10  text-gray-900">
        <div className="mb-8 space-y-4 text-center">
          <h1 className="heading">Create Your Shop</h1>
          <p className="text-gray-600">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit
            aliquid, Non distinctio vel iste.
          </p>
        </div>
        <form
          onSubmit={handleCreateShop}
          className="space-y-6 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm py-1">
                Shop Name
                <span className="text-red font-bold">*</span>
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                placeholder="Shop name"
                className={inputClasses}
              />
            </div>
            <div className="py-2">
              <label htmlFor="description" className="block text-sm py-1">
                Description/Product Details
                <span className="text-red font-bold">*</span>
              </label>
              <textarea
                id="description"
                rows={6}
                name="description"
                className={inputClasses}
                placeholder="Details"
              ></textarea>
            </div>

            <div className="w-full border rounded border-dashed border-primary p-4 text-center bg-white">
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
                  "Click to upload a logo"
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
              className="bg-primary px-8 transform font-semibold duration-100 hover:bg-[rgb(10,154,115,0.8)] py-3 text-white font-raleway uppercase"
              disabled={loading}
            >
              {loading ? (
                <TbFidgetSpinner className="animate-spin m-auto text-2xl" />
              ) : (
                "Create Shop"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateShop;
