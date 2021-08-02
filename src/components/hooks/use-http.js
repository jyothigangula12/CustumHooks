import { useCallback, useState } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback( async (requestConfig, getData) => {
    setIsLoading(true);
    setError(null);
     console.log(requestConfig.url,requestConfig.headers,requestConfig.body)
     try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : 'GET',
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      }); 
     /*    try {
      const response = await fetch(
        "https://react-http-cbdbb-default-rtdb.europe-west1.firebasedatabase.app/tasks.json"
      );  */

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();
         getData(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  },[]);
 
  return {
    error,
    isLoading,
    sendRequest,
  };
};
export default useHttp;
