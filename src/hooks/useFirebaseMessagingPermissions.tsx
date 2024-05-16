import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import { Platform, PermissionsAndroid } from 'react-native';

const useFirebaseMessagingPermissions = () => {
  useEffect(() => {
    const requestPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
              title: 'Allow App to Access Notifications',
              message: 'App needs access to your notifications to provide updates.',
              buttonPositive: 'Allow',
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Notification permission granted');
          } else {
            console.log('Notification permission denied');
          }
        } catch (error) {
          console.error('Error requesting notification permission:', error);
        }
      }
    };

    requestPermission();

    return () => {
      // Clean up any subscriptions or resources if needed
    };
  }, []);

  return null; // No state is returned as this hook only handles permissions
};

export default useFirebaseMessagingPermissions;
