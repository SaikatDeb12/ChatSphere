import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import Footer from "./components/Footer";
import Button from "./components/Button";
import InputBox from "./components/InputBox";
import SubHeading from "./components/SubHeading";
import axios from "axios";
import Loading from "./components/Loading";
import Heading from "./components/Heading";

const SignUp: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    // useEffect(() => {
    //   async function redirect() {
    //     try {
    //       const token = localStorage.getItem("token");
    //       if (!token) {
    //         return;
    //       }
    //       const res = await axios.get(
    //         (import.meta.env.VITE_BASE_URL as string) + "/api/v1/home",
    //         {
    //           headers: {
    //             Authorization: `Bearer ${token}`,
    //           },
    //         }
    //       );
    //       toast.success(res.data.msg);
    //       if (res.data.msg == "welcome") {
    //         navigate("/");
    //       }
    //     } catch (error) {
    //       localStorage.removeItem("token");
    //       const err = error as AxiosError;
    //       console.log(err.response?.data);
    //     } finally {
    //       setLoading(false);
    //     }
    //   }
    //   redirect();
    // }, [navigate]);

    type Schema = {
        name: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        amount: number;
    };

    const [value, setValue] = useState<Schema>({
        name: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        amount: 0,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.name == "amount")
            setValue({
                ...value,
                [event.target.name]: event.target.valueAsNumber,
            });
        else setValue({ ...value, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // try {
        //     const res = await axios.post(
        //         (import.meta.env.VITE_BASE_URL as string) +
        //         "/api/v1/user/signup",
        //         value,
        //         {
        //             headers: {
        //                 "Content-Type": "application/json",
        //             },
        //         },
        //     );
        //     toast.success(res.data.msg);
        //     navigate("/signin");
        // } catch (error) {
        //     const err = error as AxiosError;
        //     const data = err.response?.data as { msg: string };
        //     toast.error(data.msg);
        // }
    };

    return loading ? (
        <Loading />
    ) : (
        <div className="w-full bg-slate-300 min-h-screen flex justify-center items-center p-4">
            <div className="rounded-lg bg-white w-full max-w-md p-6 flex flex-col justify-center items-center">
                <div className="text-center w-full">
                    <Heading color="text-black" label={"Sign Up"} />
                    <SubHeading />
                </div>
                <form className="w-full space-y-4 mt-4" onSubmit={handleSubmit}>
                    <InputBox
                        name={"firstName"}
                        label="First Name"
                        placeholder="John"
                        type="text"
                        onChange={handleChange}
                    />
                    <InputBox
                        name={"lastName"}
                        label="Last Name"
                        placeholder="Doe"
                        type="text"
                        onChange={handleChange}
                    />
                    <InputBox
                        name="email"
                        label="Email"
                        placeholder="John.Doe@gmail.com"
                        type="text"
                        onChange={handleChange}
                    />
                    <InputBox
                        name="password"
                        label="Password"
                        placeholder="******"
                        type="password"
                        onChange={handleChange}
                    />
                    <InputBox
                        name="amount"
                        label="Amount (in Rs.)"
                        placeholder="1000"
                        type="number"
                        onChange={handleChange}
                    />
                    <Button
                        bgColor="bg-blue-500"
                        textColor="text-white"
                        text="Sign Up"
                    />
                </form>
                <Footer
                    msg="Already have an account? "
                    redirect="SignIn"
                    onClick={() => navigate("/signin")}
                />
            </div>
        </div>
    );
};

export default SignUp;
