import { Locator, Page } from "@playwright/test";

export class ProduitPage {
  readonly page: Page;
  readonly listeProduits: Locator;
  readonly produitAffiche: Locator;
  readonly barreRecherche: Locator;
  readonly boutonRechercher: Locator;
  readonly premierProduit: Locator;
  readonly nomProduit: Locator;
  readonly prixProduit: Locator;
  readonly descriptionProduit: Locator;

  constructor(page: Page) {
    this.page = page;
    this.listeProduits = page.locator(".features_items");
    this.produitAffiche = page.locator(".features_items .col-sm-4");
    this.barreRecherche = page.locator("#search_product");
    this.boutonRechercher = page.locator("#submit_search");
    this.premierProduit = page.locator(".features_items .col-sm-4").first();
    this.nomProduit = page.locator(".product-information h2");
    this.prixProduit = page.locator('.product-information span span');
    this.descriptionProduit = page.locator('.product-information p').first();
  }

  async ouvrirUrl(): Promise<void> {
    await this.page.goto("./products");
  }

  async getNbrProduit(): Promise<number> {
    return await this.produitAffiche.count();
  }

  async accepterCookies(): Promise<void> {
    try {
      const btnCookies = await this.page.locator(
        "xpath=/html/body/div/div[2]/div[2]/div[2]/div[2]/button[1]/p",
      );
      await btnCookies.waitFor({ state: "visible", timeout: 500 });
      await btnCookies.click();
    } catch {}
  }

  //********scénario 2*********

  async saisirNomProduit(nom: string): Promise<void> {
    await this.barreRecherche.fill(nom);
  }
  async rechercherProduit(): Promise<void> {
    await this.boutonRechercher.click();
  }
  async getResultatRecherche(): Promise<string[]> {
    const count = await this.produitAffiche.count();
    const nomProduitObtenu: string[] = [];

    for (let i = 0; i < count; i++) {
      const text =
        (await this.produitAffiche
          .nth(i)
          .locator(".productinfo p")
          .textContent()) ?? "";
      nomProduitObtenu.push(text.toLowerCase().trim());
    }
    return nomProduitObtenu;
  }

  async cliquerPremierProduit(): Promise<void> {
    await this.premierProduit.locator('a[href*="product_details"]').click(); // *signifie contient cette valeur
  }

  async getNomProduit(): Promise<string> {
    return await this.nomProduit.textContent() ?? "";
  }

   async getPrixProduit(): Promise<string> {
   return await this.prixProduit.textContent() ?? "";
}


}
