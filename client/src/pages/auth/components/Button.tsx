import clsx from "clsx";

interface ButtonProps {
    type: "button" | "submit" | "reset" | undefined;
    fullWidth?: boolean;
    text: string;
    // children?: React.ReactNode;
    secondary?: boolean;
    onClick?: () => void;
    disabled?: boolean;
    danger?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    type,
    text,
    fullWidth,
    onClick,
    disabled,
    danger,
    secondary,
}) => {
    return (
        <div className="w-full flex justify-end">
            <button
                className={clsx(
                    "rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline2 focus-visible:outline-offset-2 cursor-pointer",
                    fullWidth && "w-full",
                    disabled && "opacity-50 cursor-default",
                    danger &&
                        "bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600",
                    secondary ? "text-gray-900" : "text-white",
                    !secondary &&
                        !danger &&
                        "duration-150 bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600",
                )}
                type={type}
                onClick={() => onClick}
            >
                {text}
            </button>
        </div>
    );
};

export default Button;
