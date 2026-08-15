import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { FaPersonSkiingNordic } from "react-icons/fa6"
import ProductViewModal from "./ProductViewModal";
import TruncateText from "../../utils/TruncateText";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/action";
import toast from "react-hot-toast";

const ProductCard = ({
    productId,
    productName,
    image,
    description,
    quantity,
    price,
    discount,
    specialPrice }) => {

    const [openProductViewModal, setOpenProductViewModal] = useState(false);
    // const btnLoader = false;
    const [btnLoader, setBtnLoader] = useState(false); // ✅ proper state
    const [selectedViewProduct, setSelectedViewProduct] = useState();
    const isAvailable = quantity != null && Number(quantity) > 0;

    const handleProductView = (product) => {
        setOpenProductViewModal(true);
        setSelectedViewProduct(product);
    }

    const dispatch = useDispatch();

    const addToCartHandler = (cartItems) => {
        dispatch(addToCart(cartItems, 1, toast));
    }

    return (
        <div className="group flex h-full flex-col rounded-[20px] border border-slate-300/70 bg-[#f8f4ec]/90 shadow-[0_14px_34px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(15,23,42,0.12)]">
            <div onClick={() => {
                handleProductView({ id: productId, productName, image, description, quantity, price, discount, specialPrice })
            }}
                className="w-full overflow-hidden aspect-[3/2] bg-slate-100">
                <img
                    className="w-full h-full cursor-pointer object-cover transition-transform duration-500 group-hover:scale-105"
                    src={image} alt={productName} />
            </div>

            <div className="flex flex-1 flex-col p-3.5 sm:p-4">
                <h2 onClick={() => {
                    handleProductView({
                        id: productId, productName, image, description, quantity, price, discount, specialPrice
                    })
                }}
                    className="mb-1.5 cursor-pointer text-[0.95rem] font-semibold text-slate-900">
                    {TruncateText(productName,50)}
                </h2>

                <div className="min-h-14 max-h-14">
                    <p className="text-xs leading-5 text-slate-600">{TruncateText(description,70)}</p>
                </div>

                <div className="mt-auto pt-3">
                    {specialPrice ? (
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-slate-400 line-through">
                                    ${Number(price).toFixed(2)}
                                </span>
                                <span className="rounded-full bg-violet-50 px-2 py-0.5 text-[0.7rem] font-semibold text-violet-700">
                                    Save {discount ? `${discount}%` : "more"}
                                </span>
                            </div>
                            <span className="text-lg font-bold text-slate-800">
                                ${Number(specialPrice).toFixed(2)}
                            </span>
                            <button
                                disabled={!isAvailable || btnLoader}
                                onClick={() => {
                                    addToCartHandler({
                                        image,
                                        productName,
                                        description,
                                        specialPrice,
                                        price,
                                        productId,
                                        quantity,
                                    })
                                }}
                                className={`inline-flex w-full items-center justify-center rounded-full px-3 py-2 text-sm font-semibold text-white transition-all duration-300 ${!isAvailable || btnLoader ? "cursor-not-allowed bg-slate-300" : "cursor-pointer bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700"}`}>
                                <FaShoppingCart className="mr-2" />
                                {isAvailable ? "Add to cart" : "Out of stock"}
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center justify-between gap-3">
                            <span className="text-lg font-bold text-slate-800">
                                {" "}
                                ${Number(price).toFixed(2)}
                            </span>
                            <button
                                disabled={!isAvailable || btnLoader}
                                onClick={() => {
                                    addToCartHandler({
                                        image,
                                        productName,
                                        description,
                                        specialPrice,
                                        price,
                                        productId,
                                        quantity,
                                    })
                                }}
                                className={`inline-flex items-center justify-center rounded-full px-3 py-2 text-sm font-semibold text-white transition-all duration-300 ${!isAvailable || btnLoader ? "cursor-not-allowed bg-slate-300" : "cursor-pointer bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700"}`}>
                                <FaShoppingCart className="mr-2" />
                                {isAvailable ? "Add to cart" : "Out of stock"}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <ProductViewModal
                open={openProductViewModal}
                setOpen={setOpenProductViewModal}
                product={selectedViewProduct}
                isAvailable={isAvailable} />
        </div>
    )
};

export default ProductCard;

