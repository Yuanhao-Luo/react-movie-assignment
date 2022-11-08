let movies;
const movieId = 497582; // Enola Holmes movie id
let email = "123456@test.com";
let password = "123456"

describe("The favourites feature", () => {
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
        cy.get("#LoginButton").click();
        cy.get("#email").clear().type(email);
        cy.get("#password").clear().type(password);
        cy.get("#Login").click();
    });

    describe("Selecting favourites", () => {
        it("selected movie card shows the red heart", () => {
            cy.get(".MuiCardHeader-root").eq(1).find("svg").should("not.exist");
            cy.get("button[aria-label='add to favorites']").eq(1).click();
            cy.get(".MuiCardHeader-root").eq(1).find("svg");
        });
    });

    describe("The favourites page", () => {
        beforeEach(() => {
            // Select two favourites and navigate to Favourites page
            cy.get("button[aria-label='add to favorites']").eq(1).click();
            cy.get("button[aria-label='add to favorites']").eq(3).click();
            cy.get("button").contains("Favorites").click();
        });
        it("only the tagged movies are listed", () => {
            cy.get(".MuiCardHeader-content").should("have.length", 2);
            cy.get(".MuiCardHeader-content")
                .eq(0)
                .find("p")
                .contains(movies[1].title);
            cy.get(".MuiCardHeader-content")
                .eq(1)
                .find("p")
                .contains(movies[3].title);
        });
        it("favourite can be deleted", () => {
            cy.get("button[aria-label='remove from favorites']").eq(0).click();
            cy.get("p").contains(movies[1].title).should("not.exist");
        })
        it("jump to write review page", () => {
            cy.get("a[href='/reviews/form']").eq(0).click();
            cy.url().should("include", "/reviews/form");
            cy.get("h3").contains(movies[1].title);
        })
    });
});