import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import businessesReducer from '../reducers/businesses';
import reviewsReducer from '../reducers/reviews';
import filtersReducer from '../reducers/filters';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const configureStore = () => {
  const store = createStore(combineReducers({
    auth: authReducer,
    business: businessesReducer,
    reviews: reviewsReducer,
    filters: filtersReducer
  }), composeEnhancers(applyMiddleware(thunk)));
  return store;
};
export default configureStore;
