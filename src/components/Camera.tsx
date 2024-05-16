import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {CameraRoll, useCameraRoll} from '@react-native-camera-roll/camera-roll';
import {PermissionsAndroid, Platform} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Button, useTheme} from '@rneui/themed';
import useImagePicker from '../hooks/useImagePicker';
import {Image, ListItem} from '@rneui/base';
import {BottomSheet} from '@rneui/themed';
import {SafeAreaProvider} from 'react-native-safe-area-context';
const Camera = () => {
  // const {image, button} = useImagePicker();
  const {theme}=useTheme()
  return (
    <View>
        {/* {image && (
          <Image source={{uri: image.uri}} style={{width: 200, height: 200}} />
        )}
        <Button style={{backgroundColor:theme.colors.primary}}>njnjnjnjnj</Button>
      {button} */}
    </View>
  );
};

export default Camera;
