import { createStore, combineReducers } from 'redux';
import placeReducer from './Redux/Reducers/PlaceReducer';
import UserReducer from './Redux/Reducers/UserReducer';
import LinksReducer from './Redux/Reducers/LinksReducer';



const rootReducer = combineReducers({
    places: placeReducer,
    user: UserReducer,
    links: LinksReducer
    
});
const configureStore = () => {
    return createStore(rootReducer);
}


export default configureStore;