import { useState } from "react";
import SkeletonAnimation from "../Shared/SkeletonAnimation";
import { FaAddressBook } from 'react-icons/fa';
import AddressInfoModal from "./AddressInfroModal";
import AddAddressForm from "./AddAddressForm";
import { useDispatch, useSelector } from "react-redux";
import AddressList from "./AddressList";
import { DeleteModal } from "./DeleteModal";
import toast from "react-hot-toast";
import { deleteUserAddress } from "../../store/action";

const AddressInfo = ({ address }) => {

    const [openAddressModal, setOpenAddressModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const [selectedAddress, setSelectedAddress] = useState("");
    const dispatch = useDispatch();
    
    const addNewAddressHandler = () => {
        setSelectedAddress("");
        setOpenAddressModal(true);
    };

    const deleteAddressHandler = () => {
        dispatch(deleteUserAddress(
            toast,
            selectedAddress?.addressId,
            setOpenDeleteModal
        ))
    };

    const noAddressExist = !address || address.length === 0;
    const { isLoading, btnLoader } = useSelector((state) => state.errors);

    return (
        <div className="pt-2">
            {noAddressExist ? (
                <div className="mx-auto flex max-w-2xl flex-col items-center justify-center rounded-[24px] border border-dashed border-slate-300 bg-[#f8f4ec]/60 px-6 py-10 text-center">
                    <FaAddressBook size={50} className="mb-4 text-violet-700" />
                    <h1 className="mb-2 text-center text-2xl font-semibold text-slate-900">
                        No address yet
                    </h1>
                    <p className="mb-4 max-w-md text-sm text-slate-600">
                        Add your delivery details so we can prepare your order and move you to payment.
                    </p>
                    <button
                        onClick={addNewAddressHandler}
                        className="cursor-pointer rounded-full bg-violet-600 px-5 py-2.5 font-semibold text-white transition hover:bg-violet-700"
                    >
                        Add address
                    </button>
                </div>
            ) : (
                <div className="mx-auto max-w-2xl rounded-[24px] border border-slate-200/80 bg-white/80 p-5 shadow-sm sm:p-6">
                    <div className="text-center">
                        <h1 className="text-2xl font-semibold text-slate-900">Select your delivery address</h1>
                        <p className="mt-2 text-sm text-slate-600">
                            Pick the address that fits your order best and keep shipping details clear.
                        </p>
                    </div>

                    {isLoading ? (
                        <div className="px-5 py-5">
                            <SkeletonAnimation />
                        </div>
                    ) : (
                        <>
                            <div className="space-y-4 pt-6">
                                <AddressList
                                    address={address}
                                    setSelectedAddress={setSelectedAddress}
                                    setOpenAddressModal={setOpenAddressModal}
                                    setOpenDeleteModal={setOpenDeleteModal}
                                />
                            </div>

                            {address.length > 0 && (
                                <div className="mt-4">
                                    <button
                                        onClick={addNewAddressHandler}
                                        className="cursor-pointer rounded-full bg-violet-600 px-5 py-2.5 font-semibold text-white transition hover:bg-violet-700"
                                    >
                                        Add address
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}

            <AddressInfoModal
                open={openAddressModal}
                setOpen={setOpenAddressModal}>
                <AddAddressForm
                    address={selectedAddress}
                    setOpenAddressModal={setOpenAddressModal} />
            </AddressInfoModal>

            <DeleteModal
            open={openDeleteModal}
            loader={btnLoader}
            setOpen={setOpenDeleteModal}
            title="Delete Address"
            onDeleteHandler={deleteAddressHandler}/>
        </div>
    );
}

export default AddressInfo;