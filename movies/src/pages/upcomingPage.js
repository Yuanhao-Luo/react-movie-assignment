import React from "react";
import { getUpcoming } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import Spinner from '../components/spinner';
import AddToPlayList from '../components/cardIcons/addToPlayList'

const UpcomingPage = (props) => {

  function useQ() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQ()
  const page = query.get('page') 

  const {  data, error, isLoading, isError }  = useQuery(['upcoming', {page: page}], getUpcoming)

  
  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results;
  const totalPage = data.total_pages;

  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))
  // const addToFavorites = (movieId) => true 

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      action={(movie) => {
        return <AddToPlayList movie={movie} />
      }}
      page={page}
      totalPage = {totalPage}
    />
  );
};
export default UpcomingPage;