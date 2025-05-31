import React from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

interface DropDownProps {
    options: any[];
    selected: string;
    onChange: (value: string) => void;
    label: string;
}

const CustomDropDown = ({ options, selected, onChange, label }: DropDownProps) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    const handleOptionClick = (value: string) => {
        onChange(value);
        setIsOpen(false);
    };

    return (
        <div className="relative w-full text-white">
            <div
                role="button"
                onClick={toggleDropdown}
                className={`w-full bg-transparent text-white px-3 pt-4 pb-3.5 rounded-md border border-gray-500 transition duration-200 outline-none cursor-pointer relative`}
            >
                <p
                    className={`absolute left-3 px-1 transition-all duration-200 bg-[#1e293b] 
                    ${selected ? "top-[-10px] text-sm text-blue-400" : "top-3.5 text-base text-gray-400"}`}
                >
                    {label}
                </p>

                <div className="flex justify-between items-center">
                    <span className="text-white">{selected || <span className="text-gray-500"></span>}</span>
                    {isOpen ? <IoIosArrowUp size={20} /> : <IoIosArrowDown size={20} />}
                </div>
            </div>

            {isOpen && (
                <div
                    className="absolute mt-1 w-full z-20 bg-[#1e293b] border border-blue-500 rounded-md shadow-md max-h-52 overflow-y-auto transition-all duration-300"
                >
                    {options.map((opt, index) => (
                        <button
                            key={index}
                            onClick={() => handleOptionClick(opt)}
                            className={`w-full text-left px-4 py-2 text-gray-200 hover:bg-blue-600 transition-colors duration-150 ${
                                selected === opt ? "bg-blue-700" : ""
                            }`}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomDropDown;
