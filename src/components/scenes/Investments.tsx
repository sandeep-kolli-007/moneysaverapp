import React from 'react';
import Layout from '../shared/Layout';
import {useTheme} from '@rneui/themed';
import Input from '../shared/Input';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {View, Text, ScrollView, TouchableWithoutFeedback} from 'react-native';
import useFetch from '../../hooks/useFecth';
import {useStore} from '../../hooks/useStore';
import useUtilities from '../../hooks/useUtilities';

function Investments() {
  const {theme} = useTheme();
  const {state, dispatch}: any = useStore();
  const {currencyConverter, RemoveCurrencyConverter, getAfterYear} =
    useUtilities();
  const {response, loading, onRefresh}: any = useFetch({
    url: `/User/GetInvestments?mobile=9999999999`, //try to make constantsUser/GetInvestments?mobile=9999999999
    Options: {method: 'GET', initialRender: true},
  });
  console.log(response && response[0]);
  const item = {
    amount: 1000,
    dailyTenure: '2',
    isActive: true,
    maturityDate: '2024-09-20T05:16:09.127',
    maturityValue: 1200,
    phone: '8985792422',
    policyNumber: 'INR000001',
    recurring: false,
    roiDaily: '2',
    roiYearly: '',
    startDate: '2024-08-20T05:16:09.127',
    transactionId: '123456214',
    yearlyTenure: '0',
  };
  return (
    <Layout
      title={'Investments'}
      bottomsheet={
        <>
          <Text
            style={{
              fontFamily: 'roboto',
              fontSize: 18,
              fontWeight: 'bold',
              color: theme.colors.grey0,
              marginBottom: 12,
            }}>
            Saved Investments
          </Text>
          {/* <Input placeholder="Search" icon="search" /> */}
          <ScrollView>
            {response && response.map((item:any, i:any) => (
              <TouchableWithoutFeedback key={i}>
                <View
                  style={{
                    display: 'flex',
                    backgroundColor: theme.colors.background,
                    padding: 12,
                    elevation: 5,
                    borderRadius: 16,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 12,
                  }}>
                  <View
                    style={{
                      borderRadius: 30,
                      borderColor: theme.colors.grey0,
                      width: 50,
                      height: 50,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: theme.colors.primary,
                    }}>
                    <Icon
                      name="rupee-sign"
                      size={24}
                      color={theme.colors.white}
                    />
                  </View>
                  <View
                    style={{
                      width: '75%',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View>
                      <Text
                        style={{
                          color: theme.colors.grey0,
                          fontSize: 16,
                          fontFamily: 'roboto',
                          fontWeight: 'bold',
                        }}>
                        {item.policyNumber}
                      </Text>
                      <Text
                        style={{
                          color: theme.colors.grey0,
                          fontSize: 12,
                          fontFamily: 'roboto',
                        }}>
                        {new Date(item.maturityDate).toLocaleDateString(
                          'en-US',
                          {
                            month: 'short', // Abbreviated month (e.g., "Aug")
                            day: 'numeric', // Numeric day of the month (e.g., "22")
                            year:"2-digit"
                          },
                        )}
                      </Text>
                    </View>
                    <View
                      style={{
                        alignItems: 'flex-end',
                        display: 'flex',
                        flexDirection: 'column',
                      }}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: 'bold',
                          color: theme.colors.grey0,
                        }}>
                        ₹{currencyConverter(item.maturityValue)}
                      </Text>
                      <Text
                        style={{
                          color: theme.colors.grey0,
                          fontSize: 14,
                          fontFamily: 'roboto',
                        }}>
                        ₹{currencyConverter(item.amount)}
                        <Text
                          style={{
                            fontSize: 12,
                            fontFamily: 'roboto',
                            color: theme.colors.success,
                            fontWeight: 'bold',
                          }}>
                          (+{currencyConverter(item.maturityValue - item.amount)})
                        </Text>
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </ScrollView>
        </>
      }></Layout>
  );
}

export default Investments;
