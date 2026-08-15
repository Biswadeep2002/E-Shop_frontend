import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PaymentForm from './PaymentForm';
import { createStripePaymentSecret } from '../../store/action';
import SkeletonAnimation from '../Shared/SkeletonAnimation';
import { current } from '@reduxjs/toolkit';
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);


const PaypalPayment = () => {const dispatch = useDispatch();


return (
    <>
       Paypal
    </>
);
};

export default PaypalPayment 































