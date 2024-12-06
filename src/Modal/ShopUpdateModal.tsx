import { Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { TbFidgetSpinner } from "react-icons/tb";
import { toast } from "react-toastify";
import { useUpdateShopMutation } from "../Redux/features/shop/shopApi";

const ShopUpdateModal = ({
  updateShopModal,
  setUpdateShopModal,
  shopData,
}: any) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [updateShop] = useUpdateShopMutation();
  const handleUpdateShop = async (e: any) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const description = form.description.value;
    setLoading(true);

    try {
      const formData = new FormData();
      // Append form data
      const shopInfo = {
        name,
        description,
        logo: shopData?.logo,
      };
      // Append data
      formData.append("data", JSON.stringify(shopInfo));
      if (imageFile) {
        formData.append("file", imageFile);
      }

      // Make the API call to create the shop
      const res = await updateShop({ formData, id: shopData?.id }).unwrap();
      if (res.status) {
        setUpdateShopModal(false);
        toast.success(res.message);
        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false);
      toast.error(
        error.data.message || error?.message || "Something went wrong!"
      );
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFileName(selectedFile.name);
      setImageFile(selectedFile);
    }
  };

  if (!shopData) {
    setUpdateShopModal(false);
    return null;
  }

  return (
    <Modal
      title="Update Shop"
      style={{ top: 20 }}
      open={updateShopModal}
      onOk={() => setUpdateShopModal(false)}
      onCancel={() => setUpdateShopModal(false)}
      footer={null}
    >
      <form
        onSubmit={handleUpdateShop}
        className="space-y-6 ng-untouched ng-pristine ng-valid"
      >
        <div className="space-y-4">
          {/* Shop Name */}
          <div>
            <label htmlFor="name" className="block text-sm py-1">
              Shop Name
              <span className="text-red font-bold">*</span>
            </label>
            <Input
              type="text"
              name="name"
              defaultValue={shopData?.name || ""}
              id="name"
              required
              placeholder="Shop name"
            />
          </div>

          {/* Description */}
          <div className="py-2">
            <label htmlFor="description" className="block text-sm py-1">
              Description/Product Details
              <span className="text-red font-bold">*</span>
            </label>
            <TextArea
              id="description"
              rows={6}
              defaultValue={shopData?.description || ""}
              name="description"
              placeholder="Details"
            />
          </div>

          {/* File Upload */}
          <div className="w-full border rounded border-dashed border-primary p-4 text-center bg-white">
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
                "Click to upload a logo"
              )}
            </label>
            <p className="text-sm text-gray-500 mt-2">
              Supports PNG, JPG, JPEG files.
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setUpdateShopModal(false)}
            className="bg-red px-8 rounded-lg transform font-semibold duration-100 hover:bg-[rgba(154,10,10,0.8)] py-3 text-white font-raleway uppercase w-fit"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-primary px-8 rounded-lg transform font-semibold duration-100 hover:bg-[rgb(10,154,115,0.8)] py-3 text-white font-raleway uppercase w-fit"
            disabled={loading}
          >
            {loading ? (
              <TbFidgetSpinner className="animate-spin m-auto text-2xl" />
            ) : (
              "Update Shop"
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ShopUpdateModal;
