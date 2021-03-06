export function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

export function formatNumber(number) {
  if (number < 1000) {
    return String(number);
  } else if (number < 1000000) {
    return `${Math.round((number / 1000) * 10) / 10} thousands`;
  } else {
    return `${Math.round((number / 1000000) * 10) / 10} millions`;
  }
}

export function capitalizeFirstChar(str) {
  return str[0].toUpperCase() + str.slice(1);
}

let fetchPrefix;

if (process.env.NODE_ENV === "development") {
  fetchPrefix = "";
} else {
  fetchPrefix = "https://cloud-movie-backend.herokuapp.com";
}
/* 
fetchPrefix = "https://cloud-movie-backend.herokuapp.com"; */

export function searchOneType(type, name, page, dispatch) {
  return fetch(`${fetchPrefix}/searchOneType/${type}/${name}/${page}`)
    .then((res) => {
      if (res.status !== 200) {
        throw new Error(res.status);
      }
      return res.json();
    })
    .then((data) => {
      dispatch({
        type: "SET_LIST",
        payload: data.results,
      });
      dispatch({
        type: "SET_PAGE_INFO",
        payload: {
          totalPages: data.total_pages,
          page: data.page,
          totalResults: data.total_results,
        },
      });
    })
    .catch((err) => {
      console.error(err);
    });
}

export function suggestOneType(
  type,
  name,
  page,
  setSuggestions,
  abortController
) {
  fetch(`${fetchPrefix}/searchOneType/${type}/${name}/${page}`, {
    signal: abortController.signal,
  })
    .then((res) => {
      if (abortController.signal.aborted) {
        throw new Error("aborted previous autosuggestions");
      }
      if (res.status !== 200) {
        throw new Error(res.status);
      }
      return res.json();
    })
    .then((data) => {
      if (abortController.signal.aborted) {
        throw new Error("aborted previous autosuggestions");
      }
      setSuggestions(data.results);
    })
    .catch((err) => {
      console.error(err);
    });
}

export function fetchDetailFunc(type, id, dispatch, setNotFound) {
  fetch(`${fetchPrefix}/fetchDetail/${type}/${id}`)
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((data) => {
      dispatch({
        type: "SET_RESULT",
        payload: data,
      });
    })
    .catch((error) => {
      if (error.message === "404") {
        setNotFound(true);
      }
      console.error(error);
    });
}

export function fetchVideosFunc(type, id, setVideos) {
  fetch(`${fetchPrefix}/fetchVideos/${type}/${id}`)
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((data) => {
      // only get the youtube videos
      setVideos(data.results.filter((video) => video.site === "YouTube"));
    })
    .catch((error) => {
      console.error(error);
    });
}

export function fetchReviewsFunc(type, id, setReviews, page = 1) {
  fetch(`${fetchPrefix}/fetchReviews/${type}/${id}/${page}`)
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((data) => {
      setReviews({
        results: data.results,
        pageInfo: {
          page: data.page,
          totalPages: data.total_pages,
          totalResults: data.total_results,
        },
      });
    })
    .catch((error) => {
      console.error(error);
    });
}

export function fetchRecommendationsFunc(
  type,
  id,
  setRecommendations,
  page = 1
) {
  fetch(`${fetchPrefix}/fetchRecommendations/${type}/${id}/${page}`)
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((data) => {
      setRecommendations({
        results: data.results,
        pageInfo: {
          page: data.page,
          totalPages: data.total_pages,
          totalResults: data.total_results,
        },
      });
    })
    .catch((error) => {
      console.error(error);
    });
}

export function fetchTrending(type, timeWindow, setSlides) {
  fetch(`${fetchPrefix}/fetchTrending/${type}/${timeWindow}`)
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((data) => {
      setSlides(data.results);
    })
    .catch((error) => {
      console.error(error);
    });
}

export function fetchSingleReview(reviewID, setSingleReview) {
  fetch(`${fetchPrefix}/fetchSingleReview/${reviewID}`)
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((data) => {
      setSingleReview(data);
    })
    .catch((error) => {
      console.error(error);
    });
}

export function scrapeSingleReview(reviewID, setSingleReview) {
  fetch(`${fetchPrefix}/scrapeSingleReview/${reviewID}`)
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((data) => {
      setSingleReview(data);
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function fetchYoutubeVidoDetail(videoID, videosDetailHolder) {
  try {
    const response = await fetch(
      `${fetchPrefix}/fetchYoutubeVidoDetail/${videoID}`
    );

    if (response.status !== 200) {
      throw new Error(response.status);
    }
    const data = await response.json();

    videosDetailHolder.push({
      publishedAt: data.items[0].snippet.publishedAt,
      publishedBy: data.items[0].channelTitle,
      description: data.items[0].snippet.description,
      duration: data.items[0].contentDetails.duration,
      viewCount: data.items[0].statistics.viewCount,
      likeCount: data.items[0].statistics.likeCount,
      dislikeCount: data.items[0].statistics.dislikeCount,
    });
  } catch (error) {
    videosDetailHolder.push({});
    console.error(error);
  }
}
