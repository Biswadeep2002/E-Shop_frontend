import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { MdClose } from "react-icons/md";
import { addToCart } from '../../store/action';

function ProductViewModal({ open, setOpen, product, isAvailable }) {
    if (!product) return null;

    const dispatch = useDispatch();
    const { id, productName, image, description, quantity, price, discount, specialPrice } = product;
    const priceValue = Number(price ?? 0);
    const specialValue = Number(specialPrice ?? 0);
    const stockCount = Number(quantity ?? 0);
    const inStock = isAvailable && stockCount > 0;

    const addToCartHandler = () => {
        if (!inStock) return;

        dispatch(addToCart({
            image,
            productName,
            description,
            specialPrice,
            price,
            productId: id,
            quantity,
        }, 1, toast));
    };

    return (
        <Dialog open={open} as="div" className="relative z-[60]" onClose={() => setOpen(false)}>
            <DialogBackdrop className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm" />
            <div className="fixed inset-0 z-[70] overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-3 sm:p-6">
                    <DialogPanel className="relative w-full max-w-5xl overflow-hidden rounded-[28px] bg-white shadow-[0_24px_90px_rgba(15,23,42,0.24)]">
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50"
                            aria-label="Close product preview"
                        >
                            <MdClose className="text-xl" />
                        </button>

                        <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
                            <div className="bg-[linear-gradient(135deg,rgba(250,245,241,0.95),rgba(240,232,224,0.9))] p-4 sm:p-6">
                                {image ? (
                                    <div className="flex min-h-[280px] items-center justify-center overflow-hidden rounded-[24px] border border-white/70 bg-white/80 p-3 shadow-inner sm:min-h-[360px]">
                                        <img
                                            src={image}
                                            alt={productName}
                                            className="h-full max-h-[420px] w-full object-contain"
                                        />
                                    </div>
                                ) : (
                                    <div className="flex min-h-[280px] items-center justify-center rounded-[24px] border border-dashed border-slate-300 bg-white/70 text-sm text-slate-500 sm:min-h-[360px]">
                                        No image available
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col p-6 sm:p-8">
                                <div className="flex flex-wrap items-start justify-between gap-3">
                                    <div>
                                        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-700">
                                            Product preview
                                        </p>
                                        <DialogTitle as="h2" className="mt-2 text-2xl font-semibold leading-tight text-slate-900 sm:text-3xl">
                                            {productName}
                                        </DialogTitle>
                                    </div>
                                </div>

                                <div className="mt-5 flex flex-wrap items-center gap-3">
                                    {specialValue > 0 ? (
                                        <>
                                            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
                                                Special offer
                                            </span>
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-sm text-slate-400 line-through">
                                                    ${priceValue.toFixed(2)}
                                                </span>
                                                <span className="text-3xl font-bold text-slate-900">
                                                    ${specialValue.toFixed(2)}
                                                </span>
                                            </div>
                                        </>
                                    ) : (
                                        <span className="text-3xl font-bold text-slate-900">
                                            ${priceValue.toFixed(2)}
                                        </span>
                                    )}
                                </div>

                                <div className="mt-5 rounded-[22px] border border-slate-200 bg-slate-50 p-4">
                                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                                        Description
                                    </p>
                                    <p className="mt-2 text-sm leading-7 text-slate-600">
                                        {description || 'No additional description is available for this product yet.'}
                                    </p>
                                </div>

                                <div className="mt-6 flex flex-wrap gap-3">
                                    <div className="rounded-full bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700">
                                        Quantity: {stockCount}
                                    </div>
                                    {discount ? (
                                        <div className="rounded-full bg-violet-100 px-3 py-2 text-sm font-medium text-violet-700">
                                            Save {discount}%
                                        </div>
                                    ) : null}
                                </div>

                                <div className="mt-8 flex flex-wrap items-center justify-end gap-3">
                                    <span className={`rounded-full px-3 py-1 text-sm font-semibold ${inStock ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                                        {inStock ? 'In stock' : 'Out of stock'}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={addToCartHandler}
                                        disabled={!inStock}
                                        className={`rounded-full px-5 py-2.5 text-sm font-semibold text-white transition ${!inStock ? 'cursor-not-allowed bg-slate-300' : 'bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:-translate-y-0.5 hover:from-violet-700 hover:to-fuchsia-700'}`}
                                    >
                                        {inStock ? 'Add to cart' : 'Out of stock'}
                                    </button>
                                    <button
                                        onClick={() => setOpen(false)}
                                        type="button"
                                        className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
}

export default ProductViewModal;