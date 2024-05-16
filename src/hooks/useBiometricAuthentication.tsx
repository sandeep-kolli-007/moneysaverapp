import {useState} from 'react';
import {Alert, Platform} from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

const useBiometricAuthentication = () => {
  const [isBiometricAuthenticated, setIsBiometricAuthenticated] =
    useState(false);

  const authenticateWithBiometrics = async () => {
    console.log(LocalAuthentication);
    try {
      const compatible = await LocalAuthentication?.hasHardwareAsync();
      if (!compatible) {
        // Alert.alert(
        //   'Biometric Authentication',
        //   'Biometric authentication is not available on this device.',
        // );
        return;
      } else {
        console.log('available');
      }

      const enrolled = await LocalAuthentication?.isEnrolledAsync();
      if (!enrolled) {
        // Alert.alert(
        //   'Biometric Authentication',
        //   'No biometric data is enrolled on this device.',
        // );
        // return;
      } else {
        console.log('enrolled');
      }

      let result: any;

      // If biometric authentication fails, prompt for passcode
      result = await LocalAuthentication?.authenticateAsync({
        promptMessage: 'Authenticate to log in',
        fallbackLabel: 'Enter Passcode',
        disableDeviceFallback: false,
      });

      // }
      console.log(result);
      //not_enrolled
      if (result.success) {
        Alert.alert(
          'Biometric Authentication',
          'Biometric authentication successful!',
        );
        setIsBiometricAuthenticated(true);
        // Navigate to the home screen or perform any other action to indicate successful login
      } else if (result.not_enrolled) {
        setIsBiometricAuthenticated(true);
      } else {
        Alert.alert(
          'Biometric Authentication',
          'Biometric authentication failed or cancelled.',
        );
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert(
        'Biometric Authentication',
        'An error occurred while attempting biometric authentication.',
      );
      setIsBiometricAuthenticated(false);
    }
    console.log('finished');
  };

  return [authenticateWithBiometrics, isBiometricAuthenticated];
};

export default useBiometricAuthentication;
