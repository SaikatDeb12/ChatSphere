import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Input from "./components/Input";
import { useState } from "react";
import Button from "./components/Button";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
    email: z.string().email("Invalid Email"),
    password: z.string().min(4).max(20),
});

type FormType = z.infer<typeof formSchema>;

const SignIn = () => {
    const navigate = useNavigate();
    const { isLoading, setIsLoading } = useState<boolean>(false);
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

    const onSubmit = () => {};
    return (
        <div className="w-full flex min-h-full h-screen flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <img
                    className="h-10 mx-auto w-auto"
                    src="/images/logo.png"
                    alt="logo"
                />
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-full">
                <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10 m-auto w-100">
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
                        <div>{"Already have an account?"}</div>
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
