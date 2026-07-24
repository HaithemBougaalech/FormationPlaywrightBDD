import { Then, When } from "@cucumber/cucumber";
import { PanierPage } from "../../pages/panierPage";
import { pageFixture } from "../../support/pageFixture";
import { expect } from "@playwright/test";
import { ProduitPage } from "../../pages/produitPage";

let panierPage: PanierPage;

When("je clique sur le bouton produit", async function () {
  panierPage = new PanierPage(pageFixture.page);
  pageFixture.produitPage = new ProduitPage(pageFixture.page);
  await panierPage.cliquerProduit();
});

When("je survole le premier produit", async function () {
  await panierPage.survolerProduit();
});

When("je clique sur add to cart", async function () {
  await panierPage.clickAddToCartBtn();
});

Then("une confirmation d'ajout s'affiche", async function () {
  await expect(panierPage.confimationAjout).toBeVisible();
  const messagePanier = await panierPage.getAddCartConfirmationMessage();
  await expect(messagePanier).toContain("Added!");
});

When("je clique sur le bouton view cart", async function () {
  await panierPage.clickViewCart();
});

Then(
  "le panier devrait contenir {int} produit",
  async function (nbrCommande: number) {
    await expect(panierPage.panier).toBeVisible();
    await expect(await panierPage.getnbrProduitCart()).toBeGreaterThan(
      nbrCommande,
    );
  },
);

Then("je devrais voir le produit dans le panier", async function () {
  await expect(await panierPage.verfierPanierNonVide()).toBeGreaterThan(0);
});

Then(
  "le panier devrait contenir un prix valide {string}",
  async function (prix) {
    await expect(await panierPage.getPrix()).toContain(prix);
  },
);

Then("je clique sur le bouton add to cart", async function () {
  await panierPage.clickAddToCartFromDetails();
});

When("je change la quantite {int}", async function (qte: number) {
  await panierPage.ajouterQuantite(qte);
});

Then(
  "la quantite dans le panier devrait etre {int}",
  async function (qteCart: number) {
    const qtePanier = await panierPage.getCartQte();
    await expect(qtePanier).toBe(qteCart);
  },
);

Then(
  "le prix total devrait correspondre au prix unitaire multiplie par {int}",
  async function (qteProd: number) {
    const prixUnitaireText = await panierPage.getPrix();
    const prixTotalText = await panierPage.getPrixTotal();

    const extractPrix = (text: string): number => {
      return parseInt(text.replace("Rs.", "").trim());
    };

    const prixUnitaire = extractPrix(prixUnitaireText);
    const prixTotal = extractPrix(prixTotalText);

    await expect(prixTotal).toBe(prixUnitaire * qteProd);
  },
);

When("je clique sur le bouton proceed to checkout", async function () {
  await panierPage.proceedToCheckout();
});


