import { MdOutlineCheck } from "react-icons/md";

const ProductDescription = ({ product }: any) => {
  return (
    <div className="font-roboto">
      <h1 className="text-lg mt-2 font-medium">Product Description</h1>
      <p className="text-sm text-gray-400 my-5">
        Wherever celebrations and good times happen, the LAY'S brand will be
        there just as it has been for more than 75 years. With flavors almost as
        rich as our history, we have a chip or crisp flavor guaranteed to bring
        a smile on your face. <br /> Morbi ut sapien vitae odio accumsan
        gravida. Morbi vitae erat auctor, eleifend nunc a, lobortis neque.
        Praesent aliquam dignissim viverra. Maecenas lacus odio, feugiat eu nunc
        sit amet, maximus sagittis dolor. Vivamus nisi sapien, elementum sit
        amet eros sit amet, ultricies cursus ipsum. Sed consequat luctus ligula.
        Curabitur laoreet rhoncus blandit. Aenean vel diam ut arcu pharetra
        dignissim ut sed leo. Vivamus faucibus, ipsum in vestibulum vulputate,
        lorem orci convallis quam, sit amet consequat nulla felis pharetra
        lacus. Duis semper erat mauris, sed egestas purus commodo vel.
        <p className="my-4 lg:w-[600px]">
          8.0 oz. bag of LAY'S Classic Potato Chips Tasty LAY's potato chips are
          a great snack Includes three ingredients: potatoes, oil, and salt
          Gluten free product
        </p>
        <p>Made in USA Ready To Eat.</p>
      </p>

      <h1 className="text-lg mt-2 font-medium">Product Specifications</h1>
      <div className="my-5 space-y-4 text-gray-700">
        <li className="list-none flex items-center gap-2">
          <div className="p-1 text-xs w-fit text-primary bg-primary/10 rounded-full">
            <MdOutlineCheck />
          </div>
          <p className=" text-sm">
            Product Type:{" "}
            <span className="text-gray-400 font-normal">
              {product?.category}
            </span>
          </p>
        </li>
        <li className="list-none flex items-center gap-2">
          <div className="p-1 text-xs w-fit text-primary bg-primary/10 rounded-full">
            <MdOutlineCheck />
          </div>
          <p className=" text-sm">
            Product Name:{" "}
            <span className="text-gray-400 font-normal">{product?.name}</span>
          </p>
        </li>

        <li className="list-none flex items-center gap-2">
          <div className="p-1 text-xs w-fit text-primary bg-primary/10 rounded-full">
            <MdOutlineCheck />
          </div>
          <p className=" text-sm">
            Brand:{" "}
            <span className="text-gray-400 font-normal">
              {product?.brand ? product?.brand : "N/A"}
            </span>
          </p>
        </li>
        <li className="list-none flex items-center gap-2">
          <div className="p-1 text-xs w-fit text-primary bg-primary/10 rounded-full">
            <MdOutlineCheck />
          </div>
          <p className=" text-sm">
            FSA Eligible: <span className="text-gray-400 font-normal">No</span>
          </p>
        </li>
        <li className="list-none flex items-center gap-2">
          <div className="p-1 text-xs w-fit text-primary bg-primary/10 rounded-full">
            <MdOutlineCheck />
          </div>
          <p className=" text-sm">
            Size/Count: <span className="text-gray-400 font-normal">N/A</span>
          </p>
        </li>
        <li className="list-none flex items-center gap-2">
          <div className="p-1 text-xs w-fit text-primary bg-primary/10 rounded-full">
            <MdOutlineCheck />
          </div>
          <p className=" text-sm">
            Item Code:{" "}
            <span className="text-gray-400 font-normal">
              {product.id.slice(0, 5)}
            </span>
          </p>
        </li>
        <li className="list-none flex items-center gap-2">
          <div className="p-1 text-xs w-fit text-primary bg-primary/10 rounded-full">
            <MdOutlineCheck />
          </div>
          <p className="text-sm flex items-center gap-2">
            Tags:{" "}
            <span className="text-gray-400 font-normal flex items-center gap-2">
              {product?.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="bg-gray-100 text-gray-500 text-xs rounded-full px-3 p-[2px] "
                >
                  {tag}
                </span>
              ))}
            </span>
          </p>
        </li>
      </div>
      <h1 className="text-lg pt-2 font-medium">Nutrition Facts</h1>
      <div className="my-5 space-y-4 text-gray-700">
        <li className="list-none flex items-center gap-2">
          <div className="p-1 text-xs w-fit text-primary bg-primary/10 rounded-full">
            <MdOutlineCheck />
          </div>
          <p className=" text-sm">Total Fat 10g 13%</p>
        </li>
        <li className="list-none flex items-center gap-2">
          <div className="p-1 text-xs w-fit text-primary bg-primary/10 rounded-full">
            <MdOutlineCheck />
          </div>
          <p className=" text-sm">Saturated Fat 1.5g 7%</p>
        </li>
        <li className="list-none flex items-center gap-2">
          <div className="p-1 text-xs w-fit text-primary bg-primary/10 rounded-full">
            <MdOutlineCheck />
          </div>
          <p className=" text-sm">Cholesterol 0mg 0%</p>
        </li>
        <li className="list-none flex items-center gap-2">
          <div className="p-1 text-xs w-fit text-primary bg-primary/10 rounded-full">
            <MdOutlineCheck />
          </div>
          <p className=" text-sm">Sodium 170mg 7%</p>
        </li>
        <li className="list-none flex items-center gap-2">
          <div className="p-1 text-xs w-fit text-primary bg-primary/10 rounded-full">
            <MdOutlineCheck />
          </div>
          <p className=" text-sm">Potassium 350mg 6%</p>
        </li>
      </div>
      <h1 className="text-lg pt-2 font-medium">More Details</h1>
      <div className="my-5 space-y-4 text-gray-500">
        <li className="list-none flex items-center gap-2">
          <div className="p-1 text-xs w-fit text-primary bg-primary/10 rounded-full">
            <MdOutlineCheck />
          </div>
          <p className=" text-sm">
            Lunarlon midsole delivers ultra-plush responsiveness
          </p>
        </li>

        <li className="list-none flex items-center gap-2">
          <div className="p-1 text-xs w-fit text-primary bg-primary/10 rounded-full">
            <MdOutlineCheck />
          </div>
          <p className=" text-sm">
            Encapsulated Air-Sole heel unit for lightweight cushioning
          </p>
        </li>
        <li className="list-none flex items-center gap-2">
          <div className="p-1 text-xs w-fit text-primary bg-primary/10 rounded-full">
            <MdOutlineCheck />
          </div>
          <p className=" text-sm">
            Colour Shown: Ale Brown/Black/Goldtone/Ale Brown
          </p>
        </li>
        <li className="list-none flex items-center gap-2">
          <div className="p-1 text-xs w-fit text-primary bg-primary/10 rounded-full">
            <MdOutlineCheck />
          </div>
          <p className="text-sm">Style: 805899-202</p>
        </li>
      </div>
    </div>
  );
};

export default ProductDescription;
