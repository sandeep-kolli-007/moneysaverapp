import React, {useEffect, useState} from 'react';
import Layout from '../shared/Layout';
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import Input from '../shared/Input';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Button from '../shared/Button';
import {useTheme} from '@rneui/themed';
import useFetch from '../../hooks/useFecth';
import Spinner from 'react-native-loading-spinner-overlay';
import {useStore} from '../../hooks/useStore';
import Home from './Home';
import auth from '@react-native-firebase/auth';
import Vector from '../../assets/vector2.svg';

function Login() {
  const defaultLogin = {
    password: '',
    phone: '',
  };
  const defaultSignUp = {
    name: '',
    password: '',
    phone: '',
  };
  const {theme} = useTheme();
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState(defaultLogin);
  const [signupData, setSignupData] = useState(defaultSignUp);
  const {state, dispatch}: any = useStore();

  // fecth
  //login
  const {response, loading, onRefresh}: any = useFetch({
    url: `/User/GetUserDetails?phone=${loginData.phone}&password=${loginData.password}`, //try to make constants
    Options: {method: 'GET', initialRender: false, data: loginData},
  });
  //signup
  const {
    response: res,
    loading: load,
    onRefresh: onSign,
  }: any = useFetch({
    url: `/User/SaveUserDetails`, //try to make constants
    Options: {method: 'POST', initialRender: false, data: signupData},
  });
  //firebase account create
  const {
    response: res1,
    loading: load1,
    onRefresh: onFire,
  }: any = useFetch({
    url: `/Firebase/createUser`, //try to make constants
    Options: {
      method: 'POST',
      initialRender: false,
      data: {
        phoneNumber: `+91${loginData?.phone}`,
        email: `${loginData?.phone}@gmail.com`,
        displayName: 'string',
        photoUrl: 'http://some.jpg',
        tenantId: 'string',
      },
    },
  });

  const buttonPress = () => {
    isLogin
      ? loginData?.phone && loginData?.password
        ? onRefresh()
        : () => {}
      : signupData?.phone && signupData?.password && signupData?.name
      ? onSign()
      : () => {};
  };

  useEffect(() => {
    if (res?.id === 0) {
      setIsLogin(true);
    } else if (res) {
      Alert.alert('something wrong');
    }
  }, [res]);
  useEffect(() => {
    setLoginData(defaultLogin);
    setSignupData(defaultSignUp);
  }, [isLogin, state?.phoneNumber]);

  useEffect(() => {
    console.log(response, 'temppp');
    if (response) {
      if (response?.phone && response?.phone?.length == 10) {
        //   dispatch({
        //     type: 'update',
        //     payload: response?.phone,
        //     key: 'phoneNumber',
        //   });
        onFire();
        ToastAndroid.show('Login Success', ToastAndroid.SHORT);
      } else {
        Alert.alert('Incorrect Credentials');
      }
    }
  }, [response]);

  useEffect(() => {
    if (res1?.authToken) {
      signInWithCustomToken(res1?.authToken);
    }
  }, [res1]);
  const signInWithCustomToken = async (token: any) => {
    try {
      await auth().signInWithCustomToken(token);
    } catch (error) {
      console.error('Error signing in with custom token:', error);
    }
  };
  console.log(state?.phoneNumber, 'ss');
  return (
    <View
      style={{
        flex: 1,
        padding: state?.phoneNumber ? 0 : 32,
        backgroundColor: 'white',
      }}>
      <>
        {state?.phoneNumber ? (
          <>
            <Home />
          </>
        ) : (
          <>
            <View style={{flex: 1}}>
              <KeyboardAvoidingView style={{flex: 1}}  >
                <ScrollView>
                  <Spinner
                    visible={loading || load || load1}
                    textContent={'Loading...'}
                  />
                  <Vector width={250} height={250} />
                  <Text
                    style={{
                      fontSize: 32,
                      fontWeight: 'bold',
                      marginBottom: 24,
                      color: theme.colors.primary,
                    }}>
                    {isLogin ? 'Login' : 'Signup'}
                  </Text>
                  {isLogin ? (
                    <>
                      <Input
                        label={'Enter Phone Number'}
                        keyboardType={'numeric'}
                        value={loginData.phone}
                        maxLength={10}
                        onChangeText={(text: string) => {
                          setLoginData({...loginData, phone: text});
                        }}
                      />
                      <Input
                        label={'Enter Password'}
                        maxLength={12}
                        value={loginData.password}
                        onChangeText={(text: string) => {
                          setLoginData({...loginData, password: text});
                        }}
                        keyboardType={'text'}
                        secureTextEntry
                      />
                    </>
                  ) : (
                    <>
                      <Input
                        label={'Enter Phone Number'}
                        maxLength={10}
                        value={signupData.phone}
                        keyboardType={'numeric'}
                        onChangeText={(text: string) => {
                          setSignupData({...signupData, phone: text});
                        }}
                      />
                      <Input
                        label={'Enter User Name'}
                        keyboardType={'text'}
                        value={signupData.name}
                        maxLength={12}
                        onChangeText={(text: string) => {
                          setSignupData({...signupData, name: text});
                        }}
                      />
                      <Input
                        label={'Enter Password'}
                        maxLength={12}
                        value={signupData.password}
                        onChangeText={(text: string) => {
                          setSignupData({...signupData, password: text});
                        }}
                        keyboardType={'text'}
                        secureTextEntry
                      />
                    </>
                  )}
                  {
                    <View
                      style={{
                        gap: 16,
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        maxWidth: '100%',
                      }}>
                      <View style={{flex: 1}}>
                        <Button
                          title={isLogin ? 'Signup' : 'Login'}
                          backgroundColor={theme.colors.grey2}
                          onPress={() => setIsLogin(!isLogin)}
                        />
                      </View>
                      <View style={{flex: 1}}>
                        <Button
                          title={isLogin ? 'Login' : 'Signup'}
                          onPress={buttonPress}
                        />
                      </View>
                    </View>
                  }
                </ScrollView>
              </KeyboardAvoidingView>
            </View>
          </>
        )}
      </>
    </View>
  );
}

export default Login;
