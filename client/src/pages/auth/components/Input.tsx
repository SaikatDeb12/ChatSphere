import clsx from "clsx";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

interface FormData {
    name: string;
    email: string;
    password: string;
}

interface InputProps {
    name: "name" | "email" | "password";
    label: string;
    id: string;
    type?: string;
    register: UseFormRegister<FormData>;
    errors: FieldErrors<FormData>;
    disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
    name,
    label,
    id,
    type,
    register,
    errors,
    disabled,
}) => {
    return (
        <div>
            <label
                htmlFor={id}
                className="block text-sm font-medium leading-6 text-gray-900"
            >
                {label}
            </label>
            <input
                className={clsx(
                    `form-input block w-full border border-gray-300 hover:border-blue-500 outline-none rounded-md  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6 p-2`,
                    errors[name] && "ring-rose-500 focus:ring-rose-500",
                    disabled && "opacity-50 cursor-default",
                )}
                id={id}
                type={type}
                {...register(name)}
                autoComplete={id}
                disabled={disabled}
            />
        </div>
    );
};
export default Input;
