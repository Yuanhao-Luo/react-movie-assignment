import "../support/commands"

let email = "123456@test.com";
let password = "123456"
let email_r = Math.floor(Math.random() * 1000000).toString().concat("@test.com");
let password_r = Math.floor(Math.random() * 1000000).toString().concat(Math.floor(Math.random() * 1000000).toString())

describe("Authentication", () => {
    beforeEach(() => {
        cy.visit("/");
    })
    describe("longin and logout button", () => {
        it("login page appears after clicking login button", () => {
            cy.get("#LoginButton").click()
            cy.get("#LoginPage")
        })
        it("logout after clicking logout button", () => {
            cy.login(email, password)
            cy.get("#LogoutButton").click();
            cy.get("#LoginButton")
        })
    })
    describe("check password and email when login", () => {
        it("Login with correct email and password", () => {
            cy.login(email, password)
            cy.get("#LogoutButton");
        })
        it("Login with wrong email", () => {
            const email_w = "654321@test.com"
            cy.login(email_w, password)
            cy.get("#error_info");
        })
        it("Login with wrong password", () => {
            const password_w = "385486"
            cy.login(email, password_w)
            cy.get("#error_info");
        })
        it("Login with wrong password and email", () => {
            const password_w = "385486"
            const email_w = "654321@test.com"
            cy.login(email_w, password_w)
            cy.get("#error_info");
        })
        it("do not input an email in email textfield", () => {
            const email_w = "654321asdfsdf"
            cy.login(email_w, password)
            cy.get("#error_info");
        })
    })
    describe("check password and email when register", () => {
        it("Register with correct email and password", () => {
            cy.register(email_r, password_r)
            cy.get("#LogoutButton");
        })
        it("do not input an email in email textfield", () => {
            const email_w = "654321asdfsdf"
            cy.register(email_w, password_r)
            cy.get("#error_info");
        })
        it("the password is less than 6 characters", () => {
            const password_w = "215"
            cy.register(email_r, password_w)
            cy.get("#error_info");
        })
        it("input an existed email", () => {
            cy.register(email, password)
            cy.get("#error_info");
        })
    })
})