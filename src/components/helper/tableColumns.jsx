import { FaEdit, FaEye, FaImage, FaTrashAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";


export const adminProductTableColumns = (
    handleEdit,
    handleDelete,
    handleImageUpload,
    handleProductView
) => [
        {
            sortable: false,
            disableColumnMenu: true,
            field: "id",
            headerName: "ID",
            minWidth: 180,
            headerAlign: "center",
            editable: false,
            headerClassName: "text-black font-semibold border",
            cellClassName: "text-slate-700 font-normal border",
            renderHeader: (params) => <span className='text-center'> Product ID </span>
        },
        {
            sortable: false,
            disableColumnMenu: true,
            field: "productName",
            headerName: "Product Name",
            minWidth: 250,
            headerAlign: "center",
            editable: false,
            headerClassName: "text-black font-semibold border",
            cellClassName: "text-slate-700 font-normal border",
            renderHeader: (params) => <span className='text-center'> Product Name </span>
        },
        {
            sortable: true,
            disableColumnMenu: true,
            field: "price",
            headerName: "Price",
            minWidth: 200,
            headerAlign: "center",
            editable: false,
            headerClassName: "text-black font-semibold border",
            cellClassName: "text-slate-700 font-normal border",
            renderHeader: (params) => <span className='text-center'> Price </span>
        },
        {
            sortable: false,
            disableColumnMenu: true,
            field: "quantity",
            headerName: "Quantity",
            minWidth: 200,
            headerAlign: "center",
            editable: false,
            headerClassName: "text-black font-semibold border",
            cellClassName: "text-slate-700 font-normal border",
            renderHeader: (params) => <span className='text-center'> Quantity </span>
        },
        {
            sortable: false,
            disableColumnMenu: true,
            field: "specialPrice",
            headerName: "Price",
            minWidth: 200,
            headerAlign: "center",
            editable: false,
            headerClassName: "text-black font-semibold border",
            cellClassName: "text-slate-700 font-normal border",
            renderHeader: (params) => <span className='text-center'> Special Price </span>
        },
        {
            sortable: false,
            disableColumnMenu: true,
            field: "description",
            headerName: "Description",
            minWidth: 200,
            headerAlign: "center",
            editable: false,
            headerClassName: "text-black font-semibold border",
            cellClassName: "text-slate-700 font-normal border",
            renderHeader: (params) => <span className='text-center'> Description </span>
        },
        {
            sortable: false,
            disableColumnMenu: true,
            field: "image",
            headerName: "Image",
            minWidth: 200,
            headerAlign: "center",
            editable: false,
            headerClassName: "text-black font-semibold border",
            cellClassName: "text-slate-700 font-normal border",
            renderHeader: (params) => <span className='text-center'> Image </span>
        },
        {
            sortable: false,
            disableColumnMenu: true,
            field: "action",
            headerName: "Action",
            width: 400,
            headerAlign: "center",
            editable: false,
            headerClassName: "text-black font-semibold border",
            cellClassName: "text-slate-700 font-normal border",
            renderHeader: (params) => <span className='text-center'> Action </span>,
            renderCell: (params) => {
                return (
                    <div className='flex justify-center items-center space-x-2 h-full pt-2'>
                        {/* <button
                        onClick={() => handleEdit(params.row)} 
                        className='flex items-center bg-blue-500 text-white px-4 h-9 rounded-md'>
                            <FaEdit className='mr-2'/>
                        </button> */}

                        <button
                            onClick={() => handleImageUpload(params.row)}
                            className="flex items-center bg-green-500 hover:bg-green-600 text-white px-4 h-9 rounded-md"
                        >
                            <FaImage className="mr-2" />
                            Image
                        </button>
                        <button
                            onClick={() => handleEdit(params.row)}
                            className="flex items-center bg-blue-500 text-white px-4 h-9 rounded-md "
                        >
                            <FaEdit className="mr-2" />
                            Edit
                        </button>

                        <button
                            onClick={() => handleDelete(params.row)}
                            className="flex items-center bg-red-500 text-white px-4   h-9 rounded-md"
                        >
                            <FaTrashAlt className="mr-2" />
                            Delete
                        </button>
                        <button
                            onClick={() => handleProductView(params.row)}
                            className="flex items-center bg-slate-800 text-white px-4   h-9 rounded-md"
                        >
                            <FaEye className="mr-2" />
                            View
                        </button>
                    </div>
                );
            },
        },
    ];



export const adminOrderTableColumns = (handleEdit) => [
    {
        sortable: false,
        disableColumnMenu: true,
        field: "id",
        headerName: "orderId",
        minWidth: 180,
        headerAlign: "center",
        editable: false,
        headerClassName: "text-black font-semibold border",
        cellClassName: "text-slate-700 font-normal border",
        renderHeader: (params) => <span className='text-center'> Order ID </span>
    },
    {
        sortable: false,
        disableColumnMenu: true,
        field: "email",
        headerName: "Email",
        minWidth: 250,
        headerAlign: "center",
        editable: false,
        headerClassName: "text-black font-semibold border",
        cellClassName: "text-slate-700 font-normal border",
        renderHeader: (params) => <span className='text-center'> Email </span>
    },
    {
        sortable: true,
        disableColumnMenu: true,
        field: "totalAmount",
        headerName: "Total Amount",
        minWidth: 200,
        headerAlign: "center",
        editable: false,
        headerClassName: "text-black font-semibold border",
        cellClassName: "text-slate-700 font-normal border",
        renderHeader: (params) => <span className='text-center'> Total Amount </span>
    },
    {
        sortable: false,
        disableColumnMenu: true,
        field: "status",
        headerName: "OrderStatus",
        minWidth: 200,
        headerAlign: "center",
        editable: false,
        headerClassName: "text-black font-semibold border",
        cellClassName: "text-slate-700 font-normal border",
        renderHeader: (params) => <span className='text-center'> Status </span>,
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
        )
    },
    {
        sortable: false,
        disableColumnMenu: true,
        field: "date",
        headerName: "Order Date",
        minWidth: 200,
        headerAlign: "center",
        editable: false,
        headerClassName: "text-black font-semibold border",
        cellClassName: "text-slate-700 font-normal border",
        renderHeader: (params) => <span className='text-center'> Order Date </span>
    },
    {
        sortable: false,
        disableColumnMenu: true,
        field: "action",
        headerName: "Action",
        minWidth: 250,
        headerAlign: "center",
        editable: false,
        headerClassName: "text-black font-semibold border",
        cellClassName: "text-slate-700 font-normal border",
        renderHeader: (params) => <span className='text-center'> Action </span>,
        renderCell: (params) => {
            return (
                <div className='flex justify-center items-center space-x-2 h-full pt-2'>
                    <button
                        onClick={() => handleEdit(params.row)}
                        className='flex items-center bg-blue-500 text-white px-4 h-9 rounded-md'>
                        <FaEdit className='mr-2' />
                    </button>
                </div>
            );
        },
    },
];



