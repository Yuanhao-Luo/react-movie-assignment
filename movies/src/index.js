import React, { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes} from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'
import MoviesContextProvider from "./contexts/moviesContext"
const HomePage = lazy(() => import("./pages/homePage"));
const MoviePage = lazy(() => import("./pages/movieDetailsPage"));
const UpcomingPage = lazy(() => import("./pages/upcomingPage"));
const FavoriteMoviesPage = lazy(() => import("./pages/favoriteMoviesPage"));
const MovieReviewPage = lazy(() => import("./pages/movieReviewPage"));
const SiteHeader = lazy(() => import("./components/siteHeader"));
const AddMovieReviewPage = lazy(() => import("./pages/addMovieReviewPage"));
const CompanyPage = lazy(() => import("./pages/companyPage"));
const NowPlayingPage = lazy(() => import("./pages/nowPlayingPage"));
const PopularPage = lazy(() => import("./pages/popularPage"));
const TopRatedTVPage = lazy(() => import("./pages/topRatedTVPage"));

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
        <Suspense fallback={<h1>Loading page</h1>}>
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
        </Suspense>

        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};


const rootElement = createRoot(  document.getElementById("root") )
rootElement.render(<App />);
