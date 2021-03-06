import { AsyncStorage } from "react-native";
import { combineReducers, createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import userReducer from "./reducer/userReducer";

const persistConfig = {
  key: "main",
  storage: AsyncStorage
};

const combinedReducers = combineReducers({
  userData: userReducer
});

const persistedReducer = persistReducer(persistConfig, combinedReducers);

const store = createStore(persistedReducer);

const persistor = persistStore(store);

export { store, persistor };
