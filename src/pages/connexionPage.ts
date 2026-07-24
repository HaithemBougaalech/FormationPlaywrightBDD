import { Locator, Page } from "@playwright/test";
import "dotenv/config";
import { config } from "../config/configLoader";
export class ConnexionPage {
  readonly page: Page; // readonly equivalent au modificateur d'accès final en selenium
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly btnLogin: Locator;
  readonly logged: Locator;
  readonly messageDerreur: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('[data-qa="login-email"]');
    this.passwordInput = page.locator('[data-qa="login-password"]');
    this.btnLogin = page.locator('[data-qa="login-button"]');
    this.logged = page.locator("li").filter({ hasText: "Logged in as" });
    this.messageDerreur = page.locator('xpath=//*[@id="form"]/div/div/div[1]/div/form/p');
  }

  //navigation
  async navigate(): Promise<void> {
    await this.page.goto("/login");
  }

  async saisirEmail(email: string): Promise<void> {
    //await this.emailInput.fill(email);
    await this.emailInput.fill(config.environnement.login);
  }

  async saisirPassword(pass: string): Promise<void> {
    await this.passwordInput.fill(pass);
  }

  async cliquerLogin(): Promise<void> {
    await this.btnLogin.click();
  }

  async getLoggedUsername(): Promise<String> {
    const userName = (await this.logged.textContent()) ?? "";
    return userName.trim();
  }
  async accepterCookies(): Promise<void> {
    try {
      const btnCookies = await this.page.locator(
        "xpath=/html/body/div/div[2]/div[2]/div[2]/div[2]/button[1]/p",
      );
      await btnCookies.waitFor({ state: "visible", timeout: 500 });
      await btnCookies.click();
    } catch { }
  }

  //login aves les credentials depuis le fichier .env

  async saisirEmailWithEnv(): Promise<void> {
    await this.emailInput.fill(
      process.env.USER_EMAIL || "haithem.bougaalech@gmail.com",
    );
  }

  async saisirPassworWithEnv(): Promise<void> {
    await this.passwordInput.fill(process.env.USER_PASSWORD || "Bougaalech");
  }

  async getMessageErreurChampVide(): Promise<string> {
    return await this.emailInput.evaluate((elm) => {
      return (elm as HTMLInputElement).validationMessage;
    });
  }  
}
