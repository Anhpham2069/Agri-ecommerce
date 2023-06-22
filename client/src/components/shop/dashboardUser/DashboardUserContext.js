export const dashboardUserState = {
  userDetails: null,
  loading: false,
  OrderByUser: null,
  statusOder:""
};

export const dashboardUserReducer = (state, action) => {
  switch (action.type) {
    case "userDetails":
      return {
        ...state,
        userDetails: action.payload,
      };
      case "statusOder":
      return {
        ...state,
        userDetails: action.payload,
      };
    case "OrderByUser":
      return {
        ...state,
        OrderByUser: action.payload,
      };
    case "loading":
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};
