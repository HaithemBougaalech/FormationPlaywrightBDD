@panier
Feature: gestion du panier 
En tant qu'utulisateur je veux ajouter des produits à mon panier 

Background:
Given je suis sur la page de connexion
When je saisie mon login ""
And je saisie mon mot de passe ""
And je clique sur le bouton de connexion
Then je suis connecté en tant que "Logged in as"
When je clique sur le bouton produit

@ajouterPanier
Scenario: Ajouter un produit au panier depuis la liste

And je survole le premier produit
And je clique sur add to cart
Then une confirmation d'ajout s'affiche
When je clique sur le bouton view cart
Then le panier devrait contenir 1 produit
And je devrais voir le produit dans le panier
And le panier devrait contenir un prix valide "Rs"

@ajouterDepuisDétails
Scenario: Ajouter des produits depuis la page détails

And je clique sur le premier produit
Then je devrais voir le nom du produit
And je clique sur le bouton add to cart
Then une confirmation d'ajout s'affiche
When je clique sur le bouton view cart
Then le panier devrait contenir 1 produit
And je devrais voir le produit dans le panier
And le panier devrait contenir un prix valide "Rs"

@ajouterAvecQuantite
Scenario: Ajouter plusieurs unités d'un produit depuis la page détails

And je clique sur le premier produit
Then je devrais voir le nom du produit
When je change la quantite 3
And je clique sur le bouton add to cart
Then une confirmation d'ajout s'affiche
When je clique sur le bouton view cart
Then la quantite dans le panier devrait etre 3
And le prix total devrait correspondre au prix unitaire multiplie par 3

