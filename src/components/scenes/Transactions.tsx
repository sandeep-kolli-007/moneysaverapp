import {View, Text, ScrollView, TouchableWithoutFeedback} from 'react-native';
import React from 'react';
import Layout from '../shared/Layout';
import {useTheme} from '@rneui/themed';
import Input from '../shared/Input';
import Icon from 'react-native-vector-icons/FontAwesome5';
import useFetch from '../../hooks/useFecth';
import {useStore} from '../../hooks/useStore';
import useUtilities from '../../hooks/useUtilities';
import Spinner from 'react-native-loading-spinner-overlay';

const Transactions = () => {
  const {theme} = useTheme();
  const {state, dispatch}: any = useStore();
  const {response, loading, onRefresh}: any = useFetch({
    url: `/User/GetTransactions?mobile=${state.phoneNumber}`, //try to make constantsUser/GetInvestments?mobile=9999999999
    Options: {method: 'GET', initialRender: true},
  });
  console.log(response, 'transactiosn');
  const {
    currencyConverter,
    RemoveCurrencyConverter,
    getAfterMonth,
    getAfterYear,
  } = useUtilities();
  return (
    <Layout
      title={'Transactions'}
      bottomsheet={
        <>
          <Spinner visible={loading} textContent={'Loading...'} />
          <Text
            style={{
              fontFamily: 'roboto',
              fontSize: 18,
              fontWeight: 'bold',
              color: theme.colors.grey0,
              marginBottom: 12,
            }}>
            Recent Transactions
          </Text>
          {/* <Input placeholder="Search" icon="search" /> */}
          <ScrollView>
            {response?.length > 0 &&
              response.map((item: any, i: number) => (
                <TouchableWithoutFeedback key={i}>
                  <View
                    style={{
                      display: 'flex',
                      backgroundColor: theme.colors.background,
                      padding: 12,
                      elevation: 3,
                      borderRadius: 16,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 12,
                      marginHorizontal: 1,
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
                        opacity: 0.75,
                      }}>
                      <Icon
                        name="long-arrow-alt-down"
                        size={24}
                        color={theme.colors.white}
                      />
                    </View>
                    <View
                      style={{
                        width: '80%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View>
                        <Text
                          style={{
                            color: theme.colors.success,
                            fontSize: 16,
                            fontFamily: 'roboto',
                            fontWeight: 'bold',
                          }}>
                          Credited
                        </Text>
                        <Text
                          style={{
                            color: theme.colors.grey0,
                            fontSize: 10,
                            fontFamily: 'roboto',
                          }}>
                          {new Date(item.date.split('T')[0]).toLocaleDateString(
                          'en-US',
                          {
                            month: 'short', // Abbreviated month (e.g., "Aug")
                            day: 'numeric', // Numeric day of the month (e.g., "22")
                            year:"numeric"
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
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: theme.colors.grey0,
                          }}>
                          ₹{currencyConverter(item.amount)}
                        </Text>
                        <Text
                          style={{fontSize: 10, color: theme.colors.primary}}>
                          {item?.order_Id}
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
};

export default Transactions;
