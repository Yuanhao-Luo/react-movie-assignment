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
  const { data: image, isLoading: il1 } = useQuery(
    ["images", { id: id }],
    getMovieImages
  );
  const { data: credits, isLoading: il2 } = useQuery(
    ["credits", { id: id }],
    getCredits
  );
  const { data: similar, isLoading: il3 } = useQuery(
    ["similar", {id: id}],
    getSimilar
  )
  const { data: movie, error, isLoading: il4, isError } = useQuery(
    ["movie", { id: id }],
    getMovie
  );

  // var start = new Date().getTime();
  // while (true) {
  //   if (new Date().getTime() - start > 1000) {
  //     break;
  //   }
  // }

  // while(il1||il2||il3||il4){
  //   return <Spinner />
  // };


  if (il1||il2||il3||il4) {
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