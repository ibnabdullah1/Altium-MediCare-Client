import { useEffect, useRef, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

interface Option {
  label: string;
  value: string;
}

interface InputDropdownProps {
  placeholder: string;
  name: string;
  options: Option[];
  selectedOption: string | null;
  setSelectedOption: (option: string) => void;
}

const InputDropdown: React.FC<InputDropdownProps> = ({
  placeholder,
  name,
  options,
  selectedOption,
  setSelectedOption,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option.value); // Set the value of the option, not the label
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Find the selected label for display
  const selectedLabel = options.find(
    (option) => option.value === selectedOption
  )?.label;

  return (
    <div ref={dropdownRef} className="relative inline-block py-2 w-full">
      <label htmlFor={name} className="block text-sm py-1 leading-5">
        {name} <span className="text-red font-bold">*</span>
      </label>
      <div
        className="relative flex justify-between items-center border rounded py-2 px-2 cursor-pointer bg-white"
        onClick={toggleOpen}
        aria-expanded={isOpen}
        aria-controls={`${name}-dropdown`}
      >
        <p className="text-sm">
          {selectedLabel || placeholder}{" "}
          {/* Display the label of the selected option */}
        </p>
        <IoMdArrowDropdown
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>
      {isOpen && (
        <div
          id={`${name}-dropdown`}
          className="absolute z-10 w-full rounded mt-1 bg-white max-h-40 overflow-y-auto shadow-lg"
        >
          {options.map((option, i) => (
            <div
              key={i}
              className="py-2 px-3 text-sm hover:bg-gray-100 cursor-pointer"
              onClick={() => handleOptionClick(option)}
            >
              {option.label} {/* Display the label of the option */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InputDropdown;
