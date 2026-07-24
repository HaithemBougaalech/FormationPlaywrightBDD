import {
  After,
  AfterAll,
  Before,
  BeforeAll,
  setDefaultTimeout,
  Status,
} from "@cucumber/cucumber";
import { Browser, BrowserContext, chromium, firefox } from "@playwright/test";
import "dotenv/config";
import *as fs from "fs";
import { pageFixture } from "../support/pageFixture";
import { config } from "../config/configLoader";

let browser: Browser;
let context: BrowserContext;

setDefaultTimeout(40_000);

BeforeAll(async function () {
  browser = await chromium.launch({ headless: false });
  console.log("navigateur lancé");
});

Before(async function () {
  context = await browser.newContext({ 
    //baseURL: process.env.BASE_URL,
    baseURL: config.environnement.urlTest,
    recordVideo : {dir: './rapports/video'}
   });
  pageFixture.page = await context.newPage();
  console.log("Une nouvelle page ouverte");
});

After(async function ({ result, pickle }) {
  if (result?.status == Status.PASSED) {
    const img = await pageFixture.page.screenshot({
      path: `./rapports/screenshot/${pickle.name}.png`,
      type: "png",
    });
    await this.attach(img, "image/png");
  }
  await pageFixture.page.close();
  await context.close();

  // lancer la vidéo est récupérer son chemin
  const videoPath = await pageFixture.page.video()?.path();
  console.log(videoPath);

    if (result?.status == Status.PASSED && videoPath) {
      // garder la video
      const video = fs.readFileSync(videoPath);
     
      //attacher la vidéo au rapport allure
      await this.attach(video, "video/webm");
    
    };

});

AfterAll(async function () {
  await browser.close();
  console.log("navigateur fermé");
});
