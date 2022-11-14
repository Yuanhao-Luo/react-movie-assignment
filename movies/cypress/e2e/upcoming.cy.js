import "../support/commands"

let moviesUpcoming;
let email = "123456@test.com";
let password = "123456"

describe("Upcoming", () => {
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
            cy.login(email, password)
        })
        it("The titles of movie card are upcoming movie titles", () => {
            cy.get("p").contains(moviesUpcoming[3].title)
        })
    })
    describe("Must watch function", () => {
        beforeEach(() => {
            cy.visit(`/movies/upcoming`);
            cy.login(email, password)
        })
        it("The movie will add to must watch list after click add list button", () => {
            cy.get("button[aria-label='add to MustWatch']").eq(3).click();
            cy.get(".MuiCardHeader-root").eq(3).find("svg");
        })
    })
});