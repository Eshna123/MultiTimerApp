// src/context/TimerContext.js
import React, { createContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { timerReducer, initialState } from '../reducers/timerReducer';

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(timerReducer, initialState);

  useEffect(() => {
    AsyncStorage.setItem('timers', JSON.stringify(state.timers));
    AsyncStorage.setItem('history', JSON.stringify(state.history));
  }, [state.timers, state.history]);

  useEffect(() => {
    const loadData = async () => {
      const storedTimers = await AsyncStorage.getItem('timers');
      const storedHistory = await AsyncStorage.getItem('history');
      if (storedTimers || storedHistory) {
        dispatch({
          type: 'LOAD_DATA',
          payload: {
            timers: JSON.parse(storedTimers) || [],
            history: JSON.parse(storedHistory) || []
          }
        });
      }
    };
    loadData();
  }, []);

  return (
    <TimerContext.Provider value={{ state, dispatch }}>
      {children}
    </TimerContext.Provider>
  );
};
