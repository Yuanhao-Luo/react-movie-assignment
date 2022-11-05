let movies;
let movieCredits;
let movie

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
        // cy.visit(`/movies/${movies[2].id}`);
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
            cy.request(
                    `https://api.themoviedb.org/3/movie/${movies[2].id}/credits?api_key=${Cypress.env("TMDB_KEY")}`
                )
                .its("body")
                .then((credits) => {
                    movieCredits = credits;
                });
        });
        beforeEach(() => {
            cy.visit(`/movies/${movies[2].id}`);
        })
        it("production companies are correct", () => {
            movie.production_companies.map((pc) => {
                cy.get("li").contains(pc.name);
            })
        });
        it("casts are correct", () => {
            movieCredits.cast.map((c) => {
                cy.get("li").contains(c.name);
            })
        });
        it("crews are correct", () => {
            movieCredits.crew.map((c) => {
                cy.get("li").contains(c.name);
            })
        })
    });

});