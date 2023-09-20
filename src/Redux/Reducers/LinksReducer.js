// placeReducer.js
import { ADD_LINKS } from '../types';

const initialState = {
    linksData: {}
};
const LinksReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_LINKS:
            return {
                ...state,
                userData: { ...state.linksData, ...action.linksData }
            };
        default:
            return state;
    }
}
export default LinksReducer;