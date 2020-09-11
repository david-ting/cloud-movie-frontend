import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import SearchMovie from "./pages/movie/SearchMovie";
import MatchedMovies from "./pages/movie/MatchedMovies";
import SearchTv from "./pages/tv/SearchTv";
import MatchedTv from "./pages/tv/MatchedTv";
import SearchPerson from "./pages/person/SearchPerson";
import MatchedPeople from "./pages/person/MatchedPeople";
import DetailProvider from "./context/detail/DetailProvider";
import MatchedReviews from "./pages/ReviewPage";
import VideoPage from "./pages/VideoPage";
import ReviewPage from "./pages/ReviewPage";
import SingleReviewPage from "./pages/SingleReviewPage";
import RecommendationPage from "./pages/RecommendationPage";
import MovieTvDetailPage from "./pages/MovieTvDetailPage";
import PersonDetailPage from "./pages/person/PersonDetailPage";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>

        <Route path="/movie/search/" exact>
          <SearchMovie />
        </Route>
        <Route path="/movie/search/:name/:page" exact>
          <MatchedMovies />
        </Route>
        <Route path="/movie/detail/:id" exact>
          <DetailProvider>
            <MovieTvDetailPage type="movie" />
          </DetailProvider>
        </Route>

        <Route path="/tv/search/" exact>
          <SearchTv />
        </Route>
        <Route path="/tv/search/:name/:page" exact>
          <MatchedTv />
        </Route>
        <Route path="/tv/detail/:id" exact>
          <DetailProvider>
            <MovieTvDetailPage type="tv" />
          </DetailProvider>
        </Route>

        <Route path="/person/search/" exact>
          <SearchPerson />
        </Route>
        <Route path="/person/search/:name/:page" exact>
          <MatchedPeople />
        </Route>
        <Route path="/person/detail/:id" exact>
          <DetailProvider>
            <PersonDetailPage />
          </DetailProvider>
        </Route>

        <Route path="/:type/detail/:id/videos/:noPerPage/:page" exact>
          <VideoPage />
        </Route>
        <Route path="/:type/detail/:id/reviews/:page" exact>
          <ReviewPage />
        </Route>
        <Route path="/:type/detail/:id/reviews" exact>
          <SingleReviewPage />
        </Route>
        <Route path="/:type/detail/:id/recommendations/:page" exact>
          <RecommendationPage />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
