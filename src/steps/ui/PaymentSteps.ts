import { Then, When } from "@cucumber/cucumber";
import { PaymentPage } from "../../pages/paymentPage";
import { pageFixture } from "../../support/pageFixture";
import { expect } from "@playwright/test";

let paymentPage : PaymentPage;      

         When('je renseigne le proprietaire de la carte', async function () {
            paymentPage = new PaymentPage(pageFixture.page); 
            await paymentPage.fillNameOnCardWithYaml()
         });
       
       
         When('je renseigne le numéro de la carte', async function () {
            await paymentPage.fillCardNumber();
         });
       
         When('je renseigne le CVC', async function () {
            await paymentPage.fillCvc();
         });
       
         When('je renseigne le mois d\'expiration', async function () {
            await paymentPage.fillExpirationMonth()
         });
       
         When('je renseigne l\'annee d\'expiration', async function () {
            await paymentPage.fillExpirationYear();
         
        });

         
         When('je clique sur le bouton payer', async function () {

            await paymentPage.clickPaymentBtn();
         
        });
          
         Then('je devrais avoir le message {string}', async function (confirmation: string) {
            await expect(await paymentPage.getPaymentConfirmation()).toBe(confirmation);
          
         });