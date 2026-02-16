import React, { useEffect } from 'react';

export default function useLocalStorage(key, initialValue) {
  const [state, setState] = React.useState(() => {
    // Initialize the state
    try {
      if (typeof window !== 'undefined') {
        const value = window.localStorage.getItem(key);
        // Check if the local storage already has any values,
        // otherwise initialize it with the passed initialValue
        return value ? JSON.parse(value) : initialValue;
      }
    } catch (error) {
      console.log(error);
    }
    return initialValue; // Return initialValue if window is not available or if an error occurs
  });

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(state));
      }
    } catch (error) {
      console.log(error);
    }
  }, [key, state]);

  const setValue = value => {
    try {
      // If the passed value is a callback function,
      // then call it with the existing state.
      const valueToStore = value instanceof Function ? value(state) : value;
      setState(valueToStore);
    } catch (error) {
      console.log(error);
    }
  };

  return [state, setValue];
}
