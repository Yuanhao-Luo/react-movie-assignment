let movies;
let movieReviews;

describe("Reviews", () => {
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
        cy.visit(`/movies/${movies[1].id}`);
    });
    describe("Navigate to review page", () => {
        it("Show reviews after clicking review button in movie detail page", () => {
            cy.wait(1000)
            cy.get("button").contains("Reviews").click()
            cy.get("th").contains("Author");
            cy.get("th").contains("Excerpt");
            cy.get("th").contains("More");
        })
        it("Jump to full review page after chlicking full review", () => {
            cy.wait(1000)
            cy.get("button").contains("Reviews").click()
            cy.get("a").contains("Full Review").eq(0).click();
            cy.url().should("include", "reviews");
        })
    })
    describe("The content of review is correct", () => {
        before(() => {
            cy.request(
                    `https://api.themoviedb.org/3/movie/${movies[1].id}/reviews?api_key=${Cypress.env("TMDB_KEY")}`
                )
                .its("body")
                .then((review) => {
                    movieReviews = review.results;
                });
        })
        it("The content of review in excerpt page is correct", () => {
            cy.wait(1000)
            cy.get("button").contains("Reviews").click()
            cy.get("td").contains(movieReviews[0].content.substring(0, 10))
        })
        it("The content of review in full review page is correct", () => {
            cy.wait(1000)
            cy.get("button").contains("Reviews").click()
            cy.get("a").contains("Full Review").eq(0).click();
            cy.get("p").contains(movieReviews[0].content.substring(0, 10))

        })
    })
});