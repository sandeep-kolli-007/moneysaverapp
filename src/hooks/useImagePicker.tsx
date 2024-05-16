import {BottomSheet, Button, ListItem} from '@rneui/base';
import {useState} from 'react';
import ImagePicker, {
  CameraOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

const useImagePicker = () => {
  const [image, setImage] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const camera = async () => {
    const options: CameraOptions = {
      mediaType: 'photo',
       includeBase64:true,
       maxWidth: 1080,
       maxHeight: 1080,
    };

    await launchCamera(options, response => {
      handleImagePickerResponse(response);
    });
  };

  const imageLibrary = async () => {
    const options: CameraOptions = {
      mediaType: 'photo',
    };

    await launchImageLibrary(options, response => {
      handleImagePickerResponse(response);
    });
  };

  const handleImagePickerResponse = (
    response: ImagePicker.ImagePickerResponse,
  ) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorMessage) {
      console.log('ImagePicker Error: ', response.errorMessage);
    } else {
      // You can do something with the selected image here
      setImage(response.assets && response.assets[0]);
    }
  };
  const list = [
    {
      title: 'Take Photo',
      onPress: () => {
        camera();
        setImage(null);
        setIsVisible(false);
      },
    },
    {
      title: 'Choose from Library',
      onPress: () => {
        imageLibrary();
        setImage(null);
        setIsVisible(false);
      },
    },
    {
      title: 'Cancel',
      // containerStyle: {backgroundColor: 'blue'},
      // titleStyle: {color: 'white'},
      onPress: () => setIsVisible(false),
    },
  ];
  const imageBottomSheet = (
    <>
      <BottomSheet
        onBackdropPress={() => setIsVisible(false)}
        modalProps={{}}
        isVisible={isVisible}>
        {list.map((l, i) => (
          <ListItem
            key={i}
            // containerStyle={l.containerStyle}
            onPress={l.onPress}>
            <ListItem.Content>
              <ListItem.Title>{l.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
    </>
  );
  return {image, imageBottomSheet, setIsVisible};
};

export default useImagePicker;
