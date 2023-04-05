/**
 * This is a custom React hook that fetches data from a URL when a specified variable changes, with an
 * optional debounce delay.
 * @param {string} url - The URL of the API endpoint to fetch data from.
 * @param {T} variable - The variable parameter is a value that is being watched for changes. When this
 * value changes, the useFetchOnChange hook will trigger a new fetch request to the specified URL. The
 * fetched data will then be stored in the state variable called "data".
 * @param {number} [debounceDelay=500] - The debounceDelay parameter is an optional parameter that
 * specifies the delay in milliseconds before the fetch request is made after the variable has changed.
 * It is set to a default value of 500 milliseconds if not provided. This is used to prevent making too
 * many requests in a short period of time and to optimize performance
 * @returns The function `useFetchOnChange` returns an array with four elements: `data`, `loading`,
 * `error`, and `refetch`.
 */
import { useState, useEffect } from 'react';

function useFetchOnChange<T>(
  url: string,
  variable: T,
  userToken: string,
  debounceDelay: number = 100
): [T, boolean, Error | null, () => void] {
  const [data, setData] = useState<T>(variable);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    if (variable !== data) {
      setLoading(true);
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        console.log('Fetching data from URL: ' + url);
        fetch(
            url + variable +"?token="+userToken,
            {
                method: 'POST',
            }
            )
          .then((response) => response.json())
          .then((result) => setData(variable))
          .catch((error) => setError(error))
          .finally(() => setLoading(false));
      }, debounceDelay);
    }
    return () => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
    };
  }, [url, variable, debounceDelay, data]);

  const refetch = () => setData(variable);

  return [data, loading, error, refetch];
}

export default useFetchOnChange;