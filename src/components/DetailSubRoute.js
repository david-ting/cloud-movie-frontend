import React, { useContext, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import TopSlide from "./TopSlide";
import { DetailContext } from "../context/detail/DetailProvider";
import { fetchDetailFunc, capitalizeFirstChar } from "../customFunc/all";

function DetailSubRoute(props) {
  const pathname = useLocation().pathname;
  const linkState = useLocation().state;
  const linkDetail = linkState ? linkState.detail : null;
  const { id, type } = useParams();
  const { detail, dispatch } = useContext(DetailContext);

  useEffect(() => {
    if (detail.targetID === "" && Object.keys(detail.result).length === 0) {
      if (linkDetail) {
        dispatch({
          type: "SET_TARGET_ID",
          payload: linkDetail.targetID,
        });
        dispatch({
          type: "SET_RESULT",
          payload: linkDetail.result,
        });
      } else {
        dispatch({
          type: "SET_TARGET_ID",
          payload: id,
        });
        fetchDetailFunc(type, id, dispatch);
      }
    }
  }, [type, id, detail, dispatch, linkDetail]);

  useEffect(() => {
    const display = detail.result.name || detail.result.title;
    let data;
    if (/\/videos\//.test(pathname)) {
      data = "Videos";
    } else if (/\/reviews\/[0-9]+/.test(pathname)) {
      data = "Reviews";
    } else if (/\/reviews/.test(pathname)) {
      data = "Review";
    } else if (/\/recommendations\//.test(pathname)) {
      data = "Recommendations";
    }
    document.title = `${data} | ${display} - ${capitalizeFirstChar(
      type
    )} | Cloud Movie`;
  });

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
