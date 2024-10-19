import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Layout from '../shared/Layout';
import {useTheme} from '@rneui/themed';
import Input from '../shared/Input';
import Badge from '../shared/Badge';
import Button from '../shared/Button';
import {useStore} from '../../hooks/useStore';
import useFetch from '../../hooks/useFecth';
import Spinner from 'react-native-loading-spinner-overlay';
import useUtilities from '../../hooks/useUtilities';
const {
  currencyConverter,
  RemoveCurrencyConverter,
  getAfterMonth,
  getAfterYear,
} = useUtilities();
const Withdrawn = () => {
  const {theme} = useTheme();
  const {state, dispatch}: any = useStore();
  const {response, loading, onRefresh}: any = useFetch({
    url: `/User/GetWithDraws?mobile=${state.phoneNumber}`, //try to make constantsUser/GetInvestments?mobile=9999999999
    Options: {method: 'GET', initialRender: true},
  });
  console.log(response, 'GetWithDraws');
  return (
    <Layout
      title="Withdrawn"
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
            Recent Withdraws
          </Text>
          {/* <Input placeholder="Search" icon="search" /> */}
          <ScrollView>
            {response?.length > 0 &&
              response.map((item: any, i: any) => (
                <TouchableOpacity key={i}>
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
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View
                        style={{
                          alignItems: 'stretch',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-evenly',
                        }}>
                        <View
                          style={{
                            margin: 0,
                            padding: 0,
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 4,
                          }}>
                          <Badge
                            text={new Date(
                              item.maturityDate.split('T')[0],
                            ).toLocaleDateString('en-US', {
                              month: 'short', // Abbreviated month (e.g., "Aug")
                              day: 'numeric', // Numeric day of the month (e.g., "22")
                              year: 'numeric',
                            })}
                          />
                          {/* <Badge text={'Matured'} color={'success'} /> */}
                          <Badge
                            text={
                              new Date() > new Date(item.maturityDate)
                                ? 'matured'
                                : 'Not matured'
                            }
                            color={
                              new Date() > new Date(item.maturityDate)
                                ? 'success'
                                : 'error'
                            }
                          />
                        </View>
                        <Text
                          style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            textAlign: 'left',
                            color: theme.colors.grey0,
                          }}>
                          {item.policyNumber}
                        </Text>
                        {/* <Button
                        small
                        title="Withdraw"
                        style={{marginTop: 4}}
                        disabled
                      /> */}
                      </View>
                      <View>
                        <Text
                          style={{
                            color: theme.colors.grey0,
                            fontSize: 22,
                            fontFamily: 'roboto',
                            marginTop: 4,
                            fontWeight: 'bold',
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
                            (+
                            {currencyConverter(
                              item.maturityValue - item.amount,
                            )}
                            )
                          </Text>
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
          </ScrollView>
        </>
      }
    />
  );
};

export default Withdrawn;
