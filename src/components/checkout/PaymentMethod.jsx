import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaCreditCard, FaPaypal } from 'react-icons/fa';
import { addPaymentMethod, createUserCart } from '../../store/action';

const paymentOptions = [
  {
    value: 'Stripe',
    label: 'Stripe',
    description: 'Card payments with secure encrypted checkout.',
    icon: <FaCreditCard className="text-lg text-slate-700" />,
  },
  {
    value: 'Paypal',
    label: 'PayPal',
    description: 'Use your PayPal account for a fast checkout.',
    icon: <FaPaypal className="text-lg text-sky-600" />,
  },
];

const PaymentMethod = () => {
  const dispatch = useDispatch();
  const { paymentMethod } = useSelector((state) => state.payment);
  const { cart, cartId } = useSelector((state) => state.carts);
  const { errorMessage } = useSelector((state) => state.errors);

  useEffect(() => {
    if (cart.length > 0 && !cartId && !errorMessage) {
      const sendCartItems = cart.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      }));

      dispatch(createUserCart(sendCartItems));
    }
  }, [dispatch, cart, cartId, errorMessage]);

  const paymentMethodHandler = (method) => {
    dispatch(addPaymentMethod(method));
  };

  return (
    <div className="mx-auto max-w-2xl rounded-[30px] border border-slate-200/80 bg-white/90 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.05)] sm:p-8">
      <div className="mb-6 text-center">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-violet-700">
          Payment
        </p>
        <h1 className="text-3xl font-semibold text-slate-900">Select payment method</h1>
        <p className="mt-2 text-sm text-slate-600">
          Choose the option that fits your checkout experience best.
        </p>
      </div>

      <div className="rounded-[24px] border border-slate-200 bg-[#f8f4ec]/70 p-3 sm:p-4">
        <FormControl fullWidth>
          <RadioGroup
            aria-label="payment method"
            name="payment method"
            value={paymentMethod}
            onChange={(e) => paymentMethodHandler(e.target.value)}
          >
            {paymentOptions.map(({ value, label, description, icon }) => {
              const selected = paymentMethod === value;

              return (
                <FormControlLabel
                  key={value}
                  value={value}
                  sx={{
                    m: 0,
                    width: '100%',
                    '& .MuiFormControlLabel-label': {
                      width: '100%',
                    },
                  }}
                  control={
                    <Radio
                      sx={{
                        color: '#7c3aed',
                        '&.Mui-checked': {
                          color: '#7c3aed',
                        },
                      }}
                    />
                  }
                  label={
                    <div
                      className={`flex w-full items-center gap-3 rounded-[20px] border px-4 py-3 transition-all duration-200 ${
                        selected
                          ? 'border-violet-300 bg-white shadow-sm'
                          : 'border-transparent bg-transparent hover:border-violet-200 hover:bg-white'
                      }`}
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                        {icon}
                      </div>

                      <div className="flex-1">
                        <p className="text-base font-semibold text-slate-900">{label}</p>
                        <p className="text-sm text-slate-600">{description}</p>
                      </div>
                    </div>
                  }
                  className="!mb-3 last:!mb-0"
                />
              );
            })}
          </RadioGroup>
        </FormControl>
      </div>
    </div>
  );
};

export default PaymentMethod;
