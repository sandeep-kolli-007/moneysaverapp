import {useTheme} from '@rneui/themed';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

function IconTab({icon, text, onClick}: any) {
  const {theme} = useTheme();

  return (
    <TouchableOpacity onPress={onClick}>
      <View style={{width: 70}}>
        <Icon
          name={icon}
          size={30}
          color={theme.colors.white}
          style={{
            borderRadius: 8,
            padding: 20,
            backgroundColor: theme.colors.primary,
          }}
        />
        <Text style={{fontSize: 12,textAlign:"center"}}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default IconTab;
