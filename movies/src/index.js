import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes} from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import UpcomingPage from "./pages/upcomingPage"
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import CompanyPage from "./pages/companyPage"
import NowPlayingPage from "./pages/nowPlayingPage";
import PopularPage from "./pages/popularPage";
import TopRatedTVPage from "./pages/topRatedTVPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <MoviesContextProvider>
        <SiteHeader />
        <Routes>
          <Route exact path="/movies/favorites" element={<FavoriteMoviesPage />} />
          <Route exact path="/movies/upcoming" element={<UpcomingPage />} />
          <Route path="/movies/:id" element={<MoviePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={ <Navigate to="/" /> } />
          <Route path="/reviews/:id" element={ <MovieReviewPage /> } />
          <Route path="/reviews/form" element={ <AddMovieReviewPage /> } />
          <Route path="/companies/:id" element={ <CompanyPage /> } />
          <Route path="/movies/now_playing" element={ <NowPlayingPage /> } />
          <Route path="/movies/popular" element={ <PopularPage /> } />
          <Route path="/tv/top_rated" element={ <TopRatedTVPage /> } />
        </Routes>
        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};


const rootElement = createRoot(  document.getElementById("root") )
rootElement.render(<App />);
