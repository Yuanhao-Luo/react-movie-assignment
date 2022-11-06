let movies;
let moviesUpcoming;

describe("Upcoming", () => {
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
    describe("Navigate to upcoming page", () => {
        it("Jump to upcoming page from the button in header", () => {
            cy.get("button").contains("Upcoming").click()
            cy.url().should("include", "upcoming")
        })
    })
    describe("The upcoming movies are correct", () => {
        before(() => {
            cy.request(
                    `https://api.themoviedb.org/3/movie/upcoming?api_key=${Cypress.env("TMDB_KEY")}&language=en-US&page=1`
                )
                .its("body")
                .then((upcoming) => {
                    moviesUpcoming = upcoming.results;
                });
        })
        beforeEach(() => {
            cy.visit(`/movies/upcoming`);
        })
        it("The titles of movie card are upcoming movie titles", () => {
            cy.get("p").contains(moviesUpcoming[3].title)
        })
    })
    describe("Must watch function", () => {
        beforeEach(() => {
            cy.visit(`/movies/upcoming`);
        })
        it("The movie will add to must watch list after click add list button", () => {
            cy.get("button[aria-label='add to MustWatch']").eq(3).click();
            cy.get(".MuiCardHeader-root").eq(3).find("svg");
        })
    })
});