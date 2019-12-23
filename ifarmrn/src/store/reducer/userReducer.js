const initialState = {
  Proprietario: "",
  Nome_da_Propriedade: "",
  Localização: "",
  Hectares: "",
  Contato: "",
  Foto: ""
};

const userReducer = (state = [], actions) => {
  switch (actions.type) {
    case "ADD_USER_DATA": {
      const newState = [...state, actions.payload];
      return newState;
    }
    default:
      return state;
  }
};

export default userReducer;
