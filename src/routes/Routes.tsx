import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Camera from '../components/Camera';
import PhoneVerification from '../components/phoneVerification';
import {PhoneSignIn} from '../components/signInwithPhoneNumber';
import Landing from '../components/scenes/Landing';
import Mobile from '../components/scenes/Mobile';
import Home from '../components/scenes/Home';
import Kyc from '../components/scenes/Kyc';
import GetStarted from '../components/scenes/GetStarted';
import Notifications from '../components/scenes/Notifications';
import Investments from '../components/scenes/Investments';
// import Payment from '../components/Payment';
const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <Stack.Navigator initialRouteName="mobile">
      <Stack.Screen
        name="GetStarted"
        component={GetStarted}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="notifications"
        component={Notifications}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="mobile"
        component={Mobile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="investments"
        component={Investments}
        options={{headerShown: false}}
      />
      <Stack.Screen name="kyc" component={Kyc} options={{headerShown: false}} />
      {/* <Stack.Screen
        name="Test"
        component={Camera}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ph"
        component={PhoneSignIn}
        options={{headerShown: false}}
      /> */}
      {/* <Stack.Screen
        name="pay"
        component={Payment}
        options={{headerShown: false}}
      /> */}
    </Stack.Navigator>
  );
};

export default Routes;
