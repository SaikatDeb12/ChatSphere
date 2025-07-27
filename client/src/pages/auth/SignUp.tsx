import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Input from "./components/Input";
import { useEffect, useState } from "react";
import Button from "./components/Button";
import { useNavigate } from "react-router-dom";
import axiosIns from "@/libs/axios";
import type { AxiosError } from "axios";
import Loading from "./components/Loading";

const formSchema = z.object({
    name: z.string().min(1, { message: "Required" }),
    email: z.string().email({ message: "Invalid Email" }),
    password: z
        .string()
        .min(4)
        .max(20, { message: "Password should be at least 4 characters" }),
});

type FormType = z.infer<typeof formSchema>;

const SignIn = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormType>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
        resolver: zodResolver(formSchema),
    });

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
                        navigate("/dashboard");
                    } else navigate("/home");
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

    const onSubmit = async (data: FormType) => {
        console.log("Data submitted: ", data);
        setIsLoading(true);
        try {
            const res = await axiosIns.post("/auth/signup", data);
            console.log(res);
            toast.success(res.data.msg);
            localStorage.setItem("token", res.data.token);
            navigate("/dashboard");
        } catch (error) {
            const err = error as AxiosError;
            const data = err.response?.data as { msg: string };
            toast.error(data.msg);
        } finally {
            setIsLoading(false);
        }
    };
    return isLoading ? (
        <Loading />
    ) : (
        <div className="w-full min-h-full flex h-screen flex-col justify-center items-center py-12 sm:px-6 lg:px-8 bg-gray-100">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <img
                    className="h-7 sm:h-10 mx-auto w-auto"
                    src="/images/logo.png"
                    alt="logo"
                />
                <h2 className="mt-6 text-xl text-center sm:text-3xl font-bold tracking-tight text-gray-900">
                    Create a new account
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-full">
                <div className="bg-white px-8 py-8 shadow sm:rounded-lg sm:px-10 m-auto max-w-100">
                    <form
                        className="space-y-6 flex flex-col"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Input
                            name="name"
                            label="Name"
                            id="name"
                            type="name"
                            register={register}
                            errors={errors}
                            disabled={isLoading}
                        />

                        <Input
                            name="email"
                            label="Email"
                            id="email"
                            type="email"
                            register={register}
                            errors={errors}
                            disabled={isLoading}
                        />
                        <Input
                            label="Password"
                            name="password"
                            id="password"
                            type="password"
                            register={register}
                            errors={errors}
                            disabled={isLoading}
                        />
                        <div className="w-full flex justify-end">
                            <Button
                                type="submit"
                                fullWidth={true}
                                text="SignUp"
                                disabled={isLoading}
                                secondary={false}
                                danger={false}
                            />
                        </div>
                    </form>
                    {/* <div className="mt-6"> */}
                    {/*     <div className="relative"> */}
                    {/*         <div className="absolute inset-0 flex items-center"> */}
                    {/*             <div className="w-full border-t border-gray-300" /> */}
                    {/*         </div> */}
                    {/*         <div className="relative flex justify-center text-sm"> */}
                    {/*             <span className="bg-white px-2 text-gray-500"> */}
                    {/*                 or continue with */}
                    {/*             </span> */}
                    {/*         </div> */}
                    {/*     </div> */}
                    {/* </div> */}
                    <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
                        <div>{"Already have an account?"}</div>
                        <div
                            className="underline cursor-pointer"
                            onClick={() => navigate("/signin")}
                        >
                            {"Sign In"}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
