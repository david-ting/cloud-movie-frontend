import React, { useEffect, useState, useRef } from "react";

function YoutubeVideo({ video }) {
  return (
    <div className="youtubeModalWrapper d-flex justify-content-center">
      <div className="ytPreviewOuterWrapper">
        <div className="ytPreviewInnerWrapper">
          <iframe
            className="youtubePreview"
            src={`https://www.youtube.com/embed/${video.key}?controls=1`}
            allowFullScreen
          />
        </div>
      </div>

      <div
        className="modalTriger"
        data-toggle="modal"
        data-target={`#${video.site}-${video.key}-Modal`}
      ></div>
      <div
        className="modal fade"
        id={`${video.site}-${video.key}-Modal`}
        tabIndex="-1"
        role="dialog"
        aria-labelledby={`${video.site}-${video.key}-ModalLabel`}
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title"
                id={`${video.site}-${video.key}-ModalLabel`}
              >
                {video.name}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  document.querySelector(
                    `#${video.site}-${video.key}-ModalVideo`
                  ).src = document.querySelector(
                    `#${video.site}-${video.key}-ModalVideo`
                  ).src;
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <iframe
                id={`${video.site}-${video.key}-ModalVideo`}
                src={`https://www.youtube.com/embed/${video.key}?controls=1`}
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default YoutubeVideo;
