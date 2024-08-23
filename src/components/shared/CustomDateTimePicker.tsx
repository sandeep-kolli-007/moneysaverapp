import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Input from './Input';
import {Pointer} from 'react-native-gifted-charts/src/Components/common/Pointer';

const CustomDateTimePicker = ({onDateChange}) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const oneMonthLater = new Date();
  oneMonthLater.setDate(oneMonthLater.getDate() + 30);
  console.log(oneMonthLater);
  const onChange = (event: any, selectedDate: Date) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    onDateChange(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };
  useEffect(() => {
    setDate(oneMonthLater);
  }, []);
  return (
    <View style={styles.container}>
      {/* <TouchableOpacity onPress={showDatepicker} style={styles.button}>
        <Text style={styles.buttonText}>Select Date</Text>
      </TouchableOpacity> */}
      {/* <Text style={styles.dateText}>Selected Date: {date.toDateString()}</Text> */}
      <TouchableOpacity style={{width: '100%'}} onPress={showDatepicker}>
        <Input
          value={date.toDateString()}
          label={'Maturity Date'}
          readonly
          style={{pointerEvents: 'none'}}
          textAlign={'right'}
        />
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChange}
          minimumDate={oneMonthLater}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  dateText: {
    fontSize: 18,
  },
});

export default CustomDateTimePicker;
