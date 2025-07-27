import React from "react";
import { MdAccountCircle } from "react-icons/md";
import { FaUserGroup } from "react-icons/fa6";
import { HiChat } from "react-icons/hi";
import { HiArrowLeftEndOnRectangle } from "react-icons/hi2";
import { useNavigate, useLocation } from "react-router-dom";
import ChatList from "./ChatList";

const Sidebar2: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path: string) => location.pathname.includes(path);

    return (
        <div className="h-full flex">
            <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-16 lg:overflow-y-auto lg:bg-white lg:border-r-[1px] lg:border-r-gray-200 lg:pb-4 lg:flex lg:flex-col justify-between">
                <div className="mt-4 h-full flex flex-col items-center justify-between px-2">
                    <div className="space-y-4 w-full">
                        <div
                            className={`p-3 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${isActive("/conversations") ? "bg-gray-200" : "hover:bg-gray-100"}`}
                            onClick={() => navigate("/conversations")}
                        >
                            <HiChat className="text-2xl text-gray-700" />
                        </div>
                        <div
                            className={`p-3 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${isActive("/users") ? "bg-gray-200" : "hover:bg-gray-100"}`}
                            onClick={() => navigate("/users")}
                        >
                            <FaUserGroup className="text-2xl text-gray-700" />
                        </div>
                    </div>

                    <div className="space-y-4 w-full">
                        <div
                            className={`p-3 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${isActive("/account") ? "bg-gray-200" : "hover:bg-gray-100"}`}
                            onClick={() => navigate("/account")}
                        >
                            <MdAccountCircle className="text-2xl text-gray-700" />
                        </div>
                        <div
                            className="p-3 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"
                            onClick={() => {
                                localStorage.removeItem("token");
                                navigate("/signin");
                            }}
                        >
                            <HiArrowLeftEndOnRectangle className="text-2xl text-gray-700" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="hidden lg:block fixed left-16 inset-y-0 w-64 border-r border-gray-200 bg-white z-30">
                <ChatList />
            </div>
        </div>
    );
};

export default Sidebar2;
