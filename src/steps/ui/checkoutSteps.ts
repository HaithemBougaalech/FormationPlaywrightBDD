import { Then, When } from "@cucumber/cucumber";
import { CheckoutPage } from "../../pages/checkoutPage";
import { pageFixture } from "../../support/pageFixture";
import { expect } from "@playwright/test";
import { ProduitPage } from "../../pages/produitPage";
import { PanierPage } from "../../pages/panierPage";

let checkoutPage: CheckoutPage;


Then('je devrais voir le recap de ma commande', async function () {
    checkoutPage = new CheckoutPage(pageFixture.page);
     pageFixture.produitPage =  new ProduitPage(pageFixture.page);
     pageFixture.panierPage = new PanierPage(pageFixture.page);

    await expect(checkoutPage.recapAdress).toBeVisible();
});


Then('je devrais voir mon adresse de livraison {string}', async function (pays: string) {
    await expect(await checkoutPage.getPaysLivraison()).toBe(pays);
});


When('je saisie un commentaire {string}', async function (message: string) {
    await checkoutPage.fillCommrntaire(message);
});


When('je clique sur le bouton place order', async function () {
    await checkoutPage.clickPlaceOrder();
});

Then('je devrais être redirige vers la page de paiement contenant le titre {string}', async function (titre: string) {
    await expect(await checkoutPage.getTitrePagePaiement()).toBe(titre);
});