import React, { useState, useEffect } from 'react';
import { Button, TextInput, Text } from 'react-native';
import auth from '@react-native-firebase/auth';

export default function PhoneVerification() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<any>();

  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState<any>(null);

  const [code, setCode] = useState('');

  // Handle user state changes
  function onAuthStateChanged(user:any) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Handle create account button press
  async function createAccount() {
    try {
      await auth().createUserWithEmailAndPassword('jane.doe@example.com', 'SuperSecretPassword!');
      console.log('User account created & signed in!');
    } catch (error:any) {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }
      console.error(error);
    }
  }

  // Handle the verify phone button press
  async function verifyPhoneNumber(phoneNumber:any) {
    const confirmation:any = await auth().verifyPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  }

  // Handle confirm code button press
  async function confirmCode() {
    try {
      const credential = auth.PhoneAuthProvider.credential(confirm.verificationId, code);
      let userData:any= await auth().currentUser?.linkWithCredential(credential);
      setUser(userData?.user);
    } catch (error:any) {
      if (error?.code == 'auth/invalid-verification-code') {
        console.log('Invalid code.');
      } else {
        console.log('Account linking error');
      }
    }
  }

  if (initializing) return null;

  if (!user) {
    return <Button title="Login" onPress={() => createAccount()} />;
  } else if (!user.phoneNumber) {
    if (!confirm) {
      return (
        <Button
          title="Verify Phone Number"
          onPress={() => verifyPhoneNumber('+919999999999')}
        />
      );
    }
    return (
      <>
        <TextInput value={code} onChangeText={text => setCode(text)} />
        <Button title="Confirm Code" onPress={() => confirmCode()} />
      </>
    );
  } else {
    return (
      <Text>
        Welcome! {user.phoneNumber} linked with {user.email}
      </Text>
    );
  }
}