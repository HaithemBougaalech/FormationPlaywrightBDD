import { Locator, Page } from "@playwright/test";

export class CheckoutPage {
  readonly page: Page;
  readonly recapAdress: Locator;
  readonly totalAmount: Locator;
  readonly champCommentaire: Locator;
  readonly placeOrderBtn: Locator;
  readonly pagePaiement: Locator;
  readonly adresseLivraison

  constructor(page: Page) {
    this.page = page;
    this.recapAdress = page.locator("#address_delivery");
    this.totalAmount = page.locator("#cart_info table tbody tr td.cart_total p.cart_total_price",);
    this.champCommentaire = page.locator("#ordermsg textarea");
    this.placeOrderBtn = page.getByRole("link", { name: "Place Order" });
    this.pagePaiement = page.locator("#cart_items div div h2");
    this.adresseLivraison = page.locator('#address_delivery li').nth(6);
  }

  async getTotalAmount() : Promise<string>{
        return await this.totalAmount.textContent() ?? '';
    }

    async getPaysLivraison() : Promise<string>{
        return await this.adresseLivraison.textContent() ?? '';
    }

    async fillCommrntaire(texte: string) : Promise<void>{
        await this.champCommentaire.fill(texte);
    }

    async clickPlaceOrder() : Promise<void>{
        return await this.placeOrderBtn.click();
    }

    async getTitrePagePaiement() : Promise<string>{
        return await this.pagePaiement.textContent() ?? '';
    }
}
