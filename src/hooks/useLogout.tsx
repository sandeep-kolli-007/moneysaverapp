import {useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {useStore} from './useStore';

const useLogout = () => {
  const navigation: any = useNavigation();
  const {dispatch}: any = useStore();
  const handleLogout = async () => {
    try {
      await auth().signOut();
      console.log('User signed out successfully');
      dispatch({
        type: 'update',
        payload: '',
        key: 'phoneNumber',
      });
      navigation.navigate('login'); // Navigate to the login screen
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return handleLogout;
};

export default useLogout;
