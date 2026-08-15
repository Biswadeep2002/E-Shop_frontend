import { Link } from "react-router-dom";
import {
  FiBox,
  FiDollarSign,
  FiPackage,
  FiShoppingCart,
  FiTrendingUp,
} from "react-icons/fi";
import DashboardOverview from "../dashboard/DashboardOverview";

const sellerStats = [
  {
    title: "Orders",
    amount: 128,
    Icon: FiShoppingCart,
  },
  {
    title: "Revenue",
    amount: 18420,
    Icon: FiDollarSign,
    revenue: true,
  },
  {
    title: "Products",
    amount: 46,
    Icon: FiBox,
  },
  {
    title: "Growth",
    amount: "+18.4%",
    Icon: FiTrendingUp,
  },
];

const recentOrders = [
  { id: "#1042", customer: "Aisha Khan", total: "$240.00", status: "Paid" },
  { id: "#1043", customer: "David Lee", total: "$180.50", status: "Packed" },
  { id: "#1044", customer: "Sara Ali", total: "$320.00", status: "Shipped" },
  { id: "#1045", customer: "Mohammed R.", total: "$155.75", status: "Pending" },
];

const SellerPanel = () => {
  return (
    <div className="space-y-8 pb-10 pt-6">
      <div className="flex flex-col gap-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 p-6 text-white shadow-lg md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-blue-100">Seller panel</p>
          <h1 className="mt-2 text-3xl font-bold">Welcome back, seller</h1>
        </div>
        <div className="flex gap-3">
          <Link
            to="/admin/products"
            className="rounded-md bg-white/15 px-4 py-2 font-semibold text-white transition hover:bg-white/25"
          >
            Manage Products
          </Link>
          <Link
            to="/admin/orders"
            className="rounded-md bg-white px-4 py-2 font-semibold text-indigo-700 transition hover:bg-indigo-50"
          >
            View Orders
          </Link>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {sellerStats.map(({ title, amount, Icon, revenue }) => (
          <div key={title} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <DashboardOverview title={title} amount={amount} Icon={Icon} revenue={revenue} />
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-800">Recent Orders</h2>
            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700">
              Live
            </span>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
              <thead className="bg-slate-50 text-slate-700">
                <tr>
                  <th className="px-4 py-3 font-semibold">Order</th>
                  <th className="px-4 py-3 font-semibold">Customer</th>
                  <th className="px-4 py-3 font-semibold">Total</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-800">{order.id}</td>
                    <td className="px-4 py-3 text-slate-600">{order.customer}</td>
                    <td className="px-4 py-3 text-slate-700">{order.total}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          order.status === "Paid"
                            ? "bg-emerald-100 text-emerald-700"
                            : order.status === "Packed"
                              ? "bg-amber-100 text-amber-700"
                              : order.status === "Shipped"
                                ? "bg-sky-100 text-sky-700"
                                : "bg-slate-200 text-slate-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-xl font-bold text-slate-800">Quick Actions</h3>
            <div className="space-y-3">
              <Link
                to="/admin/products"
                className="flex items-center gap-3 rounded-xl bg-slate-100 px-4 py-3 text-slate-700 transition hover:bg-slate-200"
              >
                <FiPackage className="text-lg" />
                Add new product
              </Link>
              <Link
                to="/admin/orders"
                className="flex items-center gap-3 rounded-xl bg-slate-100 px-4 py-3 text-slate-700 transition hover:bg-slate-200"
              >
                <FiShoppingCart className="text-lg" />
                Review customer orders
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-6 shadow-sm">
            <h3 className="text-xl font-bold text-slate-800">Performance</h3>
            <p className="mt-3 text-sm text-slate-600">
              Your shop is trending up this month. Sales are up 18.4% compared to last month.
            </p>
            <div className="mt-5 h-2.5 w-full overflow-hidden rounded-full bg-emerald-100">
              <div className="h-full w-[78%] rounded-full bg-emerald-500" />
            </div>
            <p className="mt-3 text-right text-sm font-semibold text-emerald-700">78% target reached</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerPanel;
