@registration
Feature: Inscription d'un nouvel utilisateur
  En tant que visiteur je veux pouvoir creer un compte afin d'acceder aux fonctionnalites membres

  Background:
    Given je suis sur la page de connexion
    And je vois le bloc "New User Signup!" avec les champs nom et email

  @smoke
  Scenario: inscription complete reussie
    When je renseigne le nom d'inscription "Qa User"
    And je renseigne l'email d'inscription "qa.user.unique@example.com"
    And je clique sur le bouton signup
    Then je suis redirige vers la page d'inscription du compte
    And je vois le titre "Enter Account Information"
    When je selectionne le titre "Mr"
    And je vois le nom pre-rempli "Qa User"
    And je vois l'email pre-rempli "qa.user.unique@example.com"
    And je renseigne le mot de passe "TestPass123!"
    And je selectionne la date de naissance "5" "May" "1995"
    And je coche "Sign up for our newsletter!"
    And je coche "Receive special offers from our partners!"
    And je renseigne le prenom "Qa"
    And je renseigne le nom de famille "User"
    And je renseigne la societe "Automation Labs"
    And je renseigne l'adresse "10 rue du Test"
    And je renseigne l'adresse complementaire "Etage 2"
    And je selectionne le pays "Canada"
    And je renseigne l'etat "Quebec"
    And je renseigne la ville "Montreal"
    And je renseigne le code postal "H2H2H2"
    And je renseigne le mobile "+15145550123"
    And je clique sur le bouton create account
    Then je vois le message "Account Created!"
    And je vois le bouton "Continue"

  @regression
  Scenario: inscription avec un email deja existant
    When je renseigne le nom d'inscription "Qa User"
    And je renseigne l'email d'inscription "test.user.20260721.2105@example.com"
    And je clique sur le bouton signup
    Then je vois le message d'erreur "Email Address already exist!"

  @regression
  Scenario: inscription avec champs obligatoires vides sur la page account information
    When je renseigne le nom d'inscription "Qa Empty"
    And je renseigne l'email d'inscription "qa.empty.unique@example.com"
    And je clique sur le bouton signup
    And je clique sur le bouton create account sans renseigner les champs obligatoires
    Then je vois le message de validation navigateur "Veuillez renseigner ce champ."
    And le focus est positionne sur le champ "password"
