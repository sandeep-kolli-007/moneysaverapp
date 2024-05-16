import {
  View,
  Text,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import React from 'react';
import Layout from '../shared/Layout';
import {useTheme} from '@rneui/themed';
import Input from '../shared/Input';
import Button from '../shared/Button';
import useUtilities from '../../hooks/useUtilities';

const Invest = () => {
  const {theme} = useTheme();
  const {currencyConverter, RemoveCurrencyConverter} = useUtilities();
  const [data, setData] = React.useState({amount: 660, roi: 6});
  const maxYears = 10;
  const maxMonths = 11;
  return (
    <Layout
      title={'Invest'}
      noPaddingBottomSheet
      bottomsheet={
        <>
          <ScrollView style={{flex: 1, padding: 32}}>
            <KeyboardAvoidingView
              behavior={'height'}
              keyboardVerticalOffset={-800}
              style={{flex: 1}}>
              <View>
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
                  ₹1,00,500
                </Text>
                <Input
                  keyboardType={'numeric'}
                  placeholder="Invest Amount"
                  icon={'rupee'}
                  textAlign={'right'}
                  maxLength={10}
                  value={currencyConverter(data.amount)}
                  onChangeText={(v: string) => {
                    // Alert.alert(String(RemoveCurrencyConverter(v)));
                  }}
                />
                <View style={{display: 'flex', flexDirection: 'row'}}>
                  <Input
                    placeholder="Years"
                    style={{width: '50%'}}
                    keyboardType={'numeric'}
                    onChangeText={(value: any) => {
                      console.log(value >= maxYears ? maxYears : value);
                    }}
                  />
                  <Input
                    placeholder="Months"
                    style={{width: '50%'}}
                    keyboardType={'numeric'}
                    onChangeText={(value: any) => {
                      console.log(value >= maxMonths ? maxMonths : value);
                    }}
                  />
                </View>
                <Button title="Invest"></Button>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </>
      }
    />
  );
};

export default Invest;
