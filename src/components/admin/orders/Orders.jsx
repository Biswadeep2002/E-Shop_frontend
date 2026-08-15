import React from 'react'

import { FaShoppingCart } from 'react-icons/fa'
import OrderTable from './OrderTable'
import { useSelector } from 'react-redux'
import useOrderFilter from '../../../hooks/useOrderFilter'
import Loader from '../../Shared/Loader'
import ErrorPage from '../../Shared/ErrorPage'

const Orders = () => {

  const { adminOrder, pagination } = useSelector((state) => state.order);
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  useOrderFilter();

  const emptyOrder = !adminOrder || adminOrder.length === 0;

  if (isLoading) {
    return (
      <div className='pb-6 pt-20'>
        <Loader text='Loading orders...' />
      </div>
    )
  }

  if (errorMessage) {
    return (
      <div className='pb-6 pt-20'>
        <ErrorPage message={errorMessage} />
      </div>
    )
  }

  return (
    <div className='pb-6 pt-20'>
      {emptyOrder ? (
        <div className='flex flex-col items-center justify-center text-gray-600 py-10'>
          <FaShoppingCart size={50} className='mb-3' />
          <h2 className='text-2xl font-semibold'>No Orders Placed Yet</h2>
        </div>
      ) : (
        <div>
          <OrderTable adminOrder={adminOrder} pagination={pagination} />
        </div>
      )}
    </div>
  )
}

export default Orders

