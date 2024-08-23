import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import {usePhoneVerification} from './usePhoneVerification';
import auth from '@react-native-firebase/auth';

// Define initial state
const initialState = {
  phoneNumber: '',
  roiPerYear:0,
  roiPerDay:0
};

// Define reducer
const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'update':
      return {...state, [action.key]: action.payload};
    default:
      return state;
  }
};

// Create context
const StoreContext = createContext({});

// Create custom hook for using the store
const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

// Create provider component
const StoreProvider = ({children}: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [user, setUser] = useState<any>({});
  //   const {user}: any = usePhoneVerification();

  useEffect(() => {
    if (user?.phoneNumber) {
      dispatch({
        type: 'update',
        payload: user?.phoneNumber.slice(-10),
        key: 'phoneNumber',
      });
    }
  }, [user]);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user: any) => {
      setUser(user);
    });
    return subscriber;
  }, []);

  return (
    <StoreContext.Provider value={{state, dispatch}}>
      {children}
    </StoreContext.Provider>
  );
};

export {StoreProvider, useStore};
