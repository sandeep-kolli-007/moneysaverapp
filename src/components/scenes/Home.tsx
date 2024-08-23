import {View, Text, Keyboard} from 'react-native';
import React, {Component, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Landing from './Landing';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useTheme} from '@rneui/themed';
import Mobile from './Mobile';
import Transactions from './Transactions';
import Withdrawn from './Withdrawn';
import Account from './Account';
import Invest from './Invest';
import useBiometricAuthentication from '../../hooks/useBiometricAuthentication';
const Tab = createBottomTabNavigator();
const isTesting = true;
const Home = () => {
  const {theme} = useTheme();
  const [authenticateWithBiometrics, isBiometricAuthenticated] =
    useBiometricAuthentication();
  const menu = [
    {
      name: 'Dashboard',
      icon: 'chart-line',
      Component: Landing,
      showLabel: true,
    },
    {
      name: 'Transactions',
      icon: 'exchange-alt',
      Component: Transactions,
      showLabel: true,
    },
    {
      name: 'Invest',
      Component: Invest,
      showLabel: false,
    },
    {
      name: 'Withdraws',
      icon: 'download',
      Component: Withdrawn,
      showLabel: true,
    },
    {
      name: 'Account',
      icon: 'user-alt',
      Component: Account,
      showLabel: true,
    },
  ];
  useEffect(() => {
    typeof authenticateWithBiometrics == 'function' &&
      !isTesting &&
      authenticateWithBiometrics();
  }, []);
  return (
    <>
      {(isBiometricAuthenticated || isTesting) && (
        <Tab.Navigator>
          {menu.map(item => (
            <Tab.Screen
              key={item.name}
              name={item.name}
              component={item.Component}
              options={{
                tabBarHideOnKeyboard: true,
                headerShown: false,
                tabBarStyle: {
                  backgroundColor: theme.colors.secondary,
                  // display: 'none',
                },
                tabBarIcon: ({focused, color, size}) =>
                  !item.icon ? (
                    !Keyboard.isVisible() && (
                      <View
                        style={{
                          backgroundColor: theme.colors.secondary, // Example background color for the circular button
                          width: 70,
                          elevation: 5,
                          height: 70,
                          borderRadius: 35, // Half the width and height to make it circular
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginBottom: 25,
                        }}>
                        <Icon
                          name="rupee-sign"
                          size={30}
                          color={
                            focused ? theme.colors.primary : theme.colors.grey0
                          }
                        />
                      </View>
                    )
                  ) : (
                    <>
                      <Icon
                        name={focused ? item.icon : item.icon}
                        size={18}
                        color={
                          focused ? theme.colors.primary : theme.colors.grey0
                        }
                      />
                    </>
                  ),
                tabBarActiveTintColor: theme.colors.primary,
                tabBarLabel: item.name === 'Invest' ? '' : item.name,
              }}
            />
          ))}
        </Tab.Navigator>
      )}
    </>
  );
};

export default Home;
