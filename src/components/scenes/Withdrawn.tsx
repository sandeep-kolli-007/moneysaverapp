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

const Withdrawn = () => {
  const {theme} = useTheme();
  return (
    <Layout
      title="Withdrawn"
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
            Recent Withdraws
          </Text>
          {/* <Input placeholder="Search" icon="search" /> */}
          <ScrollView>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((y, i) => (
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
                    marginHorizontal:1
                  }}>
                  <View
                    style={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View>
                      <View
                        style={{
                          margin: 0,
                          padding: 0,
                          display: 'flex',
                          flexDirection: 'row',
                          gap: 4,
                        }}>
                        <Badge text={'23rd April'} />
                        {/* <Badge text={'Matured'} color={'success'} /> */}
                        <Badge text={'Not matured'} color={'error'} />
                      </View>
                      <Text
                        style={{
                          color: theme.colors.grey0,
                          fontSize: 18,
                          fontFamily: 'roboto',
                          marginTop: 4,
                          fontWeight: 'bold',
                        }}>
                        ₹1,50,000
                      </Text>
                      <Text
                        style={{
                          color: theme.colors.grey0,
                          fontSize: 14,
                          fontFamily: 'roboto',
                        }}>
                        ₹1,00,000
                        <Text
                          style={{
                            fontSize: 12,
                            fontFamily: 'roboto',
                            color: theme.colors.success,
                            fontWeight: 'bold',
                          }}>
                          (+5,000)
                        </Text>
                      </Text>
                    </View>
                    <View
                      style={{
                        alignItems: 'stretch',
                        display: 'flex',
                        flexDirection: 'column',
                      }}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: 'bold',
                          color: theme.colors.grey0,
                        }}>
                        IN000001
                      </Text>
                      <Button
                        small
                        title="Withdraw"
                        style={{marginTop: 4}}
                        disabled
                      />
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
