import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Button from '../shared/Button';
import Vector from '../../assets/vector1.svg';
import { useNavigation } from '@react-navigation/native';

const GetStarted = () => {
  const navigation:any = useNavigation()
    return (
        <View
          style={{
            justifyContent: 'space-between',
            backgroundColor: 'white',
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            padding: 32,
          }}>
          <Vector width={400} height={400} />
          <View>
            <Text style={styles.heading}>Welcome Aboard</Text>
            <Text style={styles.subtitle}>
              Lets make saving and budgeting a breeze.
            </Text>
          </View>
          <Button
            title={'Get Started'}
            style={{marginTop: 24}}
            onPress={() => {
            navigation.navigate('mobile')
            }}
          />
        </View>
      );
}
const styles = StyleSheet.create({
    heading: {
      fontSize: 38,
      fontWeight: 'bold',
      textAlign: 'center',
      fontFamily: 'roboto',
    },
    subtitle: {
      fontSize: 18,
      fontWeight: 'light',
      textAlign: 'center',
      fontFamily: 'roboto',
      marginHorizontal: 16,
      marginTop: 16,
    },
  });

export default GetStarted