import React, { createContext, useReducer, useContext } from "react";
import Reducer from "./reducer";

const initialState = {
    submitted: false,
    score: 0,
};

const store = createContext(initialState);
const { Provider } = store;

const Store = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, initialState);

    return <Provider value={[ state, dispatch ]}>{children}</Provider>;
};

// export const useGlobalState = () => useContext(Store);

export { initialState, store };

export default Store;
