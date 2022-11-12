import React, { useContext  } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import Avatar from '@mui/material/Avatar';
import { Link } from "react-router-dom";
import img from '../../images/film-poster-placeholder.png'

export default function MovieCard({ movie, action }) {
  const { favorites } = useContext(MoviesContext);
  const { mustWatch } = useContext(MoviesContext);
  const { user } = useContext(MoviesContext);

  const isMovie = Boolean(movie.title);

  if (favorites.find((id) => id === movie.id)) {
    movie.favorite = true;
  } else {
    movie.favorite = false
  }

  if (mustWatch.find((id) => id === movie.id)){
    movie.mustWatch = true;
  } else {
    movie.mustWatch = false;
  }

  const whichAvatar = () => {
    let res;
    if(movie.favorite){
      res = (
        <Avatar sx={{ backgroundColor: 'red' }}>
          <FavoriteIcon />
        </Avatar>
      )
    }else if(movie.mustWatch){
      res = (
        <Avatar sx={{ backgroundColor: 'red' }}>
          <PlaylistAddCheckIcon />
        </Avatar>
      )
    }else{
      res = null;
    }
    return res;
  }

  // const handleAddToFavorite = (e) => {
  //   e.preventDefault();
  //   addToFavorites(movie);
  // };

  return (
    <Card sx={{ maxWidth: 345 }}>
            <CardHeader
        avatar={
          whichAvatar()
        }
        title={
          <Typography variant="h5" component="p" name="movie_title">
            {isMovie ? movie.title : movie.name}{" "}
          </Typography>
        }
      />
      <CardMedia
        sx={{ height: 500 }}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img
        }
      />
      <CardContent>
        <Grid container>
          {isMovie ? <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <CalendarIcon fontSize="small" />
              {movie.release_date}
            </Typography>
          </Grid> :
          null}
          {/* <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <CalendarIcon fontSize="small" />
              {movie.release_date}
            </Typography>
          </Grid> */}
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" />
              {"  "} {movie.vote_average}{" "}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      {isMovie && user !== null && <CardActions disableSpacing>
        {action(movie)}
        <Link to={`/movies/${movie.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            More Info ...
          </Button>
        </Link>
      </CardActions>
      }
      
    </Card>
  );
}