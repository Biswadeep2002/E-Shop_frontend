import { DataGrid } from '@mui/x-data-grid'
import React, { useState } from 'react'
import { FaEdit } from 'react-icons/fa';
import { adminOrderTableColumns } from '../../helper/tableColumns';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Modal from '../../Shared/Modal';
import UpdateOrderForm from './UpdateOrderForm';

const OrderTable = ({ adminOrder, pagination }) => {


    const [updateOpenModal, setUpdateOpenModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState("");
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(
        pagination?.pageNumber + 1 || 1
    );
    const [searchParams] = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const pathname = useLocation().pathname;

    const tableRecords = adminOrder?.map((item) => {
        return {
            id: item.orderId,
            email: item.email,
            totalAmount: item.totalAmount,
            status: item.orderStatus,
            date: item.orderDate,
        }
    });

    const handleEdit = (order) => {
        setSelectedItem(order);
        setUpdateOpenModal(true);
    }

    const handlePaginationChange = (paginationModel) => {
        const page = paginationModel.page + 1;
        setCurrentPage(page);
        params.set("page", page.toString());
        navigate(`${pathname}?${params}`)
    }

    return (
        <div className='max-w-6xl mx-auto'>
            <div className='mb-6 rounded-2xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 p-6 text-white shadow-lg'>
                <p className='text-sm uppercase tracking-[0.2em] text-blue-100'>Orders</p>
                <h1 className='mt-2 text-3xl font-bold'>All Orders</h1>
            </div>

            <div className='overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm'>
                <DataGrid
                    className='w-full'
                    rows={tableRecords}
                    columns={adminOrderTableColumns(handleEdit)}
                    paginationMode='server'
                    rowCount={pagination?.totalElements || 0}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: pagination?.pageSize || 10,
                                page: currentPage - 1,
                            },
                        },
                    }}
                    onPaginationModelChange={handlePaginationChange}
                    disableRowSelectionOnClick
                    disableColumnResize
                    pageSizeOptions={[pagination?.pageSize || 10]}
                    pagination
                    paginationOptions={{
                        showFirstButton: true,
                        showLastButton: true,
                        hideNextButton: currentPage === pagination?.totalPages,
                    }}
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

            <Modal
                open={updateOpenModal}
                setOpen={setUpdateOpenModal}
                title='Update Order Status'>
                <UpdateOrderForm
                    setOpen={setUpdateOpenModal}
                    open={updateOpenModal}
                    loader={loader}
                    setLoader={setLoader}
                    selectedId={selectedItem.id}
                    selectedItem={selectedItem}
                />
            </Modal>

        </div>
    )
}

export default OrderTable;
