let movies;
let movieId; // Enola Holmes movie id

describe("Navigation", () => {
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
  describe("From the home page to a movie's details", () => {
    it("Should navigate to the movie details page and change the browser's URL", () => {
      cy.get(".MuiCardActions-root").eq(0).contains("More Info").click();
      cy.url().should("include", `/movies/${movies[0].id}`);
    });
  });
  describe("Using the site header links", () => {
    it("Should navigate via the button links", () => {
      cy.get("button").contains("Favorites").click();
      cy.url().should("include", `/favourites`);
      cy.get("button").contains("Home").click();
      cy.url().should("include", `/`);
    });
  });
  describe("From the favourites page to a movie's details", () => {
    it("Should navigate to movies details page from favourites page", () => {
        cy.get("button[aria-label='add to favorites']").eq(0).click();
        cy.get("button").contains("Favorites").click();
        cy.url().should("include", `/favourites`);
        cy.get(".MuiCardHeader-content").eq(0).click();
        cy.get("button").contains("More Info ...").click();
        cy.url().should("include", `/movies/${movies[0].id}`);
  });
});
});