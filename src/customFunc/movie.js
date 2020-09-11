export function fetchMovieDetailFunc(movieID, setDetail) {
  console.log("fetchMovieDetail");
  fetch(
    `https://api.themoviedb.org/3/movie/${movieID}?api_key=f4c79e630a6e7682916db6427dba5c66&language=en-US`
  )
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((data) => {
      setDetail(data);
    })
    .catch((error) => {
      console.error(error);
    });
}

export function fetchMovieVideosFunc(movieID, setVideos) {
  fetch(
    `https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=f4c79e630a6e7682916db6427dba5c66&language=en-US`
  )
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((data) => {
      // console.log(setVideos);
      // console.log(data);
      // only get the youtube videos
      setVideos(data.results.filter((video) => video.site === "YouTube"));
    })
    .catch((error) => {
      console.error(error);
    });
}

export function fetchMovieRecommendFunc(
  movieID,
  setRecommendQuery,
  setRecommendList,
  setRecommendPageInfo
) {
  setRecommendQuery(movieID);
  fetch(
    `https://api.themoviedb.org/3/movie/${movieID}/recommendations?api_key=f4c79e630a6e7682916db6427dba5c66&language=en-US&page=1`
  )
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((data) => {
      //   console.log(data);
      setRecommendPageInfo({
        page: data.page,
        total_pages: data.total_pages,
        total_results: data.total_results,
      });
      setRecommendList(data.results);
    })
    .catch((error) => {
      console.error(error);
    });
}

export function fetchMovieReviewsFunc(id, setReviews) {
  fetch(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=f4c79e630a6e7682916db6427dba5c66&language=en-US&page=1`
  )
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      setReviews(data);
    })
    .catch((error) => {
      console.error(error);
    });
}
