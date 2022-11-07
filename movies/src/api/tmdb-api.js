export const getMovies = (args) => {
    const [, idPart] = args.queryKey;
    const { page } = idPart;
    return fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}`
        ).then((response) => {
            if (!response.ok) {
                throw new Error(response.json().message);
            }
            return response.json();
        })
        .catch((error) => {
            throw error
        });
};

export const getMovie = (args) => {
    // console.log(args)
    const [, idPart] = args.queryKey;
    const { id } = idPart;
    return fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
        ).then((response) => {
            if (!response.ok) {
                throw new Error(response.json().message);
            }
            return response.json();
        })
        .catch((error) => {
            throw error
        });
};

export const getGenres = async() => {
    return fetch(
            "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
            process.env.REACT_APP_TMDB_KEY +
            "&language=en-US"
        ).then((response) => {
            if (!response.ok) {
                throw new Error(response.json().message);
            }
            return response.json();
        })
        .catch((error) => {
            throw error
        });
};

export const getMovieImages = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
            `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.REACT_APP_TMDB_KEY}`
        ).then((response) => {
            if (!response.ok) {
                throw new Error(response.json().message);
            }
            return response.json();

        })
        .catch((error) => {
            throw error
        });
};

export const getMovieReviews = (id) => {
    return fetch(
            `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.REACT_APP_TMDB_KEY}`
        )
        .then((res) => res.json())
        .then((json) => {
            // console.log(json.results);
            return json.results;
        });
};

// export const getUpcoming = () => {
//     return fetch(
//             `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1`
//         )
//         .then(res => res.json())
//         .then(json => json.results);
// }

export const getUpcoming = (args) => {
    const [, idPart] = args.queryKey;
    const { page } = idPart;
    return fetch(
            `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=${page}`
        ).then((response) => {
            if (!response.ok) {
                throw new Error(response.json().message);
            }
            return response.json();
        })
        .catch((error) => {
            throw error
        });
};

export const getCompany = (args) => {
    // console.log(args)
    const [, idPart] = args.queryKey;
    const { id } = idPart;
    return fetch(
            `https://api.themoviedb.org/3/company/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
        ).then((response) => {
            if (!response.ok) {
                throw new Error(response.json().message);
            }
            return response.json();
        })
        .catch((error) => {
            throw error
        });
};

export const getCompanyImages = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
            `https://api.themoviedb.org/3/company/${id}/images?api_key=${process.env.REACT_APP_TMDB_KEY}`
        ).then((response) => {
            if (!response.ok) {
                throw new Error(response.json().message);
            }
            return response.json();

        })
        .catch((error) => {
            throw error
        });
};


export const getCredits = (args) => {
    // console.log(args)
    const [, idPart] = args.queryKey;
    const { id } = idPart;
    return fetch(
            `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_TMDB_KEY}`
        ).then((response) => {
            if (!response.ok) {
                throw new Error(response.json().message);
            }
            return response.json();
        })
        .catch((error) => {
            throw error
        });
};

export const getSimilar = (args) => {
    const [, idPart] = args.queryKey;
    const { id } = idPart;
    return fetch(
            `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1`
        ).then((response) => {
            if (!response.ok) {
                throw new Error(response.json().message);
            }
            return response.json();
        })
        .catch((error) => {
            throw error
        });
};

export const getNowPlaying = (args) => {
    const [, idPart] = args.queryKey;
    const { page } = idPart;
    return fetch(
            `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=${page}`
        ).then((response) => {
            if (!response.ok) {
                throw new Error(response.json().message);
            }
            return response.json();
        })
        .catch((error) => {
            throw error
        });
};

export const getPopular = (args) => {
    const [, idPart] = args.queryKey;
    const { page } = idPart;
    return fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=${page}`
        ).then((response) => {
            if (!response.ok) {
                throw new Error(response.json().message);
            }
            return response.json();
        })
        .catch((error) => {
            throw error
        });
};

export const getTopRatedTV = (args) => {
    const [, idPart] = args.queryKey;
    const { page } = idPart;
    return fetch(
            `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=${page}`
        ).then((response) => {
            if (!response.ok) {
                throw new Error(response.json().message);
            }
            return response.json();
        })
        .catch((error) => {
            throw error
        });
};