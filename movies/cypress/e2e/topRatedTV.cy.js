let moviesTopRated;

describe("TopRated", () => {
    beforeEach(() => {
        cy.visit(`/`);
    });
    describe("Navigate to top rated tv page", () => {
        it("Jump to top rated tv page from the button in header", () => {
            cy.get("button").contains("TV").click()
            cy.url().should("include", "/tv/top_rated")
        })
    })
    describe("The top rated tv movies are correct", () => {
        before(() => {
            cy.request(
                    `https://api.themoviedb.org/3/tv/top_rated?api_key=${Cypress.env("TMDB_KEY")}&language=en-US&page=1`
                )
                .its("body")
                .then((top_rated) => {
                    moviesTopRated = top_rated.results;
                });
        })
        beforeEach(() => {
            cy.visit(`/tv/top_rated`);
        })
        it("The titles of movie card are top rated tv movie titles", () => {
            cy.get("p").contains(moviesTopRated[11].name)
        })
    })
});