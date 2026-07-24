import { Given, Then, When } from "@cucumber/cucumber";
import { ConnexionPage } from "../../pages/connexionPage";
import { pageFixture } from "../../support/pageFixture";
import "dotenv/config";
import { expect } from "@playwright/test";

let loginPage: ConnexionPage;

Given("je suis sur la page de connexion", async function () {
    console.log("test1");
    console.log(pageFixture);

    loginPage = new ConnexionPage(pageFixture.page);
    console.log("test12");
    await loginPage.navigate();
});

When("je saisie mon login {string}", async function (email) {
    await loginPage.accepterCookies();
    //await loginPage.saisirEmail(email);
    await loginPage.saisirEmailWithEnv();
});

When("je saisie mon mot de passe {string}", async function (password) {
    await loginPage.accepterCookies();
    //await loginPage.saisirPassword(password);
    await loginPage.saisirPassworWithEnv();
});

When("je clique sur le bouton de connexion", async function () {
    await loginPage.accepterCookies();
    await loginPage.cliquerLogin();
});

Then("je suis connecté en tant que {string}", async function (resultatAttendu) {
    await loginPage.accepterCookies();
    const textObtenu = await loginPage.getLoggedUsername();
    await expect(textObtenu).toContain(resultatAttendu);
});

Then('je verifie le message d\'erreur affiche {string}', async function (erreurAttendue) {
    if (erreurAttendue == 'Your email or password is incorrect!') {
        await expect(loginPage.messageDerreur).toBeVisible();
        await expect(loginPage.messageDerreur).toContainText(erreurAttendue);
    } else { 
        const validationMessage = await loginPage.getMessageErreurChampVide();
        await expect(validationMessage).toContain(erreurAttendue);        
    } 

});
