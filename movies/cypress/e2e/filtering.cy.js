import { filterByGenre, filterByTitle, filterByLanguage } from "../support/e2e";

let movies; // List of Discover movies from TMDB

describe("Filtering", () => {
    before(() => {
        // Get movies from TMDB and store them locally.
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
    describe("By movie language", () => {
        it("show movies with the selected language", () => {
            const selectedLanguage = "en";
            const matchingMovies = filterByLanguage(movies, selectedLanguage);
            cy.get("#language-select").click();
            cy.get("li").contains(selectedLanguage).click();
            cy.get(".MuiCardHeader-content").should(
                "have.length",
                matchingMovies.length
            );
            cy.get(".MuiCardHeader-content").each(($card, index) => {
                cy.wrap($card).find("p").contains(matchingMovies[index].title);
            });
        })
    })
    describe("Combined genre, title and language", () => {
        it("show movies with 's' in title and the selected genre amd language", () => {
            const searchString = "s";
            const selectedGenreId = 35;
            const selectedGenreText = "Comedy";
            const selectedLanguage = "en";
            const matchingMovies = filterByGenre(filterByTitle(filterByLanguage(movies, selectedLanguage), searchString), selectedGenreId);
            cy.get("#filled-search").clear().type(searchString);
            cy.get("#language-select").click();
            cy.get("li").contains(selectedLanguage).click();
            cy.get("#genre-select").click();
            cy.get("li").contains(selectedGenreText).click();
            cy.get(".MuiCardHeader-content").should(
                "have.length",
                matchingMovies.length
            );
            cy.get(".MuiCardHeader-content").each(($card, index) => {
                cy.wrap($card).find("p").contains(matchingMovies[index].title);
            });
        })
    });
});