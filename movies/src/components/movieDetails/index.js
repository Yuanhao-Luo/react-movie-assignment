import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import { Link } from "react-router-dom";
import MovieReviews from "../movieReviews"
import MovieList from "../movieList";
import AddToFavoritesIcon from '../cardIcons/addToFavorites'
import Grid from "@mui/material/Grid";




const root = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
};
const chip = { margin: 0.5 };

const MovieDetails = ({ movie, cast, crew, similar }) => {  // Don't miss this!
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>

      <Typography variant="h6" component="p">
        {movie.overview}
      </Typography>

      <Paper 
        component="ul" 
        sx={{...root}}
      >
        <li>
          <Chip label="Genres" sx={{...chip}} color="primary" />
        </li>
        {movie.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{...chip}} />
          </li>
        ))}
      </Paper>
      <Paper component="ul" sx={{...root}}>
        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
        <Chip
          icon={<MonetizationIcon />}
          label={`${movie.revenue.toLocaleString()}`}
        />
        <Chip
          icon={<StarRate />}
          label={`${movie.vote_average} (${movie.vote_count}`}
        />
        <Chip label={`Released: ${movie.release_date}`} />
      </Paper>
      <Paper 
        component="ul" 
        sx={{...root}}
      >
        <li>
          <Chip label="Production Countries" sx={{...chip}} color="primary" />
        </li>
        {movie.production_countries.map((pc) => (
          <li key={pc.iso_3166_1}>
            <Chip label={pc.iso_3166_1} sx={{...chip}} />
          </li>
        ))}
      </Paper>
      <Paper 
        component="ul" 
        sx={{...root}}
      >
        <li>
          <Chip label="production companies" sx={{...chip}} color="primary" />
        </li>
        {movie.production_companies.map((pc) => (
          <li key={pc.name} name="production_company">
            <Link to={`/companies/${pc.id}`}>
              <Chip label={pc.name} sx={{...chip}} />
            </Link>
          </li>
        ))}
      </Paper>
      <Paper 
        component="ul" 
        sx={{...root}}
      >
        <li>
          <Chip label="Cast" sx={{...chip}} color="primary" />
        </li>
        {cast.map((c) => (
          <li key={c.name} name="cast">
            <Link to={`/`}>
              <Chip label={c.name} sx={{...chip}} />
            </Link>
          </li>
        ))}
      </Paper>
      <Paper 
        component="ul" 
        sx={{...root}}
      >
        <li>
          <Chip label="Crew" sx={{...chip}} color="primary" />
        </li>
        {crew.map((c) => (
          <li key={c.name.concat(c.department)} name="crew">
            <Link to={`/`}>
              <Chip label={c.name} sx={{...chip}} />
            </Link>
          </li>
        ))}
      </Paper>
      <Paper>
        <Grid item container spacing={4}>
          <MovieList movies={similar}       
            action={(movie) => {
            return <AddToFavoritesIcon movie={movie} />
          }}></MovieList>
        </Grid>
      </Paper>

      
      <Fab
        color="secondary"
        variant="extended"
        onClick={() =>setDrawerOpen(true)}
        id="ReviewButton"
        sx={{
          position: 'fixed',
          bottom: '1em',
          right: '1em'
        }}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews movie={movie} />
      </Drawer>
    </>
  );
};
export default MovieDetails ;