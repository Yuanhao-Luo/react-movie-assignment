let moviesPopular;

describe("Popular", () => {
    beforeEach(() => {
        cy.visit(`/`);
    });
    describe("Navigate to popular page", () => {
        it("Jump to popular page from the button in header", () => {
            cy.get("button").contains("Popular").click()
            cy.url().should("include", "popular")
        })
    })
    describe("The popular movies are correct", () => {
        before(() => {
            cy.request(
                    `https://api.themoviedb.org/3/movie/popular?api_key=${Cypress.env("TMDB_KEY")}&language=en-US&page=1`
                )
                .its("body")
                .then((popular) => {
                    moviesPopular = popular.results;
                });
        })
        beforeEach(() => {
            cy.visit(`/movies/popular`);
        })
        it("The titles of movie card are popular movie titles", () => {
            cy.get("p").contains(moviesPopular[3].title)
        })
    })
});