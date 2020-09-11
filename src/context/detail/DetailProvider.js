import React, { createContext, useReducer } from "react";
import detailReducer from "./detailReducer";

export const DetailContext = createContext();

function DetailProvider(props) {
  const initialState = {
    targetID: "",
    result: {},
  };
  const [detail, dispatch] = useReducer(detailReducer, initialState);

  return (
    <DetailContext.Provider value={{ detail, dispatch }}>
      {props.children}
    </DetailContext.Provider>
  );
}

export default DetailProvider;
