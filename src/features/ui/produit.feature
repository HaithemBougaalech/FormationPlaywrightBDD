@produit
Feature: Gestion des produits
En tant qu'utulisateur je veux consulter la liste des produits afin de trouver un article souhaité

Background:
Given je suis sur la page des produits

@afficherListe
Scenario: Affichage de la liste des produits
Then je devrais visualiser une liste de produits
Then le nombre de produits affiche devrait être superieur a 0

@rechercheProduit
Scenario: Recherche d'un produit par mot clé
When je recherche le produit "shirt"
Then je devrais visualiser une liste de produits
Then je devrais consulter le mot cherché "shirt"

@afficherProduit
Scenario: Affichage des détails d'un produit
When je clique sur le premier produit
Then je devrais voir le nom du produit
And je devrais voir le prix du produit
And je devrais voir la description du produit