import {View, Text, ScrollView, TouchableWithoutFeedback} from 'react-native';
import React from 'react';
import Layout from '../shared/Layout';
import {useTheme} from '@rneui/themed';
import Input from '../shared/Input';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Transactions = () => {
  const {theme} = useTheme();
  return (
    <Layout
      title={'Transactions'}
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
            Recent Savings
          </Text>
          <Input placeholder="Search" icon="search" />
          <ScrollView>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((y, i) => (
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
                      name="long-arrow-alt-down"
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
                        WithDrawn
                      </Text>
                      <Text
                        style={{
                          color: theme.colors.grey0,
                          fontSize: 12,
                          fontFamily: 'roboto',
                        }}>
                        23rd April
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
                        ₹1,00,000
                      </Text>
                      <Text style={{fontSize: 12, color: theme.colors.success}}>
                        Success
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
