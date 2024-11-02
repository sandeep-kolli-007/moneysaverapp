import axios from 'axios';
import React, {useEffect, useState} from 'react';
import useNoninitialEffect from './useNoninitialEffect';
interface Iprops {
  url: string;
  Options: {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    data?: any;
    initialRender?: boolean;
  };
}
export const baseUrl = 'https://moneysaver.co.in/';

export default function useFetch(props: Iprops) {
  const {
    url,
    Options: {method, data, initialRender},
  } = props;
  const [response, setResponse] = useState();
  const [loading, setLoading] = useState(false);
  const [Refresh, setRefresh] = useState([]);
  // const baseUrl = 'http://10.0.2.2:7268/api';
  // const baseUrl = 'https://23ab-2406-b400-b4-3e5f-28df-3397-91c9-28a9.ngrok-free.app/'
  const fetch = () => {
    setLoading(true);
    console.log(data,'fet')
    axios({
      method: method,
      url: baseUrl + 'api' + url,
      data: data,
    })
      .then(function (response: { data: React.SetStateAction<undefined>; }) {
        setResponse(response.data);
        setLoading(false);
      })
      .catch((error: any) => {
        console.error(error);
        setLoading(false);
      });
  };

  const onRefresh = () => {
    setRefresh([]);
  };

  //initial Render
  useEffect(() => {
    if (initialRender) fetch();
  }, [Refresh]);

  //do not initial Render
  useNoninitialEffect(() => {
    if (!initialRender) fetch();
  }, [Refresh]);

  return {
    response,
    loading,
    onRefresh,
  };
}