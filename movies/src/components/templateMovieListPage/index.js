import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";
import Pagination from '@mui/material/Pagination';

function MovieListPageTemplate({ movies, title, action, page, totalPage }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [languageFilter, setLanguageFilter] = useState("All");
  const genreId = Number(genreFilter);

  if(page == null){
    page = 1
  }

  const languages = ["All"];
  movies.forEach((l) => {
    if(!languages.includes(l.original_language)){
      languages.push(l.original_language)
    }
  })

  let displayedMovies = movies
    .filter((m) => {
      let tmp = m.title ? m.title : m.name;
      return tmp.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    })
    .filter((m) => {
      return languageFilter === "All" ? true : m.original_language === languageFilter;
    })

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else if (type === "language") setLanguageFilter(value);
    else setGenreFilter(value);
  };

  const handlePagination = (e) => {
    let p = e.target.ariaLabel.split(" ")[3];
    let h = window.location.href;
    if(h.includes("?")){
      console.log("has ?")
      window.location.href = h.substring(0, h.indexOf("=")+1).concat(p)
    }else{
      console.log("not ?")
      window.location.href = h.concat("?page=").concat(p)
    }
  }

  return (
    <>
      <Grid container sx={{ padding: '20px' }}>
        <Grid item xs={12}>
          <Header title={title} />
        </Grid>
        <Grid item container spacing={5}>
          <Grid key="find" item xs={12} sm={6} md={4} lg={3} xl={2}>
            <FilterCard
              onUserInput={handleChange}
              titleFilter={nameFilter}
              genreFilter={genreFilter}
              languageFilter={languageFilter}
              languages={languages}
            />
          </Grid>
          <MovieList action={action} movies={displayedMovies}></MovieList>
        </Grid>
      </Grid>
      <Grid sx={{ display: "flex", justifyContent: 'center'}}>
        <Pagination hidePrevButton hideNextButton count={totalPage > 500 ? 500 : totalPage} page={parseInt(page)} onChange={handlePagination}>

        </Pagination>
      </Grid>

    </>

  );
}
export default MovieListPageTemplate;