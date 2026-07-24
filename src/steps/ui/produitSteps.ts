import { Given, Then, When } from "@cucumber/cucumber";
import { ProduitPage } from "../../pages/produitPage";
import { pageFixture } from "../../support/pageFixture";
import { expect } from "@playwright/test";


Given("je suis sur la page des produits", async function () {
  pageFixture.produitPage = new ProduitPage(pageFixture.page);
  await pageFixture.produitPage.ouvrirUrl();
  await pageFixture.produitPage.accepterCookies();
});

Then("je devrais visualiser une liste de produits", async function () {
  await expect(pageFixture.produitPage.listeProduits).toBeVisible();
});

Then(
  "le nombre de produits affiche devrait être superieur a {int}",
  async function (count: number) {
    const nbrProduit = await pageFixture.produitPage.getNbrProduit();
    await expect(nbrProduit).toBeGreaterThan(count);
  },
);

//********scénario 2*********

When("je recherche le produit {string}", async function (nom: string) {
  await pageFixture.produitPage.saisirNomProduit(nom);
  await pageFixture.produitPage.rechercherProduit();
});

Then(
  "je devrais consulter le mot cherché {string}",
  async function (nom: string) {
    const listeObtenue = await pageFixture.produitPage.getResultatRecherche();

    for (const text of listeObtenue) {
      await expect(text).toContain(nom.toLowerCase());
    }
  },
);

When("je clique sur le premier produit", async function () {
    await pageFixture.produitPage.cliquerPremierProduit();
});

Then("je devrais voir le nom du produit", async function () {
    const nomProduit = await pageFixture.produitPage.getNomProduit();
    await expect(nomProduit.length).toBeGreaterThan(0);
});

Then("je devrais voir le prix du produit", async function () {
    const prixProduit = await pageFixture.produitPage.getPrixProduit();
    await expect(prixProduit).toContain('Rs.');
});

Then("je devrais voir la description du produit", async function () {
    await expect(pageFixture.produitPage.descriptionProduit).toBeVisible();
});
