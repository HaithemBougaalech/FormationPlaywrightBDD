@checkout
Feature: checkout
En tant qu'utulisateur je veux finaliserma commande

Background:
Given je suis sur la page de connexion
When je saisie mon login ""
And je saisie mon mot de passe ""
And je clique sur le bouton de connexion
Then je suis connecté en tant que "Logged in as"

When je clique sur le bouton produit
And je clique sur le premier produit
Then je devrais voir le nom du produit
And je clique sur le bouton add to cart
Then une confirmation d'ajout s'affiche
When je clique sur le bouton view cart
And je devrais voir le produit dans le panier

@checkout
Scenario: parcours complet de checkout
When je clique sur le bouton proceed to checkout
Then je devrais voir le recap de ma commande
Then je devrais voir mon adresse de livraison "Canada" 
When je saisie un commentaire "commande"
And je clique sur le bouton place order















