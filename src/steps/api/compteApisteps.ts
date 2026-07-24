import { Before, Given, Then, When } from "@cucumber/cucumber";
import { APIRequestContext, APIResponse, expect, request } from "@playwright/test";
import { CompteApi } from "../../api/compteApi";
import 'dotenv/config';

let apiContext: APIRequestContext;
let compteApi: CompteApi;
let testEmail: string;
let testPassword: string;
let reponse: APIResponse;
let listData: {
  name: string;
  email: string;
  password: string;
  title: string;
  birth_date: string;
  birth_month: string;
  birth_year: string;
  firstname: string;
  lastname: string;
  company: string;
  address1: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobile_number: string;
};

Before({ tags: '@apiCompte' }, async function () {
  //on peu tcrééer hooks api séparé du hooks ui
  //créer un client http indépendant
  apiContext = await request.newContext({ baseURL: process.env.API_BASE_URL });

  //instancier la classe compte api
  compteApi = new CompteApi(apiContext);
})

Given('l\'api automatisation exercice est disponible', async function () {
  const reponse = await apiContext.get(`${process.env.API_BASE_URL}/productsList`);
  expect(reponse.status()).toBe(200);
  console.log("Api disponible");
});


Given('un mail unique doit etre genere', async function () {
  testEmail = `uptotest_${Date.now()}@gmail.com`;
  testPassword = 'testget';

  listData = {
    name: "Haithem",
    email: testEmail,
    password: testPassword,
    title: 'Mr',
    birth_date: '28',
    birth_month: '02',
    birth_year: '1991',
    firstname: 'string',
    lastname: 'string',
    company: 'string',
    address1: "string",
    country: 'string',
    state: 'string',
    city: 'string',
    zipcode: '67000',
    mobile_number: '1216454',
  };
  console.log('email généré: ', testEmail);
  console.log(listData.firstname);
});

//creation from api
When('je cree le compte avec les donnees generees', async function () {
  reponse = await compteApi.creerCompte(listData);
  console.log(reponse.status());
});


Then('le code de reponse devrait etre {int}', async function (codeAttendu: number) {
  const body = await compteApi.parseResponse(reponse);
  console.log(body);
  expect(body.code).toBe(codeAttendu);
});

Then('le message de reponse devrait contenir {string}', async function (messageAttendu: string) {
  const body = await compteApi.parseResponse(reponse);
  expect(body.message).toBe(messageAttendu);
});

//read from api
When('je recupere les details du compte par email', async function () {
  reponse = await compteApi.getUserByEmail(testEmail, testPassword);
  console.log('retour read', reponse.status());
});


Then('les details devraient contenir le nom de l\'utilisateur', async function () {
  const body = await compteApi.parseResponse(reponse);
  expect(body.user).toBeDefined();
  expect((body.user).name).toBeDefined();
  expect((body.user).email).toBe(testEmail);
  console.log(`user.name: ${(body.user).name}`);
  console.log(`user.email: ${(body.user).email}`);

});

//update name

When('je mets à jour le nom du compte avec {string}', async function (newName: string) {
  const updateData = {
    ...listData,
    name: newName,
  }

  reponse = await compteApi.modifyData(updateData);
  console.log(`put new name: ${newName}`);
  console.log(reponse.status());

});

//delete acount

When('je supprime le compte', async function () {
  reponse = await compteApi.deleteAcount(testEmail, testPassword);
  console.log(reponse.status());
});