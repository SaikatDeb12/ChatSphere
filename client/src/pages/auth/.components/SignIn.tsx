
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
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
    email: string;
    password: string;
  };

  const [value, setValue] = useState<Schema>({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...value, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // try {
    //   const res = await axios.post(
    //     (import.meta.env.VITE_BASE_URL as string) + "/api/v1/user/signin",
    //     value
    //   );
    //   const token = res.data.token;
    //   toast.success(res.data.msg);
    //   localStorage.setItem("token", token);
    //   navigate("/dashboard");
    // } catch (error) {
    //   const err = error as AxiosError;
    //   const data = err.response?.data as { msg: string };
    //   toast.error(data.msg);
    // }
  };
  return loading ? (
    <Loading />
  ) : (
    <div className="bg-slate-300 min-h-screen flex justify-center items-center p-4">
      <div className="rounded-lg bg-white max-w-md p-6 flex flex-col justify-center items-center">
        <div className="text-center w-full">
          <Heading color="text-black" label={"Sign In"} />
          <SubHeading />
        </div>
        <form
          className="w-full space-y-4 mt-4"
          onSubmit={(event) => handleSubmit(event)}
        >
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
          <Button bgColor="bg-blue-500" textColor="text-white" text="Sign In" />
        </form>
        <Footer
          msg="Don't have an account? "
          redirect="SignUp"
          onClick={() => navigate("/signup")}
        />
      </div>
    </div>
  );
};

export default SignIn;

//196235
