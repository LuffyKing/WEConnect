const defaultState = {
  sortBusinessesBy: 'None'
};
const filtersReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SORT_BY_LOCATION': {
      return {


      };
    }
    case 'SORT_BY_BOTH': {
      return {

      };
    }
    case 'SORT_BY_CATEGORY': {

      };
    }
    default: {
      return state;
    }
  }
};

export default filtersReducer;
