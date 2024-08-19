describe("Activities Search", () => {
  it("should display activity cards matching the search query when text is entered in the search box", () => {
    // Intercept the network request
    cy.intercept("GET", "http://localhost:5000/activities*").as(
      "getActivities"
    );

    cy.visit("/");
    const inputField = cy.get("input[type='text']");
    inputField.focus();
    cy.wait(200);
    inputField.clear();
    inputField.type("Rome");

    // Wait for the network request to complete
    cy.wait("@getActivities");

    // Assert that the input field contains the typed text
    inputField.should("have.value", "Rome");

    // Select element by data-testid
    const wrapper = cy.get("[data-testid='activity-card-wrapper']");
    const cards = wrapper.get("[data-testid='activity-card']");

    // Assert that the correct number of cards are displayed
    cards.should("have.length.greaterThan", 0);

    // Assert that each card contains the text "Rome" in the h2 tag
    cards.each((card) => {
      cy.wrap(card).find("h2").should("contain.text", "Rome");
    });
  });
  it("should display a message when no activities are found", () => {
    cy.intercept("GET", "http://localhost:5000/activities*").as(
      "getActivities"
    );

    cy.visit("/");
    const inputField = cy.get("input[type='text']");
    inputField.focus();
    cy.wait(200);
    inputField.clear();
    inputField.type("Non-existent");

    cy.wait("@getActivities");

    inputField.should("have.value", "Non-existent");

    cy.get("[data-testid='no-activities-message']").should("exist");
  });
  it("should only display activities with special offers when the 'Special Offers' checkbox is checked", () => {
    cy.intercept("GET", "http://localhost:5000/activities*").as(
      "getActivities"
    );

    cy.visit("/");

    cy.get("#special-offer-checkbox").check();

    cy.wait("@getActivities");

    const wrapper = cy.get("[data-testid='activity-card-wrapper']");
    const cards = wrapper.get("[data-testid='activity-card']");

    cards.each((card) => {
      // check if data-testid="special-offer-ribbon" exists
      cy.wrap(card)
        .find("[data-testid='special-offer-ribbon']")
        .should("exist");
    });
  });
});
