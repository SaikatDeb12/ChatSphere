import axiosIns from "@/libs/axios";
import { toast } from "react-hot-toast";
import type { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../auth/components/Loading";
import LogOut from "../auth/LogOut";

const HomePage = () => {
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
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
                        // navigate("/dashboard");
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
    return isLoading ? (
        <Loading />
    ) : (
        <div>
            <p>Homepage</p>
            {isAuthorized && <LogOut />}
        </div>
    );
};
export default HomePage;
