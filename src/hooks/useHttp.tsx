import { useCallback, useState } from 'react';
import { AXIOS_ERROR_CODE } from '../utils/constants';
import { toast } from 'react-toastify';
// let toast:any = mainToast;
const toastOptions:any = {
  position: 'top-right',
};
export default function useHttp() {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse]:any = useState(null);
  const apiFunc = useCallback(async (httpFunc:any, config:any={}) => {
    try {
      setIsLoading(true);
      // await new Promise((resolve) => setTimeout(resolve, 4000));
      const responseGot = await httpFunc(config);
      if (responseGot.statusText !== "OK") {
        toast.error("Something went wrong", toastOptions);
      } else {
        setResponse(responseGot.data);
      }
      setIsLoading(false);
    } catch (err:any) {
      // console.log('ERROR occurred while fetching data', err);
      setIsLoading(false);
      if (err?.code === AXIOS_ERROR_CODE.ERR_NETWORK) toast.error(err?.message, toastOptions);
      toast.error('Something went wrong', toastOptions);
    }
  }, []);
  return {
    response,
    isLoading,
    apiFunc,
  };
}