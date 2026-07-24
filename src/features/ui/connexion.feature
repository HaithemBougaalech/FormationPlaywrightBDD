@connexion
Feature: Connexion sur l'application exercieautomation
En tant qu'utilisateur enregistré sur exercieautomation je veux pouvoir me connecter

Background:
    Given je suis sur la page de connexion

  @connexionValide
  Scenario: connexion avec des identifiants valides
    When je saisie mon login ""
    And je saisie mon mot de passe ""
    And je clique sur le bouton de connexion
    Then je suis connecté en tant que "Logged in as"

  @connexionInvalide
  Scenario Outline: connexion avec des credentials invalides
    When je saisie mon login "<email>"
    And je saisie mon mot de passe "<password>"
    And je clique sur le bouton de connexion
    Then je verifie le message d'erreur affiche "<erreurAttendue>"

    Examples:
      | email                        | password   | erreurAttendue                       |
      | test@gmail.com               | Bougaalech | Your email or password is incorrect! |
      | haithem.bougaalech@gmail.com | test       | Your email or password is incorrect! |
      |                              |            | Veuillez renseigner ce champ.        |
