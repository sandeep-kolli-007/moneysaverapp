import {useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

const useLogout = () => {
  const navigation: any = useNavigation();

  const handleLogout = async () => {
    try {
      await auth().signOut();
      console.log('User signed out successfully');
      navigation.navigate('mobile'); // Navigate to the login screen
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return handleLogout;
};

export default useLogout;
