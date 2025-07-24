import { useNavigate } from "react-router-dom";

const LogOut = () => {
    const navigate = useNavigate();
    return (
        <div>
            <p
                onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/signin");
                }}
            >
                Logout
            </p>
        </div>
    );
};
export default LogOut;
