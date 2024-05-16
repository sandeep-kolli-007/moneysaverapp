import {View, Text, Image} from 'react-native';
import React from 'react';
import Layout from '../shared/Layout';
import {useTheme} from '@rneui/themed';
import Button from '../shared/Button';
import useLogout from '../../hooks/useLogout';
import { usePhoneVerification } from '../../hooks/usePhoneVerification';

const Account = () => {
  // const user = {
  //   photoURL: 'https://reactnative.dev/img/tiny_logo.png',
  //   displayName: 'Mallika Jain',
  //   email: 'test@gmail.com',
  //   phoneNumber: '+9199999999999',
  //   // address: 'test address for test',
  //   // dob: '23-04-1923',
  // };
  const {theme} = useTheme();
  const logout = useLogout();
 const {user}:any=usePhoneVerification()
 console.log(user)
  return (
    <Layout
      title={'Account Details'}
      bottomsheet={
        <>
          <View>
            <View
              style={{
                justifyContent: 'center',
                display: 'flex',
                flexDirection: 'row',
                marginTop: 16,
              }}>
              <Image
                source={{
                  uri: user?.photoURL ?? 'https://reactnative.dev/img/tiny_logo.png',
                }}
                width={120}
                height={120}
                style={{borderRadius: 60}}
              />
            </View>
            <View>
              <Text
                style={{
                  fontSize: 28,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  fontFamily: 'roboto',
                  color: theme.colors.grey0,
                  marginTop: 16,
                }}>
                {user?.displayName??'N/A'}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'light',
                  textAlign: 'center',
                  fontFamily: 'roboto',
                  color: theme.colors.grey0,
                  marginTop: 16,
                }}>
                {user?.phoneNumber??'N/A'}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'light',
                  textAlign: 'center',
                  fontFamily: 'roboto',
                  color: theme.colors.grey0,
                  marginTop: 8,
                }}>
                {user?.email??'N/A'}
              </Text>
              {/* <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'light',
                  textAlign: 'center',
                  fontFamily: 'roboto',
                  color: theme.colors.grey0,
                  marginTop: 8,
                }}>
                {user.dob}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'light',
                  textAlign: 'center',
                  fontFamily: 'roboto',
                  color: theme.colors.grey0,
                  marginTop: 8,
                }}>
                {user.address}
              </Text> */}
            </View>
            <Button
              title={'Logout'}
              onPress={() => {
                logout();
              }}
              style={{marginTop: 22}}></Button>
          </View>
        </>
      }
    />
  );
};

export default Account;
