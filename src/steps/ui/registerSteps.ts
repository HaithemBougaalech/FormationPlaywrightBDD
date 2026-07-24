import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { RegisterPage } from "../../pages/register.page";
import { pageFixture } from "../../support/pageFixture";

let registerPage: RegisterPage;

Given("je vois le bloc {string} avec les champs nom et email", async function (titre: string) {
  registerPage = new RegisterPage(pageFixture.page);
  await registerPage.acceptCookiePopup();
  await expect(registerPage.newUserSignupTitle).toHaveText(titre);
  await expect(registerPage.signupNameInput).toBeVisible();
  await expect(registerPage.signupEmailInput).toBeVisible();
});

When("je renseigne le nom d'inscription {string}", async function (nom: string) {
  await registerPage.fillSignupName(nom);
});

When("je renseigne l'email d'inscription {string}", async function (email: string) {
  await registerPage.fillSignupEmail(email);
});

When("je clique sur le bouton signup", async function () {
  await registerPage.clickSignup();
});

Then("je suis redirige vers la page d'inscription du compte", async function () {
  await expect(pageFixture.page).toHaveURL(/\/signup/);
});

Then("je vois le titre {string}", async function (titre: string) {
  await expect(registerPage.enterAccountInformationTitle).toHaveText(titre);
});

When("je selectionne le titre {string}", async function (titre: string) {
  if (titre === "Mr") {
    await registerPage.selectTitleMr();
    return;
  }
  if (titre === "Mrs") {
    await registerPage.selectTitleMrs();
    return;
  }
  throw new Error(`Titre non supporte: ${titre}`);
});

When("je vois le nom pre-rempli {string}", async function (nom: string) {
  await expect(registerPage.nameInput).toHaveValue(nom);
});

When("je vois l'email pre-rempli {string}", async function (email: string) {
  await expect(registerPage.emailInput).toHaveValue(email);
});

When("je renseigne le mot de passe {string}", async function (password: string) {
  await registerPage.fillPassword(password);
});

When(
  "je selectionne la date de naissance {string} {string} {string}",
  async function (jour: string, mois: string, annee: string) {
    await registerPage.selectDateOfBirth(jour, mois, annee);
  },
);

When("je coche {string}", async function (option: string) {
  if (option === "Sign up for our newsletter!") {
    await registerPage.checkNewsletter();
    return;
  }
  if (option === "Receive special offers from our partners!") {
    await registerPage.checkSpecialOffers();
    return;
  }
  throw new Error(`Option non supportee: ${option}`);
});

When("je renseigne le prenom {string}", async function (prenom: string) {
  await registerPage.fillFirstName(prenom);
});

When("je renseigne le nom de famille {string}", async function (nom: string) {
  await registerPage.fillLastName(nom);
});

When("je renseigne la societe {string}", async function (societe: string) {
  await registerPage.fillCompany(societe);
});

When("je renseigne l'adresse {string}", async function (adresse: string) {
  await registerPage.fillAddress(adresse);
});

When("je renseigne l'adresse complementaire {string}", async function (adresse: string) {
  await registerPage.fillAddress2(adresse);
});

When("je selectionne le pays {string}", async function (pays: string) {
  await registerPage.selectCountry(pays);
});

When("je renseigne l'etat {string}", async function (etat: string) {
  await registerPage.fillState(etat);
});

When("je renseigne la ville {string}", async function (ville: string) {
  await registerPage.fillCity(ville);
});

When("je renseigne le code postal {string}", async function (codePostal: string) {
  await registerPage.fillZipcode(codePostal);
});

When("je renseigne le mobile {string}", async function (mobile: string) {
  await registerPage.fillMobileNumber(mobile);
});

When("je clique sur le bouton create account", async function () {
  await registerPage.clickCreateAccount();
});

Then("je vois le message {string}", async function (message: string) {
  await expect(registerPage.accountCreatedTitle).toHaveText(message);
});

Then("je vois le bouton {string}", async function (bouton: string) {
  await expect(registerPage.continueButton).toHaveText(bouton);
});

Then("je vois le message d'erreur {string}", async function (message: string) {
  const messageObtenu = await registerPage.getSignupErrorMessage();
  await expect(messageObtenu).toBe(message);
});

When(
  "je clique sur le bouton create account sans renseigner les champs obligatoires",
  async function () {
    await registerPage.clickCreateAccount();
  },
);

Then("je vois le message de validation navigateur {string}", async function (message: string) {
  const messageObtenu = await registerPage.getPasswordValidationMessage();
  await expect(messageObtenu).toContain(message);
});

Then("le focus est positionne sur le champ {string}", async function (champ: string) {
  const champActif = await pageFixture.page.evaluate(
    () => document.activeElement?.getAttribute("data-qa") ?? "",
  );
  await expect(champActif).toBe(champ);
});
