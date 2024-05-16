// import {View, Text, Alert} from 'react-native';
// import React from 'react';
// import RazorpayCheckout from 'react-native-razorpay';
// import {Button} from '@rneui/base';
// const Payment = () => {

//     const amount = 345.87;
//    const name = 'sandeep'
//    const key = 'rzp_test_wuDIiVhh5Cubfa'
//    const description = "SOme text for payment reason we collect amount"
   
//   return (
//     <View>
//       <Button
//         title={'Pay with Razorpay'}
//         onPress={() => {
//           var options = {
//             description: description,
//             image: 'https://i.imgur.com/3g7nmJC.png',
//             currency: 'INR',
//             key: key, // Your api key
//             amount: amount * 100 , //converting  into paisa
//             name: name,
//             // order_id: crypto?.randomUUID(),
//             // prefill: {
//             //   email: 'void@razorpay.com',
//             //   contact: '9191919191',
//             //   name: 'Razorpay Software',
//             // },
//             theme: {color: 'blue'},
//           };
//           RazorpayCheckout.open(options)
//             .then(data => {
//               // handle success
//               console.log(`Success: ${JSON.stringify(data)}`)
//               Alert.alert(`Success: ${data.razorpay_payment_id}`);
//             })
//             .catch(error => {
//               // handle failure
//               console.log(`Error: ${error.code} | ${error.description}`)
//               Alert.alert(`Error: ${error.code} | ${error.description}`);
//             });
//         }}
//       />
//     </View>
//   );
// };

// export default Payment;
