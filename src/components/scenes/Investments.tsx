import React from 'react';
import Layout from '../shared/Layout';
import {useTheme} from '@rneui/themed';
import Input from '../shared/Input';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {View, Text, ScrollView, TouchableWithoutFeedback} from 'react-native';
import useFetch from '../../hooks/useFecth';
import {useStore} from '../../hooks/useStore';
import useUtilities from '../../hooks/useUtilities';
import Spinner from 'react-native-loading-spinner-overlay';
function Investments() {
  const {theme} = useTheme();
  const {state, dispatch}: any = useStore();
  const {currencyConverter, RemoveCurrencyConverter, getAfterYear} =
    useUtilities();
  const {response, loading, onRefresh}: any = useFetch({
    url: `/User/GetInvestments?mobile=${state.phoneNumber}`, //try to make constantsUser/GetInvestments?mobile=9999999999
    Options: {method: 'GET', initialRender: true},
  });
  console.log(response && response[0],"res",loading);
 
  return (
    <Layout
      title={'Investments'}
      bottomsheet={
        <>
        <Spinner
          visible={loading}
          textContent={'Loading...'}
        />
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
                    elevation: 3,
                    borderRadius: 16,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 12,
                    marginHorizontal:1
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
