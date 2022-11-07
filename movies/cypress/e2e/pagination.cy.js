let movies1;
let movies2;
let movies500;


describe("Pagination", () => {
    before(() => {
        cy.request(
                `https://api.themoviedb.org/3/discover/movie?api_key=${Cypress.env(
        "TMDB_KEY"
      )}&language=en-US&include_adult=false&include_video=false&page=1`
            )
            .its("body")
            .then((movie) => {
                movies1 = movie.results;
            });
        cy.request(
                `https://api.themoviedb.org/3/discover/movie?api_key=${Cypress.env(
        "TMDB_KEY"
      )}&language=en-US&include_adult=false&include_video=false&page=2`
            )
            .its("body")
            .then((movie) => {
                movies2 = movie.results;
            });
        cy.request(
                `https://api.themoviedb.org/3/discover/movie?api_key=${Cypress.env(
        "TMDB_KEY"
      )}&language=en-US&include_adult=false&include_video=false&page=500`
            )
            .its("body")
            .then((movie) => {
                movies500 = movie.results;
            });
    })
    it("jump to page 2 and display correct movies", () => {
        cy.visit("/");
        cy.get("button[aria-label='Go to page 2']").click();
        cy.get(".MuiCardHeader-content").each(($card, index) => {
            cy.wrap($card).find("p").contains(movies2[index].title);
        });
    })
    it("jump to last page and display correct movies", () => {
        cy.visit("/");
        cy.get("button[aria-label='Go to page 500']").click();
        cy.get(".MuiCardHeader-content").each(($card, index) => {
            cy.wrap($card).find("p").contains(movies500[index].title);
        });
    })
    it("jump back to the first page and display correct movies", () => {
        cy.visit("/");
        cy.get("button[aria-label='Go to page 2']").click();
        cy.get("button[aria-label='Go to page 1']").click();
        cy.get(".MuiCardHeader-content").each(($card, index) => {
            cy.wrap($card).find("p").contains(movies1[index].title);
        });
    })
})