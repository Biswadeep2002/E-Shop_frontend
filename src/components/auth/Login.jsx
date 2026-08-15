import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineLogin } from "react-icons/ai";
import InputField from "../Shared/InputField";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { authenticateSignedInUser } from "../../store/action";
import toast from "react-hot-toast";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onTouched",
    });

    const loginHandler = async (data) => {
        console.log("Login Click");
        dispatch(
            authenticateSignedInUser(
                data,
                toast,
                reset,
                navigate,
                setLoader
            )
        );
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex justify-center items-center px-4">
            <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">

                {/* Admin Demo Card */}
                <div className="hidden lg:block">
                    <div className="rounded-2xl border border-purple-200 bg-purple-50 p-6 shadow-lg">
                        <p className="text-xs uppercase tracking-widest text-purple-600 mb-2">
                            Demo Credentials
                        </p>

                        <h2 className="text-2xl font-bold text-purple-700 mb-3">
                            Admin Account
                        </h2>

                        <p className="text-sm text-slate-600 mb-5">
                            Use this account to explore admin functionality such as:
                        </p>

                        <ul className="list-disc list-inside text-sm text-slate-700 space-y-1 mb-5">
                            <li>Analytics Dashboard</li>
                            <li>Order Management</li>
                            <li>Product Management</li>
                            <li>Category Management</li>
                            <li>User Administration</li>
                        </ul>

                        <div className="bg-white rounded-lg p-4 border">
                            <p className="mb-2">
                                <span className="font-semibold">Username:</span>{" "}
                                admin
                            </p>

                            <p>
                                <span className="font-semibold">Password:</span>{" "}
                                admin123
                            </p>
                        </div>
                    </div>
                </div>

                {/* Login Form */}
                <div className="flex justify-center">
                    <form
                        onSubmit={handleSubmit(loginHandler)}
                        className="sm:w-[450px] w-full shadow-custom py-8 sm:px-8 px-4 rounded-md bg-white"
                    >
                        <div className="flex flex-col items-center justify-center space-y-4">
                            <AiOutlineLogin className="text-slate-800 text-5xl" />

                            <h1 className="text-slate-800 text-center lg:text-3xl text-2xl font-bold">
                                Login Here
                            </h1>
                        </div>

                        <hr className="mt-2 mb-5 text-black" />

                        <div className="flex flex-col gap-3">
                            <InputField
                                label="Username"
                                required
                                id="username"
                                type="text"
                                message="*Username is required"
                                placeholder="Enter your username"
                                register={register}
                                errors={errors}
                            />

                            <InputField
                                label="Password"
                                required
                                id="password"
                                type="password"
                                message="*Password is required"
                                placeholder="Enter your password"
                                register={register}
                                errors={errors}
                            />
                        </div>

                        <button
                            className="bg-button-gradient flex gap-2 items-center justify-center font-semibold text-white w-full py-2 hover:text-slate-200 transition-colors duration-100 rounded-sm my-3"
                            type="submit"
                        >
                            {loader ? <>Loading</> : <>Login</>}
                        </button>

                        <p className="text-center text-sm text-slate-700 mt-6">
                            Don't have an account?{" "}
                            <Link
                                className="font-semibold underline hover:text-black"
                                to="/register"
                            >
                                <span>Sign up</span>
                            </Link>
                        </p>
                    </form>
                </div>

                {/* Seller Demo Card */}
                <div className="hidden lg:block">
                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 shadow-lg">
                        <p className="text-xs uppercase tracking-widest text-emerald-600 mb-2">
                            Demo Credentials
                        </p>

                        <h2 className="text-2xl font-bold text-emerald-700 mb-3">
                            Seller Account
                        </h2>

                        <p className="text-sm text-slate-600 mb-5">
                            Use this account to explore seller functionality such as:
                        </p>

                        <ul className="list-disc list-inside text-sm text-slate-700 space-y-1 mb-5">
                            <li>Add Products</li>
                            <li>Update Inventory</li>
                            <li>Manage Orders</li>
                            <li>View Product Listings</li>
                            <li>Track Sales</li>
                        </ul>

                        <div className="bg-white rounded-lg p-4 border">
                            <p className="mb-2">
                                <span className="font-semibold">Username:</span>{" "}
                                seller
                            </p>

                            <p>
                                <span className="font-semibold">Password:</span>{" "}
                                seller123
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Login;