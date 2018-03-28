const defaultState = {
  sortBusinessesBy: 'None'
};
const businessesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'REGISTER_A_BUSINESS': {

    }
    case 'REMOVE_A_BUSINESS': {

    }
    case 'EDIT_A_BUSINESS': {

    }
    case 'RETURN_CURRENT_BUSINESSES': {
    }
    default: {
      return state;
    }
  }
};

export default businessesReducer;
