import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { fetchVideosFunc } from "../customFunc/all";
import VideoCards from "../components/VideoCards";
import DetailSubRoute from "../components/DetailSubRoute";
import DetailProvider from "../context/detail/DetailProvider";
import NumberDropDown from "../components/NumberDropDown";
import VideoPagination from "../components/pagination/VideoPagination";

function VideoPage() {
  const linkState = useLocation().state;
  const linkVideos = linkState ? linkState.videos : null;
  const { type, id, noPerPage, page } = useParams();
  const [videos, setVideos] = useState(linkVideos);
  const numberPerPage = parseInt(noPerPage);
  const currentPage = parseInt(page);

  const from = (currentPage - 1) * numberPerPage;
  const end = from + numberPerPage - 1;
  const max = videos ? videos.length - 1 : null;
  const to = Math.min(end, max);

  useEffect(() => {
    if (!linkVideos) {
      console.log("video fetch required");
      fetchVideosFunc(type, id, setVideos);
    }
  }, [type, id, setVideos, linkVideos]);

  return (
    <DetailProvider>
      <DetailSubRoute>
        {videos && (
          <NumberDropDown
            range={Math.min(videos.length, 10)}
            value={numberPerPage}
            path={`/${type}/detail/${id}/videos`}
          />
        )}
        {videos && <VideoCards videos={videos.slice(from, to + 1)} />}
        {videos && (
          <VideoPagination
            type={type}
            id={id}
            total={videos.length}
            numberPerPage={numberPerPage}
            currentPage={currentPage}
          />
        )}
      </DetailSubRoute>
    </DetailProvider>
  );
}

export default VideoPage;
