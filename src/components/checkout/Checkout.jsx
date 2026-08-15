import { Button, Step, StepLabel, Stepper } from '@mui/material';
import { useEffect, useState } from 'react';
import AddressInfo from './AddressInfo';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAddressess, getUserCart } from '../../store/action';
import toast from 'react-hot-toast';
import SkeletonAnimation from '../Shared/SkeletonAnimation';
import ErrorPage from '../Shared/ErrorPage';
import PaymentMethod from './PaymentMethod';
import OrderSummary from './OrderSummary';
import StripePayment from './StripePayment';
import PaypalPayment from './PaypalPayment';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const { cart, totalPrice } = useSelector((state) => state.carts);

  const { address, selectedUserCheckoutAddress } = useSelector((state) => state.auth);
  const { paymentMethod } = useSelector((state) => state.payment);

  const [activeStep, setActiveStep] = useState(0);
  const [showPaypalModal, setShowPaypalModal] = useState(false);

  const calculatedTotal = cart.reduce(
    (acc, item) =>
      acc +
      Number(item.specialPrice ?? item.price) *
      Number(item.quantity),
    0
  );

  const handleBack = () => {
    if (activeStep === 0) {
      navigate('/cart');
      return;
    }

    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleNext = () => {
    if (activeStep === 0 && !selectedUserCheckoutAddress) {
      toast.error('Please select checkout address before proceeding');
      return;
    }

    if (activeStep === 1 && (!selectedUserCheckoutAddress || !paymentMethod)) {
      toast.error('Please select a payment method before proceeding');
      return;
    }

    setActiveStep((prevStep) => prevStep + 1);
  };

  const steps = ['Address', 'Payment Method', 'Order Summary', 'Payment'];

  useEffect(() => {
    dispatch(getUserAddressess());
    // dispatch(getUserCart());
  }, [dispatch]);

  useEffect(() => {
    if (
      activeStep === 3 &&
      paymentMethod &&
      paymentMethod !== "Stripe"
    ) {
      setShowPaypalModal(true);
    }
  }, [activeStep, paymentMethod]);

  const entireState = useSelector(state => state);

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#f8f4ec_0%,#fdfcf8_100%)] px-4 py-8 sm:px-8 lg:px-14">
      <div className="mx-auto max-w-7xl">
        <section className="mb-6 rounded-[28px] border border-slate-200/80 bg-[#f8f4ec]/90 p-6 shadow-[0_14px_34px_rgba(15,23,42,0.08)] sm:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.35em] text-violet-700">
                Secure checkout
              </p>
              <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
                Finish your order with confidence
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">
                Review your delivery details, choose how you want to pay, and confirm every item before you place the order.
              </p>
            </div>

            <div className="rounded-full bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm">
              {steps[activeStep]} step
            </div>
          </div>
        </section>

        <div className="mb-6 rounded-3xl border border-slate-200/80 bg-white/85 p-4 shadow-sm sm:p-5">
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => (
              <Step key={index}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>

        <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-4 shadow-[0_14px_34px_rgba(15,23,42,0.08)] sm:p-6">
          {isLoading ? (
            <div className="mx-auto py-5 lg:w-[80%]">
              <SkeletonAnimation />
            </div>
          ) : (
            <div className="mt-2">
              {activeStep === 0 && <AddressInfo address={address} />}
              {activeStep === 1 && <PaymentMethod />}
              {activeStep === 2 && (

                <OrderSummary
                  totalPrice={calculatedTotal}
                  cart={cart}
                  address={selectedUserCheckoutAddress}
                  paymentMethod={paymentMethod}
                />
              )}
              {activeStep === 3 && (
                <>
                  <StripePayment />

                  {paymentMethod !== "Stripe" && showPaypalModal && (
                    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60">
                      <div className="w-[90%] max-w-md rounded-2xl bg-white p-6 shadow-xl">
                        <h2 className="mb-3 text-xl font-bold text-slate-900">
                          PayPal Unavailable
                        </h2>

                        <p className="mb-5 text-slate-600">
                          PayPal payments are currently unavailable.
                          Please continue using Stripe for checkout.
                        </p>

                        <div className="flex justify-end gap-3">
                          <button
                            className="rounded-lg border px-4 py-2"
                            onClick={() => setShowPaypalModal(false)}
                          >
                            Cancel
                          </button>

                          <button
                            className="rounded-lg bg-black px-4 py-2 text-white"
                            onClick={() => {
                              setShowPaypalModal(false);
                            }}
                          >
                            Continue with Stripe
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 z-50 w-full px-4 py-3 sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-3xl border border-slate-200/80 bg-[rgba(248,244,236,0.95)] px-3 py-2 shadow-[0_10px_24px_rgba(15,23,42,0.08)]">
          <Button
            variant="text"
            onClick={handleBack}
            className="rounded-full! px-4! py-2! font-semibold! normal-case! text-slate-700!"
          >
            Back
          </Button>

          {activeStep !== steps.length - 1 && (
            <button
              disabled={
                errorMessage ||
                (activeStep === 0 ? !selectedUserCheckoutAddress : activeStep === 1 ? !paymentMethod : false)
              }
              className={`rounded-full px-5 py-2.5 font-semibold text-slate-900 transition ${errorMessage ||
                (activeStep === 0 && !selectedUserCheckoutAddress) ||
                (activeStep === 1 && !paymentMethod)
                ? 'cursor-not-allowed bg-slate-200 text-slate-500'
                : 'bg-white hover:bg-[#efe7d8]'
                }`}
              onClick={handleNext}
            >
              Proceed
            </button>
          )}
        </div>
      </div>

      {errorMessage && <ErrorPage message={errorMessage} />}
    </div>
  );
};

export default Checkout;