import { Checkbox, Input, Modal, Select, SelectProps } from "antd";
import { useEffect, useState } from "react";
import { TbFidgetSpinner } from "react-icons/tb";
import { toast } from "react-toastify";
import { productCategories } from "../Data/productsData";
import { useUpdateProductMutation } from "../Redux/features/product/productApi";
import { useGetVendorAllShopsQuery } from "../Redux/features/shop/shopApi";
import CustomFileInput from "../Shared/SelectImage";
import { ShopStatus } from "../types/types";

const UpdateProductModal = ({
  setUpdateProductModal,
  updateProductModal,
  productData,
}: any) => {
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState<string>(productData?.category);
  const [shopId, setShopId] = useState<string>(productData?.shop?.id);
  const [shopOptions, setShopOptions] = useState<any[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [isFlashSale, setIsFlashSale] = useState<boolean>(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>(
    productData?.images
  );
  const [updateProduct] = useUpdateProductMutation();
  const { TextArea } = Input;
  const { data, isLoading } = useGetVendorAllShopsQuery(undefined);

  const options: SelectProps["options"] = [];

  // Loading shops when the data is fetched
  useEffect(() => {
    if (data?.data?.length > 0) {
      const options = data.data
        .filter((shop: any) => shop.status === ShopStatus.ACTIVE)
        .map((shop: any) => ({
          label: shop.name,
          value: shop.id,
        }));

      setShopOptions(options);
    }
  }, [data]);

  const handleImageChange = (e: any) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setImageFiles((prev: any) => [...prev, ...newFiles]);

      newFiles.forEach((file: any) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreviews((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const name = e.target.name.value;
    const description = e.target.description.value;
    const brand = e.target.brand.value;
    const dimensions = e.target.dimensions.value;
    const price = Number(e.target.price.value);
    const weight = Number(e.target.weight.value);
    const inventory = Number(e.target.inventory.value);

    const httpsUrls = imagePreviews?.filter((url) =>
      url.startsWith("https://")
    );

    const updateProductInfoData = {
      name,
      price,
      description,
      brand,
      dimensions,
      weight,
      images: httpsUrls,
      category,
      shopId,
      tags,
      inventory,
      isFlashSale,
      createdAt: productData?.createdAt,
    };

    try {
      const formData = new FormData();
      // Append data
      formData.append("data", JSON.stringify(updateProductInfoData));
      // Append image if selected
      if (imageFiles) {
        imageFiles.forEach((file) => {
          formData.append("productImages", file);
        });
      }
      setLoading(true);
      const res = await updateProduct({
        formData,
        id: productData?.id,
      }).unwrap();
      if (res?.success) {
        setLoading(false);
        toast.success(res?.message);
        setUpdateProductModal(false);
      }
    } catch (error: any) {
      setLoading(false);
      toast.error(
        error?.data?.message || error?.message || "Something went wrong!"
      );
    }
  };

  // Handle tag changes
  const handleTagsChange = (value: string[]) => {
    setTags(value);
  };

  // Options for Select component
  for (let i = 10; i < 36; i++) {
    options.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i,
    });
  }

  return (
    <Modal
      title="Update Product"
      style={{ top: 20 }}
      open={updateProductModal}
      onOk={() => setUpdateProductModal(false)}
      onCancel={() => setUpdateProductModal(false)}
      footer={null}
    >
      <form className="w-full mt-4" onSubmit={handleSubmit}>
        {/* Name and Price */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <div className="py-2">
            <label htmlFor="name" className="block text-sm">
              Name <span className="text-red font-bold">*</span>
            </label>
            <Input
              id="name"
              name="name"
              defaultValue={productData?.name}
              placeholder="Enter product name"
              required
            />
          </div>

          <div className="py-2">
            <label htmlFor="price" className="block text-sm">
              Price <span className="text-red font-bold">*</span>
            </label>
            <Input
              id="price"
              name="price"
              type="number"
              defaultValue={productData?.price}
              min={1}
              placeholder="Enter product price"
              required
            />
          </div>
        </div>

        {/* Inventory and Category */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <div className="py-2">
            <label htmlFor="inventory" className="block text-sm">
              Inventory <span className="text-red font-bold">*</span>
            </label>
            <Input
              id="inventory"
              name="inventory"
              type="number"
              defaultValue={productData?.inventory}
              min={1}
              placeholder="Enter Inventory Quantity"
              required
            />
          </div>

          <div className="py-2">
            <label htmlFor="category" className="block text-sm">
              Category <span className="text-red font-bold">*</span>
            </label>
            <Select
              className="w-full"
              showSearch
              placeholder="Select Category"
              optionFilterProp="label"
              defaultValue={productData?.category}
              onChange={(value) => setCategory(value)}
              options={productCategories}
              allowClear={true}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {/* Shop Selection */}
          <div className="py-2">
            <label htmlFor="shop" className="block text-sm">
              Shop <span className="text-red font-bold">*</span>
            </label>
            <Select
              className="w-full"
              showSearch
              loading={isLoading}
              placeholder="Select Shop"
              optionFilterProp="label"
              defaultValue={{
                label: productData?.shop?.name,
                value: productData?.shop?.id,
              }}
              onChange={(value: any) => setShopId(value)}
              options={shopOptions}
              allowClear={true}
            />
          </div>

          {/* Brand */}
          <div className="py-2">
            <label htmlFor="brand" className="block text-sm">
              Brand (Optional)
            </label>
            <Input
              id="brand"
              defaultValue={productData?.brand}
              name="brand"
              placeholder="Enter product brand"
            />
          </div>
        </div>

        {/* Tags */}
        <div className="py-2">
          <label htmlFor="tags" className="block text-sm">
            Tags <span className="text-red font-bold">*</span>
          </label>
          <Select
            mode="tags"
            style={{ width: "100%" }}
            defaultValue={productData?.tags}
            placeholder="Select Tags"
            onChange={handleTagsChange}
            options={options}
          />
        </div>

        {/* Weight and Dimensions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <div className="py-2">
            <label htmlFor="weight" className="block text-sm">
              Weight (kg) (Optional)
            </label>
            <Input
              id="weight"
              name="weight"
              defaultValue={productData?.weight}
              type="number"
              min={0}
              placeholder="Enter product weight"
            />
          </div>
          <div className="py-2">
            <label htmlFor="dimensions" className="block text-sm">
              Dimensions (L x W x H)
            </label>
            <Input
              id="dimensions"
              defaultValue={productData?.dimensions}
              name="dimensions"
              placeholder="Enter product dimensions"
            />
          </div>
        </div>

        {/* Flash Sale Checkbox */}
        <div className="py-2">
          <Checkbox
            defaultChecked={productData?.isFlashSale}
            onChange={(e) => setIsFlashSale(e.target.checked)}
          >
            Is Flash Sale?
          </Checkbox>
        </div>

        {/* Description */}
        <div className="py-2">
          <label htmlFor="description" className="block text-sm">
            Description <span className="text-red font-bold">*</span>
          </label>
          <TextArea
            defaultValue={productData?.description}
            id="description"
            name="description"
            rows={6}
          />
        </div>

        {/* Image Upload */}
        <CustomFileInput
          handleImageChange={handleImageChange}
          imagePreviews={imagePreviews}
          setImagePreviews={setImagePreviews}
        />

        {/* Buttons */}
        <div className="py-2 flex items-center gap-2">
          <button
            type="submit"
            className="bg-primary px-8 transform font-semibold duration-100 hover:bg-[rgb(10,154,115,0.8)] py-3 text-white font-raleway uppercase rounded"
            disabled={loading}
          >
            {loading ? (
              <TbFidgetSpinner className="animate-spin m-auto text-2xl" />
            ) : (
              "Update Product"
            )}
          </button>

          <button
            className="bg-red px-8 transform font-semibold duration-100 hover:bg-[rgb(240,21,21,0.8)] py-3 text-white font-raleway uppercase rounded"
            disabled={loading}
            onClick={() => setUpdateProductModal(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default UpdateProductModal;
