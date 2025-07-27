import axiosIns from "@/libs/axios";
import type { AxiosError } from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loading from "../auth/components/Loading";
import EmptySpace from "./components/EmptySpace";
import Sidebar2 from "./components/Sidebar2";

const Conversations = () => {
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [toggleChat, setToggleChat] = useState<boolean>(false); // Moved state here
    const navigate = useNavigate();

    useEffect(() => {
        async function redirect() {
            setIsLoading(true);
            try {
                const token = localStorage.getItem("token");
                if (!token) return;
                else {
                    const res = await axiosIns("/auth/home", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    if (res.data.msg == "welcome") {
                        setIsAuthorized(true);
                    }
                }
            } catch (err) {
                const error = err as AxiosError;
                toast.error(error.message);
                console.log(error.response?.data);
                localStorage.removeItem("token");
            } finally {
                setIsLoading(false);
            }
        }
        redirect();
    }, [navigate]);

    // Callback to handle user click
    const handleUserClick = () => {
        setToggleChat(true);
    };

    return isLoading ? (
        <Loading />
    ) : (
        <div className="flex h-screen w-full bg-white">
            <div className="hidden lg:block lg:w-80 fixed inset-y-0 left-0 border-r border-gray-200">
                <Sidebar2 onUserClick={handleUserClick} /> {/* Pass callback */}
            </div>
            <div className="flex-1 lg:ml-80">
                <EmptySpace
                    toggleChat={toggleChat}
                    setToggleChat={setToggleChat}
                />{" "}
                {/* Pass state and setter */}
            </div>
        </div>
    );
};

export default Conversations;
