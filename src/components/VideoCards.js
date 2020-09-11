import React, { useEffect, useState, useRef } from "react";
import { GrView } from "react-icons/gr";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import YoutubeVideo from "./YoutubeVideo";
import {
  fetchYoutubeVidoDetail,
  formatDate,
  formatNumber,
} from "../customFunc/all";

function VideoCards({ videos }) {
  const [videosDetail, setVideosDetail] = useState();

  useEffect(() => {
    let videosDetailHolder = [];
    async function fetchMultipleVideosDetail() {
      for (let i = 0; i < videos.length; i++) {
        await fetchYoutubeVidoDetail(videos[i].key, videosDetailHolder);
      }
    }

    fetchMultipleVideosDetail().then(() => {
      setVideosDetail(videosDetailHolder);
    });
  }, [videos]);

  return (
    <>
      {videosDetail &&
        videosDetail.length === videos.length &&
        videos.map((video, index) => {
          const {
            publishedAt,
            publishedBy,
            description,
            duration,
            viewCount,
            likeCount,
            dislikeCount,
          } = videosDetail[index];

          return (
            <div
              className="grayBorderWrapper my-3 d-flex flex-column flex-md-row"
              key={`${video.site}${video.key}`}
            >
              <YoutubeVideo video={video} />
              <div className="ml-3 d-flex flex-column justify-content-center">
                <h5>{video.name}</h5>
                {
                  <p>
                    {video.type}{" "}
                    {publishedAt ? `• ${formatDate(publishedAt)}` : null}
                  </p>
                }
                {
                  <div className="d-flex flex-column flex-lg-row">
                    {viewCount && (
                      <div>
                        <GrView /> {formatNumber(viewCount)}
                      </div>
                    )}
                    {likeCount && (
                      <div>
                        <AiFillLike className="ml-lg-2" />{" "}
                        {formatNumber(likeCount)}
                      </div>
                    )}
                    {dislikeCount && (
                      <div>
                        <AiFillDislike className="ml-lg-2" />{" "}
                        {formatNumber(dislikeCount)}
                      </div>
                    )}
                  </div>
                }
              </div>
            </div>
          );
        })}
    </>
  );
}

export default VideoCards;
