import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { FaShoppingCart } from "react-icons/fa";
import { getUserOrders } from "../../store/action";
import Loader from "../Shared/Loader";
import ErrorPage from "../Shared/ErrorPage";

const UserOrders = () => {
  const dispatch = useDispatch();
  const { userOrders, ordersLoading, ordersError } = useSelector((state) => state.order);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  const emptyOrder = !ordersLoading && (!userOrders || userOrders.length === 0);

  const rows = useMemo(
    () =>
      userOrders?.map((item, index) => ({
        id: item.orderId || index + 1,
        orderId: item.orderId || "N/A",
        email: item.email || "-",
        totalAmount: item.totalAmount ?? item.totalPrice ?? "-",
        status: item.orderStatus || item.status || "-",
        date: item.orderDate || item.createdAt || "-",
      })) || [],
    [userOrders]
  );

  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      flex: 1,
      minWidth: 180,
      headerClassName: "text-black font-semibold border",
      cellClassName: "text-slate-700 font-normal border",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      minWidth: 220,
      headerClassName: "text-black font-semibold border",
      cellClassName: "text-slate-700 font-normal border",
    },
    {
      field: "totalAmount",
      headerName: "Total Amount",
      flex: 1,
      minWidth: 170,
      headerClassName: "text-black font-semibold border",
      cellClassName: "text-slate-700 font-normal border",
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 170,
      headerClassName: "text-black font-semibold border",
      cellClassName: "text-slate-700 font-normal border",
      renderCell: (params) => (
        <span
          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
            params.value === "DELIVERED" || params.value === "PAID" || params.value === "COMPLETED"
              ? "bg-emerald-100 text-emerald-700"
              : params.value === "PENDING" || params.value === "PROCESSING"
              ? "bg-amber-100 text-amber-700"
              : params.value === "SHIPPED"
              ? "bg-sky-100 text-sky-700"
              : "bg-slate-200 text-slate-700"
          }`}
        >
          {params.value}
        </span>
      ),
    },
    {
      field: "date",
      headerName: "Order Date",
      flex: 1,
      minWidth: 180,
      headerClassName: "text-black font-semibold border",
      cellClassName: "text-slate-700 font-normal border",
    },
  ];

  if (ordersLoading) {
    return (
      <div className="pb-6 pt-20 px-4 md:px-8">
        <Loader text="Fetching your orders..." />
      </div>
    );
  }

  if (ordersError) {
    return (
      <div className="pb-6 pt-20 px-4 md:px-8">
        <ErrorPage message={ordersError} />
      </div>
    );
  }

  return (
    <div className="pb-6 pt-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 rounded-2xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 p-6 text-white shadow-lg">
          <p className="text-sm uppercase tracking-[0.2em] text-blue-100">Profile</p>
          <h1 className="mt-2 text-3xl font-bold">My Orders</h1>
        </div>

        {emptyOrder ? (
          <div className="flex flex-col items-center justify-center text-gray-600 py-24 rounded-2xl border border-slate-200 bg-white shadow-sm">
            <FaShoppingCart size={50} className="mb-3" />
            <h2 className="text-2xl font-semibold">No orders found</h2>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <DataGrid
              className="w-full"
              rows={rows}
              columns={columns}
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              rowsPerPageOptions={[5, 10, 20]}
              autoHeight
              disableSelectionOnClick
              disableColumnResize
              hideFooterSelectedRowCount
              sx={{
                border: 0,
                '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: '#f8fafc',
                  color: '#0f172a',
                  fontWeight: 700,
                },
                '& .MuiDataGrid-cell': {
                  borderColor: '#e2e8f0',
                },
                '& .MuiDataGrid-row:hover': {
                  backgroundColor: '#f8fafc',
                },
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserOrders;
