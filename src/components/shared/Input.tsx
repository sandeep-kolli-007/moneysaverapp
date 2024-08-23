import {View, Text} from 'react-native';
import React from 'react';
import {Input as RInput} from '@rneui/base';
import {useTheme} from '@rneui/themed';

const Input = ({
  label,
  style,
  placeholder,
  keyboardType,
  inputMode,
  onChangeText,
  onChange,
  maxLength,
  icon,
  value,
  disabled,
  textAlign,
  inputContainerStyle,
  onFocus,readOnly,onClick
}: any) => {
  const {theme} = useTheme();
  return (
    <RInput
      //   style={{width: '100%'}}
      inputContainerStyle={{
        borderColor: theme.colors.primary,
        borderWidth: 1,
        borderRadius: 12,
        paddingLeft: icon ? 24 : undefined,...inputContainerStyle,
      }}
      keyboardType={keyboardType}
      inputStyle={{
        fontSize: 22,
        paddingVertical: 12,
        fontWeight: 'bold',
        fontFamily: 'roboto',
        textAlign: textAlign,
        paddingHorizontal: 24,
        color:theme.colors.grey0
      }}
      placeholderTextColor={theme.colors.grey1}
      containerStyle={{...style}}
      labelStyle={{color: '#707070', marginBottom: 6}}
      label={label}
      placeholder={placeholder}
      maxLength={maxLength ?? undefined}
      leftIcon={
        icon
          ? {
              type: 'font-awesome',
              name: icon,
              size: 24,
              color: theme.colors.primary,
            }
          : undefined
      }
      onChangeText={value => onChangeText && onChangeText(value)}
      onChange={(e:any)=>onChange && onChange(e?.currentTarget?.value)}
      value={value}
      disabled={disabled}
      disabledInputStyle={{
        backgroundColor: theme.colors.secondary,
        borderRadius: 12,
      }}
      inputMode={inputMode}
      onFocus={onFocus}
      readOnly={readOnly}
      onPress={onClick}
    />
  );
};

export default Input;
