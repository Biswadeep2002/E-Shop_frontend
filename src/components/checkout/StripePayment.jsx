import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PaymentForm from './PaymentForm';
import { createStripePaymentSecret } from '../../store/action';
import SkeletonAnimation from '../Shared/SkeletonAnimation';
import { current } from '@reduxjs/toolkit';
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const StripePayment = () => {

  const dispatch = useDispatch();
  const { clientSecret } = useSelector((state) => state.auth);
  const { totalPrice } = useSelector((state) => state.carts);
  const { cart } = useSelector((state) => state.carts);

  const calculatedTotal = cart.reduce((acc, item) => {
    const price = Number(item.specialPrice ?? item.price ?? 0);
    const qty = Number(item.quantity ?? 1);

    return acc + price * qty;
  }, 0);
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const { user, selectedUserCheckoutAddress } = useSelector((state) => state.auth);


  useEffect(() => {
    if (!clientSecret) {
      const sendData = {
        // amount: Number(totalPrice) * 100,
        amount: Math.round(calculatedTotal * 100),
        currency: "usd",
        email: user.email,
        name: `${user.username}`,
        address: selectedUserCheckoutAddress,
        description: `Order for ${user.email}`,
        metadata: {
          test: "1"
        }
      }
    

      dispatch(createStripePaymentSecret(sendData));
    }
  }, [clientSecret]);

  if (isLoading) {
    return (
      <div className='max-w-lg mx-auto'>
        <SkeletonAnimation />
      </div>
    )
  }

  return (
    <>
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentForm clientSecret={clientSecret} totalPrice={calculatedTotal} />
        </Elements>
      )}
    </>
  )
};

export default StripePayment;
