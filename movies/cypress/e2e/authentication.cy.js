let email = "123456@test.com";
let password = "123456"
let email_r = Math.floor(Math.random() * 1000000).toString().concat("@test.com");
let password_r = Math.floor(Math.random() * 1000000).toString()

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

            cy.get("#LoginButton").click();
            cy.get("#email").clear().type(email);
            cy.get("#password").clear().type(password);
            cy.get("#Login").click();
            cy.wait(500)
            cy.get("#LogoutButton").click();
            cy.get("#LoginButton")
        })
    })
    describe("check password and email when login", () => {
        beforeEach(() => {
            cy.get("#LoginButton").click()
        })
        it("Login with correct email and password", () => {
            cy.get("#email").clear().type(email);
            cy.get("#password").clear().type(password);
            cy.get("#Login").click();
            cy.wait(500)
            cy.get("#LogoutButton");
        })
        it("Login with wrong email", () => {
            const email_w = "654321@test.com"
            cy.get("#email").clear().type(email_w);
            cy.get("#password").clear().type(password);
            cy.get("#Login").click();
            cy.wait(500)
            cy.get("#error_info");
        })
        it("Login with wrong password", () => {
            const password_w = "385486"
            cy.get("#email").clear().type(email);
            cy.get("#password").clear().type(password_w);
            cy.get("#Login").click();
            cy.wait(500)
            cy.get("#error_info");
        })
        it("Login with wrong password and email", () => {
            const password_w = "385486"
            const email_w = "654321@test.com"
            cy.get("#email").clear().type(email_w);
            cy.get("#password").clear().type(password_w);
            cy.get("#Login").click();
            cy.wait(500)
            cy.get("#error_info");
        })
        it("do not input an email in email textfield", () => {
            const email_w = "654321asdfsdf"
            cy.get("#email").clear().type(email_w);
            cy.get("#password").clear().type(password);
            cy.get("#Login").click();
            cy.wait(500)
            cy.get("#error_info");
        })
    })
    describe("check password and email when register", () => {
        beforeEach(() => {
            cy.get("#LoginButton").click()
        })
        it("Register with correct email and password", () => {
            cy.get("#email").clear().type(email_r);
            cy.get("#password").clear().type(password_r);
            cy.get("#Register").click();
            cy.wait(500)
            cy.get("#LogoutButton");
        })
        it("do not input an email in email textfield", () => {
            const email_w = "654321asdfsdf"
            cy.get("#email").clear().type(email_w);
            cy.get("#password").clear().type(password_r);
            cy.get("#Register").click();
            cy.wait(500)
            cy.get("#error_info");
        })
        it("the password is less than 6 characters", () => {
            const password_w = "215"
            cy.get("#email").clear().type(email_r);
            cy.get("#password").clear().type(password_w);
            cy.get("#Register").click();
            cy.wait(500)
            cy.get("#error_info");
        })
        it("input an existed email", () => {
            cy.get("#email").clear().type(email);
            cy.get("#password").clear().type(password_r);
            cy.get("#Register").click();
            cy.wait(500)
            cy.get("#error_info");
        })
    })
})