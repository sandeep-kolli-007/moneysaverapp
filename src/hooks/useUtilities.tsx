import {View, Text} from 'react-native';
import React, { useEffect } from 'react';
import moment from 'moment';

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

  const getAfterYear=(date:string,noOfYears:number)=>{
    const currentDate = moment(date);
    const oneYearLater = currentDate.add(noOfYears, 'year').add(1, 'day');
   return oneYearLater.format('YYYY-MM-DD'); // Format the date as needed
  }
  const getAfterMonth=(date:string,noOfDays:number)=>{
    const curr = moment(date);
  const  oneMonthLater = curr.add(noOfDays,'days')
  return  oneMonthLater.format('YYYY-MM-DD'); // Format the date as needed
  }

  return {currencyConverter,getAfterMonth, RemoveCurrencyConverter, isValidEmail,getAfterYear};
};

export default useUtilities;
