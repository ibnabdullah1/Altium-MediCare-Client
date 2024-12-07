import {
  Button,
  Checkbox,
  Divider,
  Input,
  InputRef,
  Select,
  SelectProps,
  Space,
} from "antd";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { TbFidgetSpinner } from "react-icons/tb";
import { toast } from "react-toastify";
import {
  brandOptions,
  productCategories,
  productTags,
} from "../../../Data/productsData"; // Ensure you import this from correct path
import { useCreateProductMutation } from "../../../Redux/features/product/productApi";
import { useGetVendorAllShopsQuery } from "../../../Redux/features/shop/shopApi";
import CustomFileInput from "../../../Shared/SelectImage";
import { ShopStatus } from "../../../types/types";

const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [shopId, setShopId] = useState<string>("");
  const [shopOptions, setShopOptions] = useState<any[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [isFlashSale, setIsFlashSale] = useState<boolean>(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [createProduct] = useCreateProductMutation();
  const [items, setItems] = useState(brandOptions);
  const inputRef = useRef<InputRef>(null);
  const [newBrandName, setNewBrandName] = useState("");
  const { TextArea } = Input;
  const { data, isLoading } = useGetVendorAllShopsQuery(undefined);

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

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setImageFiles((prev) => [...prev, ...newFiles]);

      newFiles.forEach((file) => {
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
    const dimensions = e.target.dimensions.value;
    const price = Number(e.target.price.value);
    const weight = Number(e.target.weight.value);
    const inventory = Number(e.target.inventory.value);

    const productData = {
      name,
      price,
      description,
      brand,
      dimensions,
      weight,
      category,
      shopId,
      tags,
      inventory,
      isFlashSale,
    };

    try {
      const formData = new FormData();
      // Append data
      formData.append("data", JSON.stringify(productData));
      // Append image if selected
      if (imageFiles) {
        imageFiles.forEach((file) => {
          formData.append("productImages", file);
        });
      }
      setLoading(true);
      const res = await createProduct(formData).unwrap();
      if (res?.success) {
        setLoading(false);
        toast.success(res?.message);
        e.target.reset();
        setImageFiles([]);
        setImagePreviews([]);
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

  const options: SelectProps["options"] = [
    ...productTags.map((tag) => ({ value: tag, label: tag })),
  ];

  // Dynamically add additional options
  for (let i = 10; i < 36; i++) {
    options.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i,
    });
  }

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewBrandName(event.target.value);
  };

  const addItem = (e: any) => {
    e.preventDefault();
    setItems([...items, newBrandName]);
    setNewBrandName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };
  return (
    <div className="rounded-lg py-20 bg-white">
      <div className="mb-8 space-y-4 text-center">
        <h1 className="heading">Create Your Product</h1>
        <p className="text-gray-600">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit aliquid,
          Non distinctio vel iste.
        </p>
      </div>
      <form className="w-full px-5 lg:px-10 mt-4" onSubmit={handleSubmit}>
        {/* Name and Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="py-2">
            <label htmlFor="name" className="block text-sm">
              Name <span className="text-red font-bold">*</span>
            </label>
            <Input
              id="name"
              name="name"
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
              min={1}
              placeholder="Enter product price"
              required
            />
          </div>
        </div>

        {/* Inventory and Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="py-2">
            <label htmlFor="inventory" className="block text-sm">
              Inventory <span className="text-red font-bold">*</span>
            </label>
            <Input
              id="inventory"
              name="inventory"
              type="number"
              min={1}
              defaultValue={1}
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
              onChange={(value) => setCategory(value)}
              options={productCategories}
              allowClear={true}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
              onChange={(value) => setShopId(value)}
              options={shopOptions}
              allowClear={true}
            />
          </div>

          {/* Brand */}
          <div className="py-2">
            <label htmlFor="category" className="block text-sm">
              Brand <span className="text-red font-bold">*</span>
            </label>
            <Select
              className="w-full"
              showSearch
              allowClear={true}
              onChange={(value) => setBrand(value)}
              placeholder="Select your brand"
              dropdownRender={(menu) => (
                <>
                  {menu}
                  <Divider style={{ margin: "8px 0" }} />
                  <Space style={{ padding: "0 8px 4px" }}>
                    <Input
                      placeholder="Please enter item"
                      ref={inputRef}
                      value={newBrandName}
                      onChange={onNameChange}
                      onKeyDown={(e) => e.stopPropagation()}
                    />
                    <Button type="text" icon={<FaPlus />} onClick={addItem}>
                      Add item
                    </Button>
                  </Space>
                </>
              )}
              options={items.map((item) => ({ label: item, value: item }))}
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
            showSearch
            style={{ width: "100%" }}
            placeholder="Select Tags"
            onChange={handleTagsChange}
            options={options}
          />
        </div>

        {/* Weight and Dimensions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="py-2">
            <label htmlFor="weight" className="block text-sm">
              Weight (kg) (Optional)
            </label>
            <Input
              id="weight"
              name="weight"
              type="number"
              min={1}
              placeholder="Enter product weight"
            />
          </div>
          <div className="py-2">
            <label htmlFor="dimensions" className="block text-sm">
              Dimensions (L x W x H)
            </label>
            <Input
              id="dimensions"
              name="dimensions"
              placeholder="Enter product dimensions"
            />
          </div>
        </div>

        {/* Flash Sale Checkbox */}
        <div className="py-2">
          <Checkbox onChange={(e) => setIsFlashSale(e.target.checked)}>
            Is Flash Sale?
          </Checkbox>
        </div>

        {/* Description */}
        <div className="py-2">
          <label htmlFor="description" className="block text-sm">
            Description <span className="text-red font-bold">*</span>
          </label>
          <TextArea
            defaultValue={
              "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem."
            }
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
          <div>
            <button
              type="submit"
              className="bg-primary px-8 transform font-semibold duration-100 hover:bg-[rgb(10,154,115,0.8)] py-3 text-white font-raleway uppercase"
              disabled={loading}
            >
              {loading ? (
                <TbFidgetSpinner className="animate-spin m-auto text-2xl" />
              ) : (
                "Add Product"
              )}
            </button>
          </div>

          <button
            type="reset"
            className="bg-red px-8 transform font-semibold duration-100 hover:bg-[rgb(240,21,21,0.8)] py-3 text-white font-raleway uppercase"
            disabled={loading}
            onClick={() => {
              setCategory("");
              setShopId("");
              setIsFlashSale(false);
            }}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
