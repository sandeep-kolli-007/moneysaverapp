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
export default function useFetch(props: Iprops) {
  const {
    url,
    Options: {method, data, initialRender},
  } = props;
  const [response, setResponse] = useState();
  const [loading, setLoading] = useState(false);
  const [Refresh, setRefresh] = useState([]);
  // const baseUrl = 'http://10.0.2.2:7268/api';
  const baseUrl = 'https://moneysaver.co.in/';
  // const baseUrl = 'https://b175-2406-b400-b4-bf67-6089-994d-64c9-372c.ngrok-free.app/'
  const fetch = () => {
    setLoading(true);
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