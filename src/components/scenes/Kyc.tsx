import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Layout from '../shared/Layout';
import {useTheme} from '@rneui/themed';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Input from '../shared/Input';
import Button from '../shared/Button';
import useImagePicker from '../../hooks/useImagePicker';
import useOcrTextRecognizer from '../../hooks/useOcrTextRecognizer';
import FaceDetection from '@react-native-ml-kit/face-detection';
import Dropdown from '../shared/Dropdown';

const Kyc = () => {
  //hooks
  const {theme} = useTheme();
  const {image, imageBottomSheet, setIsVisible} = useImagePicker();
  const {
    image: image1,
    imageBottomSheet: imageBottomSheet1,
    setIsVisible: setIsVisible1,
  } = useImagePicker();
  const {
    ocrText,
    loading: aadharOcrLoading,
    setImageUri,
    setOcrText,
  } = useOcrTextRecognizer();
  const [ocrAadharExtracted, setOcrAadharExtracted] = useState<any>(null);
  const [aadharNumber, setAadharNumber] = useState('');
  const [isSelfieValidated, setIsSelfieValidated] = useState(false);

  //constants
  const data = {isAadhar: true, isSelfie: false, isBank: false};
  const pattern = /^[0-9]{4} [0-9]{4} [0-9]{4}$/;
  const step =
    [data.isAadhar, data.isBank, data.isSelfie].filter(item => item === true)
      .length + 1;
  //functions
  const Extract = () => {
    setOcrAadharExtracted(ocrText.filter((item: string) => pattern.test(item)));
  };

  const detect = async () => {
    await FaceDetection.detect(image1?.uri, {}).then(result => {
      const isVal = result.length === 1;
      setIsSelfieValidated(isVal);
      if (result.length > 1) {
        Alert.alert('Failed', 'detected more than one face');
      } else if (result.length === 0) {
        Alert.alert('Failed', 'NO face detected');
      }
    });
  };

  //lifecycle
  useEffect(() => {
    if (image1) {
      detect();
      console.log('ddd');
    }
  }, [image1]);

  useEffect(() => {
    console.log(image?.uri, ocrText, aadharOcrLoading);
    if (!aadharOcrLoading && ocrText) Extract();
  }, [aadharOcrLoading, image?.uri, ocrText]);

  useEffect(() => {
    setOcrText(null);
    if (image?.uri) {
      setImageUri(image.uri);
    }
  }, [image?.uri]);

  useEffect(() => {
    if (ocrAadharExtracted?.length > 0) setAadharNumber(ocrAadharExtracted[0]);
  }, [ocrAadharExtracted]);
  //   console.log(ocrAadharExtracted);

  return (
    <Layout
      title={'KYC'}
      bottomsheet={
        <>
          <View
            style={{display: 'flex', justifyContent: 'space-between', flex: 1}}>
            <View>
              <Text
                style={{
                  fontFamily: 'roboto',
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: theme.colors.grey0,
                  marginBottom: 8,
                }}>
                Step {step} of 3
              </Text>
              <Text style={{fontSize: 18, textAlign: 'center'}}>
                {step === 1
                  ? 'Upload frontside of Aadhar card'
                  : step === 2
                  ? 'Upload selfie'
                  : 'Upload  Bank details'}
              </Text>

              {step === 1 ? (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      setIsVisible(true);
                    }}>
                    <View
                      style={{
                        borderRadius: 8,
                        width: '60%',
                        marginTop: 8,
                        marginHorizontal: 'auto',
                        height: 120,
                        borderColor: theme.colors.primary,
                        borderWidth: 1,
                        borderStyle: 'dashed',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      {image ? (
                        ocrText === null ? (
                          <ActivityIndicator />
                        ) : (
                          <Image
                            source={{uri: image.uri}}
                            style={{width: '100%', height: '100%'}}
                          />
                        )
                      ) : (
                        <View style={{alignItems: 'center'}}>
                          <Icon
                            name="plus-circle"
                            size={50}
                            color={theme.colors.secondary}
                          />
                          <Text
                            style={{marginTop: 8, color: theme.colors.primary}}>
                            Click to upload Aadhar
                          </Text>
                        </View>
                      )}
                    </View>
                  </TouchableOpacity>

                  <View style={{marginTop: 16}}>
                    <Input
                      keyboardType={'numeric'}
                      placeholder="Aadhar Number"
                      label={'Aadhar Number'}
                      value={aadharNumber}
                      disabled
                    />
                    <Input
                      placeholder="Name as per Aadhar"
                      label={'Name as per Aadhar'}
                    />
                  </View>
                </>
              ) : step === 2 ? (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      setIsVisible1(true);
                    }}>
                    <View
                      style={{
                        borderRadius: 8,
                        width: 120,
                        marginTop: 8,
                        marginHorizontal: 'auto',
                        height: 140,
                        borderColor: theme.colors.primary,
                        borderWidth: 1,
                        borderStyle: 'dashed',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      {image1 && isSelfieValidated ? (
                        <Image
                          source={{uri: image1.uri}}
                          style={{width: '100%', height: '100%'}}
                        />
                      ) : (
                        <View style={{alignItems: 'center'}}>
                          <Icon
                            name="plus-circle"
                            size={50}
                            color={theme.colors.secondary}
                          />
                          <Text
                            style={{
                              marginTop: 8,
                              color: theme.colors.primary,
                              textAlign: 'center',
                            }}>
                            Click to upload
                          </Text>
                        </View>
                      )}
                    </View>
                  </TouchableOpacity>
                  <View style={{marginTop: 16}}>
                    <Input
                      placeholder="Email"
                      label={'Email'}
                      icon={'envelope'}
                    />
                  </View>
                </>
              ) : (
                <View style={{marginTop: 16}}>
                  <Input placeholder="Account Number" icon={'bank'} />
                  <Input placeholder="Re-enter Account Number" icon={'bank'} />
                  <Input placeholder="Name as per Bank" icon={'user'} />
                  <Dropdown
                    items={[
                      {label: 'Savings', value: 'savings'},
                      {label: 'Current', value: 'current'},
                    ]}
                  />
                  <Input placeholder="IFSC code" />
                </View>
              )}
            </View>
            <Button title={'Continue'}></Button>
          </View>
          {imageBottomSheet}
          {imageBottomSheet1}
        </>
      }></Layout>
  );
};

export default Kyc;
