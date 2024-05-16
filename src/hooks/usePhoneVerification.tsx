import React, {useState, useEffect} from 'react';
import {Button, TextInput, Text, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';

export function usePhoneVerification() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const [confirm, setConfirm] = useState<any>(null);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user: any) => {
      setUser(user);
      if (initializing) setInitializing(false);
    });
    return subscriber;
  }, []);

  async function createAccount() {
    try {
      await auth().createUserWithEmailAndPassword(
        'jane.doe@example.com',
        'SuperSecretPassword!',
      );
      console.log('User account created & signed in!');
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }
      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }
      console.error(error);
    }
  }

  async function verifyPhoneNumber(phoneNumber: any) {
    let confirmation: any;
    setLoading(true);
    try {
      confirmation = await auth().signInWithPhoneNumber(`+91${phoneNumber}`);
      setConfirm(confirmation);
      setLoading(false);
    } catch (e) {
      console.log(JSON.stringify(e), JSON.stringify(confirmation));
      setLoading(false);
    }
  }

  async function confirmCode() {
    setLoading(true);

    try {
      //   const credential = auth.PhoneAuthProvider.credential(
      //     confirm.verificationId,
      //     code,
      //   );
      //   let userData: any = await auth().currentUser?.linkWithCredential(
      //     credential,
      //   );
      const temp = await confirm.confirm(code);

      console.log(confirm.verificationId, code, temp);
      setLoading(false);
    } catch (error: any) {
      if (error.code === 'auth/invalid-verification-code') {
        console.log('Invalid code.');
      } else {
        console.log('Account linking error', error);
      }
      setLoading(false);
    }
  }

  async function resendOTP(phoneNumber: string) {
    setLoading(true);
    try {
      const confirmation = await auth().signInWithPhoneNumber(`+91${phoneNumber}`);
      setConfirm(confirmation);
      setLoading(false);
    } catch (error) {
      console.log('Error resending OTP:', error);
      setLoading(false);
    }
  }

  return {
    initializing,
    user,
    confirm,
    code,
    setCode,
    createAccount,
    verifyPhoneNumber,
    confirmCode,
    loading,
    resendOTP
  };
}
