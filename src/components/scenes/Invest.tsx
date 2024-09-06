import {
  View,
  Text,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Layout from '../shared/Layout';
import {useTheme} from '@rneui/themed';
import Input from '../shared/Input';
import Button from '../shared/Button';
import useUtilities from '../../hooks/useUtilities';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import useFetch from '../../hooks/useFecth';
import {useStore} from '../../hooks/useStore';
import moment from 'moment';
import CustomDateTimePicker from '../shared/CustomDateTimePicker';
import Spinner from 'react-native-loading-spinner-overlay';
import useRazorpayPayment from '../../hooks/useRazorPayment';

const Invest = ({navigation}: any) => {
  const secretKey = 'KcbjpVlXQLHtBsjafyzlNQOU';
  const {theme} = useTheme();
  const {state, dispatch}: any = useStore();
  const {makePayment, paymentSuccess, paymentError} = useRazorpayPayment();

  const {response, loading, onRefresh}: any = useFetch({
    url: `/User/GetROI`, //try to make constants
    Options: {method: 'GET', initialRender: true},
  });

  const {
    currencyConverter,
    RemoveCurrencyConverter,
    getAfterMonth,
    getAfterYear,
  } = useUtilities();
  const onetime = {
    investAmount: 100,
    noOfYears: 1,
    maturityDate: getAfterYear(new Date().toString(), 1),
  };
  const recurring = {
    investAmount: 100,
    noOfDays: 30,
    maturityDate: getAfterMonth(new Date().toString(), 30),
  };
  const [oneTimeData, setOneTimeData] = React.useState(onetime);
  const [recurringData, setRecurringData] = React.useState(recurring);
  const [selectedTab, setSelectedTab] = React.useState(0);

  // const [maturityDate, setMaturityDate] = React.useState('');
  const maxYears = 5;
  const date = '2024-06-15';
  console.log(state, 'states');
  const prePayload = {
    amount:
      selectedTab === 0 ? recurringData.investAmount : oneTimeData.investAmount,
    roiDaily: String(state?.roiPerDay),
    roiYearly: String(state?.roiPerYear),
    yearlyTenure: oneTimeData.noOfYears.toString(),
    dailyTenure: recurringData.noOfDays.toString(),
    startDate: recurringData.maturityDate,
    maturityDate:
      selectedTab === 0 ? recurringData.maturityDate : oneTimeData.maturityDate,
    maturityValue:
      (Number(state[selectedTab === 0 ? 'roiPerDay' : 'roiPerYear']) / 100) *
        Number(
          selectedTab === 0 ? recurringData.noOfDays : oneTimeData.noOfYears,
        ) *
        Number(
          selectedTab === 0
            ? recurringData.investAmount
            : oneTimeData.investAmount,
        ) +
      Number(
        selectedTab === 0
          ? recurringData.investAmount
          : oneTimeData.investAmount,
      ),
    isActive: true,
    phone: state.phoneNumber,
    order_Id: '',
    payment_Id: '',
    signature: '',
    policyNumber: '',
    recurring: selectedTab === 0,
  };
  const [payload, setPayload] = useState(prePayload);
  const {
    response: postResponse,
    loading: l1,
    onRefresh: post,
  }: any = useFetch({
    url: '/User/SaveInvestments', //try to make constants
    Options: {
      method: 'POST',
      initialRender: false,
      data: payload,
    },
  });
  const {
    response: orderResponse,
    loading: l0,
    onRefresh: createOrder,
  }: any = useFetch({
    url: '/User/CreateRazorpayOrder', //try to make constants
    Options: {
      method: 'POST',
      initialRender: false,
      data: {
        amount:
          selectedTab === 0
            ? recurringData.investAmount * 100
            : oneTimeData.investAmount * 100,
        currency: 'INR',
        receipt: 'string',
        notes: {
          additionalProp1: 'string',
        },
      },
    },
  });
  const {
    response: verifysignatureresponse,
    loading: l2,
    onRefresh: verifysignature,
  }: any = useFetch({
    url: '/User/VerifyPaymentSignature', //try to make constants
    Options: {
      method: 'POST',
      initialRender: false,
      data: {
        orderId: payload.order_Id,
        paymentId: payload.payment_Id,
        signature: payload.signature,
      },
    },
  });

  useEffect(() => {
    if (response) {
      console.log(response, 'demm');
      dispatch({
        type: 'update',
        payload: response?.filter((i: any) => i.plan === '1 year')[0].roi,
        key: 'roiPerYear',
      });
      dispatch({
        type: 'update',
        payload: response?.filter((i: any) => i.plan === '1 day')[0].roi,
        key: 'roiPerDay',
      });
      setPayload({
        ...payload,
        roiDaily: response?.filter((i: any) => i.plan === '1 day')[0].roi,
        roiYearly: response?.filter((i: any) => i.plan === '1 year')[0].roi,
      });
    }
  }, [response]);

  useEffect(() => {
    setOneTimeData({
      ...oneTimeData,
      maturityDate: getAfterYear(
        new Date().toISOString(),
        oneTimeData?.noOfYears,
      ),
    });
    // console.log(oneTimeData);
  }, [oneTimeData?.noOfYears]);
  useEffect(() => {
    if (postResponse) {
      if (postResponse?.success) {
        navigation.navigate('Dashboard');
      }
    }
  }, [postResponse]);

  useEffect(() => {
    if (paymentSuccess) {
      console.log(paymentSuccess, 'sucess');

      // payload.signature = paymentSuccess.razorpay_signature;
      setPayload({
        ...payload,
        payment_Id: paymentSuccess.razorpay_payment_id,
        order_Id: paymentSuccess.razorpay_order_id,
        signature: paymentSuccess.razorpay_signature,
      });
    }
  }, [paymentSuccess, paymentError]);

  useEffect(() => {
    if (payload.order_Id && payload.signature && payload.payment_Id) {
      verifysignature();
    }
  }, [payload]);

  useEffect(() => {
    if (verifysignatureresponse?.success) {
      post();
    }
  }, [verifysignatureresponse]);

  useEffect(() => {
    if (orderResponse && orderResponse.id) {
      makePayment(
        selectedTab === 0
          ? recurringData.investAmount
          : oneTimeData.investAmount,

        orderResponse.id,
      );
    }
  }, [orderResponse]);

  console.log(currencyConverter(oneTimeData.investAmount));

  const onDateChange = (value: Date) => {
    // Create Date objects for the two dates
    const startDate: any = new Date();
    const endDate: any = value;

    // Calculate the time difference in milliseconds
    const timeDifference: any = endDate - startDate;

    // Convert the time difference from milliseconds to days
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

    console.log(daysDifference); // Output: Number of days

    setRecurringData({
      ...recurringData,
      noOfDays: daysDifference,
      maturityDate: endDate,
    });
  };
  console.log(selectedTab === 1, 'recurring');
  const estimated = () => {
    return (
      <>
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            fontFamily: 'roboto',
            fontWeight: 'medium',
            color: theme.colors.grey0,
          }}>
          Estimated Amount
        </Text>
        <Text
          style={{
            fontFamily: 'roboto',
            fontSize: 40,
            color: theme.colors.grey0,
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: 8,
          }}>
          ₹
          {oneTimeData.investAmount && oneTimeData.noOfYears
            ? currencyConverter(
                (Number(state.roiPerYear) / 100) *
                  Number(oneTimeData.noOfYears) *
                  Number(oneTimeData.investAmount) +
                  Number(oneTimeData.investAmount),
              )
            : 0}
        </Text>
      </>
    );
  };
  const estimatedRecurring = () => {
    return (
      <>
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            fontFamily: 'roboto',
            fontWeight: 'medium',
            color: theme.colors.grey0,
          }}>
          Estimated Amount
        </Text>
        <Text
          style={{
            fontFamily: 'roboto',
            fontSize: 40,
            color: theme.colors.grey0,
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: 8,
          }}>
          ₹
          {oneTimeData.investAmount && oneTimeData.noOfYears
            ? currencyConverter(
                (Number(state.roiPerDay) / 100) *
                  Number(recurringData.noOfDays) *
                  Number(recurringData.investAmount) +
                  Number(recurringData.investAmount),
              )
            : 0}
        </Text>
      </>
    );
  };
  return (
    <Layout
      title={'Invest'}
      noPaddingBottomSheet
      bottomsheet={
        <>
          <Spinner
            visible={loading || l1 || l2 || l0}
            textContent={'Loading...'}
          />
          <ScrollView style={{flex: 1, padding: 32}}>
            <KeyboardAvoidingView
              behavior={'height'}
              keyboardVerticalOffset={-800}
              style={{flex: 1}}>
              <SegmentedControlTab
                activeTabStyle={{backgroundColor: theme.colors.primary}}
                tabTextStyle={{color: theme.colors.primary}}
                tabStyle={{borderColor: theme.colors.primary}}
                tabsContainerStyle={{marginBottom: 20}}
                values={['Recurring', 'One time']}
                selectedIndex={selectedTab}
                onTabPress={i => {
                  setSelectedTab(i);
                  setOneTimeData(onetime);
                }}
              />
              {selectedTab === 1 ? (
                <View>
                  {estimated()}
                  <Input
                    placeholder="Invest Amount"
                    keyboardType={'numeric'}
                    label="Invest Amount"
                    icon={'rupee'}
                    textAlign={'right'}
                    value={String(oneTimeData?.investAmount)}
                    onChangeText={(v: number) => {
                      setOneTimeData({
                        ...oneTimeData,
                        investAmount: v,
                      });
                    }}
                  />

                  <View style={{display: 'flex', flexDirection: 'row'}}>
                    <Input
                      style={{width: '50%'}}
                      placeholder="ROI"
                      label="Rate of Interest"
                      value={`${state.roiPerYear}%`}
                      textAlign={'right'}
                      disabled
                    />
                    <Input
                      style={{width: '50%'}}
                      inputMode={'numeric'}
                      value={String(oneTimeData?.noOfYears)}
                      maxLength={1}
                      placeholder="Years"
                      textAlign={'right'}
                      label="No.of Years"
                      keyboardType={'number-pad'}
                      onChangeText={(value: number) => {
                        setOneTimeData({
                          ...oneTimeData,
                          noOfYears: value >= maxYears ? maxYears : value,
                        });
                      }}
                    />
                  </View>

                  <Button
                    title="Invest"
                    onPress={() => {
                      createOrder();
                    }}
                  />
                  {oneTimeData.noOfYears && oneTimeData.investAmount && (
                    <>
                      <Text style={{textAlign: 'center', marginTop: 8}}>
                        {Number(oneTimeData.noOfYears) !== 0
                          ? 'Your Investment will be matured at '
                          : ''}
                      </Text>
                      <Text
                        style={{
                          color: theme.colors.primary,
                          textAlign: 'center',
                          fontWeight: 'bold',
                          fontSize: 18,
                        }}>
                        {Number(oneTimeData.noOfYears) !== 0
                          ? `${oneTimeData.maturityDate}`
                          : ''}
                      </Text>
                    </>
                  )}
                </View>
              ) : (
                <View>
                  {estimatedRecurring()}
                  <Input
                    placeholder="Invest Amount"
                    keyboardType={'numeric'}
                    label="Invest Amount"
                    icon={'rupee'}
                    textAlign={'right'}
                    value={String(recurringData?.investAmount)}
                    onChangeText={(v: number) => {
                      setRecurringData({
                        ...recurringData,
                        investAmount: v,
                      });
                    }}
                  />
                  <CustomDateTimePicker onDateChange={onDateChange} />
                  <Input
                    // style={{width: '50%'}}
                    placeholder="ROI"
                    label="Rate of Interest"
                    value={`${state.roiPerDay}%`}
                    textAlign={'right'}
                    disabled
                  />
                  <Button
                    title="Invest"
                    onPress={() => {
                      // makePayment(Number(recurringData.investAmount));
                      createOrder();
                    }}
                  />
                </View>
              )}
            </KeyboardAvoidingView>
          </ScrollView>
        </>
      }
    />
  );
};

export default Invest;
