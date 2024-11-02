import {View, Text} from 'react-native';
import React from 'react';

import {Button as RButton} from '@rneui/base';
import {useTheme} from '@rneui/themed';
const Button = ({
  loading,
  icon,
  title,
  style,
  onPress,
  small,
  disabled,
  backgroundColor
}: any) => {
  const {theme} = useTheme();
  return (
    <RButton
      title={title}
      loading={loading}
      loadingProps={{color: theme.colors.primary}}
      onPress={onPress}
      icon={icon ?? <></>}
      iconRight
      disabled={disabled}
      disabledStyle={{backgroundColor: theme.colors.secondary}}
      iconContainerStyle={{marginLeft: 10}}
      titleStyle={{
        fontWeight: '700',
        fontSize: small ? 12 : 20,
        fontFamily: 'roboto',
      }}
      buttonStyle={{
        ...style,
        backgroundColor: backgroundColor??theme.colors.primary,
        borderColor: 'transparent',
        borderWidth: 0,
        borderRadius: 30,
        padding: small ? 6 : 14,
      }}
      containerStyle={{
        width: '100%',
      }}
    />
  );
};

export default Button;
