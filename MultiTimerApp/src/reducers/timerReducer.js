// src/reducers/timerReducer.js
export const initialState = {
  timers: [],
  history: []
};

export const timerReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_DATA':
      return {
        ...state,
        timers: action.payload.timers,
        history: action.payload.history
      };
    case 'ADD_TIMER':
      return {
        ...state,
        timers: [...state.timers, action.payload]
      };
    case 'UPDATE_TIMER':
      return {
        ...state,
        timers: state.timers.map(timer =>
          timer.id === action.payload.id ? { ...timer, ...action.payload.updates } : timer
        )
      };
    case 'COMPLETE_TIMER':
      return {
        ...state,
        timers: state.timers.map(timer =>
          timer.id === action.payload.id ? { ...timer, status: 'Completed' } : timer
        ),
        history: [...state.history, action.payload.log]
      };
    default:
      return state;
  }
};
