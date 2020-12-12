import React, { useState, useEffect, useRef, useCallback } from "react";
import { unstable_batchedUpdates } from "react-dom";
import styled from "styled-components";
import SearchProvider from "../context/search/SearchProvider";

const StyledSearchWrapper = styled.div`
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: calc(100vh - 55px - 40px - 5px);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: ${(props) => props.beforeBgURL};
    background-repeat: no-repeat;
    background-position: ${(props) => {
      return props.beforeBgPosition ? props.beforeBgPosition : "center";
    }};
    background-size: cover;
    animation: ${(props) => props.beforeAnimation} 3s ease-in;
    animation-fill-mode: both;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: ${(props) => props.afterBgURL};
    background-repeat: no-repeat;
    background-position: ${(props) => {
      return props.afterBgPosition ? props.afterBgPosition : "center";
    }};
    background-size: cover;
    animation: ${(props) => props.afterAnimation} 3s ease-in;
    animation-fill-mode: both;
  }
`;

function SearchWrapper({ bgChoices, children }) {
  const [beforeBg, setBeforeBg] = useState(0);
  const [beforeAnimation, setBeforeAnimation] = useState("none");
  const [afterBg, setAfterBg] = useState(0);
  const [afterAnimation, setAfterAnimation] = useState("none");
  const [current, setCurrent] = useState("before");
  const timeout = useRef();

  const switchBg = useCallback(
    (clicked) => {
      unstable_batchedUpdates(() => {
        if (current === "before") {
          setBeforeAnimation("fadeOut");
          setAfterAnimation("fadeIn");
          setCurrent("after");
          if (clicked !== undefined) {
            setAfterBg(clicked);
            return;
          }
          if (beforeBg === bgChoices.length - 1) {
            setAfterBg(0);
          } else {
            setAfterBg(beforeBg + 1);
          }
        } else {
          setAfterAnimation("fadeOut");
          setBeforeAnimation("fadeIn");
          setCurrent("before");
          if (clicked !== undefined) {
            setBeforeBg(clicked);
            return;
          }
          if (afterBg === bgChoices.length - 1) {
            setBeforeBg(0);
          } else {
            setBeforeBg(afterBg + 1);
          }
        }
      });
    },
    [
      beforeBg,
      setBeforeBg,
      setBeforeAnimation,
      afterBg,
      setAfterAnimation,
      current,
      setCurrent,
      bgChoices.length,
    ]
  );

  useEffect(() => {
    timeout.current = setTimeout(switchBg, 8000);

    return () => {
      clearTimeout(timeout.current);
    };
  }, [switchBg]);

  return (
    <SearchProvider>
      <StyledSearchWrapper
        {...{
          beforeBgURL: bgChoices[beforeBg].backgroundImage,
          beforeBgPosition: bgChoices[beforeBg].backgroundPosition,
          afterBgURL: bgChoices[afterBg].backgroundImage,
          afterBgPosition: bgChoices[afterBg].backgroundPosition,
          beforeAnimation,
          afterAnimation,
        }}
      >
        <div
          className="container d-flex align-items-center justify-content-center flex-column"
          style={{
            height: "100%",
          }}
        >
          {children}
          <div className="changeBackgroundWrapper">
            {bgChoices.map((_c, i) => (
              <div
                key={i}
                className={`changeBackground ${
                  (current === "before" && beforeBg === i) ||
                  (current === "after" && afterBg === i)
                    ? "changeBackgroundActive"
                    : ""
                }`}
                onClick={() => {
                  switchBg(i);
                }}
              ></div>
            ))}
          </div>
        </div>
      </StyledSearchWrapper>
    </SearchProvider>
  );
}

export default SearchWrapper;
