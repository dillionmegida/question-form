import { initialState } from "./store";

const Reducer = (state, action) => {
    switch (action.type) {
        case "INCREASE_SCORE":
            return {
                ...state,
                score: state.score + action.payload,
            };
        case "UPDATE_SUBMITTED_STATUS":
            return {
                ...state,
                submitted: action.payload,
            };
        case "RESET":
            return initialState;
        default:
            return state;
    }
};

export default Reducer;
