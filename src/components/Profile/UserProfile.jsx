import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle, FaEnvelope, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getUserAddressess } from "../../store/action";
import AddressInfoModal from "../checkout/AddressInfroModal";
import AddAddressForm from "../checkout/AddAddressForm";
import Loader from "../Shared/Loader";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { user, address } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.errors);
  const [openAddressModal, setOpenAddressModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    dispatch(getUserAddressess());
  }, [dispatch]);

  const addNewAddressHandler = () => {
    setSelectedAddress(null);
    setOpenAddressModal(true);
  };

  return (
    <div className="pb-6 pt-20 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden ring-1 ring-slate-200">
          <div className="bg-custom-gradient p-10 text-white text-center">
            <FaUserCircle className="mx-auto text-[82px] mb-6" />
            <h1 className="text-4xl font-bold tracking-tight">{user?.username || "Profile"}</h1>
          </div>

          <div className="p-8 space-y-8">
            <div className="rounded-3xl border border-slate-200 p-6 shadow-sm bg-slate-50">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Quick Actions</h2>
              <div className="space-y-4 md:flex md:items-center md:gap-4 md:space-y-0">
                <Link
                  to="/profile/orders"
                  className="block w-full rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white text-center transition hover:bg-slate-800 md:w-1/2"
                >
                  View My Orders
                </Link>
                <Link
                  to="/products"
                  className="block w-full rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 text-center transition hover:bg-slate-100 md:w-1/2"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 p-6 shadow-sm bg-slate-50">
              <div className="flex items-center justify-between gap-4 mb-4">
                <h2 className="text-xl font-semibold text-slate-900">Saved Addresses</h2>
                <button
                  onClick={addNewAddressHandler}
                  className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Add Address
                </button>
              </div>
              {isLoading ? (
                <div className="py-10">
                  <Loader text="Loading saved addresses..." />
                </div>
              ) : address?.length > 0 ? (
                <div className="space-y-4">
                  {address.map((item) => (
                    <div key={item.addressId || item.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-slate-900 font-semibold mb-2">{item.buildingName || item.street || "Address"}</p>
                          <p className="text-slate-600 text-sm">{item.street}</p>
                          <p className="text-slate-600 text-sm">{item.city}, {item.state}</p>
                          <p className="text-slate-600 text-sm">{item.pincode}</p>
                          <p className="text-slate-600 text-sm">{item.country}</p>
                        </div>
                        <button
                          onClick={() => {
                            setSelectedAddress(item);
                            setOpenAddressModal(true);
                          }}
                          className="inline-flex items-center rounded-2xl border border-slate-300 bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-200"
                        >
                          <FaEdit className="mr-2" />
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-slate-600">
                  <p className="font-semibold mb-3">No addresses saved yet.</p>
                  <button
                    onClick={addNewAddressHandler}
                    className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    Add Address
                  </button>
                </div>
              )}
            </div>

            <div className="rounded-3xl border border-slate-200 p-6 shadow-sm bg-slate-50">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">About Your Profile</h2>
              <p className="text-slate-600 leading-7">
                This page shows your account information and gives you quick access to your order history. Your profile is protected by login, so only you can view it.
              </p>
            </div>
          </div>
        </div>
      </div>

      <AddressInfoModal open={openAddressModal} setOpen={setOpenAddressModal}>
        <AddAddressForm address={selectedAddress} setOpenAddressModal={setOpenAddressModal} />
      </AddressInfoModal>
    </div>
  );
};

export default UserProfile;
