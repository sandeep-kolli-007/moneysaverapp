import {View, Text} from 'react-native';
import React, {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {useTheme} from '@rneui/themed';
const Dropdown = ({items,onChangeText}: any) => {
  const {theme} = useTheme();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  //   const [items, setItems] = useState([
  //     {label: 'Apple', value: 'apple'},
  //     {label: 'Banana', value: 'banana'}
  //   ]);

  return (
    <View style={{paddingHorizontal: 10}}>
      <DropDownPicker onSelectItem={onChangeText}
        containerStyle={{
          marginBottom: 20,

          //   borderColor:"red"
        }}
        style={{
          borderColor: theme.colors.primary,
          backgroundColor: 'transparent',
        }}
        labelStyle={{color:theme.colors.grey0}}
        placeholderStyle={{color:theme.colors.grey1}}
        zIndex={1000}
        textStyle={{
          fontFamily: 'roboto',
          fontSize: 16,
          color: theme.colors.grey0,
        }}
        placeholder="Account Type"
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
      />
    </View>
  );
};

export default Dropdown;
