import React from "react";
import { Link, useParams } from "react-router-dom";
import YoutubeVideo from "./YoutubeVideo";

function VideoList({ type, videos, noPerPage, detail }) {
  const { id } = useParams();
  return (
    <div className="videoWrapper">
      <h5>
        <i>{videos.length}</i> Videos
        {videos.length > 3 && (
          <Link
            to={{
              pathname: `/${type}/detail/${id}/videos/${noPerPage}/1`,
              state: { videos, detail },
            }}
            className="btn btn-outline-primary p-1 ml-2"
          >
            show more
          </Link>
        )}
      </h5>

      {videos.slice(0, 3).map((video) => {
        if ((video.site = "YouTube")) {
          return (
            <YoutubeVideo video={video} key={`${video.site}${video.key}`} />
          );
        }
        return null;
      })}
    </div>
  );
}

export default VideoList;
