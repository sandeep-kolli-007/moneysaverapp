import {View, Text} from 'react-native';
import React from 'react';

const useUtilities = () => {
  const currencyConverter = (number: number) =>
    new Intl.NumberFormat('en-IN', {}).format(number);

  const RemoveCurrencyConverter = (string: string) => {
    const numberWithoutCommas = string.replace(/,/g, '');
    const number = parseFloat(numberWithoutCommas);
    return number;
  };

  const isValidEmail = (email: string) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return {currencyConverter, RemoveCurrencyConverter, isValidEmail};
};

export default useUtilities;
