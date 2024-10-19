import {
  View,
  Text,
  Alert,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  Touchable,
  TouchableHighlightComponent,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import Button from '../shared/Button';
import {useTheme} from '@rneui/themed';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Layout from '../shared/Layout';
import {PieChart} from 'react-native-gifted-charts';
import Badge from '../shared/Badge';
import useFetch from '../../hooks/useFecth';
import useKycStatus from '../../hooks/useKycStatus';
import {useIsFocused} from '@react-navigation/native';
import useNoninitialEffect from '../../hooks/useNoninitialEffect';
import {useStore} from '../../hooks/useStore';
import IconTab from '../shared/IconTab';
import Swiper from '../shared/Swiper';
import useUtilities from '../../hooks/useUtilities';
const Landing = ({navigation}: any) => {
  const isFocused = useIsFocused();
  const {state, dispatch}: any = useStore();
  console.log(state, 'st');
  const {response, loading, onRefresh} = useFetch({
    url: `/User/GetKYCDetails?mobile=${state?.phoneNumber}`,
    Options: {method: 'GET', initialRender: true},
  });
  const {response:r1, loading:l1, onRefresh:on}:any = useFetch({
    url: `/User/GetDashboard?mobile=${state?.phoneNumber}`,
    Options: {method: 'GET', initialRender: true},
  });
  const {
    currencyConverter,
    RemoveCurrencyConverter,
    getAfterMonth,
    getAfterYear,
  } = useUtilities();
  const {isKyc, number} = useKycStatus(response);

  useNoninitialEffect(() => {
    isFocused && onRefresh();
  }, [isFocused]);
  const {theme} = useTheme();
  const pieData = [
    {
      value: 100 - r1?.percentage,
      color: theme.colors.primary,
      gradientCenterColor: theme.colors.primary,
    },
    {
      value: r1?.percentage,
      color: theme.colors.success,
      focused: true,
      gradientCenterColor: theme.colors.success,
    },
  ];
  const dummydata = [
    {
      InvestedDate: '23rd April',
      id: 'IN00001',
      InvestedAmount: '1,00,000',
      Interest: '+5,000',
      total: '₹1,05,000',
    },
    {
      InvestedDate: '23rd April',
      id: 'IN00001',
      InvestedAmount: '1,00,000',
      Interest: '+5,000',
      total: '₹1,05,000',
    },
    {
      InvestedDate: '23rd April',
      id: 'IN00001',
      InvestedAmount: '1,00,000',
      Interest: '+5,000',
      total: '₹1,05,000',
    },
    {
      InvestedDate: '23rd April',
      id: 'IN00001',
      InvestedAmount: '1,00,000',
      Interest: '+5,000',
      total: '₹1,05,000',
    },
    {
      InvestedDate: '23rd April',
      id: 'IN00001',
      InvestedAmount: '1,00,000',
      Interest: '+5,000',
      total: '₹1,05,000',
    },
  ];

  const renderDot = (color: any) => {
    return (
      <View
        style={{
          height: 6,
          width: 70,
          borderRadius: 5,
          backgroundColor: color,
          marginRight: 10,
        }}
      />
    );
  };

  const kyc = (percentage: number) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('kyc');
      }}>
      <View
        style={{
          backgroundColor: "#4047cd",
          elevation: 5,
          borderRadius: 16,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 16,
          marginTop: 16,
        }}>
        <View style={{width: '70%', alignSelf: 'center'}}>
          <Text
            style={{
              fontFamily: 'roboto',
              fontSize: 16,
              fontWeight: 'bold',
              color: "white",
            }}>
            Click here to complete KYC
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontFamily: 'roboto',
              fontWeight: 'light',
              color: "white",
            }}>
            One step ahead of saving.
          </Text>
        </View>
        <PieChart
          donut
          radius={40}
          innerRadius={25}
          innerCircleColor={'#4047cd'}
          data={[
            {
              value: percentage / 3,
              color: theme.colors.primary,
              gradientCenterColor: theme.colors.primary,
            },
            {value: 1 - percentage / 3, color: 'lightgray'},
          ]}
          centerLabelComponent={() => {
            return (
              <Text style={{fontSize: 20, fontWeight: 'bold',color:"white"}}>
                {percentage}/3
              </Text>
            );
          }}
        />
      </View>
    </TouchableOpacity>
  );
  return (
    <Layout title={'Dashboard'}>
      {r1 && <View
        style={{
          backgroundColor: "#23ffe1",
          width: '100%',
          borderRadius: 20,
          padding: 20,
          display: 'flex',
          flexDirection: 'row',
          elevation: 5,
        }}>
        <PieChart
          data={pieData}
          donut
          showGradient
          sectionAutoFocus
          radius={(Dimensions.get('window').width - 104) / 4}
          innerRadius={50}
          innerCircleColor={'#232B5D'}
          centerLabelComponent={() => {
            return (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text
                  style={{fontSize: 22, color: 'white', fontWeight: 'bold'}}>
                  {r1.percentage}%
                </Text>
                <Text style={{fontSize: 14, color: 'white'}}>Excellent</Text>
              </View>
            );
          }}
        />
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-around',
          }}>
          <View style={{paddingHorizontal: 16}}>
            {renderDot(theme.colors.primary)}
            <Text
              style={{
                color: "black",
                fontSize: 14,
                fontWeight: 'medium',
              }}>
              Invested
            </Text>
            <Text
              style={{
                color: "black",
                fontSize: 14,
                fontWeight: 'bold',
              }}>
              ₹{currencyConverter(r1?.amount)}
            </Text>
          </View>
          <View style={{paddingHorizontal: 16}}>
            {renderDot(theme.colors.success)}
            <Text
              style={{
                color: "black",
                fontSize: 14,
                fontWeight: 'medium',
              }}>
              Total returns
            </Text>
            <Text
              style={{
                color: "black",
                fontSize: 14,
                fontWeight: 'bold',
              }}>
              ₹{currencyConverter(r1?.maturityValue)}(+{currencyConverter(r1?.interestAmount)})
            </Text>
          </View>
        </View>
      </View>}
      <Swiper showPagination={true} data={[
        {
          title: 'Invest in Shine',
          image: require('../../assets/image1.jpeg'),
        },
        {
          title: 'Care for Tomorrow',
          image: require('../../assets/image2.jpeg'),
        },
        {
          title: 'Build Your Haven',
          image: require('../../assets/image4.jpeg'),
        },
        {
          title:
            'Save for Forever',
          image: require('../../assets/image5.jpeg'),
        },
      ]}/>
      {!isKyc && kyc(number)}
      <View
        style={{
          backgroundColor: "#23ffe1",
          marginTop: 16,
          padding: 16,
          borderRadius: 8,
        }}>
        <Text
          style={{
            fontFamily: 'roboto',
            fontSize: 18,
            fontWeight: 'bold',
            color: theme.colors.grey0,
          }}>
          Quick Access
        </Text>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: 16,
            justifyContent: 'space-between',
          }}>
          <IconTab icon={'hand-holding-usd'} text={'Investments'} onClick={() => {navigation?.navigate('investments');}} />
          <IconTab
            icon={'exchange-alt'}
            text={'Transactions'}
            onClick={() => {
              navigation.navigate('Transactions');
              console.log('transl')
            }}
          />
          <IconTab
            icon={'coins'}
            text={'withdrawl'}
            onClick={() => {
              navigation.navigate('Withdraws');
            }}
          />
        </View>
        {/* {dummydata.map((item: any, index: number) => (
          <TouchableOpacity key={index}>
            <View
              style={{
                marginTop: 12,
                backgroundColor: theme.colors.background,
                elevation: 5,
                padding: 12,
                height: 200,
                width: '100%',
                borderRadius: 12,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{alignItems: 'flex-start', gap: 6}}>
                <Badge text={item.InvestedDate} />
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'medium',
                    color: theme.colors.grey0,
                  }}>
                  {item.id}
                </Text>
              </View>
              <View style={{alignItems: 'flex-end', gap: 6}}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: theme.colors.grey0,
                  }}>
                  {item.total}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 'medium',
                    color: theme.colors.grey0,
                  }}>
                  {item.InvestedAmount}
                  <Text
                    style={{color: theme.colors.success, fontWeight: 'bold'}}>
                    ({item.Interest})
                  </Text>
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))} */}
      </View>
    </Layout>
  );
};

export default Landing;
