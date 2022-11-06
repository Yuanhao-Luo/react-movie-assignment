import React from "react";
import { useParams } from 'react-router-dom';
import { getMovie, getMovieImages, getCredits, getSimilar } from '../api/tmdb-api'
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
  const { data: similar } = useQuery(
    ["similar", {id: id}],
    getSimilar
  )
  const { data: movie, error, isLoading, isError } = useQuery(
    ["movie", { id: id }],
    getMovie
  );

  var start = new Date().getTime();
  while (true) {
    if (new Date().getTime() - start > 500) {
      break;
    }
  }


  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const images = image.posters 
  let tmp_crew = {};
  const crew = credits.crew.reduce((init, item, index, orignArray) => {
    if(!tmp_crew[item.name]){
      tmp_crew[item.name] = true;
      init.push(item);
    }
    return init;
  }, [])
  let tmp_cast = {};
  const cast = credits.cast.reduce((init, item, index, orignArray) => {
    if(!tmp_cast[item.name]){
      tmp_cast[item.name] = true;
      init.push(item);
    }
    return init;
  }, [])

  return (
    <>
      {movie ? (
        <>
          <PageTemplate movie={movie} images={images} title={movie.title} subtitle={movie.tagline} link={movie.homepage}>
            <MovieDetails movie={movie} cast={cast} crew={crew} similar={similar.results} />
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default MoviePage;