let movies;
let movieCredits;
let movie;
let movieSimilar;

describe("Movie Detail", () => {
    before(() => {
        cy.request(
                `https://api.themoviedb.org/3/discover/movie?api_key=${Cypress.env(
        "TMDB_KEY"
      )}&language=en-US&include_adult=false&include_video=false&page=1`
            )
            .its("body")
            .then((response) => {
                movies = response.results;
            });
    });
    beforeEach(() => {
        cy.visit(`/movies/${movies[2].id}`);
    });
    describe("The information in the movie detail page", () => {
        before(() => {
            cy.request(
                    `https://api.themoviedb.org/3/movie/${movies[2].id}?api_key=${Cypress.env("TMDB_KEY")}`
                )
                .its("body")
                .then((movieDetails) => {
                    movie = movieDetails;
                });
        });
        it("production companies are correct", () => {
            movie.production_companies.map((pc) => {
                cy.get("li[name='production_company']").contains(pc.name)
            })
        });

    });
    describe("The credit of this movie is correct", () => {
        before(() => {
            cy.request(
                    `https://api.themoviedb.org/3/movie/${movies[2].id}/credits?api_key=${Cypress.env("TMDB_KEY")}`
                )
                .its("body")
                .then((credits) => {
                    movieCredits = credits;
                });
        })
        it("Each name of cast in this page is same as the movie", () => {
            movieCredits.cast.map((c) => {
                cy.get("li[name='cast']").contains(c.name);
            })
        });
        it("Each name of crew in this page is same as the movie", () => {
            movieCredits.crew.map((c) => {
                cy.get("li[name='crew']").contains(c.name);
            })
        });
    })
    describe("The similar movie is correct", () => {
        before(() => {
            cy.request(
                    `https://api.themoviedb.org/3/movie/${movies[2].id}/similar?api_key=${Cypress.env("TMDB_KEY")}&language=en-US&page=1`
                )
                .its("body")
                .then((similar) => {
                    movieSimilar = similar;
                });
        })
        it("Each name of similar movie in this page is correct", () => {
            movieSimilar.results.map((s) => {
                cy.get("p[name='movie_title']").contains(s.title);
            })

        });
    })
});