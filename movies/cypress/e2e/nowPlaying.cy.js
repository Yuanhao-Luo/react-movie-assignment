let movies;
let moviesNowPlaying;

describe("Now Playing", () => {
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
        cy.visit(`/`);
    });
    describe("Navigate to now playing page", () => {
        it("Jump to now playing page from the button in header", () => {
            cy.get("button").contains("Now Playing").click()
            cy.url().should("include", "now_playing")
        })
    })
    describe("The now playing movies are correct", () => {
        before(() => {
            cy.request(
                    `https://api.themoviedb.org/3/movie/now_playing?api_key=${Cypress.env("TMDB_KEY")}&language=en-US&page=1`
                )
                .its("body")
                .then((now_playing) => {
                    moviesNowPlaying = now_playing.results;
                });
        })
        beforeEach(() => {
            cy.visit(`/movies/now_playing`);
        })
        it("The titles of movie card are now playing movie titles", () => {
            cy.get("p").contains(moviesNowPlaying[3].title)
        })
    })
});