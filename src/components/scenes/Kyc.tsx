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
import useFetch from '../../hooks/useFecth';
import useKycStatus from '../../hooks/useKycStatus';
import useNoninitialEffect from '../../hooks/useNoninitialEffect';
import {useNavigation} from '@react-navigation/native';
import {usePhoneVerification} from '../../hooks/usePhoneVerification';
import {useStore} from '../../hooks/useStore';

const Kyc = () => {
  //hooks
  const navigation: any = useNavigation();
  const {state}: any = useStore();
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
  // const [aadharNumber, setAadharNumber] = useState('');
  const [aadharDetails, setAadharDetails] = useState({
    AadharImage: image?.base64,
    AadharName: '',
    AadharNo: '',
    IsAadharVerified: false,
    IsSelfieVerified: false,
    IsBankVerified: false,
    phone: state.phoneNumber,
  });
  const [selfieDetails, setSelfieDetails] = useState({
    selfieImage: image1?.base64,
    Email: '',
    IsAadharVerified: true,
    IsSelfieVerified: false,
    IsBankVerified: false,
    phone: state.phoneNumber,
  });
  const [bankDetails, setBankDetails] = useState({
    AcNumber: '',
    AcHolderName: '',
    TypeOfAccount: '',
    IfscCode: '',
    IsAadharVerified: true,
    IsSelfieVerified: true,
    IsBankVerified: false,
    phone: state.phoneNumber,
  });

  const [isSelfieValidated, setIsSelfieValidated] = useState(false);
  console.log('phoneNumber', state.phoneNumber, aadharDetails);
  const {
    response,
    loading,
    onRefresh: get,
  } = useFetch({
    url: `/User/GetKYCDetails?mobile=${state.phoneNumber}`, //try to make constants
    Options: {method: 'GET', initialRender: true},
  });
  // console.log(response, 'kyc', ocrAadharExtracted);
  const {isKyc, number}: any = useKycStatus(response);

  const {
    response: r1,
    loading: l1,
    onRefresh,
  } = useFetch({
    url: '/User/SaveUserKYC', //try to make constants
    Options: {
      method: 'POST',
      initialRender: false,
      data:
        number == 0 ? aadharDetails : number == 1 ? selfieDetails : bankDetails,
    },
  });

  //constants
  const data = {isAadhar: false, isSelfie: false, isBank: false};
  const pattern = /^[0-9]{4} [0-9]{4} [0-9]{4}$/;
  const step = number + 1;
  const isContinueDisabled = () => {
    //validations
    if (number == 0) {
      //aadhar
      if (
        aadharDetails.AadharImage &&
        aadharDetails.AadharName &&
        aadharDetails.AadharNo
      ) {
        return false;
      }
    }
    if (number == 1) {
      if (selfieDetails.selfieImage) {
        return false;
      }
    }
    if (number == 2) {
      if (
        bankDetails.AcHolderName &&
        bankDetails.AcNumber &&
        bankDetails.IfscCode &&
        bankDetails.TypeOfAccount
      ) {
        return false;
      }
    }

    return true;
  };

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
  // useEffect(() => {
  //   setPhoneNumber(user?.phoneNumber.slice(-10));
  //   setAadharDetails({...aadharDetails, phone: user?.phoneNumber.slice(-10)});
  //   setSelfieDetails({...selfieDetails, phone: user?.phoneNumber.slice(-10)});
  //   setBankDetails({...bankDetails, phone: user?.phoneNumber.slice(-10)});
  // }, [user]);

  useEffect(() => {
    if (isKyc) {
      navigation.navigate('mobile');
    }
  }, [isKyc]);
  useEffect(() => {
    if (image1) {
      detect();
    }
    setSelfieDetails({...selfieDetails, selfieImage: image1?.base64});
  }, [image1]);
  useNoninitialEffect(() => {
    if (r1) get();
  }, [r1]);
  useEffect(() => {
    // console.log(image, ocrText, aadharOcrLoading);
    if (!aadharOcrLoading && ocrText) Extract();
  }, [aadharOcrLoading, image?.uri, ocrText]);

  useEffect(() => {
    setOcrText(null);
    if (image?.uri) {
      setImageUri(image.uri);
    }
    setAadharDetails({...aadharDetails, AadharImage: image?.base64});
  }, [image?.uri]);

  useEffect(() => {
    if (ocrAadharExtracted?.length > 0)
      setAadharDetails({...aadharDetails, AadharNo: ocrAadharExtracted[0]});
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
                      value={aadharDetails.AadharNo}
                      disabled
                    />
                    <Input
                      placeholder="Name as per Aadhar"
                      label={'Name as per Aadhar'}
                      value={aadharDetails.AadharName}
                      onChangeText={(val: string) => {
                        setAadharDetails({...aadharDetails, AadharName: val});
                      }}
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
                      onChangeText={(val: any) => {
                        setSelfieDetails({...selfieDetails, Email: val});
                      }}
                      value={selfieDetails.Email}
                    />
                  </View>
                </>
              ) : (
                <View style={{marginTop: 16}}>
                  <Input
                    value={bankDetails.AcNumber}
                    placeholder="Account Number"
                    icon={'bank'}
                    onChangeText={(val: string) => {
                      setBankDetails({...bankDetails, AcNumber: val});
                    }}
                  />
                  {/* <Input
                    placeholder="Re-enter Account Number"
                    icon={'bank'}
                    onChangeText={(val: string) => {
                      // setBankDetails({...bankDetails, AcNumber: val}); need to validate
                    }}
                  /> */}
                  <Input
                    value={bankDetails.AcHolderName}
                    placeholder="Name as per Bank"
                    icon={'user'}
                    onChangeText={(val: string) => {
                      setBankDetails({...bankDetails, AcHolderName: val});
                    }}
                  />
                  <Dropdown
                    onChangeText={(val: any) => {
                      console.log(val);
                      setBankDetails({
                        ...bankDetails,
                        TypeOfAccount: val.value,
                      });
                    }}
                    items={[
                      {label: 'Savings', value: 'savings'},
                      {label: 'Current', value: 'current'},
                    ]}
                  />
                  <Input
                    value={bankDetails.IfscCode}
                    placeholder="IFSC code"
                    onChangeText={(val: string) => {
                      setBankDetails({...bankDetails, IfscCode: val});
                    }}
                  />
                </View>
              )}
            </View>
            <Button
              title={'Continue'}
              disabled={loading || l1 || isContinueDisabled()}
              onPress={() => {
                onRefresh();
              }}></Button>
          </View>
          {imageBottomSheet}
          {imageBottomSheet1}
        </>
      }></Layout>
  );
};

export default Kyc;
