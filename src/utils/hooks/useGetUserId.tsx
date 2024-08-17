import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';

const useGetUserId = () => {
  const [userId, setUserId] = useState<number>();

  const loadUserId = async () => {
    try {
      const storedValue = await AsyncStorage.getItem('userDetailId');
      if (storedValue !== null) {
        setUserId(Number(storedValue)); // Update state
      }
    } catch (err) {
      console.error('Failed to load data', err);
    }
  };

  useEffect(() => {
    loadUserId();
  }, []);

  return userId;
};

export default useGetUserId;
