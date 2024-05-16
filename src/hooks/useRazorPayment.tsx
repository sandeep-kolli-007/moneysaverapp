import {useState} from 'react';
import RazorpayCheckout from 'react-native-razorpay';

const useRazorpayPayment = () => {
  const [paymentError, setPaymentError] = useState<any>(null);
  const [paymentSuccess, setPaymentSuccess] = useState<any>(null);
  const key = 'rzp_test_wuDIiVhh5Cubfa';
  const description = 'SOme text for payment reason we collect amount';
  const makePayment = ({amount, name}: any) => {
    const options = {
      description: description,
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: key,
      amount: amount * 100,
      name: name,
      theme: {color: '#65488A'},
    };
    RazorpayCheckout.open(options)
      .then((data: any) => {
        // handle success
        console.log(`Success: ${JSON.stringify(data)}`);
        setPaymentSuccess(data.razorpay_payment_id);
      })
      .catch((error: any) => {
        // handle failure
        console.log(`Error: ${error.code} | ${error.description}`);
        setPaymentError(`${error.code} | ${error.description}`);
      });
  };

  return {makePayment, paymentError, paymentSuccess};
};

export default useRazorpayPayment;
