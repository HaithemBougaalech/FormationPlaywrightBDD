import { Locator, Page } from "@playwright/test";

export class RegisterPage {
  private readonly page: Page;
  readonly newUserSignupTitle: Locator;
  readonly signupNameInput: Locator;
  readonly signupEmailInput: Locator;
  readonly signupButton: Locator;
  readonly signupErrorMessage: Locator;

  readonly enterAccountInformationTitle: Locator;
  readonly titleMrRadio: Locator;
  readonly titleMrsRadio: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly daySelect: Locator;
  readonly monthSelect: Locator;
  readonly yearSelect: Locator;
  readonly newsletterCheckbox: Locator;
  readonly offersCheckbox: Locator;

  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly companyInput: Locator;
  readonly addressInput: Locator;
  readonly address2Input: Locator;
  readonly countrySelect: Locator;
  readonly stateInput: Locator;
  readonly cityInput: Locator;
  readonly zipcodeInput: Locator;
  readonly mobileNumberInput: Locator;

  readonly createAccountButton: Locator;
  readonly accountCreatedTitle: Locator;
  readonly continueButton: Locator;
  readonly cookieAcceptButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newUserSignupTitle = page.getByRole("heading", { name: "New User Signup!" });
    this.signupNameInput = page.locator('[data-qa="signup-name"]');
    this.signupEmailInput = page.locator('[data-qa="signup-email"]');
    this.signupButton = page.locator('[data-qa="signup-button"]');
    this.signupErrorMessage = page.locator('#form div div div:nth-child(3) div form p');

    this.enterAccountInformationTitle = page.getByText('Enter Account Information');
    this.titleMrRadio = page.locator("#id_gender1");
    this.titleMrsRadio = page.locator("#id_gender2");
    this.nameInput = page.locator('[data-qa="name"]');
    this.emailInput = page.locator('[data-qa="email"]');
    this.passwordInput = page.locator('[data-qa="password"]');
    this.daySelect = page.locator('[data-qa="days"]');
    this.monthSelect = page.locator('[data-qa="months"]');
    this.yearSelect = page.locator('[data-qa="years"]');
    this.newsletterCheckbox = page.locator("#newsletter");
    this.offersCheckbox = page.locator("#optin");

    this.firstNameInput = page.locator('[data-qa="first_name"]');
    this.lastNameInput = page.locator('[data-qa="last_name"]');
    this.companyInput = page.locator('[data-qa="company"]');
    this.addressInput = page.locator('[data-qa="address"]');
    this.address2Input = page.locator('[data-qa="address2"]');
    this.countrySelect = page.locator('[data-qa="country"]');
    this.stateInput = page.locator('[data-qa="state"]');
    this.cityInput = page.locator('[data-qa="city"]');
    this.zipcodeInput = page.locator('[data-qa="zipcode"]');
    this.mobileNumberInput = page.locator('[data-qa="mobile_number"]');

    this.createAccountButton = page.locator('[data-qa="create-account"]');
    this.accountCreatedTitle = page.locator('[data-qa="account-created"]');
    this.continueButton = page.locator('[data-qa="continue-button"]');
    this.cookieAcceptButton = page.locator(".fc-button.fc-data-preferences-accept-all");
  }

  // Navigation vers la page de login.
  async navigate(): Promise<void> {
    await this.page.goto("/login");
    await this.acceptCookiePopup();
  }

  // Clique sur le bloc New User Signup pour démarrer l'inscription.
  async clickNewUserSignup(): Promise<void> {
    await this.newUserSignupTitle.click();
  }

  // Remplit le nom de l'étape initiale de signup.
  async fillSignupName(name: string): Promise<void> {
    await this.signupNameInput.fill(name);
  }

  // Remplit l'email de l'étape initiale de signup.
  async fillSignupEmail(email: string): Promise<void> {
    await this.signupEmailInput.fill(email);
  }

  // Soumet le premier formulaire New User Signup.
  async clickSignup(): Promise<void> {
    await this.signupButton.click();
  }

  // Sélectionne le titre Mr.
  async selectTitleMr(): Promise<void> {
    await this.titleMrRadio.check();
  }

  // Sélectionne le titre Mrs.
  async selectTitleMrs(): Promise<void> {
    await this.titleMrsRadio.check();
  }

  // Renseigne le mot de passe.
  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  // Sélectionne la date de naissance.
  async selectDateOfBirth(day: string, month: string, year: string): Promise<void> {
    await this.daySelect.selectOption(day);
    await this.monthSelect.selectOption(month);
    await this.yearSelect.selectOption(year);
  }

  // Coche la case newsletter.
  async checkNewsletter(): Promise<void> {
    await this.newsletterCheckbox.check();
  }

  // Coche la case d'offres partenaires.
  async checkSpecialOffers(): Promise<void> {
    await this.offersCheckbox.check();
  }

  // Renseigne le prénom.
  async fillFirstName(firstName: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
  }

  // Renseigne le nom de famille.
  async fillLastName(lastName: string): Promise<void> {
    await this.lastNameInput.fill(lastName);
  }

  // Renseigne la société.
  async fillCompany(company: string): Promise<void> {
    await this.companyInput.fill(company);
  }

  // Renseigne l'adresse principale.
  async fillAddress(address: string): Promise<void> {
    await this.addressInput.fill(address);
  }

  // Renseigne la seconde ligne d'adresse.
  async fillAddress2(address2: string): Promise<void> {
    await this.address2Input.fill(address2);
  }

  // Sélectionne le pays.
  async selectCountry(country: string): Promise<void> {
    await this.countrySelect.selectOption(country);
  }

  // Renseigne l'état/région.
  async fillState(state: string): Promise<void> {
    await this.stateInput.fill(state);
  }

  // Renseigne la ville.
  async fillCity(city: string): Promise<void> {
    await this.cityInput.fill(city);
  }

  // Renseigne le code postal.
  async fillZipcode(zipcode: string): Promise<void> {
    await this.zipcodeInput.fill(zipcode);
  }

  // Renseigne le numéro mobile.
  async fillMobileNumber(mobileNumber: string): Promise<void> {
    await this.mobileNumberInput.fill(mobileNumber);
  }

  // Soumet le formulaire complet de création de compte.
  async clickCreateAccount(): Promise<void> {
    await this.createAccountButton.click();
  }

  // Continue après création du compte.
  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }

  // Retourne le message d'erreur d'email déjà utilisé.
  async getSignupErrorMessage(): Promise<string> {
    return ((await this.signupErrorMessage.textContent()) ?? "").trim();
  }

  // Retourne le titre de succès après création du compte.
  async getAccountCreatedTitle(): Promise<string> {
    return ((await this.accountCreatedTitle.textContent()) ?? "").trim();
  }

  // Retourne le message natif de validation du champ password.
  async getPasswordValidationMessage(): Promise<string> {
    return this.passwordInput.evaluate((elm) => (elm as HTMLInputElement).validationMessage);
  }

  // Ferme la popup cookies si elle est affichée.
  async acceptCookiePopup(): Promise<void> {
    const authorizeButton = this.page.getByRole("button", { name: "Autoriser" });
    if (await authorizeButton.isVisible()) {
      await authorizeButton.click();
      return;
    }
    if (await this.cookieAcceptButton.isVisible()) {
      await this.cookieAcceptButton.click();
    }
  }
}
