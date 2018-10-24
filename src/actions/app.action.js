const INITIALIZE_APP = 'app/INITIALIZE_APP';

const INITIAL_STATE = {
  initializeApp: false
};

export default function AppReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case INITIALIZE_APP:
      return { ...state, initializeApp: true };
    default:
      return state;
  }
}

export const startApp = () => ({
  type: INITIALIZE_APP
});
