import { Locator, Page } from "@playwright/test";

export class PanierPage{
    readonly page: Page;
    readonly productBtn: Locator;
    readonly produitSurvole: Locator;
    readonly addToCartBtn: Locator;
    readonly confimationAjout: Locator;
    readonly messageAjoutPanier: Locator;
    readonly viewCartBtn: Locator;
    readonly panier: Locator;
    readonly nbrProduitCart: Locator;
    readonly prixProduit: Locator;
    readonly produitPanier: Locator;
    readonly addToCartFromDetails: Locator;
    readonly quantite: Locator;
    readonly cartQuantite: Locator; 
    readonly cartPrixTotal: Locator;
    readonly checkoutBtn: Locator;
    readonly recapAdress: Locator;
    readonly totalAmount: Locator;
    readonly placeOrderBtn: Locator;
    readonly pagePaiement: Locator;


    constructor(page: Page) {
        this.page = page;
        this.productBtn = page.locator('//*[@id="header"]/div/div/div/div[2]/div/ul/li[2]/a');
        this.produitSurvole = page.locator('.features_items .col-sm-4').first();
        this.addToCartBtn = page.locator('xpath=/html/body/section[2]/div/div/div[2]/div/div[2]/div/div[1]/div[2]/div/a');
        this.confimationAjout = page.locator('#cartModal .modal-content');
        this.messageAjoutPanier = page.locator('#cartModal .modal-title');
        this.viewCartBtn = page.locator("#cartModal a[href='/view_cart']");
        this.panier = page.locator('#product-1');
        this.nbrProduitCart = page.locator('#product-1 .disabled');
        this.prixProduit = page.locator('#product-1 .cart_price');
        this.produitPanier = page.locator('#cart_info_table tbody tr');
        this.addToCartFromDetails= page.locator('.btn.btn-default.cart');
        this.quantite = page.locator('#quantity');
        this.cartQuantite = page.locator('tr').filter({hasText:'Blue Top'}).locator('.cart_quantity button');
        this.cartPrixTotal = page.locator('tr').filter({hasText:'Blue Top'}).locator('.cart_total_price');
        this.checkoutBtn = page.getByText('Proceed To Checkout');
        this.recapAdress = page.locator('#address_delivery');
        this.totalAmount = page.locator('#cart_info table tbody tr td.cart_total p.cart_total_price');
        this.placeOrderBtn = page.getByRole('link',{name:'Place Order'});
        this.pagePaiement = page.locator('#cart_items div div h2');

    }
    async cliquerProduit() : Promise<void> {
        await this.productBtn.click();
    }

    async survolerProduit() : Promise<void> {
        await this.produitSurvole.hover();
    }

    async clickAddToCartBtn() : Promise<void> {
        await this.addToCartBtn.click();
    }

    async getAddCartConfirmationMessage() : Promise<string>  {
        return await this.messageAjoutPanier.textContent() ?? '';
    }

    async clickViewCart() : Promise<void> {
        await this.viewCartBtn.click();
        console.log('étape OK');
    }
    async getnbrProduitCart() : Promise<number> {
        const texteNbProduit = await this.nbrProduitCart.textContent() ?? '0';
        return parseInt(texteNbProduit, 10);
    }

    async verfierPanierNonVide() : Promise<number>{
        return await this.produitPanier.count();
    }

    async getPrix() : Promise<string>{
        return await this.prixProduit.textContent() ?? '';
    }

    async clickAddToCartFromDetails() : Promise<void> {
        await this.addToCartFromDetails.click();
    }

    async ajouterQuantite( qte: number) : Promise<void> {
        await this.quantite.fill(String(qte)); 
    }

    async getCartQte() : Promise<number>{
        const qte = await this.cartQuantite.textContent() ?? '0';
        return parseInt(qte.trim());
    }

    async getPrixTotal() : Promise<string>{
        return await this.cartPrixTotal.textContent() ?? '';
    }

    async proceedToCheckout() : Promise<void>{
        await this.checkoutBtn.click();
    }

    
    

}