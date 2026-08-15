import { FaAddressCard } from "react-icons/fa";
import InputField from "../Shared/InputField";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { addUpdateUserAddress } from "../../store/action";
import { useEffect } from "react";

const AddAddressForm = ({address, setOpenAddressModal}) => {

    const dispatch = useDispatch();
    const { btnLoader } = useSelector((state) => state.errors);

    const {
        register,
        reset,
        setValue,
        handleSubmit,
        formState: { errors },
    } =
        useForm({
            mode: "onTouched",
        });

    const onSaveAddressHandler = async (data) => {
        dispatch(addUpdateUserAddress(
            data,
            toast,
            address?.addressId,
            setOpenAddressModal
        ));
    }

    useEffect(() => {
        if(address?.addressId){
            setValue("buildingName",address?.buildingName);
            setValue("street",address?.street);
            setValue("city",address?.city);
            setValue("state",address?.state);
            setValue("pincode",address?.pincode);
            setValue("country",address?.country);
        }
    },[address]);
    return (
        <div className="">
            <form
                onSubmit={handleSubmit(onSaveAddressHandler)}
                className="">
                < div className="flex justify-center items-center mb-4 font-semibold text-2xl text-slate-800 py-2 px-4">
                    <FaAddressCard className="mr-2 text-2xl" />
                    <h1 className="text-slate-800 text-center lg:text-3xl text-2xl font-bold">
                        {!address?.addressId ?
                            "Add Address":
                            "Update Address"
                        }
                    </h1>
                </div>

                <div className="flex flex-col gap-4">
                    <InputField
                        label="Building Name"
                        required
                        id="buildingName"
                        type="text"
                        message="*Building name is required"
                        placeholder="Enter your building name"
                        register={register}
                        errors={errors}
                    />

                    <InputField
                        label="Street"
                        required
                        id="street"
                        type="text"
                        message="*Street is required"
                        placeholder="Enter your street name"
                        register={register}
                        errors={errors}
                    />


                    <InputField
                        label="City"
                        required
                        id="city"
                        type="text"
                        message="*City is required"
                        placeholder="Enter City"
                        register={register}
                        errors={errors}
                    />

                    
                    <InputField
                        label="State"
                        required
                        id="state"
                        type="text"
                        message="*State is required"
                        placeholder="Enter State"
                        register={register}
                        errors={errors}
                    />

                    
                    <InputField
                        label="Pincode"
                        required
                        id="pincode"
                        type="text"
                        message="*Pincode is required"
                        placeholder="Enter your pincode"
                        register={register}
                        errors={errors}
                    />

                    
                    <InputField
                        label="Country"
                        required
                        id="country"
                        type="text"
                        message="*Country is required"
                        placeholder="Enter Country"
                        register={register}
                        errors={errors}
                    />
                </div>

                <button
                    disabled={btnLoader}
                    className="text-white bg-custom-blue px-4 py-2 rounded-md mt-4"
                    type="submit">
                    {btnLoader ?
                        (<>Loading</>

                        ) : (
                            <>Save</>
                        )}
                </button>
            </form>

        </div>

    );
}

export default AddAddressForm;