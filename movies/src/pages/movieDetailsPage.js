import React from "react";
import { useParams } from 'react-router-dom';
import { getMovie, getMovieImages, getCredits } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner'
import MovieDetails from "../components/movieDetails/";
import PageTemplate from "../components/templateDetailPage";
// import useMovie from "../hooks/useMovie";

const MoviePage = (props) => {
  const { id } = useParams();
  const { data: image } = useQuery(
    ["images", { id: id }],
    getMovieImages
  );
  const { data: credits } = useQuery(
    ["credits", { id: id }],
    getCredits
  );
  const { data: movie, error, isLoading, isError } = useQuery(
    ["movie", { id: id }],
    getMovie
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const images = image.posters 


  return (
    <>
      {movie ? (
        <>
          <PageTemplate movie={movie} images={images} title={movie.title} subtitle={movie.tagline} link={movie.homepage}>
            <MovieDetails movie={movie} credits={credits} />
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default MoviePage;