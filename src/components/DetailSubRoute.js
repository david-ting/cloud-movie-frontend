import React, { useContext, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import TopSlide from "./TopSlide";
import { DetailContext } from "../context/detail/DetailProvider";
import { fetchDetailFunc } from "../customFunc/all";

function DetailSubRoute(props) {
  const linkState = useLocation().state;
  const linkDetail = linkState ? linkState.detail : null;
  const { id, type } = useParams();
  const { detail, dispatch } = useContext(DetailContext);

  useEffect(() => {
    if (detail.targetID === "" && Object.keys(detail.result).length === 0) {
      if (linkDetail) {
        console.log("update through link");
        dispatch({
          type: "SET_TARGET_ID",
          payload: linkDetail.targetID,
        });
        dispatch({
          type: "SET_RESULT",
          payload: linkDetail.result,
        });
      } else {
        console.log("update through fetch");
        dispatch({
          type: "SET_TARGET_ID",
          payload: id,
        });
        fetchDetailFunc(type, id, dispatch);
      }
    }
  }, [type, id, detail, dispatch, linkDetail]);

  return (
    <>
      {detail &&
        detail.targetID !== "" &&
        Object.keys(detail.result).length !== 0 && (
          <div className="container mt-3">
            <TopSlide type={type} detail={detail} id={id} />
            {props.children}
          </div>
        )}
    </>
  );
}

export default DetailSubRoute;
