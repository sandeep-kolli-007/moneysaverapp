import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useEffect} from 'react';
import Button from '../shared/Button';
import Vector from '../../assets/vector2.svg';
import Input from '../shared/Input';
import {OtpInput} from 'react-native-otp-entry';
import {useTheme} from '@rneui/themed';
import auth from '@react-native-firebase/auth';
import {usePhoneVerification} from '../../hooks/usePhoneVerification';
import Landing from './Landing';
import Home from './Home';
import appCheck from '@react-native-firebase/app-check';
import {useStore} from '../../hooks/useStore';
const Mobile = () => {
  const {theme} = useTheme();
  const [phoneNumber, setphoneNumber] = React.useState('');
  const [isOTPScreen, setIsOTPScreen] = React.useState(false);
  const {
    initializing,
    user,
    confirm,
    code,
    setCode,
    createAccount,
    verifyPhoneNumber,
    confirmCode,
    loading,
  }: any = usePhoneVerification();
  const {state}: any = useStore();
  let rnfbProvider = appCheck().newReactNativeFirebaseAppCheckProvider();
  rnfbProvider.configure({
    android: {
      provider: __DEV__ ? 'debug' : 'playIntegrity',
      debugToken:
        // 'F77F86B4-7C50-4236-A8B3-AADB7057D892',
        'EC002240-CB13-47FF-998B-AFC393BA70A1',
    },
    apple: {
      provider: __DEV__ ? 'debug' : 'appAttestWithDeviceCheckFallback',
      debugToken:
        'some token you have configured for your project firebase web console',
    },
    web: {
      provider: 'reCaptchaV3',
      siteKey: 'unknown',
    },
  });
  React.useEffect(() => {
    const initializeAppCheck = async () => {
      await appCheck().initializeAppCheck({
        provider: rnfbProvider,
        isTokenAutoRefreshEnabled: true,
      });
    };
    initializeAppCheck();
    appCheck().newReactNativeFirebaseAppCheckProvider;
  }, []);

  const verify = () => {
    verifyPhoneNumber(phoneNumber);
    setIsOTPScreen(true);
  };

  useEffect(() => {
    setIsOTPScreen(false);
  }, [user]);
  console.log(loading, user, '69');

  return (
    <View style={{flex: 1}}>
      {!user ? (
        <KeyboardAvoidingView style={{flex: 1}} behavior={'padding'}>
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <TouchableWithoutFeedback
              onPress={Keyboard.dismiss}
              style={{flex: 1}}>
              <View
                style={{
                  justifyContent: 'space-between',
                  backgroundColor: 'white',
                  flex: 1,
                  height: '100%',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: 32,
                }}>
                <Vector width={250} height={250} />
                <View>
                  <Text style={styles.heading}>Mobile Number</Text>
                  <Text style={styles.subtitle}>
                    We will send one time passcode to this mobile number
                  </Text>
                </View>
                {!isOTPScreen ? (
                  <>
                    <Input
                      label={'Mobile Number'}
                      maxLength={10}
                      placeholder={'Enter Mobile Number'}
                      keyboardType={'phone-pad'}
                      onChangeText={(value: any) => {
                        setphoneNumber(value);
                      }}
                      icon={'mobile'}
                    />
                  </>
                ) : (
                  <>
                    <OtpInput
                      numberOfDigits={6}
                      onTextChange={text => setCode(text)}
                      focusColor={theme.colors.primary}
                    />
                    <Text style={{marginTop: 16}}>
                      If you didn’t receive code! Resend?
                    </Text>
                  </>
                )}

                <Button
                  disabled={loading}
                  loading={loading}
                  title={!isOTPScreen ? 'Generate OTP' : 'Continue'}
                  style={{marginTop: 24}}
                  onPress={() => {
                    !isOTPScreen ? verify() : confirmCode();
                  }}
                />
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </KeyboardAvoidingView>
      ) : state?.phoneNumber ? (
        <Home />
      ) : (
        <></>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  heading: {
    fontSize: 38,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'roboto',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'light',
    textAlign: 'center',
    fontFamily: 'roboto',
    marginHorizontal: 16,
    marginTop: 16,
  },
});
export default Mobile;
