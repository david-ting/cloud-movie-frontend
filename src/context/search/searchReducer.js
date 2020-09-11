const searchReducer = (state, action) => {
  switch (action.type) {
    case "SET_QUERY":
      return {
        ...state,
        query: action.payload,
      };
    case "SET_LIST":
      return {
        ...state,
        list: action.payload,
      };
    case "SET_PAGE_INFO":
      return {
        ...state,
        pageInfo: action.payload,
      };
    default:
      return state;
  }
};

export default searchReducer;
