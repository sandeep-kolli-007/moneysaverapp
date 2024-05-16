import {View, Text} from 'react-native';
import React from 'react';
import {Colors, Badge as RBadge} from '@rneui/base';
import {useTheme} from '@rneui/themed';

const Badge = ({text, color}: any) => {
  const {theme} = useTheme();

  return (
    <RBadge
      value={text}
      textStyle={{color: color ? theme.colors.white : theme.colors.grey0}}
      badgeStyle={{
        backgroundColor: color ? theme.colors[color] : theme.colors.secondary,
        margin: 0,
        padding: 0,
      }}
    />
  );
};

export default Badge;
