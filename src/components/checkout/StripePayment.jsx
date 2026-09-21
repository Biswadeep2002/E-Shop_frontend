import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PaymentForm from './PaymentForm';
import { createStripePaymentSecret } from '../../store/action';
import SkeletonAnimation from '../Shared/SkeletonAnimation';

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);

const StripePayment = () => {
  const dispatch = useDispatch();

  const { clientSecret } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.carts);
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const { user, selectedUserCheckoutAddress } = useSelector(
    (state) => state.auth
  );

  const calculatedTotal = cart.reduce((acc, item) => {
    const price = Number(item.specialPrice ?? item.price ?? 0);
    const qty = Number(item.quantity ?? 1);

    return acc + price * qty;
  }, 0);

  useEffect(() => {
    if (!clientSecret) {
      const sendData = {
        amount: Math.round(calculatedTotal * 100),
        currency: 'usd',
        email: user.email,
        name: `${user.username}`,
        address: selectedUserCheckoutAddress,
        description: `Order for ${user.email}`,
        metadata: {
          test: '1',
        },
      };

      dispatch(createStripePaymentSecret(sendData));
    }
  }, [clientSecret]);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-lg">
        <SkeletonAnimation />
      </div>
    );
  }

  return (
    <>
      {clientSecret && (
        <Elements
          stripe={stripePromise}
          options={{ clientSecret }}
        >
          <div className="mx-auto max-w-2xl">

            <div className="mb-6 rounded-2xl border border-violet-200 bg-violet-50 px-5 py-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-lg shadow-sm">
                  🔒
                </div>

                <div>
                  <h2 className="font-semibold text-slate-900">
                    Secure Payment
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Put "4242 4242 4242 4242" as the Card number and any FUTURE DATE as the Expiration date for demo payment.
                  </p>
                </div>
              </div>
            </div>

            <PaymentForm
              clientSecret={clientSecret}
              totalPrice={calculatedTotal}
            />

          </div>
        </Elements>
      )}
    </>
  );
};

export default StripePayment;