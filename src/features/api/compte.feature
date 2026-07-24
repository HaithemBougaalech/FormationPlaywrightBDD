@apiCompte
Feature: gestion d'un compte utulisateur via des api compte

En tant que testeur je souhaite valider les opérations de gestion
sur un compte utilisateur via l'api afin de m'assurer 
que les endpoints fonctionnent correctement

Background:
Given l'api automatisation exercice est disponible
And un mail unique doit etre genere
When je cree le compte avec les donnees generees 
Then le code de reponse devrait etre 201

@creation
Scenario: creer un compte utilisateur
Then le message de reponse devrait contenir "User created!" 

@read
Scenario: Recupérer les détails d'un compte exidtant
When je recupere les details du compte par email
Then le code de reponse devrait etre 200
And les details devraient contenir le nom de l'utilisateur

@update
Scenario: Mettre à jour les informations d'un compte
When je mets à jour le nom du compte avec "HaithemUpdated"
Then le code de reponse devrait etre 200
Then le message de reponse devrait contenir "User updated!"


@delete
Scenario: supprimer un compte existant
When je supprime le compte
Then le code de reponse devrait etre 200
Then le message de reponse devrait contenir "Account deleted!"

@fluxCompletCrud
Scenario: flux complet fluxComplet Crud : créer, lire, mettre à jour et supprimer
Then le message de reponse devrait contenir "User created!"

When je recupere les details du compte par email
Then le code de reponse devrait etre 200
And les details devraient contenir le nom de l'utilisateur

When je mets à jour le nom du compte avec "HaithemUpdated"
Then le code de reponse devrait etre 200
Then le message de reponse devrait contenir "User updated!"

When je supprime le compte
Then le code de reponse devrait etre 200
Then le message de reponse devrait contenir "Account deleted!"

