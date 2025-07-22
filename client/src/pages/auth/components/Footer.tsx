import type React from "react";

interface PropsType {
    msg: string;
    redirect: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
const Footer: React.FC<PropsType> = ({ msg, redirect, onClick }) => {
    return (
        <div className="mx-10 w-full my-2 space-y-4">
            <div className="text-center">
                <span>{msg}</span>
                <span
                    className="font-semibold text-blue-400 underline decoration-1 cursor-pointer"
                    onClick={onClick}
                >
                    {redirect}
                </span>
            </div>
        </div>
    );
};

export default Footer;
