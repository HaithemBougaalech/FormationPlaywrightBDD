import { Locator, Page } from "@playwright/test";
import { config } from "../config/configLoader";

export class PaymentPage{
    readonly page : Page;
    readonly nameOnCard: Locator;
    readonly cardNumber: Locator;
    readonly cvc: Locator;
    readonly expirationMonth: Locator;
    readonly expirationYear: Locator;
    readonly paymentConfirmation: Locator;
    readonly paymentBtn: Locator;


  constructor(page: Page) {
    this.page=page;
    this.nameOnCard = page.locator('[data-qa="name-on-card"]');
    this.cardNumber = page.locator('[data-qa="card-number"]');
    this.cvc = page.locator('[data-qa="cvc"]');
    this.expirationMonth = page.locator('[data-qa="expiry-month"]');
    this.expirationYear = page.locator('[data-qa="expiry-year"]');
    this.paymentConfirmation = page.locator('[data-qa="order-placed"]');
    this.paymentBtn = page.locator('[data-qa="pay-button"]');

}

async fillNameOnCardWithYaml() : Promise<void> {
  //const nameOnTheCard = process.env.Name_on_Card || '';
  //await this.nameOnCard.fill(nameOnTheCard);

  await this.nameOnCard.fill(config.payment.cardName);
    
}

async fillCardNumber() : Promise<void> {
  //const numberOnTheCard = process.env.Card_Number || '';
  //await this.cardNumber.fill(numberOnTheCard);

  await this.cardNumber.fill(config.payment.cardNumber);
}

async fillCvc() : Promise<void> {
  //const cvcOnTheCard = process.env.CVC || '';
  //await this.cvc.fill(cvcOnTheCard);

  await this.cvc.fill(config.payment.cvc);
}

async fillExpirationMonth() : Promise<void> {
  //const expirationMonthOnTheCard = process.env.Expiration_Month || '';
  //await this.expirationMonth.fill(expirationMonthOnTheCard);

  await this.expirationMonth.fill(config.payment.expirationMonth);
}

async fillExpirationYear() : Promise<void> {
//  const expirationYearOnTheCard = process.env.Expiration_year || '';
//  await this.expirationYear.fill(expirationYearOnTheCard);

await this.expirationYear.fill(config.payment.expirationYear); 


}

async clickPaymentBtn() : Promise<void>{
  await this.paymentBtn.click();
}


async getPaymentConfirmation() : Promise<string>{
  return await this.paymentConfirmation.textContent() ?? '';
}

}