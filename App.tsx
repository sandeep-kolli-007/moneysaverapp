/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RNBootSplash from 'react-native-bootsplash';
import {
  Keyboard,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Camera from './src/components/Camera';
import Routes from './src/routes/Routes';
import {CreateThemeOptions, ThemeProvider, createTheme} from '@rneui/themed';
import {Button, Theme} from '@rneui/base';
import useRazorpayPayment from './src/hooks/useRazorPayment';
import MlkitOcr from 'react-native-mlkit-ocr';
import useImagePicker from './src/hooks/useImagePicker';
import useOcrTextRecognizer from './src/hooks/useOcrTextRecognizer';
import messaging from '@react-native-firebase/messaging';
import useFirebaseMessagingPermissions from './src/hooks/useFirebaseMessagingPermissions';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  useFirebaseMessagingPermissions();
  const {makePayment, paymentSuccess, paymentError} = useRazorpayPayment();
  const {image} = useImagePicker();
  // const {loading, ocrText} = useOcrTextRecognizer(image?.uri);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const theme = createTheme({
    lightColors: {
      primary: '#65488A',
      secondary: '#D8D1E2',
      white: 'white',
      background: 'white',
      grey0: '#707070',
      grey1: '#bdbdbd',
      success: '#43E28A',
      error: '#D24D84',
    },
    darkColors: {
      primary: '#1a181d',
      secondary: '#232223',
      white: '#969696',
      background: '#252525',
      grey0: '#000',
      grey1: '#8b8b8b',
      success: '#43E28A',
      error: '#121212',
    },
    // And set that mode as default
    mode: isDarkMode ? 'dark' : 'light',
    components: {
      Button: {
        raised: true,
      },
    },
  });
  // console.log(ocrText, loading);
  useEffect(() => {
    // Initialize Firebase
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Background message handled:', remoteMessage);
    });

    // Handle any message received while the app is in the foreground
    messaging().onMessage(async remoteMessage => {
      console.log('Foreground message handled:', remoteMessage);
    });
  }, []);
// Get the FCM registration token
const getFCMToken = async () => {
  try {
    const token = await messaging().getToken();
    console.log('FCM Token:', token);
    return token;
  } catch (error) {
    console.error('Error getting FCM token:', error);
    return null;
  }
};
console.log(getFCMToken())
// Call the function to get the token

  return (
    <>
      <ThemeProvider theme={theme}>
        <NavigationContainer onReady={() => RNBootSplash.hide()}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />
          <SafeAreaView style={{flex: 1}}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <Routes />
            </TouchableWithoutFeedback>
          </SafeAreaView>
        </NavigationContainer>
      </ThemeProvider>
    </>
  );
}
export default App;
