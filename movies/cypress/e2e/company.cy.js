let movies;
let movie

describe("Company", () => {
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
        cy.visit("/");
    });
    describe("From a movie detail to a production company detail", () => {
        before(() => {});
        beforeEach(() => {
            cy.request(
                    `https://api.themoviedb.org/3/movie/${movies[1].id}?api_key=${Cypress.env("TMDB_KEY")}`
                )
                .its("body")
                .then((movieDetails) => {
                    movie = movieDetails;
                });
            cy.visit(`/movies/${movies[1].id}`);

        })
        it("navigates to the production company details page and change browser URL", () => {
            cy.get("li").contains(movie.production_companies[1].name).click();
            cy.url().should("include", `/companies/${movie.production_companies[1].id}`);
        });
    });

});