//table column for categories in admin panel
export const categoryTableColumns = (handleEdit, handleDelete) => [
  {
    sortable: false,
    disableColumnMenu: true,
    field: "id",
    headerName: "CategoryId",
    minWidth: 300,
    headerAlign: "center",
    align: "center",
    editable: false,
    headerClassName: "text-black font-semibold border",
    cellClassName: "text-slate-700 font-normal border",
    renderHeader: (params) => <span className="text-center">CategoryId</span>,
  },
  {
    disableColumnMenu: true,
    field: "categoryName",
    headerName: "Category Name",
    align: "center",
    width: 400,
    editable: false,
    sortable: false,
    headerAlign: "center",
    headerClassName: "text-black font-semibold text-center border ",
    cellClassName: "text-slate-700 font-normal border text-center",
    renderHeader: (params) => <span>Category Name</span>,
  },

  {
    field: "action",
    headerName: "Action",
    headerAlign: "center",
    editable: false,
    headerClassName: "text-black font-semibold text-center",
    cellClassName: "text-slate-700 font-normal",
    sortable: false,
    width: 400,
    renderHeader: (params) => <span>Action</span>,
    renderCell: (params) => {
      return (
        <div className="flex justify-center space-x-2 h-full pt-2">
          <button
            onClick={() => handleEdit(params.row)}
            className="flex items-center bg-blue-500 text-white px-4 h-9 rounded-md "
          >
            <FaEdit className="mr-2" />
            Edit
          </button>

          {/* Delete Button */}
          <button
            onClick={() => handleDelete(params.row)}
            className="flex items-center bg-red-500 text-white px-4   h-9 rounded-md"
          >
            <FaTrashAlt className="mr-2" />
            Delete
          </button>
        </div>
      );
    },
  },
];


//table column for seller in admin panel
export const sellerTableColumns = [
  {
    disableColumnMenu: true,
    field: "id",
    headerName: "ID",
    minWidth: 400,
    headerAlign: "center",
    align: "center",
    editable: false,

    headerClassName: "text-black font-semibold border",
    cellClassName: "text-slate-700 font-normal border",
    renderHeader: (params) => <span className="text-center">SellerID</span>,
  },
  {
    disableColumnMenu: true,
    field: "username",
    headerName: "UserName",
    minWidth: 400,
    headerAlign: "center",
    align: "center",
    editable: false,
    sortable: false,
    headerClassName: "text-black font-semibold border",
    cellClassName: "text-slate-700 font-normal border",
    renderHeader: (params) => <span className="text-center">UserName</span>,
  },
  {
    disableColumnMenu: true,
    field: "email",
    headerName: "Email",
    align: "center",
    width: 400,
    editable: false,
    sortable: false,
    headerAlign: "center",
    headerClassName: "text-black font-semibold text-center border ",
    cellClassName: "text-slate-700 font-normal border text-center",
    renderHeader: (params) => <span>Email</span>,
    renderCell: (params) => {
      return (
        <div className="flex items-center justify-center gap-1">
          <span>
            <MdOutlineEmail className="text-slate-700 text-lg" />
          </span>
          <span>{params?.row?.email}</span>
        </div>
      );
    },
  },
];
