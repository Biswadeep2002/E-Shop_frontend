import { MdShoppingCart, MdArrowBack } from "react-icons/md";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ItemContent from "./ItemContent";
import CartEmpty from "./CartEmpty";
import PriceFormat from "../../utils/PriceFormat";

const Cart = () => {
    const { cart } = useSelector((state) => state.carts);

    const newCart = { ...cart };

    newCart.totalPrice = cart?.reduce((acc, cur) => {
        const unitPrice = Number(cur?.specialPrice ?? cur?.price ?? 0);
        const quantity = Number(cur?.quantity ?? 1);
        return acc + unitPrice * quantity;
    }, 0);

    if (!cart || cart.length === 0) return <CartEmpty />;

    const itemCount = cart.reduce((acc, cur) => acc + Number(cur?.quantity ?? 1), 0);
    const shipping = newCart.totalPrice > 100 ? 0 : 12;
    const estimatedTotal = newCart.totalPrice + shipping;

    return (
        <div className="min-h-screen bg-[linear-gradient(135deg,#f8f4ec_0%,#fdfcf8_100%)] px-4 py-8 sm:px-8 lg:px-14">
            <div className="mx-auto max-w-7xl">
                <section className="mb-6 rounded-[28px] border border-slate-200/80 bg-[#f8f4ec]/90 p-6 shadow-[0_14px_34px_rgba(15,23,42,0.08)] sm:p-8">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.35em] text-violet-700">
                                Cart overview
                            </p>
                            <h1 className="flex items-center gap-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
                                <MdShoppingCart size={30} className="text-violet-700" />
                                Your curated basket
                            </h1>
                            <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">
                                Everything you selected is gathered here with a clearer layout, stronger product detail, and a faster checkout path.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <span className="rounded-full bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm">
                                {itemCount} item{itemCount > 1 ? "s" : ""}
                            </span>
                            <span className="rounded-full bg-violet-50 px-3 py-1.5 text-sm font-medium text-violet-700">
                                Free shipping over $100
                            </span>
                        </div>
                    </div>
                </section>

                <div className="grid gap-6 xl:grid-cols-[1.7fr_0.8fr]">
                    <div className="space-y-4">
                        <div className="flex flex-col gap-2 rounded-[22px] border border-slate-200/80 bg-white/80 px-4 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h2 className="text-lg font-semibold text-slate-900">Items in your bag</h2>
                                <p className="text-sm text-slate-500">
                                    Each product is grouped with clearer details so it is easier to review.
                                </p>
                            </div>
                            <span className="text-sm font-medium text-slate-600">{itemCount} selected</span>
                        </div>

                        {cart && cart.length > 0 && cart.map((item, i) => <ItemContent key={i} {...item} />)}
                    </div>

                    <aside className="h-fit rounded-[24px] border border-slate-200/80 bg-white/85 p-5 shadow-[0_14px_34px_rgba(15,23,42,0.08)] backdrop-blur">
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
                            Order summary
                        </p>
                        <div className="mt-4 space-y-3">
                            <div className="flex items-center justify-between text-sm text-slate-600">
                                <span>Subtotal</span>
                                <span className="font-semibold text-slate-900">{PriceFormat(newCart.totalPrice)}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm text-slate-600">
                                <span>Shipping</span>
                                <span className="font-semibold text-slate-900">
                                    {shipping === 0 ? "Free" : PriceFormat(shipping)}
                                </span>
                            </div>
                            <div className="flex items-center justify-between border-t border-slate-200 pt-3 text-base font-semibold text-slate-900">
                                <span>Estimated total</span>
                                <span>{PriceFormat(estimatedTotal)}</span>
                            </div>
                        </div>

                        <Link
                            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-violet-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
                            to="/checkout"
                        >
                            <MdShoppingCart size={18} />
                            Proceed to checkout
                        </Link>

                        <Link
                            className="mt-3 flex items-center justify-center gap-2 text-sm font-medium text-slate-600 transition hover:text-violet-700"
                            to="/products"
                        >
                            <MdArrowBack />
                            Continue shopping
                        </Link>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default Cart;