import React from "react";
import { getTopRatedTV } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import Spinner from '../components/spinner';
// import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'

const TopTatedTVPage = (props) => {

  function useQ() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQ()
  const page = query.get('page') 

  const {  data, error, isLoading, isError }  = useQuery(['top_rated_tv', {page: page}], getTopRatedTV)

  
  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results;
  const totalPage = data.total_pages;

  // Redundant, but necessary to avoid app crashing.
//   const favorites = movies.filter(m => m.favorite)
//   localStorage.setItem('favorites', JSON.stringify(favorites))
  // const addToFavorites = (movieId) => true 

  return (
    <PageTemplate
      title="Top Rated TV"
      movies={movies}
    //   action={(movie) => {
    //     return <AddToFavoritesIcon movie={movie} />
    //   }}
      page={page}
      totalPage = {totalPage}
    />
  );
};
export default TopTatedTVPage;