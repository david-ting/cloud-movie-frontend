const detailReducer = (state, action) => {
  switch (action.type) {
    case "SET_TARGET_ID":
      return {
        ...state,
        targetID: action.payload,
      };
    case "SET_RESULT":
      return {
        ...state,
        result: action.payload,
      };
    default:
      return state;
  }
};

export default detailReducer;
