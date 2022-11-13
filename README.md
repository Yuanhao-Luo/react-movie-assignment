# Assignment 1 - ReactJS app.

Name: Yuanhao Luo

## Overview.

This is a web application to display many movies and their information for movie fan. The movie information comes from TMDB. The project is based on React and Material UI, tested by Cypress and authenicated though Firebase.

### Features.

+ An extra filter
+ A new parameterised URL(Production Company)
+ Pagination
+ Firebase authentication
+ Full caching support
+ New Material UI components
+ Create a generic detail page so that I can easily add detail pages not only movie and company detail page

## Setup requirements.

install firebase

## API endpoints.

+ Now playing list of movies - /movies/now_playing
+ Popular list of movies - /movies/popular
+ Top rated list of TV - /tv/top_rated
+ Production companies of a movie - /companies/:id
+ Credits(cast and crew) of a movie - display in movie detail page
+ Similar movies of a movie - display in movie detail page

## Routing.

+ /companies/:id - displays a production company.
+ /movies/now_playing - displays a list of now playing movies.
+ /movies/popular - displays a list of popular movies.
+ /tv/top_rated - displays a list of top rated tv.

Movie detail page and favourite movie function require authentication.
Listing movies or tv is public.

## Independent learning (If relevant).

How to use Firebase for authentication. I followed the instruction in their website.
Though useLocation() you can get the URL of persent page. And it also help you divide URL into different parts.
Some new Material UI components such as Dialog, Pagination from official document.

