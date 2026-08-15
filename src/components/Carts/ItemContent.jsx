import { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import SetQuantity from "./SetQuantity";
import { useDispatch } from "react-redux";
import { decreaseCartQuantity, increaseCartQuantity, removeFromCart } from "../../store/action";
import toast from "react-hot-toast";
import PriceFormat from "../../utils/PriceFormat";

const ItemContent = ({
    productId,
    productName,
    image,
    description,
    quantity,
    price,
    specialPrice,
}) => {
    const [currentQuantity, setCurrentQuantity] = useState(quantity);

    const dispatch = useDispatch();

    const handleQuantityIncrease = (cartItems) => {
        dispatch(increaseCartQuantity(cartItems, toast, currentQuantity, setCurrentQuantity));
    };

    const handleQuantityDecrease = (cartItems) => {
        if (currentQuantity > 1) {
            const newQuantity = currentQuantity - 1;
            setCurrentQuantity(newQuantity);
            dispatch(decreaseCartQuantity(cartItems, newQuantity));
        }
    };

    const removeItemFromCart = (cartItems) => {
        dispatch(removeFromCart(cartItems, toast));
    };

    return (
        <div className="rounded-[24px] border border-slate-200/80 bg-white/85 p-4 shadow-[0_12px_28px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(15,23,42,0.1)]">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex flex-1 flex-col gap-4 sm:flex-row">
                    <div className="h-28 w-full shrink-0 overflow-hidden rounded-[18px] border border-slate-200 bg-slate-100 sm:w-28">
                        <img src={image} alt={productName} className="h-full w-full object-cover" />
                    </div>

                    <div className="flex-1">
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                            <span className="rounded-full bg-violet-50 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-violet-700">
                                Featured item
                            </span>
                            <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-amber-700">
                                In your cart
                            </span>
                        </div>
                        <h3 className="text-base font-semibold text-slate-900">{productName}</h3>
                        <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>

                        <div className="mt-3 flex flex-wrap items-center gap-3">
                            <span className="text-sm font-semibold text-slate-900">
                                {PriceFormat(Number(specialPrice ?? price))}
                            </span>
                            <button
                                onClick={() =>
                                    removeItemFromCart({
                                        image,
                                        productName,
                                        description,
                                        specialPrice,
                                        price,
                                        productId,
                                        quantity,
                                    })
                                }
                                className="flex items-center gap-2 rounded-full border border-rose-600 px-3 py-1.5 text-xs font-semibold text-rose-600 transition-colors duration-200 hover:bg-rose-50"
                            >
                                <HiOutlineTrash size={15} className="text-rose-600" />
                                Remove
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4 lg:min-w-[220px] lg:items-end">
                    <div className="rounded-[18px] bg-[#f8f4ec] px-3 py-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Quantity</p>
                        <div className="mt-2">
                            <SetQuantity
                                quantity={currentQuantity}
                                cardCounter={true}
                                handleQtyIncrease={() =>
                                    handleQuantityIncrease({
                                        image,
                                        productName,
                                        description,
                                        specialPrice,
                                        price,
                                        productId,
                                        quantity,
                                    })
                                }
                                handleQtyDecrease={() =>
                                    handleQuantityDecrease({
                                        image,
                                        productName,
                                        description,
                                        specialPrice,
                                        price,
                                        productId,
                                        quantity,
                                    })
                                }
                            />
                        </div>
                    </div>

                    <div className="text-left lg:text-right">
                        <p className="text-sm text-slate-500">Line total</p>
                        <p className="text-lg font-semibold text-slate-900">
                            {PriceFormat(Number(currentQuantity) * Number(specialPrice ?? price))}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemContent;