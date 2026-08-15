import { FormatPriceCalculation } from "../../utils/FormatPriceCalculation";
import PriceFormat from "../../utils/PriceFormat";

const OrderSummary = ({ totalPrice, cart, address, paymentMethod }) => {
  const summaryRows = [
    { label: "Products", value: PriceFormat(totalPrice) },
    { label: "Shipping", value: "Free" },
    { label: "Tax (0%)", value: "$0.00" },
  ];

  return (
    <div className="mx-auto mb-8 max-w-6xl">
      <div className="grid gap-6 lg:grid-cols-[1.45fr_0.55fr]">
        <div className="space-y-4">
          <div className="rounded-[28px] border border-slate-200/80 bg-[#f8f4ec]/80 p-5 shadow-[0_12px_30px_rgba(15,23,42,0.04)] sm:p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-xl font-semibold text-slate-900">Billing address</h2>
              <span className="rounded-full bg-violet-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-700">
                Delivery
              </span>
            </div>

            <div className="grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
              <p><span className="font-semibold text-slate-800">Building:</span> {address?.buildingName}</p>
              <p><span className="font-semibold text-slate-800">City:</span> {address?.city}</p>
              <p><span className="font-semibold text-slate-800">Street:</span> {address?.street}</p>
              <p><span className="font-semibold text-slate-800">State:</span> {address?.state}</p>
              <p><span className="font-semibold text-slate-800">Pincode:</span> {address?.pincode}</p>
              <p><span className="font-semibold text-slate-800">Country:</span> {address?.country}</p>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200/80 bg-white/90 p-5 shadow-[0_8px_20px_rgba(15,23,42,0.04)] sm:p-6">
            <h2 className="mb-4 text-xl font-semibold text-slate-900">Payment method</h2>
            <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-[#f8f4ec]/70 px-4 py-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Selected</p>
                <p className="mt-1 text-base font-semibold text-slate-900">{paymentMethod}</p>
              </div>
              <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                Verified
              </span>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200/80 bg-white/90 p-5 shadow-[0_8px_20px_rgba(15,23,42,0.04)] sm:p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-xl font-semibold text-slate-900">Order items</h2>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                {cart?.length ?? 0} items
              </span>
            </div>

            <div className="space-y-3">
              {cart?.map((item) => (
                <div
                  key={item?.productId}
                  className="flex items-center gap-3 rounded-[20px] border border-slate-200 bg-[#f8f4ec]/70 p-3"
                >
                  <img
                    src={item?.image}
                    alt={item?.productName}
                    className="h-16 w-16 rounded-2xl object-cover ring-1 ring-slate-200"
                  />

                  <div className="min-w-0 flex-1 text-sm text-slate-600">
                    <p className="truncate font-semibold text-slate-900">{item?.productName}</p>
                    <p className="mt-1">
                      {item?.quantity} × {PriceFormat(Number(item?.specialPrice ?? item?.price))}
                    </p>
                    <p className="mt-1 text-xs font-medium text-slate-500">
                      Total: {FormatPriceCalculation(item?.quantity, item?.specialPrice ?? item?.price)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="lg:mt-0">
          <div className="space-y-4 rounded-[28px] border border-slate-200/80 bg-[#fffdfb] p-5 shadow-[0_16px_36px_rgba(15,23,42,0.06)] sm:p-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-violet-700">Summary</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">Order totals</h2>
            </div>

            <div className="space-y-3 text-sm text-slate-600">
              {summaryRows.map((row) => (
                <div key={row.label} className="flex items-center justify-between gap-3">
                  <span>{row.label}</span>
                  <span className="font-medium text-slate-700">{row.value}</span>
                </div>
              ))}
            </div>

            <div className="rounded-2xl bg-[#f8f4ec] p-4">
              <div className="flex items-center justify-between text-base font-semibold text-slate-900">
                <span>Subtotal</span>
                <span>{PriceFormat(totalPrice)}</span>
              </div>
            </div>

            <div className="rounded-2xl border border-violet-200 bg-violet-50 p-3 text-xs text-violet-700">
              Secure checkout with trusted payment protection and order tracking.
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default OrderSummary;
