import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Input from "./components/Input";
import { useState } from "react";
import Button from "./components/Button";
import { useNavigate } from "react-router-dom";
import axiosIns from "@/lib/axios";
import type { AxiosError } from "axios";

const formSchema = z.object({
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
            email: "",
            password: "",
        },
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: FormType) => {
        console.log("Data submitted: ", data);
        setIsLoading(true);
        try {
            const res = await axiosIns.post("/auth/signin", data);
            console.log(res);
            toast.success(res.data.msg);
            localStorage.setItem("token", res.data.token);
        } catch (error) {
            const err = error as AxiosError;
            const data = err.response?.data as { msg: string };
            toast.error(data.msg);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="w-full min-h-full flex h-screen flex-col justify-center items-center py-12 sm:px-6 lg:px-8 bg-gray-100">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <img
                    className="h-7 sm:h-10 mx-auto w-auto"
                    src="/images/logo.png"
                    alt="logo"
                />
                <h2 className="mt-6 text-xl text-center sm:text-3xl font-bold tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-full">
                <div className="bg-white px-8 py-8 shadow sm:rounded-lg sm:px-10 m-auto max-w-100">
                    <form
                        className="space-y-6 flex flex-col"
                        onSubmit={handleSubmit(onSubmit)}
                    >
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
                                text="SignIn"
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
                        <div>{"New to ChatSphere?"}</div>
                        <div
                            className="underline cursor-pointer"
                            onClick={() => navigate("/signup")}
                        >
                            {"Sign Up"}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
