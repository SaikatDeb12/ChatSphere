import type React from "react";

interface PropsType {
    text: string;
    bgColor: string;
    textColor: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
const Button: React.FC<PropsType> = ({ text, bgColor, textColor, onClick }) => {
    return (
        <button
            onClick={onClick}
            type="submit"
            className={`w-full ${bgColor} ${textColor} rounded-lg px-3 py-2 hover:shadow-sm shadow-md shadow-black ease-in-out font-semibold text-center text-sm cursor-pointer delay-75`}
        >
            {text}
        </button>
    );
};

export default Button;
