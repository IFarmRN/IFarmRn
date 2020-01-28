const userReducer = (state = [], actions) => {
  switch (actions.type) {
    case "ADD_USER_DATA": {
      const newState = [...state, actions.payload];

      return newState;
    }
    case "REMOVE_DATA": {
      const newState = state.filter(item => {
        return item.id != actions.id;
      });

      return newState;
    }

    case "UPDATE_DATA": {
      const newState = state.filter(item => {
        return item.id != actions.id;
      });

      const reloaded = [...newState, actions.payload];

      return reloaded;
    }

    default:
      return state;
  }
};

export default userReducer;
