// placeReducer.js
import { ADD_PLACE, REMOVE_PLACE } from '../types';

const initialState = {
    placeName: '',
    places: []
};
const placeReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PLACE:
            return {
                ...state,
                places: [...state.places, !state.places.includes(action.payload) ? action.payload : null].filter(item => typeof item === 'string')
            };

        case REMOVE_PLACE:
            return {
                ...state,
                places: state.places?.map((place) => {
                    if (place !== action.payload)
                        return place;
                    else {
                        return
                    }
                }).filter(item => typeof item === 'string')
            };
        default:
            return state;
    }
}
export default placeReducer;